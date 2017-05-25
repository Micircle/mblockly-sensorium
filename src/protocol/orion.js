import Board from "../core/board";
import utils from "../core/utils";
import SETTINGS from "./settings";
import Api from './api';

var board = new Board();
var api = new Api(board);

export default function Orion(conf) {
  this._config = Object.assign(SETTINGS.DEFAULT_CONF, conf || {});
  board.init(this._config);

  var apiList = [
    "setDcMotor",
    "setEncoderMotorOnBoard",
    "setJoystick",
    "setVirtualJoystickForBalance",
    "setStepperMotor",
    "setLed",
    "setFourLeds",
    "turnOffFourLeds",
    "setLedPanelOnBoard",
    "turnOffLedPanelOnBoard",
    "setFirmwareMode",
    "setServoMotor",
    "setSevenSegment",
    "setLedMatrixChar",
    "setLedMatrixEmotion",
    "setLedMatrixTime",
    "setLedMatrixNumber",
    "setShutter",
    "reset",
    "setTone",
    "setEncoderMotor",
    "readVersion",
    "readUltrasonic",
    "readTemperature",
    "readLight",
    "readPotentionmeter",
    "readJoystick",
    "readGyro",
    "readSound",
    "readTemperatureOnBoard",
    "readPirmotion",
    "readLineFollower",
    "readLimitSwitch",
    "readCompass",
    "readHumiture",
    "readFlame",
    "readGas",
    "readTouch",
    "readFourKeys",
    "readEncoderMotorOnBoard",
    "readFirmwareMode",
    // "readDigGPIO",
    // "readAnalogGPIO",
    // "readGPIOContinue",
    // "readDoubleGPIO",
    // "readRuntime",
    // "readOnboardButton",
  ];

  for(var i in apiList) {
    this[apiList[i]] = api[apiList[i]];
  }
}

// clone method and attributes from board to Orion.
Orion.prototype = board;