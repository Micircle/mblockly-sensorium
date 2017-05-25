/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 57);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * @fileOverview 工具类函数
 */

var Utils = {

  /**
   * limit value
   * @param  {Number} value
   * @param  {Array} range  (optional) limit value range, such as [-255, 255], [0, 3000], default is [-255, 255]
   * @return {Number} newSpeed the result value in limit.
   */
  limitValue: function limitValue(value, range) {
    var newValue = value;
    range = range || [-255, 255];
    if (value < range[0]) {
      newValue = range[0];
    }

    if (value > range[1]) {
      newValue = range[1];
    }
    return newValue;
  },

  /**
   * Convert array of int to ArrayBuffer.
   * @param  {[int]} data array of int
   * @return {ArrayBuffer}      result array buffer
   * @private
   */
  arrayBufferFromArray: function arrayBufferFromArray(data) {
    var buffer = new ArrayBuffer(data.length);
    var result = new Int8Array(buffer);
    for (var i = 0; i < data.length; i++) {
      result[i] = data[i];
    }
    return buffer;
  },

  /**
   * Convert ArrayBuffer from array of int
   * @param  {ArrayBuffer} buffer the source arraybuffer
   * @return {[int]}        int array as the result;
   * @private
   */
  arrayFromArrayBuffer: function arrayFromArrayBuffer(buffer) {
    var dataView = new Uint8Array(buffer);
    var result = [];
    for (var i = 0; i < dataView.length; i++) {
      result.push(dataView[i]);
    }
    return result;
  },

  /**
   * [buffer2string converts array buffer to string format]
   * @param  {ArrayBuffer} buf [the input array buffer]
   * @return {String}     [the output string]
   */
  buffer2string: function buffer2string(buf) {
    var buffer = new Uint8Array(buf);
    return Array.prototype.join.call(buffer, " ");
  },

  /**
   * [string2buffer converts string to array buffer format]
   * @param  {String} str [the input string]
   * @return {Uint8Array}     [the output uint8 array buffer]
   */
  string2buffer: function string2buffer(str) {
    var buffer = new Uint8Array(str.split(" "));
    return buffer;
  },

  /**
   * 将十进制字符串数组转为16进制
   * @param  {Array}  data        to be transformed data, such as: ["01", "55", "12"]
   * @param  {Boolean} isUpperCase whether need output upperCase string.
   * @return {String} 16 进制字符串
   */
  intStrToHexStr: function intStrToHexStr(data, isUpperCase) {
    var temp = [];
    for (var i = 0; i < data.length; i++) {
      if (data[i] != null) {
        var item = parseInt(data[i]).toString(16);
        if (isUpperCase) {
          item = parseInt(data[i]).toString(16).toUpperCase();
        }
        if (item.length == 1) {
          item = "0" + item;
        }
        temp.push(item);
      }
    }
    return temp.join(" ");
  },

  // 十六进制字符串转成十进制
  hexStr2IntArray: function hexStr2IntArray(str) {
    var a = str.split(" ");
    var arr = [];
    for (var i in a) {
      var num = parseInt(a[i], 16);
      arr.push(num);
    }
    arr.reverse();
    console.log(arr);
    return arr;
  },

  /**
   * Float to bytes.
   * 现将float转成整形，再将整形转成字节表示
   * @param  {float} float number
   * @return {bytes}
   */
  float32ToBytes: function float32ToBytes(value) {
    // TOFIX: hack
    if (value == 0) {
      return [0, 0, 0, 0];
    }
    var bytesInt = 0;
    switch (value) {
      case Number.POSITIVE_INFINITY:
        bytesInt = 0x7F800000;
        break;
      case Number.NEGATIVE_INFINITY:
        bytesInt = 0xFF800000;
        break;
      case +0.0:
        bytesInt = 0x40000000;
        break;
      case -0.0:
        bytesInt = 0xC0000000;
        break;
      default:
        // if (Number.isNaN(value)) { bytesInt = 0x7FC00000; break; }

        if (value <= -0.0) {
          bytesInt = 0x80000000;
          value = -value;
        }

        var exponent = Math.floor(Math.log(value) / Math.log(2));
        var significand = value / Math.pow(2, exponent) * 0x00800000 | 0;

        exponent += 127;
        if (exponent >= 0xFF) {
          exponent = 0xFF;
          significand = 0;
        } else if (exponent < 0) exponent = 0;

        bytesInt = bytesInt | exponent << 23;
        bytesInt = bytesInt | significand & ~(-1 << 23);
        break;
    }
    var bytesArray = this.bigIntToBytes(bytesInt);
    return bytesArray;
  },

  /**
   * 整形转换成字节数组
   * @param  {number} value 整形
   * @return {array}  array数组
   */
  bigIntToBytes: function bigIntToBytes(value) {
    var bytesArray = [];
    var b1 = value & 0xff;
    var b2 = value >> 8 & 0xff;
    var b3 = value >> 16 & 0xff;
    var b4 = value >> 24 & 0xff;
    bytesArray.push(b1);
    bytesArray.push(b2);
    bytesArray.push(b3);
    bytesArray.push(b4);
    return bytesArray;
  },

  /**
   * 32位整数转成字节，js最多只支持32位有符号整数，不支持64位，因此最多只能转成4byte
   * @param  {Number} float number
   * @return {Array} bytes array
   */
  longToBytes: function longToBytes(value) {
    var bytes = [];
    var i = 4;
    do {
      bytes[--i] = value & 255;
      value = value >> 8;
    } while (i);
    return bytes;
  },

  /**
   * 将单词的第一个字母转成大写
   * @param  {string} str string.
   * @return {string}     target string.
   */
  upperCaseFirstLetter: function upperCaseFirstLetter(str) {
    var reg = /\b(\w)|\s(\w)/g;
    // str = str.toLowerCase();
    return str.replace(reg, function (m) {
      return m.toUpperCase();
    });
  },

  /**
   * transform matrix array to bytes
   * @param  {Array} matrixArray 8*16 led matrix array, such as:
   *
   * [
   *    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
   *    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
   *    0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0,
   *    0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0,
   *    0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0,
   *    0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0,
   *    0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0,
   *    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
   * ]
   * @return {Array} result 16 length bytes array, such as
   *
   * [0, 0, 0, 0, 28, 56, 28, 56, 28, 56, 3, 192, 3, 192, 0, 0]
   */
  emotionArrayToBytes: function emotionArrayToBytes(matrixArray) {
    var result = [];
    for (var i = 0; i < matrixArray.length; i++) {
      if ((i + 1) % 8 == 0) {
        var byteString = matrixArray.slice(i - 7, i + 1).join('');
        var byte = parseInt(byteString, 2);
        result.push(byte);
      }
    }
    return result;
  },

  /**
   * n个byte转成int值
   * @param  {Array} bytes 传入的bytes数组
   * @return {Number}          返回的int数值
   */
  bytesToInt: function bytesToInt(bytes) {
    var val = 0;
    for (var i = bytes.length - 1; i >= 0; i--) {
      val += bytes[bytes.length - i - 1] << i * 8;
    }
    return val;
  },

  /**
   * transform int to ascii
   * @param  {Array} bytes int array
   * @return {String} str string
   */
  bytesToString: function bytesToString(bytes) {
    var str = "";
    for (var i = 0; i < bytes.length; i++) {
      str += String.fromCharCode(bytes[i]);
    }
    return str;
  }
};

exports.default = Utils;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    // 数据发送与接收相关
    // 回复数据的index位置
    READ_BYTES_INDEX: 2,
    // 发送数据中表示“读”的值
    READ_MODE: 1,
    // 发送数据中表示“写”的值
    WRITE_MODE: 2,
    // 数据发送默认的驱动driver: makeblockhd, cordova
    DEFAULT_CONF: {
        driver: 'mock'
    }
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(21);

var _index2 = _interopRequireDefault(_index);

var _config = __webpack_require__(18);

var _config2 = _interopRequireDefault(_config);

var _value_wrapper = __webpack_require__(19);

var _value_wrapper2 = _interopRequireDefault(_value_wrapper);

var _promise = __webpack_require__(11);

