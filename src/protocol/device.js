/**
 * @fileOverview all electronic module‘s type name and device id.
 * 需要统下列电子模块名称，保证唯一性
 * 参考电子元器件列表：http://km.makeblock.com/pages/viewpage.action?pageId=6685705
 */

var Device = {
  "version":                          0,   // 软件版本号
  "ultrasonic":                       1,   // 超声波传感器
  "temperature":                      2,   // 温度传感器(18B20)
  "light":                            3,   // 光线传感器
  "potentionmeter":                   4,   // 电位器
  "joystick":                         5,   // 摇杆
  "gyro":                             6,   // 陀螺仪（板载和外接）
  "sound":                            7,   // 音量传感器（板载端口的值为0x0e）
  "led":                              8,   // RGB LED灯
  "sevenSegment":                     9,   // 四位七段数码管
  "dcMotor":                          10,  // 直流电机
  "servo":                            11,  // 舵机
  "encoder":                          12,  // 编码电机(外接)
  "ir":                               13,
  "pirmotion":                        15,  // PIR 人体红外传感器
  //"infrared":                         16,  // 红外传感器
  "lineFollower":                     17,  // 寻线传感器
  "shutter":                          20,  // 快门线
  "limitSwitch":                      21,  // 限位开关
  "fourKeys":                         22,  // 4按键模块
  "humiture":                         23,  // 温湿度传感器
  "flame":                            24,  // 火焰传感器
  "gas":                              25,  // 气体传感器
  "compass":                          26,  // 电子罗盘
  "temperatureOnBoard":               27,  // 温度传感器（板载）
  //"digital":                          30,  // 读取数字管脚的值
  //"analog":                           31,  // 读取模拟管脚的值
  //"pwm":                              32,
  //"servoPin":                         33,
  "tone":                             34,
  "buttonInner":                      35,
  //"ultrasonicArduino":                36,  // 双管脚超声波传感器
  //"pulsein":                          37,  // 读取管脚的脉冲持续时间
  "stepperMotor":                     40,  // 步进电机
  "ledMatrix":                        41, // 表情面板
    "ledMatrixChar":                  //表情面板-字符串
    "ledMatrixChar":                  //表情面板-字符串
    "ledMatrixChar":                  //表情面板-字符串
    "ledMatrixChar":                  //表情面板-字符串
  //"timer":                            50,  // 固件运行时间
  "touch":                            51,  // 触摸传感器
  "virtualJoystickForBalance":        52,  // App 虚拟摇杆-平衡车模式
  "firmwareMode":                     60,  // 主板通用命令
    //Secondary command
    "setStarterMode":                 0x10,
    "setAurigaMode":                  0x11,
    "setMegapiMode":                  0x12,
    "voltage":                        0x70,  // 读取电压
    "mode":                           0x71,  // 返回固件模式
    "getMegapiMode":                  0x72,
  "encoderMotorOnBoard":                61,  // 编码电机（板载）
    //Read type
    "encoderMotorBoardPos":           0x01,
    "encoderMotorBoardSpeed":         0x02
  "smartServo":                       63,  // 智能舵机（待定）

};

module.exports = Device;