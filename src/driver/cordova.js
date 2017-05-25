/**
 * driver for makeblockHD APP(cordova ble bridge)
 */

import Driver from './driver';
import utils from '../core/utils';
import Parse from '../core/parse';

var parse = new Parse();

var bufferToArrayBuffer = function(buffer) {
  var ab = new ArrayBuffer(buffer.length);
  var view = new Uint8Array(ab);
  for (var i = 0; i < buffer.length; ++i) {
    view[i] = buffer[i];
  }
  return ab;
};

var driver = new Driver();

export default function CordovaBle() {
  'use strict';

  var self = this;
  var isConnected = false;
  var commServiceID = 'FFE1';
  var writeCharacteristicID = 'FFE3';
  var readCharacteristicID = 'FFE2';

  this._init = function() {
    if (typeof ble != "undefined") {
      ble.startListenReceivedData(function (msg) {
        var bufArray = utils.arrayFromArrayBuffer(msg);
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
  this._send = function(buf) {
    var self = this;
    if (typeof ble != "undefined") {
      var cmd = utils.arrayBufferFromArray(buf);
      ble.sendData(function (msg) {
        // success
      }, function (msg) {
        console.log(msg);
      }, cmd);
    }
  };
}

CordovaBle.prototype = driver;