var _promise2 = _interopRequireDefault(_promise);

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Board() {} /**
                     * @fileOverview board用做通信基类，被其他几大主板继承, 例如 orion, mcore, auriga, megaPi.
                     * @author Hyman (hujinhong@makelbock.cc)
                     */

Board.prototype.init = function (conf) {
  this.setDriver(conf.driver);
  console.warn("Driver: " + conf.driver);
};

Board.prototype.setDriver = function (driver) {
  var that = this;
  this.driver = (0, _index2.default)(driver);

  // get data from parse.
  this.driver.on('data', function (index, result) {
    that.sensorCallback(index, result);
  });

  this.driver.on('error', function (err) {
    console.warn(err);
  });
};

/**
 * Get sensor's value.
 * @param  {String}   deviceType the sensor's type.
 * @param  {Object}   options    config options, such as port, slot etc.
 * @param  {Function} callback   the function to be excuted.
 */
Board.prototype.getSensorValue = function (deviceType, options, callback) {
  if (callback == undefined && typeof options == 'function') {
    callback = options;
    options = {};
  }
  var params = {};
  params.deviceType = deviceType;
  params.callback = callback;
  params.port = options.port;
  params.slot = options.slot || 2;
  var valueWrapper = new _value_wrapper2.default();
  var index = _promise2.default.add(deviceType, callback, valueWrapper);
  params.index = index;

  // 发送读取指令
  this._doGetSensorValue(params);

  if (_config2.default.OPEN_RESNET_MODE) {
    // 执行超时检测
    this._handlerCommandSendTimeout(params);
  }
  return valueWrapper;
};

Board.prototype._doGetSensorValue = function (params) {
  var that = this;
  this._readBlockStatus(params);

  // 模拟回复指令
  // setTimeout(function() {
  //     var result = 1;
  //     that.sensorCallback(params.index, result);
  // }, 200);
};

/**
 * Read module's value.
 * @param  {object} params command params.
 */
Board.prototype._readBlockStatus = function (params) {
  var deviceType = params.deviceType;
  var index = params.index;
  var port = params.port;
  var slot = params.slot || null;
  var funcName = 'this.read' + _utils2.default.upperCaseFirstLetter(deviceType);
  var paramsStr = '(' + index + ',' + port + ',' + slot + ')';
  var func = funcName + paramsStr;
  eval(func);
};

/**
 * Command sending timeout handler.
 * @param  {Object} params params.
 */
Board.prototype._handlerCommandSendTimeout = function (params) {
  var that = this;
  var promiseItem = _promise2.default.requestList[params.index];
  setTimeout(function () {
    if (promiseItem.hasReceivedValue) {
      // 成功拿到数据，不进行处理
      return;
    } else {
      // 超过规定的时间，还没有拿到数据，需要进行超时重发处理
      if (promiseItem.resentCount >= _config2.default.RESENT_COUNT) {
        // 如果重发的次数大于规定次数,则终止重发
        console.log("【resend ends】");
        return;
      } else {
        console.log('【resend】:' + params.index);
        promiseItem.resentCount = promiseItem.resentCount || 0;
        promiseItem.resentCount++;
        that._doGetSensorValue(params);
        that._handlerCommandSendTimeout(params);
      }
    }
  }, _config2.default.COMMAND_SEND_TIMEOUT);
};

/**
 * Send sensor's data.
 * @param  {[type]} command [description]
 */
Board.prototype.send = function (command) {
  // console.log('send: ' + utils.intStrToHexStr(command));
  this.driver.send(command);
  return _utils2.default.intStrToHexStr(command);
};

/**
 * Get value form sensor and put the value to user's callback.
 * @param  {Number} index  the index of sensor's request command in promiseList
 * @param  {Number} result the value of sensor.
 */
Board.prototype.sensorCallback = function (index, result) {
  var deviceType = _promise2.default.getType(index);
  console.debug(deviceType + ": " + result);
  _promise2.default.receiveValue(index, result);
};

exports.default = Board;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Api;

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

var _settings = __webpack_require__(1);

var _settings2 = _interopRequireDefault(_settings);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @fileOverview  Api api list
 */

