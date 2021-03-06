// from https://en.scratch-wiki.info/wiki/Argument#Argument_Types
export const number = 'Number';
export const string = 'String';
export const bool = 'Boolean';
export const color = 'Colour';
const any = [number, string, bool, color];
const other = 'Other'; // non-expression argument type

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

/**
 * Maps opcodes to output types and child types.
 */
export const expressionBlocks = {
  motion_direction: numberLeaf,
  motion_xposition: numberLeaf,
  motion_yposition: numberLeaf,
  looks_costumenumbername: nary({ number, other: string }, []),
  looks_backdropnumbername: nary({ number, other: string }, []),
  looks_size: numberLeaf,
  sound_volume: numberLeaf,
  sensing_answer: stringLeaf,
  sensing_username: stringLeaf,
  sensing_touchingobject: nary(bool, [string]),
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
  sensing_mousex: numberLeaf,
  sensing_mousey: numberLeaf,
  sensing_mousedown: nary(bool, []),
  sensing_loudness: numberLeaf,
  sensing_keypressed: nary(bool, [string]),
  sensing_distanceto: nary(number, [string]),
  sensing_dayssince2000: numberLeaf,
  sensing_current: nary(number, []),
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
  music_getTempo: numberLeaf,
  videoSensing_videoOn: nary(number, [string, string]),
  translate_getTranslate: nary(string, [string, string]),
  translate_getViewerLanguage: stringLeaf,
  microbit_isTilted: nary(bool, [string]),
  microbit_isButtonPressed: nary(bool, [string]),
  microbit_getTiltAngle: nary(number, [string]),
  ev3_getMotorPosition: nary(number, [string]),
  ev3_getDistance: numberLeaf,
  ev3_getBrightness: numberLeaf,
  ev3_buttonPressed: nary(bool, [string]),
  boost_getMotorPosition: nary(number, [string]),
  boost_getTiltAngle: nary(number, [string]),
  boost_seeingColor: nary(number, [string]),
  wedo2_getDistance: numberLeaf,
  wedo2_isTilted: nary(bool, [string]),
  wedo2_getTiltAngle: nary(number, [string]),
  gdxfor_getAcceleration: nary(number, [string]),
  gdxfor_isTilted: nary(bool, [string]),
  gdxfor_getTilt: nary(number, [string]),
  gdxfor_getSpinSpeed: nary(number, [string]),
  gdxfor_getForce: numberLeaf,
  gdxfor_isFreeFalling: nary(bool, []),
  // shadows
  event_broadcast_menu: stringLeaf,
  looks_backdrops: stringLeaf,
  looks_costume: stringLeaf,
  math_angle: numberLeaf,
  math_integer: numberLeaf,
  math_number: numberLeaf,
  motion_glideto_menu: stringLeaf,
  motion_goto_menu: stringLeaf,
  motion_pointtowards_menu: stringLeaf,
  sound_sounds_menu: stringLeaf,
  text: stringLeaf,
  colour_picker: nary(color, []),
  control_create_clone_of_menu: stringLeaf,
  math_positive_number: numberLeaf,
  math_whole_number: numberLeaf,
  sensing_distancetomenu: stringLeaf,
  sensing_keyoptions: stringLeaf,
  sensing_of_object_menu: stringLeaf,
  sensing_touchingobjectmenu: stringLeaf,
  music_menu_DRUM: numberLeaf,
  music_menu_INSTRUMENT: numberLeaf,
  note: numberLeaf,
  pen_menu_colorParam: stringLeaf,
  text2speech_menu_languages: stringLeaf,
  text2speech_menu_voices: stringLeaf,
  videoSensing_menu_ATTRIBUTE: stringLeaf,
  videoSensing_menu_SUBJECT: stringLeaf,
  videoSensing_menu_VIDEO_STATE: stringLeaf,
  boost_menu_COLOR: stringLeaf,
  boost_menu_MOTOR_DIRECTION: stringLeaf,
  boost_menu_MOTOR_ID: stringLeaf,
  boost_menu_MOTOR_REPORTER_ID: stringLeaf,
  boost_menu_TILT_DIRECTION: stringLeaf,
  boost_menu_TILT_DIRECTION_ANY: stringLeaf,
  ev3_menu_sensorPorts: stringLeaf,
  ev3_menu_motorPorts: stringLeaf,
  gdxfor_menu_axisOptions: stringLeaf,
  gdxfor_menu_gestureOptions: stringLeaf,
  gdxfor_menu_pushPullOptions: stringLeaf,
  gdxfor_menu_tiltAnyOptions: stringLeaf,
  gdxfor_menu_tiltOptions: stringLeaf,
  makeymakey_menu_KEY: stringLeaf,
  makeymakey_menu_SEQUENCE: stringLeaf,
  matrix: numberLeaf,
  microbit_menu_buttons: stringLeaf,
  microbit_menu_gestures: stringLeaf,
  microbit_menu_tiltDirection: stringLeaf,
  microbit_menu_tiltDirectionAny: stringLeaf,
  microbit_menu_touchPins: stringLeaf,
  translate_menu_languages: stringLeaf,
  wedo2_menu_MOTOR_DIRECTION: stringLeaf,
  wedo2_menu_MOTOR_ID: stringLeaf,
  wedo2_menu_OP: stringLeaf,
  wedo2_menu_TILT_DIRECTION: stringLeaf,
  wedo2_menu_TILT_DIRECTION_ANY: stringLeaf,
  // pseudo-shadows (sometimes not shadow)
  argument_reporter_string_number: nary([number, string], []), // TODO expression?
  argument_reporter_boolean: nary(bool, []), // TODO expression?
  // imaginary block (ex. empty holes in 'and' block)
  empty: nary(bool, []),
};

