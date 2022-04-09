// from https://en.scratch-wiki.info/wiki/Argument#Argument_Types
const number = 'Number';
const string = 'String';
const bool = 'Boolean';
const color = 'Colour';
const any = '';

/**
 * Returns a structured type information.
 * @param {string} outputType the output type
 * @param {string[]} inputTypes the expected input types
 * @returns a structured type information
 */
const nary = (outputType, inputTypes) => ({
  outputType,
  expectedArgs: inputTypes.map((type) => ({ type })),
});
const binaryArithmetic = nary(number, [number, number]);
const inequality = nary(bool, [any, any]);
const binaryLogical = nary(bool, [bool, bool]);
const unaryArithmetic = nary(number, [number]);
const numberLeaf = nary(number, []);
const stringLeaf = nary(string, []);
const looksNumberName = nary({
  number: 'Number',
  other: 'String',
}, []);

const expressionBlocks = {
  motion_direction: numberLeaf,
  motion_xposition: numberLeaf,
  motion_yposition: numberLeaf,
  motion_glideto_menu: stringLeaf,
  motion_goto_menu: stringLeaf,
  motion_pointtowards_menu: stringLeaf,
  looks_backdrops: stringLeaf,
  looks_costume: stringLeaf,
  looks_costumenumbername: looksNumberName,
  looks_backdropnumbername: looksNumberName,
  looks_size: numberLeaf,
  sound_volume: numberLeaf,
  sound_sounds_menu: stringLeaf,
  control_create_clone_of_menu: stringLeaf,
  sensing_answer: stringLeaf,
  sensing_username: stringLeaf,
  sensing_touchingobject: nary(bool, [string]),
  sensing_touchingobjectmenu: stringLeaf,
  sensing_touchingcolor: nary(bool, [color]),
  sensing_timer: numberLeaf,
  sensing_of: nary({
    'background #': number,
    'backdrop #': number,
    'backdrop name': string,
    volume: number,
    'x position': number,
    'y position': number,
    direction: number,
    'costume #': number,
    'costume name': string,
    size: number,
    other: any,
  }, [string]),
  sensing_of_object_menu: stringLeaf,
  sensing_mousex: numberLeaf,
  sensing_mousey: numberLeaf,
  sensing_mousedown: nary(bool, []),
  sensing_loudness: numberLeaf,
  sensing_keypressed: nary(bool, [string]),
  sensing_keyoptions: stringLeaf,
  sensing_distanceto: nary(number, [string]),
  sensing_distancetomenu: stringLeaf,
  sensing_dayssince2000: numberLeaf,
  sensing_current: nary(number, [string]),
  sensing_coloristouchingcolor: nary(bool, [color, color]),
  operator_mathop: unaryArithmetic,
  operator_round: unaryArithmetic,
  operator_add: binaryArithmetic,
  operator_subtract: binaryArithmetic,
  operator_divide: binaryArithmetic,
  operator_multiply: binaryArithmetic,
  operator_mod: binaryArithmetic,
  operator_random: binaryArithmetic,
  operator_gt: inequality,
  operator_lt: inequality,
  operator_equals: inequality,
  operator_and: binaryLogical,
  operator_or: binaryLogical,
  operator_not: nary(bool, [bool]),
  operator_join: nary(string, [string, string]),
  operator_letter_of: nary(string, [number, string]),
  operator_length: nary(number, [string]),
  operator_contains: nary(bool, [string, string]),
  data_variable: nary(any, []),
  data_listcontents: nary(string, []), // should have 1 more arg
  data_listcontainsitem: nary(bool, [any]), // should have 1 more arg
  data_lengthoflist: nary(number, []), // should have 1 more arg
  data_itemoflist: nary(any, [number]), // should have 1 more arg
  data_itemnumoflist: nary(any, [any]), // should have 1 more arg
  music_menu_INSTRUMENT: numberLeaf,
  note: numberLeaf,
  music_menu_DRUM: numberLeaf,
  music_getTempo: numberLeaf,
  pen_menu_colorParam: stringLeaf,
  videoSensing_menu_VIDEO_STATE: stringLeaf,
  videoSensing_videoOn: nary(number, [string, string]),
  videoSensing_menu_ATTRIBUTE: stringLeaf,
  videoSensing_menu_SUBJECT: stringLeaf,
  text2speech_menu_languages: stringLeaf,
  text2speech_menu_voices: stringLeaf,
  translate_getTranslate: nary(string, [string, string]),
  translate_menu_languages: stringLeaf,
  translate_getViewerLanguage: stringLeaf,
  makeymakey_menu_SEQUENCE: stringLeaf,
  makeymakey_menu_KEY: stringLeaf,
  microbit_menu_tiltDirectionAny: stringLeaf,
  microbit_menu_touchPins: stringLeaf,
  microbit_menu_gestures: stringLeaf,
  microbit_menu_buttons: stringLeaf,
  microbit_isTilted: nary(bool, [string]),
  microbit_isButtonPressed: nary(bool, [string]),
  microbit_getTiltAngle: nary(number, [string]),
  microbit_menu_tiltDirection: stringLeaf,
  matrix: nary(number, []),
  ev3_menu_sensorPorts: stringLeaf,
  ev3_menu_motorPorts: stringLeaf,
  ev3_getMotorPosition: nary(number, [string]),
  ev3_getDistance: numberLeaf,
  ev3_getBrightness: numberLeaf,
  ev3_buttonPressed: nary(bool, [string]),
  boost_getMotorPosition: nary(number, [string]),
  boost_menu_MOTOR_REPORTER_ID: stringLeaf,
  boost_menu_TILT_DIRECTION_ANY: stringLeaf,
  boost_menu_COLOR: stringLeaf,
  boost_menu_MOTOR_ID: stringLeaf,
  boost_menu_MOTOR_DIRECTION: stringLeaf,
  boost_getTiltAngle: nary(number, [string]),
  boost_menu_TILT_DIRECTION: stringLeaf,
  boost_seeingColor: nary(number, [string]),
  wedo2_getDistance: numberLeaf,
  wedo2_menu_TILT_DIRECTION_ANY: stringLeaf,
  wedo2_menu_OP: stringLeaf,
  wedo2_menu_MOTOR_ID: stringLeaf,
  wedo2_menu_MOTOR_DIRECTION: stringLeaf,
  wedo2_isTilted: nary(bool, [string]),
  wedo2_getTiltAngle: nary(number, [string]),
  wedo2_menu_TILT_DIRECTION: stringLeaf,
  gdxfor_getAcceleration: nary(number, [string]),
  gdxfor_menu_axisOptions: stringLeaf,
  gdxfor_menu_tiltAnyOptions: stringLeaf,
  gdxfor_menu_gestureOptions: stringLeaf,
  gdxfor_menu_pushPullOptions: stringLeaf,
  gdxfor_isTilted: nary(bool, [string]),
  gdxfor_getTilt: nary(number, [string]),
  gdxfor_menu_tiltOptions: stringLeaf,
  gdxfor_getSpinSpeed: nary(number, [string]),
  gdxfor_getForce: numberLeaf,
  gdxfor_isFreeFalling: nary(bool, []),
  argument_reporter_string_number: nary([number, string], []),
  argument_reporter_boolean: nary(bool, []),
};

export default expressionBlocks;