function Api(board) {
  /**
   * Set dc motor speed.
   * @param {number} port  port number, vailable is: 1,2,3,4
   * @param {number} speed speed, the range is -255 ~ 255
   * @example
   *     ff 55 06 00 02 0a 01 ff 00
   */
  this.setDcMotor = function (port, speed) {
    speed = _utils2.default.limitValue(speed);
    var a = [0xff, 0x55, 0x06, 0, _settings2.default.WRITE_MODE, 0x0a, port, speed & 0xff, speed >> 8 & 0xff];
    return board.send(a);
  },

  /**
   * Set encoder motor speed.
   * @param {number} slot  slot number, vailable is: 1,2
   * @param {number} speed speed, the range is -255 ~ 255
   * @example
   *     ff 55 07 00 02 3d 00 01 64 00
   */
  this.setEncoderMotorOnBoard = function (slot, speed) {
    speed = _utils2.default.limitValue(speed);
    var a = [0xff, 0x55, 0x07, 0, _settings2.default.WRITE_MODE, 0x3d, 0, slot, speed & 0xff, speed >> 8 & 0xff];
    return board.send(a);
  };

  /**
   * Set both left speed and right speed with one command.
   * @param {number} leftSpeed  left speed, the range is -255 ~ 255
   * @param {number} rightSpeed right speed, the range is -255 ~ 255
   * @example
   *     ff 55 07 00 02 05 64 00 64 00
   */
  this.setJoystick = function (leftSpeed, rightSpeed) {
    leftSpeed = _utils2.default.limitValue(leftSpeed);
    rightSpeed = _utils2.default.limitValue(rightSpeed);
    var a = [0xff, 0x55, 0x07, 0, _settings2.default.WRITE_MODE, 0x05, leftSpeed & 0xff, leftSpeed >> 8 & 0xff, rightSpeed & 0xff, rightSpeed >> 8 & 0xff];
    return board.send(a);
  };

  /**
   * Set speed for balance mode, the port is on board, value is 0.
   * @param {number} turnDegree turn extend, -255 ~ 255
   * @param {number} speed      speed, -255 ~ 255
   * @example
   *     ff 55 08 00 02 34 00 64 00 64 00
   */
  this.setVirtualJoystickForBalance = function (turnExtent, speed) {
    turnExtent = _utils2.default.limitValue(turnExtent);
    speed = _utils2.default.limitValue(speed);
    var a = [0xff, 0x55, 0x08, 0, _settings2.default.WRITE_MODE, 0x34, 0, turnExtent & 0xff, turnExtent >> 8 & 0xff, speed & 0xff, speed >> 8 & 0xff];
    return board.send(a);
  };

  /**
   * Set stepper motor speed.
   * @param {Number} port     port number, vailable is: 1,2,3,4
   * @param {Number} speed    speed, the range is 0 ~ 3000
   * @param {Long} distance distance, the range is -2147483648 ~ 2147483647
   * @example
   *     ff 55 0a 00 02 28 01 b8 0b e8 03 00 00
   */
  this.setStepperMotor = function (port, speed, distance) {
    speed = _utils2.default.limitValue(speed, [0, 3000]);
    var distanceBytes = _utils2.default.longToBytes(distance);
    var a = [0xff, 0x55, 0x0a, 0, _settings2.default.WRITE_MODE, 0x28, port, speed & 0xff, speed >> 8 & 0xff, distanceBytes[3], distanceBytes[2], distanceBytes[1], distanceBytes[0]];
    return board.send(a);
  };

  /**
   * Set RgbFourLed electronic module color.
   * @param {number} port     port number, vailable is: 0(on board), 6,7,8,9,10
   * @param {number} slot     slot number, vailable is: 1,2
   * @param {number} position led position, 0 signify all leds.
   * @param {number} r        red, the range is 0 ~ 255
   * @param {number} g        green, the range is 0 ~ 255
   * @param {number} b        blue, the range is 0 ~ 255
   * @example
   *     ff 55 09 00 02 08 06 02 00 ff 00 00
   */
  this.setLed = function (port, slot, position, r, g, b) {
    r = _utils2.default.limitValue(r, [0, 255]);
    g = _utils2.default.limitValue(g, [0, 255]);
    b = _utils2.default.limitValue(b, [0, 255]);
    var a = [0xff, 0x55, 0x09, 0, _settings2.default.WRITE_MODE, 0x08, port, slot, position, r, g, b];
    return board.send(a);
  };

  /**
   * set four leds
   * @param {number} port     port number, vailable is: 0(on board), 6,7,8,9,10
   * @param {number} position led position, 0 signify all leds.
   * @param {number} r        red, the range is 0 ~ 255
   * @param {number} g        green, the range is 0 ~ 255
   * @param {number} b        blue, the range is 0 ~ 255
   */
  this.setFourLeds = function (port, position, r, g, b) {
    return this.setLed(port, 2, position, r, g, b);
  };

  /**
   * turn off four leds
   * @param {number} port     port number, vailable is: 0(on board), 6,7,8,9,10
   * @param {number} position led position, 0 signify all leds.
   */
  this.turnOffFourLeds = function (port, position) {
    return this.setLed(port, 2, position, 0, 0, 0);
  };

  /**
   * set led panel on Api board.
   * @param {number} position led position, 0 signify all leds.
   * @param {number} r        red, the range is 0 ~ 255
   * @param {number} g        green, the range is 0 ~ 255
   * @param {number} b        blue, the range is 0 ~ 255
   */
  this.setLedPanelOnBoard = function (position, r, g, b) {
    return this.setLed(0, 2, position, r, g, b);
  };

  /**
   * turn off led panel on board
   * @param {number} position led position, 0 signify all leds.
   */
  this.turnOffLedPanelOnBoard = function (position) {
    return this.setLed(0, 2, position, 0, 0, 0);
  };

  /**
   * Set board mode.
   * @param {number} mode board mode,
   *     0: bluetooth mode
   *     1: ultrasonic mode
   *     2: balance mode
   *     3: infrared mode
   *     4: linefollow mode
   * @example
   *     ff 55 05 00 02 3c 11 00
   */
  this.setFirmwareMode = function (mode) {
    var a = [0xff, 0x55, 0x05, 0, _settings2.default.WRITE_MODE, 0x3c, 0x11, // 0x11 means Api
    mode];
    return board.send(a);
  };

  /**
   * Set Servo speed.
   * @param {[type]} port   port number, vailable is 6,7,8,9,10
   * @param {[type]} slot   slot number, vailable is 1,2
   * @param {[type]} degree servo degree, the range is 0 ~ 180
   */
  this.setServoMotor = function (port, slot, degree) {
    degree = _utils2.default.limitValue(degree, [0, 180]);
    var a = [0xff, 0x55, 0x06, 0, _settings2.default.WRITE_MODE, 0x0b, port, slot, degree];
    return board.send(a);
  };

  /**
   * Set Seven-segment digital tube number.
   * @param {number} port   port number, vailable is 6,7,8,9,10
   * @param {float} number  the number to be displayed, -999 ~ 9999
   * @exmpa
   *     ff 55 08 00 02 09 06 00 00 c8 42
   */
  this.setSevenSegment = function (port, number) {
    number = _utils2.default.limitValue(number, [-999, 9999]);
    var byte4Array = _utils2.default.float32ToBytes(number);
    var a = [0xff, 0x55, 0x08, 0, _settings2.default.WRITE_MODE, 0x09, port, byte4Array[0], byte4Array[1], byte4Array[2], byte4Array[3]];
    return board.send(a);
  };

  /**
   * Set led matrix char.
   * @param {number} port   port number, vailable is 6,7,8,9,10
   * @param {number} xAxis  x position
   * @param {number} yAxis  y position
   * @param {string} char  char, 例如 Hi 转换成ASCII的值 48 69
   * @exmaple
   * ff 55 0a 00 02 29 06 01 00 01 02 48 69
   */
  this.setLedMatrixChar = function (port, xAxis, yAxis, char) {
    var charAsciiArray = [];
    for (var i = 0; i < char.length; i++) {
      charAsciiArray.push(char[i].charCodeAt());
    }
    var a = [0xff, 0x55, 0x0a, 0, _settings2.default.WRITE_MODE, 0x29, port, 0x01, xAxis, yAxis, char.length].concat(charAsciiArray);
    return board.send(a);
  };

  /**
   * Set led matrix emotion.
   * @param {number} port   port number, vailable is 6,7,8,9,10
   * @param {number} xAxis      x position
   * @param {number} yAxis      y position
   * @param {Array} emotionData emotion data to be displayed, such as
   *  [00, 00, 40, 48, 44, 42, 02, 02, 02, 02, 42, 44, 48, 40, 00, 00]
   * @example
   * ff 55 17 00 02 29 06 02 00 00 00 00 40 48 44 42 02 02 02 02 42 44 48 40 00 00
   */
  this.setLedMatrixEmotion = function (port, xAxis, yAxis, emotionData) {
    var a = [0xff, 0x55, 0x17, 0, _settings2.default.WRITE_MODE, 0x29, port, 0x02, xAxis, yAxis].concat(emotionData);
    return board.send(a);
  };

  /**
   * Set led matrix time.
   * @param {number} port   port number, vailable is 6,7,8,9,10
   * @param {number} separator time separator, 01 signify `:`, 02 signify ` `
   * @param {number} hour      hour number, 0 ~ 23
   * @param {number} minute    minute number, 0 ~ 59
   * @example
   *     ff 55 08 00 02 29 06 03 01 0a 14
   */
  this.setLedMatrixTime = function (port, separator, hour, minute) {
    hour = _utils2.default.limitValue(hour, [0, 23]);
    minute = _utils2.default.limitValue(minute, [0, 59]);
    var a = [0xff, 0x55, 0x08, 0, _settings2.default.WRITE_MODE, 0x29, port, 0x03, separator, hour, minute];
    return board.send(a);
  };

  /**
   * Set led matrix number.
   * @param {number} port   port number, vailable is 6,7,8,9,10
   * @param {float} number the number to be displayed
   * @exmaple
      ff 55 09 00 02 29 06 04 00 00 00 00
   */
  this.setLedMatrixNumber = function (port, number) {
    var byte4Array = _utils2.default.float32ToBytes(number);
    var a = [0xff, 0x55, 0x09, 0, _settings2.default.WRITE_MODE, 0x29, port, 0x04, byte4Array[0], byte4Array[1], byte4Array[2], byte4Array[3]];
    return board.send(a);
  };

  /**
   * Set shutter.
   * @param {number} port   port number, vailable is 6,7,8,9,10
   * @param {number} action 0: 按下快门; 1: 松开快门; 2: 聚焦; 3: 停止聚焦
   * @exmaple
      ff 55 05 00 02 14 06 02
   */
  this.setShutter = function (port, action) {
    var a = [0xff, 0x55, 0x05, 0, _settings2.default.WRITE_MODE, 0x14, port, action];
    return board.send(a);
  };

  /**
   * reset all sensors and motors on board.
   * @exmaple
      ff 55 02 00 04
   */
  this.reset = function () {
    var a = [0xff, 0x55, 0x02, 0x00, 0x04];
    return board.send(a);
  };

  /**
   * set buzzer.
   * @param {string} tone , "A2" ~ "D8"
   * @param {number} beat , 125: eight; 250: quater; 500: half; 1000: one; 2000: double
   * @example
   * C2，quater beat: ff 55 08 00 02 22 09 41 00 f4 01
   */
  this.setTone = function (tone, beat) {
    var TONE_HZ = {
      // 原始数据：D5: 587 "E5": 658,"F5": 698,"G5": 784,"A5": 880,"B5": 988,"C6": 1047
      "A2": 110, "B2": 123, "C2": 65,
      "C3": 131, "D3": 147, "E3": 165, "F3": 175, "G3": 196, "A3": 220,
      "B3": 247, "C4": 262, "D4": 294, "E4": 330, "F4": 349, "G4": 392,
      "A4": 440, "B4": 494, "C5": 523, "D5": 555, "E5": 640, "F5": 698,
      "G5": 784, "A5": 880, "B5": 988, "C6": 1047, "D6": 1175, "E6": 1319,
      "F6": 1397, "G6": 1568, "A6": 1760, "B6": 1976, "C7": 2093, "D7": 2349,
      "E7": 2637, "F7": 2794, "G7": 3136, "A7": 3520, "B7": 3951, "C8": 4186, "D8": 4699
    };

    var a = [0xff, 0x55, 0x08, 0, _settings2.default.WRITE_MODE, 0x22, 0x09, TONE_HZ[tone] & 0xff, TONE_HZ[tone] >> 8 & 0xff, beat & 0xff, beat >> 8 & 0xff];

    return board.send(a);
  };

  /**
   * set encoder motor.
   * @param  {Number} index [description]
   * @param  {Number} port  vailable: 1,2,3,4
   * @param  {Number} slot  vailable: 1，2
   * @param  {Number} speed  0 ~ 300, 单位：rpm（每分钟转多少圈）
   * @param  {Float} angle  相对位移, -2147483648 ~ 2147483647
   * @example
   * ff 55 0b 00 02 0c 08 01 96 00 00 00 34 44
   */
  this.setEncoderMotor = function (port, slot, speed, angle) {
    speed = _utils2.default.limitValue(speed, [0, 300]);
    var byte4Array = _utils2.default.float32ToBytes(angle);
    var a = [0xff, 0x55, 0x0b, 0, _settings2.default.WRITE_MODE, 0x0c, 0x08, slot, speed & 0xff, speed >> 8 & 0xff, byte4Array[0], byte4Array[1], byte4Array[2], byte4Array[3]];
    return board.send(a);
  };

  /**
   * read verion of board
   * @param  {Number} index index of command
   */
  this.readVersion = function (index) {
    var a = [0xff, 0x55, 0x03, index, _settings2.default.READ_MODE, 0x00];
    return board.send(a);
  };

  /**
   * mainly used for distance measurement, the measurement range is 0 to 500 cm,
   * the execution of the command will have more than 100 milliseconds latency.
   * So the frequency of the host to send this instruction shoulds not be too high.
   * @param  {Number} index [description]
   * @param  {Number} port  vailable: 6，7，8，9，10
   * @return {Number}       [description]
   * @example
   * ff 55 04 00 01 01 03
   */
  this.readUltrasonic = function (index, port) {
    var a = [0xff, 0x55, 0x04, index, _settings2.default.READ_MODE, 0x01, port];
    return board.send(a);
  };

  /**
   * read temperature, Each port can connect two road temperature sensor.
   * @param  {Number} index [description]
   * @param  {Number} port  vailable: 6，7，8，9，10
   * @param  {Number} slot  vailable: slot1(1), slot2(2)
   * @return {Number}       [description]
   * @example
   * ff 55 05 00 01 02 01 02
   */
  this.readTemperature = function (index, port, slot) {
    var a = [0xff, 0x55, 0x05, index, _settings2.default.READ_MODE, 0x02, port, slot];
    return board.send(a);
  };

  /**
   * The light sensor module or onboard (lamp) light sensors numerical reading.
   * @param  {Number} index [description]
   * @param  {Number} port  vailable: 6,7,8,9,10, onbord(0c),onbord(0b)
   * @return {Number}       [description]
   * @example
   * ff 55 04 00 01 03 07
   */
  this.readLight = function (index, port) {
    var a = [0xff, 0x55, 0x04, index, _settings2.default.READ_MODE, 0x03, port];
    return board.send(a);
  };

  /**
   * read Potentionmeter
   * @param  {Number} index [description]
   * @param  {Number} port  vailable: 6，7，8，9，10
   * @return {Number}       [description]
   * @example
   * ff 55 04 00 01 04 06
   */
  this.readPotentionmeter = function (index, port) {
    var a = [0xff, 0x55, 0x04, index, _settings2.default.READ_MODE, 0x04, port];
    return board.send(a);
  };

  /**
   * read josystic value
   * @param  {Number} index [description]
   * @param  {Number} port  vailable: 6，7，8，9，10
   * @param  {Number} axis  1: x-axis; 2: y-axis;
   * @example
   * ff 55 05 00 01 05 06 01
   */
  this.readJoystick = function (index, port, axis) {
    var a = [0xff, 0x55, 0x05, index, _settings2.default.READ_MODE, 0x05, port, axis];
    return board.send(a);
  };

  /**
   * read gyro value in different axis.
   * @param  {Number} index [description]
   * @param  {Number} port  vailable: 6，7，8，9，10
   * @param  {Number} axis  vailable: X-axis(01)  Y-axis(02)  Z-axis(03)
   * @return {Number}       [description]
   * @example
   * ff 55 05 00 01 06 00 01
   */
  this.readGyro = function (index, port, axis) {
    var a = [0xff, 0x55, 0x05, index, _settings2.default.READ_MODE, 0x06, port, axis];
    var c = board.send(a);
    return c;
  };

  /**
   * read volume testing MIC module parameters
   * @param  {Number} index [description]
   * @param  {Number} port  vailable: 6，7，8，9，10，onboard(0x0e)
   * @return {Number}       [description]
   * @example
   * ff 55 04 00 01 07 06
   */
  this.readSound = function (index, port) {
    var a = [0xff, 0x55, 0x04, index, _settings2.default.READ_MODE, 0x07, port];
    return board.send(a);
  };

  /**
   * read temperature on board
   * @param  {Number} index [description]
   * @example
   * ff 55 04 00 01 1b 0d
   */
  this.readTemperatureOnBoard = function (index) {
    var port = 0x0d;
    var a = [0xff, 0x55, 0x04, index, _settings2.default.READ_MODE, 0x1b, port];
    return board.send(a);
  };

  /**
   * read pyroelectric infrared sensor
   * @param  {Number} index [description]
   * @param  {Number} port  vailable: 6,7,8,9,10
   * @return {Number}       [description]
   * @example
   * ff 55 04 00 01 0f 06
   */
  this.readPirmotion = function (index, port) {
    var a = [0xff, 0x55, 0x04, index, _settings2.default.READ_MODE, 0x0f, port];
    return board.send(a);
  };

  /**
   * read LineFollower sensor
   * @param  {Number} index [description]
   * @param  {Number} port  vailable: 6，7，8，9，10
   * @return {Number} number,
   *  00   0
      01   1
      10   2
      11   3
      when 0 said has a black line
    * @example
    * ff 55 04 00 01 11 02
   */
  this.readLineFollower = function (index, port) {
    var a = [0xff, 0x55, 0x04, index, _settings2.default.READ_MODE, 0x11, port];
    return board.send(a);
  };

  /**
   * read limitSwitch
   * @param  {Number} index [description]
   * @param  {Number} port  vailable: 6,7,8,9,10
   * @param  {Number} slot  vailable: SLOT1(01)   SLOT2(02)
   * @return {Number}       [description]
   * @example
   * ff 55 05 00 01 15 06 02
   */
  this.readLimitSwitch = function (index, port, slot) {
    var a = [0xff, 0x55, 0x05, index, _settings2.default.READ_MODE, 0x15, port, slot];
    var c = board.send(a);
    return c;
  };

  /**
   * read compass.
   * @param  {Number} index [description]
   * @param  {Number} port  vailable: 6,7,8,9,10
   * @return {Number}       [description]
   * @example
   * ff 55 04 00 01 1a 06
   */
  this.readCompass = function (index, port) {
    var a = [0xff, 0x55, 0x04, index, _settings2.default.READ_MODE, 0x1a, port];
    return board.send(a);
  };

  /**
   * read humiture
   * @param  {Number} index [description]
   * @param  {Number} port  vailable: 6，7，8，9，10
   * @param  {Number} temperature(01) humidity (00)
   * @return {Number}       [description]
   * @example
   * ff 55 05 00 01 17 06 00
   */
  this.readHumiture = function (index, port, type) {
    var a = [0xff, 0x55, 0x05, index, _settings2.default.READ_MODE, 0x17, port, type];
    return board.send(a);
  };

  /**
   * read flame
   * @param  {Number} index [description]
   * @param  {Number} port  vailable: 6,7,8,9,10
   * @return {Number}       [description]
   * @example
   * ff 55 04 00 01 18 03
   */
  this.readFlame = function (index, port) {
    var a = [0xff, 0x55, 0x04, index, _settings2.default.READ_MODE, 0x18, port];
    return board.send(a);
  };

  /**
   * Used to get the harmful gas density
   * @param  {Number} index [description]
   * @param  {Number} port  vailable: 6,7,8,9,10
   * @return {Number}       [description]
   * @example
   * ff 55 04 00 01 19 06
   */
  this.readGas = function (index, port) {
    var a = [0xff, 0x55, 0x04, index, _settings2.default.READ_MODE, 0x19, port];
    return board.send(a);
  };

  /**
   * read touch sensor
   * @param  {Number} index [description]
   * @param  {Number} port  vailable: 6,7,8,9,10
   * @return {Number}       [description]
   * @example
   * ff 55 04 00 01 33 06
   */
  this.readTouch = function (index, port) {
    var a = [0xff, 0x55, 0x04, index, _settings2.default.READ_MODE, 0x33, port];
    return board.send(a);
  };

  /**
   * To determine whether the corresponding button is pressed.
   * @param  {Number} index [description]
   * @param  {Number} port  vailable: 6,7,8,9,10
   * @param  {Number} key   vailable:1,2,3,4
   * @return {Number}       [description]
   * @example
   * ff 55 05 00 01 16 03 01
   */
  this.readFourKeys = function (index, port, key) {
    var a = [0xff, 0x55, 0x05, index, _settings2.default.READ_MODE, 0x16, port, key];
    return board.send(a);
  };

  /**
   * read encoder motor position or speed on board.
   * @param  {Number} index [description]
   * @param  {Number} slot vailable:1,2
   * @param  {Number} type  1: position; 2: speed
   * @example
   * ff 55 06 00 01 3d 00 01 02
   */
  this.readEncoderMotorOnBoard = function (index, slot, type) {
    var a = [0xff, 0x55, 0x06, index, _settings2.default.READ_MODE, 0x3d, 0, slot, type];
    return board.send(a);
  };

  /**
   * read firmware mode or voltage.
   * @param  {Number} index [description]
   * @param  {Number} type  0x70: 电压; 0x71: 模式
   * @example
   * ff 55 04 00 01 3c 70
   */
  this.readFirmwareMode = function (index, type) {
    var a = [0xff, 0x55, 0x04, index, _settings2.default.READ_MODE, 0x3c, type];
    return board.send(a);
  };

  /**
   * @param  {Number} index [description]
   * @param  {Number} port  vailable: digit GPOI port
   * @return {Number}       [description]
   * @example
   * ff 55 04 00 01 1e 09
   */
  // this.readDigGPIO = function(index, port) {
  //   var a = [
  //     0xff,0x55,
  //     0x04, index,
  //     SETTINGS.READ_MODE,
  //     0x1e,
  //     port,
  //   ];
  //   return board.send(a);
  // };

  /**
   * @param  {Number} index [description]
   * @param  {Number} port  vailable: analog GPIO port
   * @return {Number}       [description]
   * @example
   * ff 55 04 00 01 1f 02
   */
  // this.readAnalogGPIO = function(index, port) {
  //   var a = [
  //     0xff,0x55,
  //     0x04, index,
  //     SETTINGS.READ_MODE,
  //     0x1f,
  //     port,
  //   ];
  //   return board.send(a);
  // };

  /**
   * @param  {Number} index [description]
   * @param  {Number} port  vailable: GPIO port
   * @param  {Number} key   vailable: 0,1
   * @return {Number}       [description]
   * @example
   * ff 55 05 00 01 25 0d 20 4e
   */
  // this.readGPIOContinue = function(index, port, key) {
  //   var a = [
  //     0xff,0x55,
  //     0x05, index,
  //     SETTINGS.READ_MODE,
  //     0x25,
  //     port,
  //     key,
  //   ];
  //   return board.send(a);
  // };

  /**
   * @param  {Number} index [description]
   * @param  {Number} port  vailable: GPIO port
   * @param  {Number} key   vailable: 0,1
   * @return {Number}       [description]
   * @example
   * ff 55 05 00 01 24 45 40
   */
  // this.readDoubleGPIO = function(index, port1, port2) {
  //   var a = [
  //     0xff,0x55,
  //     0x05, index,
  //     SETTINGS.READ_MODE,
  //     0x24,
  //     port1,
  //     port2,
  //   ];
  //   return board.send(a);
  // };

  /**
   * @param  {Number} index [description]
   * @param  {Number} port  vailable: analog GPIO port
   * @param  {Number} key   vailable: 0,1
   * @return {Number}       [description]
   * @example
   * ff 55 03 00 01 32
   */
  // this.readRuntime = function(index) {
  //   var a = [
  //     0xff,0x55,
  //     0x03, index,
  //     SETTINGS.READ_MODE,
  //     0x32,
  //   ];
  //   return board.send(a);
  // };

  // this.readOnboardButton = function(index) {
  //   var a = [
  //     0xff,0x55,
  //     0x03, index,
  //     SETTINGS.READ_MODE,
  //     0x32,
  //   ];
  //   return board.send(a);
  // };
}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(30), __esModule: true };

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _settings = __webpack_require__(1);