/**
 * Maps opcode to child types.
 */
export const nonExpressionBlocks = {
  motion_movesteps: [number],
  motion_turnright: [number],
  motion_turnleft: [number],
  motion_goto: [string],
  motion_gotoxy: [number, number],
  motion_glideto: [number, string],
  motion_glidesecstoxy: [number, number, number],
  motion_pointindirection: [number],
  motion_pointtowards: [string],
  motion_changexby: [number],
  motion_setx: [number],
  motion_changeyby: [number],
  motion_sety: [number],
  motion_ifonedgebounce: [],
  motion_setrotationstyle: [],
  looks_sayforsecs: [string, number],
  looks_say: [string],
  looks_thinkforsecs: [string, number],
  looks_think: [string],
  looks_switchcostumeto: [string],
  looks_nextcostume: [],
  looks_switchbackdropto: [string],
  looks_nextbackdrop: [],
  looks_changesizeby: [number],
  looks_setsizeto: [number],
  looks_changeeffectby: [number],
  looks_seteffectto: [number],
  looks_cleargraphiceffects: [],
  looks_show: [],
  looks_hide: [],
  looks_gotofrontback: [],
  looks_goforwardbackwardlayers: [number],
  sound_playuntildone: [string],
  sound_play: [string],
  sound_stopallsounds: [],
  sound_changeeffectby: [number],
  sound_seteffectto: [number],
  sound_cleareffects: [],
  sound_changevolumeby: [number],
  sound_setvolumeto: [number],
  event_whenflagclicked: [],
  event_whenkeypressed: [],
  event_whenthisspriteclicked: [],
  event_whenbackdropswitchesto: [],
  event_whengreaterthan: [number],
  event_whenbroadcastreceived: [],
  event_broadcast: [string],
  event_broadcastandwait: [string],
  control_wait: [number],
  control_repeat: [number, other],
  control_forever: [other],
  control_if: [bool, other],
  control_if_else: [bool, other, other],
  control_wait_until: [bool],
  control_repeat_until: [bool, other],
  control_stop: [],
  control_start_as_clone: [],
  control_create_clone_of: [string],
  control_delete_this_clone: [],
  sensing_askandwait: [string],
  sensing_setdragmode: [],
  sensing_resettimer: [],
  data_setvariableto: [any],
  data_changevariableby: [number],
  data_showvariable: [],
  data_hidevariable: [],
  data_addtolist: [any],
  data_deleteoflist: [number],
  data_deletealloflist: [],
  data_insertatlist: [any, number],
  data_replaceitemoflist: [number, any],
  data_showlist: [],
  data_hidelist: [],
  procedures_call: null, // varies
  music_playDrumForBeats: [number, number],
  music_restForBeats: [number],
  music_playNoteForBeats: [number, number],
  music_setInstrument: [number],
  music_setTempo: [number],
  music_changeTempo: [number],
  pen_clear: [],
  pen_stamp: [],
  pen_penDown: [],
  pen_penUp: [],
  pen_setPenColorToColor: [color],
  pen_changePenColorParamBy: [string, number],
  pen_setPenColorParamTo: [string, number],
  pen_changePenSizeBy: [number],
  pen_setPenSizeTo: [number],
  videoSensing_whenMotionGreaterThan: [number],
  videoSensing_videoOn: [string, string],
  videoSensing_videoToggle: [string],
  videoSensing_setVideoTransparency: [number],
  text2speech_speakAndWait: [string],
  text2speech_setVoice: [string],
  text2speech_setLanguage: [string],
  makeymakey_whenMakeyKeyPressed: [string],
  makeymakey_whenCodePressed: [string],
  microbit_whenButtonPressed: [string],
  microbit_whenGesture: [string],
  microbit_displaySymbol: [number],
  microbit_displayText: [string],
  microbit_displayClear: [],
  microbit_whenTilted: [string],
  microbit_whenPinConnected: [string],
  ev3_motorTurnClockwise: [string, number],
  ev3_motorTurnCounterClockwise: [string, number],
  ev3_motorSetPower: [string, number],
  ev3_whenButtonPressed: [string],
  ev3_whenDistanceLessThan: [number],
  ev3_whenBrightnessLessThan: [number],
  ev3_beep: [number, number],
  boost_motorOnFor: [string, number],
  boost_motorOnForRotation: [string, number],
  boost_motorOn: [string],
  boost_motorOff: [string],
  boost_setMotorPower: [string, number],
  boost_setMotorDirection: [string, string],
  boost_whenColor: [string],
  boost_whenTilted: [string],
  boost_setLightHue: [number],
  wedo2_motorOnFor: [string, number],
  wedo2_motorOn: [string],
  wedo2_motorOff: [string],
  wedo2_startMotorPower: [string, number],
  wedo2_setMotorDirection: [string, string],
  wedo2_setLightHue: [number],
  wedo2_whenDistance: [string, number],
  wedo2_whenTilted: [string],
  gdxfor_whenGesture: [string],
  gdxfor_whenForcePushedOrPulled: [string],
  gdxfor_whenTilted: [string],
  // shadows
  procedures_prototype: null, // varies
};
