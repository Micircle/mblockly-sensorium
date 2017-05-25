/**
 * @fileOverview The driver base class.
 * 用于数据通信
 */
export default function Driver() {
  var self = this;

  this._on_data = null;
  this._on_error = null;
  this._on_ready = null;

  /**
   * [send interface]
   * @param  {[ArrayBuffer]} buf [the buffer to send]
   * @return {[integer]}     [the actual byte length sent. -1 if send fails.]
   */
  this.send = function(buf) {
    if (this._send) {
      return this._send(buf);
    }
  };

  /**
   * [event register]
   * @param  {String}   event    event type
   * @param  {Function} callback functino to be excuted.
   */
  this.on = function(event, callback) {
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