var _settings2 = _interopRequireDefault(_settings);

var _promise = __webpack_require__(11);

var _promise2 = _interopRequireDefault(_promise);

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Parse() {
  this.buffer = [];

  // 获取到的最大指令长度
  this.REC_BUF_LENGTH = 40;

  // 解析从硬件传递过来的数据
  // 接收的消息队列并实现组包，例如：ff 55 3c 02 10  01 0d | 0a | ff 55 03 | 04 01 0d 0a 0a 32 | 0d 0a
  // data : 当前处理的数据
  // this.buffer: 历史缓存数据
  // 记录数据和历史数据分开记录
  this.doParse = function (bytes, driver, callback) {
    var data = bytes;
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
        var promiseType = _promise2.default.getType(dataIndex);
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
  this.getResult = function (buf, type) {
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
        result = _utils2.default.bytesToString(bytes);
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
  this.calculateResponseValue = function (intArray) {
    var result = null;

    // FIXME: int字节转浮点型
    var intBitsToFloat = function intBitsToFloat(num) {
      /* s 为符号（sign）；e 为指数（exponent）；m 为有效位数（mantissa）*/
      var s = num >> 31 == 0 ? 1 : -1,
          e = num >> 23 & 0xff,
          m = e == 0 ? (num & 0x7fffff) << 1 : num & 0x7fffff | 0x800000;
      return s * m * Math.pow(2, e - 150);
    };
    var intValue = _utils2.default.bytesToInt(intArray);
    // TOFIX
    if (intValue < 100000 && intValue > 0) {
      result = intValue;
    } else {
      result = parseFloat(intBitsToFloat(intValue).toFixed(2));
    }
    return result;
  };
} /**
   * @fileOverview 负责实际的数据解析
   */

exports.default = Parse;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Driver;
/**
 * @fileOverview The driver base class.
 * 用于数据通信
 */
function Driver() {
  var self = this;

  this._on_data = null;
  this._on_error = null;
  this._on_ready = null;

  /**
   * [send interface]
   * @param  {[ArrayBuffer]} buf [the buffer to send]
   * @return {[integer]}     [the actual byte length sent. -1 if send fails.]
   */
  this.send = function (buf) {
    if (this._send) {
      return this._send(buf);
    }
  };

  /**
   * [event register]
   * @param  {String}   event    event type
   * @param  {Function} callback functino to be excuted.
   */
  this.on = function (event, callback) {
    switch (event) {
      case 'data':
        self._on_data = callback;
        break;
      case 'error':
        self._on_error = callback;
        break;
      case 'ready':
        self._on_ready = callback;
        break;
      default:
        console.warn('unsupported event: ', event);
        break;
    }
  };
}

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(8)(function(){
  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};

/***/ }),
/* 9 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = function(it){
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * @fileOverview PromiveList is sensor data's transfer station.
 * 用于处理传感器数据分发
 */
var PromiseList = {
    requestList: new Array(255),
    index: 1,

    add: function add(type, callback, valueWrapper) {
        this.index++;
        if (this.index > 254) {
            this.index = 1;
        }
        this.requestList[this.index] = {
            type: type,
            callback: callback,
            valueWrapper: valueWrapper,
            hasReceivedValue: false,
            resentCount: 0
        };
        return this.index;
    },

    // 将值写到对应请求的值对象中，并且启动回调
    receiveValue: function receiveValue(index, value) {
        var that = this;
        if (this.requestList[index]) {
            this.requestList[index].callback(value);
            this.requestList[index].valueWrapper.setValue(value);
            this.requestList[index].hasReceivedValue = true;
        }
    },

    getType: function getType(index) {
        if (this.requestList[index]) {
            return this.requestList[index].type;
        } else {
            return 0;
        }
    }
};

exports.default = PromiseList;

/***/ }),
/* 12 */
/***/ (function(module, exports) {

var core = module.exports = {version: '2.4.0'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ }),
/* 13 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
};

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(34);
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
  return cof(it) == 'String' ? it.split('') : Object(it);
};

/***/ }),
/* 15 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil  = Math.ceil
  , floor = Math.floor;
module.exports = function(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(14)
  , defined = __webpack_require__(13);
module.exports = function(it){
  return IObject(defined(it));
};

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Sensorium = exports.MegaPi = exports.Orion = exports.Mcore = exports.Auriga = undefined;

var _auriga = __webpack_require__(25);

var _auriga2 = _interopRequireDefault(_auriga);

var _mcore = __webpack_require__(26);

var _mcore2 = _interopRequireDefault(_mcore);

var _orion = __webpack_require__(28);

var _orion2 = _interopRequireDefault(_orion);

var _megapi = __webpack_require__(27);

var _megapi2 = _interopRequireDefault(_megapi);

var _sensorium = __webpack_require__(29);

var _sensorium2 = _interopRequireDefault(_sensorium);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Auriga = _auriga2.default;
exports.Mcore = _mcore2.default;
exports.Orion = _orion2.default;
exports.MegaPi = _megapi2.default;
exports.Sensorium = _sensorium2.default;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var Config = {
    // whether open console.log
    OPEN_LOG: false,
    // 开启超时重发
    OPEN_RESNET_MODE: false,
    // 超时重发的次数
    RESENT_COUNT: 2,
    // 读值指令超时的设定
    COMMAND_SEND_TIMEOUT: 3000
};

exports.default = Config;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = ValueWrapper;
/**
 * 用来存值、取值
 * valueWrapper是一个拥有存值、取值的类，每一个对象都将拥有这两个方法。
 *
 * 用来储存“读取数据”block对数据的请求，使用valueWrapper来完成程序变量的临时替代
 * 在蓝牙返回数据之后设置真实的值，然后继续程序执行。
 * 最终目的：取到程序块中请求的值
 *
 * 该技巧利用了对象的引用类型的原理，对象的属性值存在内存的某一个位置，后面值改变，内存
 * 中的值即跟着改变。
 */
