/**
 * @fileOverview 负责实际的数据解析
 */

import SETTINGS from"../protocol/settings";
import PromiseList from "./promise";
import utils from '../core/utils';


function Parse() {
  this.buffer = [];

  // 获取到的最大指令长度
  this.REC_BUF_LENGTH = 40;

  // 解析从硬件传递过来的数据
  // 接收的消息队列并实现组包，例如：ff 55 3c 02 10  01 0d | 0a | ff 55 03 | 04 01 0d 0a 0a 32 | 0d 0a
  // data : 当前处理的数据
  // this.buffer: 历史缓存数据
  // 记录数据和历史数据分开记录
  this.doParse = function(bytes, driver, callback) {
    var data  = bytes;
    // if (typeof(bytes) == 'string') {
    //   data = bytes.split(" ");
    // } else {
    //   data = bytes;
    // }

    data = this.buffer.concat(data);
    this.buffer = [];

    // parse buffer data
    for (var i = 0; i < data.length; i++) {
      this.buffer.push(parseInt(data[i]));
      if (parseInt(data[i]) === 0x55 && parseInt(data[i - 1]) === 0xff) {
        // start flag
        this.recvLength = 0;
        this.beginRecv = true;
        this.tempBuf = [];
      } else if (parseInt(data[i - 1]) === 0x0d && parseInt(data[i]) === 0x0a && this.tempBuf) {
        // end flag
        this.beginRecv = false;
        var buf = this.tempBuf.slice(0, this.recvLength - 1);
        // 解析正确的数据后，清空buffer
        this.buffer = [];
        if (buf.length == 0) {
          // buf中没有数据
          return false;
        }

        // 以下为有效数据, 获取返回字节流中的索引位
        var dataIndex = buf[0];
        var promiseType = PromiseList.getType(dataIndex);
        if (promiseType || promiseType == 0) {
          // 计算返回值
          var result = this.getResult(buf, promiseType);
          callback && callback(buf);
          // 接收到数据后，启用回调
          if (driver && driver._on_data) {
            driver._on_data(dataIndex, result);
          } else {
            console.warn("driver data callback not found!");
          }
        }
      } else {
        // normal
        if (this.beginRecv) {
          if (this.recvLength >= this.REC_BUF_LENGTH) {
            console.log("receive buffer overflow!");
          }
          this.tempBuf[this.recvLength++] = parseInt(data[i]);
        }
      }
    }
  };

  /**
   * Get result from buffer data.
   * @param  {Array} buf array data.
   * @return {Float}         value of sensor's callback
   * 回复数据数值解析, 从左到右第四位数据：
   *     1: 单字符(1 byte)
   *     2： float(4 byte)
   *     3： short(2 byte)，16个长度
   *     4： 字符串
   *     5： double(4 byte)
   *     6: long(4 byte)
   *  @example
   *  ff 55 02 02 7c 1a 81 41 0d 0a
   */
  this.getResult = function(buf, type) {
    // 获取返回的数据类型
    var dataType = buf[1];
    var result = null;
    switch (dataType) {
      case "1":
      case 1:
        // 1byte
        result = buf[2];
        break;
      case "3":
      case 3:
        // 2byte
        result = this.calculateResponseValue([parseInt(buf[3]), parseInt(buf[2])]);
        break;
      case "4":
      case 4:
        // 字符串
        var bytes = buf.splice(3, buf[2]);
        result = utils.bytesToString(bytes);
        break;
      case "2":
      case "5":
      case "6":
      case 2:
      case 5:
      case 6:
        // long型或者float型的4byte处理
        result = this.calculateResponseValue([parseInt(buf[5]), parseInt(buf[4]), parseInt(buf[3]), parseInt(buf[2])]);
        break;
      default:
        break;
    }

    // TOFIX: should not be placed here.
    //  if (type == this.PromiseType.ENCODER_MOTER.index) {
    //   result = Math.abs(result);
    // }

    return result;
  };

  /**
   * calculate value from data received: bytes -> int -> float
   * @param  {Array} intArray decimal array
   * @return {Number}  result.
   */
  this.calculateResponseValue = function(intArray) {
    var result = null;

    // FIXME: int字节转浮点型
    var intBitsToFloat = function(num) {
      /* s 为符号（sign）；e 为指数（exponent）；m 为有效位数（mantissa）*/
      var s = (num >> 31) == 0 ? 1 : -1,
        e = (num >> 23) & 0xff,
        m = (e == 0) ?
        (num & 0x7fffff) << 1 :
        (num & 0x7fffff) | 0x800000;
      return s * m * Math.pow(2, e - 150);
    };
    var intValue = utils.bytesToInt(intArray);
    // TOFIX
    if (intValue < 100000 && intValue > 0) {
      result = intValue;
    } else {
      result = parseFloat(intBitsToFloat(intValue).toFixed(2));
    }
    return result;
  };
}

export default Parse;