function ValueWrapper() {};
ValueWrapper.prototype.toString = function () {
    return this.val;
};

ValueWrapper.prototype.setValue = function (value) {
    this.val = value;
};

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = CordovaBle;

var _driver = __webpack_require__(6);

var _driver2 = _interopRequireDefault(_driver);

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

var _parse = __webpack_require__(5);

var _parse2 = _interopRequireDefault(_parse);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

try {
  ble = top.ble;
} catch (err) {
  console.log(err);
} /**
   * driver for makeblockHD APP(cordova ble bridge)
   */

var parse = new _parse2.default();

var bufferToArrayBuffer = function bufferToArrayBuffer(buffer) {
  var ab = new ArrayBuffer(buffer.length);
  var view = new Uint8Array(ab);
  for (var i = 0; i < buffer.length; ++i) {
    view[i] = buffer[i];
  }
  return ab;
};

var driver = new _driver2.default();

function CordovaBle() {
  'use strict';

  var self = this;
  var isConnected = false;
  var commServiceID = 'FFE1';
  var writeCharacteristicID = 'FFE3';
  var readCharacteristicID = 'FFE2';

  this._init = function () {
    if (typeof ble != "undefined") {
      ble.startListenReceivedData(function (msg) {
        var bufArray = _utils2.default.arrayFromArrayBuffer(msg);
        parse.doParse(bufArray, driver);
      }, function (msg) {
        console.log(msg);
      });
    }
  };

  /**
   * [_send sends array buffer to driver]
   * @param  {[Array]} buf [the buffer to send]
   * @return {[integer]}     [the actual byte length sent. -1 if send fails.]
   */
  this._send = function (buf) {
    var self = this;
    if (typeof ble != "undefined") {
      var cmd = _utils2.default.arrayBufferFromArray(buf);
      ble.sendData(function (msg) {
        // success
      }, function (msg) {
        console.log(msg);
      }, cmd);
    }
  };
}

CordovaBle.prototype = driver;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = create;

var _makeblock_hd = __webpack_require__(22);

var _makeblock_hd2 = _interopRequireDefault(_makeblock_hd);

var _cordova = __webpack_require__(20);

var _cordova2 = _interopRequireDefault(_cordova);

var _mtester = __webpack_require__(24);

var _mtester2 = _interopRequireDefault(_mtester);

var _mock = __webpack_require__(23);

var _mock2 = _interopRequireDefault(_mock);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * package driver implements a variety of communicate drivers, eg serial, bluetooth ...
 */
var Serial = function Serial() {};

/**
 * [create the the driver factory method]
 * @param  {[string]} type [the driver type, 'serial', 'bluetooth', 'mock'] ('mock is only used for test')
 * @return {[driver object]}      [the driver object]
 */
function create(type) {
  'use strict';

  var driver = null;

  switch (type) {
    case 'mtester':
      driver = new _mtester2.default();
      break;
    case 'serial':
      driver = new Serial();
      break;
    case 'makeblockhd':
      driver = new _makeblock_hd2.default();
      break;
    case 'cordova':
      driver = new _cordova2.default();
      break;
    case 'mock':
      driver = new _mock2.default();
      break;
    default:
      console.warn('unsupported driver: ', type);
      break;
  }
  if (driver._init) {
    driver._init();
  }

  return driver;
}

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = MakeblockHD;

var _driver = __webpack_require__(6);

var _driver2 = _interopRequireDefault(_driver);

var _parse = __webpack_require__(5);

var _parse2 = _interopRequireDefault(_parse);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var driver = new _driver2.default(); /**
                                      * driver for makeblockHD APP( js bridge)
                                      */

var parse = new _parse2.default();

/**
 * [buffer2string converts array buffer to string format]
 * @param  {ArrayBuffer} buf [the input array buffer]
 * @return {String}     [the output string]
 */
function buffer2string(buf) {
  var buffer = new Uint8Array(buf);
  return Array.prototype.join.call(buffer, " ");
}

/**
 * [string2buffer converts string to array buffer format]
 * @param  {String} str [the input string]
 * @return {Uint8Array}     [the output uint8 array buffer]
 */
function string2buffer(str) {
  var buffer = new Uint8Array(str.split(" "));
  return buffer;
}

function MakeblockHD() {
  'use strict';

  var self = this;

  this._init = function () {

    // Read data
    if (window) {
      window.receiveBluetoothData = function (str) {
        var data = string2buffer(str);
        // parse buffer data
        parse.doParse(data, driver);
      };
    }
  };

  /**
   * [_send sends array buffer to driver]
   * @param  {[ArrayBuffer]} buf [the buffer to send]
   * @return {[integer]}     [the actual byte length sent. -1 if send fails.]
   */
  this._send = function (buf) {
    // Send data
    if (typeof TellNative != "undefined") {
      return TellNative.sendViaBluetooth(buffer2string(buf));
    }
  };
}

MakeblockHD.prototype = driver;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Mock;

var _driver = __webpack_require__(6);

var _driver2 = _interopRequireDefault(_driver);

var _parse = __webpack_require__(5);

var _parse2 = _interopRequireDefault(_parse);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var driver = new _driver2.default(); /**
                                      * driver for makeblockHD APP( js bridge)
                                      */

var parse = new _parse2.default();

/**
 * [buffer2string converts array buffer to string format]
 * @param  {ArrayBuffer} buf [the input array buffer]
 * @return {String}     [the output string]
 */
function buffer2string(buf) {
  var buffer = new Uint8Array(buf);
  return Array.prototype.join.call(buffer, " ");
}

/**
 * [string2buffer converts string to array buffer format]
 * @param  {String} str [the input string]
 * @return {Uint8Array}     [the output uint8 array buffer]
 */
function string2buffer(str) {
  var buffer = new Uint8Array(str.split(" "));
  return buffer;
}

function Mock() {
  'use strict';

  var self = this;

  this._init = function () {
    // Read data
    // if (window) {
    //   window.receiveBluetoothData = function(str) {
    //     var data = string2buffer(str);
    //     // parse buffer data
    //     parse.doParse(data, driver);
    //   };
    // }
  };

  /**
   * [_send sends array buffer to driver]
   * @param  {[ArrayBuffer]} buf [the buffer to send]
   * @return {[integer]}     [the actual byte length sent. -1 if send fails.]
   */
  this._send = function (buf) {
    // Send data
    console.log(buf);
  };
}

Mock.prototype = driver;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Mtester;

var _driver = __webpack_require__(6);

var _driver2 = _interopRequireDefault(_driver);

var _parse = __webpack_require__(5);

var _parse2 = _interopRequireDefault(_parse);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var driver = new _driver2.default(); /**
                                      * driver for makeblockHD APP( js bridge)
                                      */

var parse = new _parse2.default();

/**
 * [buffer2string converts array buffer to string format]
 * @param  {ArrayBuffer} buf [the input array buffer]
 * @return {String}     [the output string]
 */
function buffer2string(buf) {
  var buffer = new Uint8Array(buf);
  return Array.prototype.join.call(buffer, " ");
}

/**
 * [string2buffer converts string to array buffer format]
 * @param  {String} str [the input string]
 * @return {Uint8Array}     [the output uint8 array buffer]
 */
function string2buffer(str) {
  var buffer = new Uint8Array(str.split(" "));
  return buffer;
}

function Mtester() {
  'use strict';

  var self = this;

  this._init = function () {

    // Read data
    if (window) {
      window.receiveBluetoothData = function (str) {
        var data = string2buffer(str);
        // parse buffer data
        parse.doParse(data, driver);
      };
    }
  };

  /**
   * [_send sends array buffer to driver]
   * @param  {[ArrayBuffer]} buf [the buffer to send]
   * @return {[integer]}     [the actual byte length sent. -1 if send fails.]
   */
  this._send = function (buf) {
    // Send data
    if (Tester && socket) {
      var tester = new Tester(socket);
      tester.sendSerialData(buf);
    }
  };
}

Mtester.prototype = driver;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = __webpack_require__(4);

var _assign2 = _interopRequireDefault(_assign);

exports.default = Auriga;

var _board = __webpack_require__(2);

var _board2 = _interopRequireDefault(_board);

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

var _settings = __webpack_require__(1);

var _settings2 = _interopRequireDefault(_settings);

var _api = __webpack_require__(3);

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var board = new _board2.default();
var api = new _api2.default(board);

function Auriga(conf) {
  this._config = (0, _assign2.default)(_settings2.default.DEFAULT_CONF, conf || {});
  board.init(this._config);

  var apiList = ["setDcMotor", "setEncoderMotorOnBoard", "setJoystick", "setVirtualJoystickForBalance", "setStepperMotor", "setLed", "setFourLeds", "turnOffFourLeds", "setLedPanelOnBoard", "turnOffLedPanelOnBoard", "setFirmwareMode", "setServoMotor", "setSevenSegment", "setLedMatrixChar", "setLedMatrixEmotion", "setLedMatrixTime", "setLedMatrixNumber", "setShutter", "reset", "setTone", "setEncoderMotor", "readVersion", "readUltrasonic", "readTemperature", "readLight", "readPotentionmeter", "readJoystick", "readGyro", "readSound", "readTemperatureOnBoard", "readPirmotion", "readLineFollower", "readLimitSwitch", "readCompass", "readHumiture", "readFlame", "readGas", "readTouch", "readFourKeys", "readEncoderMotorOnBoard", "readFirmwareMode"];

  for (var i in apiList) {
    this[apiList[i]] = api[apiList[i]];
  }
}

// clone method and attributes from board to Auriga.
Auriga.prototype = board;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = __webpack_require__(4);

var _assign2 = _interopRequireDefault(_assign);

exports.default = Mcore;

var _board = __webpack_require__(2);

var _board2 = _interopRequireDefault(_board);

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

var _settings = __webpack_require__(1);

var _settings2 = _interopRequireDefault(_settings);

var _api = __webpack_require__(3);

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var board = new _board2.default();
var api = new _api2.default(board);

function Mcore(conf) {
  this._config = (0, _assign2.default)(_settings2.default.DEFAULT_CONF, conf || {});
  board.init(this._config);

  var apiList = ["setDcMotor", "setEncoderMotorOnBoard", "setJoystick", "setVirtualJoystickForBalance", "setStepperMotor", "setLed", "setFourLeds", "turnOffFourLeds", "setLedPanelOnBoard", "turnOffLedPanelOnBoard", "setFirmwareMode", "setServoMotor", "setSevenSegment", "setLedMatrixChar", "setLedMatrixEmotion", "setLedMatrixTime", "setLedMatrixNumber", "setShutter", "reset", "setTone", "setEncoderMotor", "readVersion", "readUltrasonic", "readTemperature", "readLight", "readPotentionmeter", "readJoystick", "readGyro", "readSound", "readTemperatureOnBoard", "readPirmotion", "readLineFollower", "readLimitSwitch", "readCompass", "readHumiture", "readFlame", "readGas", "readTouch", "readFourKeys", "readEncoderMotorOnBoard", "readFirmwareMode"];

  for (var i in apiList) {
    this[apiList[i]] = api[apiList[i]];
  }
}

// clone method and attributes from board to Mcore.
Mcore.prototype = board;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = __webpack_require__(4);

var _assign2 = _interopRequireDefault(_assign);

exports.default = MegaPi;

var _board = __webpack_require__(2);

var _board2 = _interopRequireDefault(_board);

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

var _settings = __webpack_require__(1);

var _settings2 = _interopRequireDefault(_settings);

var _api = __webpack_require__(3);

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var board = new _board2.default();
var api = new _api2.default(board);

function MegaPi(conf) {
  this._config = (0, _assign2.default)(_settings2.default.DEFAULT_CONF, conf || {});
  board.init(this._config);

  var apiList = ["setDcMotor", "setEncoderMotorOnBoard", "setJoystick", "setVirtualJoystickForBalance", "setStepperMotor", "setLed", "setFourLeds", "turnOffFourLeds", "setLedPanelOnBoard", "turnOffLedPanelOnBoard", "setFirmwareMode", "setServoMotor", "setSevenSegment", "setLedMatrixChar", "setLedMatrixEmotion", "setLedMatrixTime", "setLedMatrixNumber", "setShutter", "reset", "setTone", "setEncoderMotor", "readVersion", "readUltrasonic", "readTemperature", "readLight", "readPotentionmeter", "readJoystick", "readGyro", "readSound", "readTemperatureOnBoard", "readPirmotion", "readLineFollower", "readLimitSwitch", "readCompass", "readHumiture", "readFlame", "readGas", "readTouch", "readFourKeys", "readEncoderMotorOnBoard", "readFirmwareMode"];

  for (var i in apiList) {
    this[apiList[i]] = api[apiList[i]];
  }
}

// clone method and attributes from board to MegaPi.
MegaPi.prototype = board;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = __webpack_require__(4);

var _assign2 = _interopRequireDefault(_assign);

exports.default = Orion;

var _board = __webpack_require__(2);

var _board2 = _interopRequireDefault(_board);

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

var _settings = __webpack_require__(1);

var _settings2 = _interopRequireDefault(_settings);

var _api = __webpack_require__(3);

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var board = new _board2.default();
var api = new _api2.default(board);

function Orion(conf) {
  this._config = (0, _assign2.default)(_settings2.default.DEFAULT_CONF, conf || {});
  board.init(this._config);

  var apiList = ["setDcMotor", "setEncoderMotorOnBoard", "setJoystick", "setVirtualJoystickForBalance", "setStepperMotor", "setLed", "setFourLeds", "turnOffFourLeds", "setLedPanelOnBoard", "turnOffLedPanelOnBoard", "setFirmwareMode", "setServoMotor", "setSevenSegment", "setLedMatrixChar", "setLedMatrixEmotion", "setLedMatrixTime", "setLedMatrixNumber", "setShutter", "reset", "setTone", "setEncoderMotor", "readVersion", "readUltrasonic", "readTemperature", "readLight", "readPotentionmeter", "readJoystick", "readGyro", "readSound", "readTemperatureOnBoard", "readPirmotion", "readLineFollower", "readLimitSwitch", "readCompass", "readHumiture", "readFlame", "readGas", "readTouch", "readFourKeys", "readEncoderMotorOnBoard", "readFirmwareMode"];

  for (var i in apiList) {
    this[apiList[i]] = api[apiList[i]];
  }
}

// clone method and attributes from board to Orion.
Orion.prototype = board;

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = __webpack_require__(4);

var _assign2 = _interopRequireDefault(_assign);

var _board = __webpack_require__(2);

var _board2 = _interopRequireDefault(_board);

var _utils = __webpack_require__(0);

var _utils2 = _interopRequireDefault(_utils);

var _settings = __webpack_require__(1);

var _settings2 = _interopRequireDefault(_settings);

var _api = __webpack_require__(3);

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var board = new _board2.default();
var api = new _api2.default(board);

function Sensorium(conf) {
  this._config = (0, _assign2.default)(_settings2.default.DEFAULT_CONF, conf || {});
  board.init(this._config);

  var apiList = ["setDcMotor", "setEncoderMotorOnBoard", "setJoystick", "setVirtualJoystickForBalance", "setStepperMotor", "setLed", "setFourLeds", "turnOffFourLeds", "setLedPanelOnBoard", "turnOffLedPanelOnBoard", "setFirmwareMode", "setServoMotor", "setSevenSegment", "setLedMatrixChar", "setLedMatrixEmotion", "setLedMatrixTime", "setLedMatrixNumber", "setShutter", "reset", "setTone", "setEncoderMotor", "readVersion", "readUltrasonic", "readTemperature", "readLight", "readPotentionmeter", "readJoystick", "readGyro", "readSound", "readTemperatureOnBoard", "readPirmotion", "readLineFollower", "readLimitSwitch", "readCompass", "readHumiture", "readFlame", "readGas", "readTouch", "readFourKeys", "readEncoderMotorOnBoard", "readFirmwareMode"];

  for (var i in apiList) {
    this[apiList[i]] = api[apiList[i]];
  }
}

// clone method and attributes from board to Sensorium.
Sensorium.prototype = board;

exports.default = Sensorium;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(56);
module.exports = __webpack_require__(12).Object.assign;

/***/ }),
/* 31 */
/***/ (function(module, exports) {

module.exports = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(10);
module.exports = function(it){
  if(!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(16)
  , toLength  = __webpack_require__(52)
  , toIndex   = __webpack_require__(51);
module.exports = function(IS_INCLUDES){
  return function($this, el, fromIndex){
    var O      = toIObject($this)
      , length = toLength(O.length)
      , index  = toIndex(fromIndex, length)
      , value;
    // Array#includes uses SameValueZero equality algorithm
    if(IS_INCLUDES && el != el)while(length > index){
      value = O[index++];
      if(value != value)return true;
    // Array#toIndex ignores holes, Array#includes - not
    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
      if(O[index] === el)return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

/***/ }),
/* 34 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function(it){
  return toString.call(it).slice(8, -1);
};

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(31);
module.exports = function(fn, that, length){
  aFunction(fn);
  if(that === undefined)return fn;
  switch(length){
    case 1: return function(a){
      return fn.call(that, a);
    };
    case 2: return function(a, b){
      return fn.call(that, a, b);
    };
    case 3: return function(a, b, c){
      return fn.call(that, a, b, c);
    };
  }
  return function(/* ...args */){
    return fn.apply(that, arguments);
  };
};

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(10)
  , document = __webpack_require__(9).document
  // in old IE typeof document.createElement is 'object'
  , is = isObject(document) && isObject(document.createElement);
module.exports = function(it){
  return is ? document.createElement(it) : {};
};

/***/ }),
/* 37 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

var global    = __webpack_require__(9)
  , core      = __webpack_require__(12)
  , ctx       = __webpack_require__(35)
  , hide      = __webpack_require__(40)
  , PROTOTYPE = 'prototype';

var $export = function(type, name, source){
  var IS_FORCED = type & $export.F
    , IS_GLOBAL = type & $export.G
    , IS_STATIC = type & $export.S
    , IS_PROTO  = type & $export.P
    , IS_BIND   = type & $export.B
    , IS_WRAP   = type & $export.W
    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
    , expProto  = exports[PROTOTYPE]
    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
    , key, own, out;
  if(IS_GLOBAL)source = name;
  for(key in source){
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if(own && key in exports)continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function(C){
      var F = function(a, b, c){
        if(this instanceof C){
          switch(arguments.length){
            case 0: return new C;
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if(IS_PROTO){
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library` 
module.exports = $export;

/***/ }),
/* 39 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function(it, key){
  return hasOwnProperty.call(it, key);
};

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

var dP         = __webpack_require__(43)
  , createDesc = __webpack_require__(48);
module.exports = __webpack_require__(7) ? function(object, key, value){
  return dP.f(object, key, createDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(7) && !__webpack_require__(8)(function(){
  return Object.defineProperty(__webpack_require__(36)('div'), 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys  = __webpack_require__(46)
  , gOPS     = __webpack_require__(44)
  , pIE      = __webpack_require__(47)
  , toObject = __webpack_require__(53)
  , IObject  = __webpack_require__(14)
  , $assign  = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(8)(function(){
  var A = {}
    , B = {}
    , S = Symbol()
    , K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function(k){ B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
  var T     = toObject(target)
    , aLen  = arguments.length
    , index = 1
    , getSymbols = gOPS.f
    , isEnum     = pIE.f;
  while(aLen > index){
    var S      = IObject(arguments[index++])
      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
      , length = keys.length
      , j      = 0
      , key;
    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
  } return T;
} : $assign;

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

var anObject       = __webpack_require__(32)
  , IE8_DOM_DEFINE = __webpack_require__(41)
  , toPrimitive    = __webpack_require__(54)
  , dP             = Object.defineProperty;

exports.f = __webpack_require__(7) ? Object.defineProperty : function defineProperty(O, P, Attributes){
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if(IE8_DOM_DEFINE)try {
    return dP(O, P, Attributes);
  } catch(e){ /* empty */ }
  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
  if('value' in Attributes)O[P] = Attributes.value;
  return O;
};

/***/ }),
/* 44 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

var has          = __webpack_require__(39)
  , toIObject    = __webpack_require__(16)
  , arrayIndexOf = __webpack_require__(33)(false)
  , IE_PROTO     = __webpack_require__(49)('IE_PROTO');

module.exports = function(object, names){
  var O      = toIObject(object)
    , i      = 0
    , result = []
    , key;
  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while(names.length > i)if(has(O, key = names[i++])){
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys       = __webpack_require__(45)
  , enumBugKeys = __webpack_require__(37);

module.exports = Object.keys || function keys(O){
  return $keys(O, enumBugKeys);
};

/***/ }),
/* 47 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;

/***/ }),
/* 48 */
/***/ (function(module, exports) {

module.exports = function(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
};

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(50)('keys')
  , uid    = __webpack_require__(55);
module.exports = function(key){
  return shared[key] || (shared[key] = uid(key));
};

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(9)
  , SHARED = '__core-js_shared__'
  , store  = global[SHARED] || (global[SHARED] = {});
module.exports = function(key){
  return store[key] || (store[key] = {});
};

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(15)
  , max       = Math.max
  , min       = Math.min;
module.exports = function(index, length){
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(15)
  , min       = Math.min;
module.exports = function(it){
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(13);
module.exports = function(it){
  return Object(defined(it));
};

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(10);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function(it, S){
  if(!isObject(it))return it;
  var fn, val;
  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  throw TypeError("Can't convert object to primitive value");
};

/***/ }),
/* 55 */
/***/ (function(module, exports) {

var id = 0
  , px = Math.random();
module.exports = function(key){
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(38);

$export($export.S + $export.F, 'Object', {assign: __webpack_require__(42)});

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(17);


/***/ })
/******/ ]);