import extensionsMsgs from './locales/extensions-msgs.js';
import { getBlockly } from '../../content/utils/stateHandler.js';

export const holePlaceholderRegex = /{{[1-9]}}/g;
export const variablePlaceholder = '{{v}}';
export const listPlaceholder = '{{l}}';
export const shadowPlaceholder = '{{s}}';
export const argumentPlaceholder = '{{a}}';
export const dropdownPlaceholder = '{{d}}';

const holePlaceholder = (i) => `{{${i}}}`;

export const opcodesContainingEmpties = [
  'operator_and',
  'operator_or',
  'operator_not',
];

/**
 * Maps an expression opcode to the text of the block in English.
 */
const typeToMsgEn = {
  motion_direction: 'direction',
  motion_xposition: 'x position',
  motion_yposition: 'y position',
  looks_costumenumbername: `costume ${dropdownPlaceholder}`,
  looks_backdropnumbername: `backdrop ${dropdownPlaceholder}`,
  looks_size: 'size',
  sound_volume: 'volume',
  sensing_answer: 'answer',
  sensing_username: 'username',
  sensing_touchingobject: `touching ${holePlaceholder(1)}?`,
  sensing_touchingcolor: `touching color ${holePlaceholder(1)}?`,
  sensing_timer: 'timer',
  sensing_of: `${dropdownPlaceholder} of ${holePlaceholder(1)}`,
  sensing_mousex: 'mouse x',
  sensing_mousey: 'mouse y',
  sensing_mousedown: 'mouse down?',
  sensing_loudness: 'loudness',
  sensing_keypressed: `key ${holePlaceholder(1)} pressed?`,
  sensing_distanceto: `distance to ${holePlaceholder(1)}`,
  sensing_dayssince2000: 'days since 2000',
  sensing_current: `current ${dropdownPlaceholder}`,
  sensing_coloristouchingcolor: `color ${holePlaceholder(1)} is touching ${holePlaceholder(2)}?`,
  operator_mathop: `${dropdownPlaceholder} of ${holePlaceholder(1)}`,
  operator_round: `round ${holePlaceholder(1)}`,
  operator_add: `${holePlaceholder(1)} + ${holePlaceholder(2)}`,
  operator_subtract: `${holePlaceholder(1)} - ${holePlaceholder(2)}`,
  operator_divide: `${holePlaceholder(1)} / ${holePlaceholder(2)}`,
  operator_multiply: `${holePlaceholder(1)} * ${holePlaceholder(2)}`,
  operator_mod: `${holePlaceholder(1)} mod ${holePlaceholder(2)}`,
  operator_random: `pick random ${holePlaceholder(1)} to ${holePlaceholder(2)}`,
  operator_gt: `${holePlaceholder(1)} > ${holePlaceholder(2)}`,
  operator_lt: `${holePlaceholder(1)} < ${holePlaceholder(2)}`,
  operator_equals: `${holePlaceholder(1)} = ${holePlaceholder(2)}`,
  operator_and: `${holePlaceholder(1)} and ${holePlaceholder(2)}`,
  operator_or: `${holePlaceholder(1)} or ${holePlaceholder(2)}`,
  operator_not: `not ${holePlaceholder(1)}`,
  operator_join: `join ${holePlaceholder(1)} ${holePlaceholder(2)}`,
  operator_letter_of: `letter ${holePlaceholder(1)} of ${holePlaceholder(2)}`,
  operator_length: `length of ${holePlaceholder(1)}`,
  operator_contains: `${holePlaceholder(1)} contains ${holePlaceholder(2)}?`,
  data_variable: variablePlaceholder,
  data_listcontents: listPlaceholder,
  data_listcontainsitem: `${dropdownPlaceholder} contains ${holePlaceholder(1)}?`,
  data_lengthoflist: `length of ${dropdownPlaceholder}`,
  data_itemoflist: `item ${holePlaceholder(1)} of ${dropdownPlaceholder}`,
  data_itemnumoflist: `item # of ${holePlaceholder(1)} of ${dropdownPlaceholder}`,
  music_getTempo: 'tempo',
  videoSensing_videoOn: `video ${holePlaceholder(1)} on ${holePlaceholder(2)}`,
  translate_getTranslate: `translate ${holePlaceholder(1)} to ${holePlaceholder(2)}`,
  translate_getViewerLanguage: 'language',
  microbit_isTilted: `tilted ${holePlaceholder(1)}?`,
  microbit_isButtonPressed: `${holePlaceholder(1)} button pressed?`,
  microbit_getTiltAngle: `tilt angle ${holePlaceholder(1)}`,
  ev3_getMotorPosition: `motor ${holePlaceholder(1)} position`,
  ev3_getDistance: 'distance',
  ev3_getBrightness: 'brightness',
  ev3_buttonPressed: `button ${holePlaceholder(1)} pressed?`,
  boost_getMotorPosition: `motor ${holePlaceholder(1)} position`,
  boost_getTiltAngle: `tile angle ${holePlaceholder(1)}`,
  boost_seeingColor: `seeing ${holePlaceholder(1)} brick?`,
  wedo2_getDistance: 'distance',
  wedo2_isTilted: `tilted ${holePlaceholder(1)}?`,
  wedo2_getTiltAngle: `tilt angle ${holePlaceholder(1)}`,
  gdxfor_getAcceleration: `acceleration ${holePlaceholder(1)}`,
  gdxfor_isTilted: `tilted ${holePlaceholder(1)}?`,
  gdxfor_getTilt: `tilt angle ${holePlaceholder(1)}`,
  gdxfor_getSpinSpeed: `spin speed ${holePlaceholder(1)}`,
  gdxfor_getForce: 'force',
  gdxfor_isFreeFalling: 'falling?',
  // shadows
  event_broadcast_menu: shadowPlaceholder,
  looks_backdrops: shadowPlaceholder,
  looks_costume: shadowPlaceholder,
  math_angle: shadowPlaceholder,
  math_integer: shadowPlaceholder,
  math_number: shadowPlaceholder,
  motion_glideto_menu: shadowPlaceholder,
  motion_goto_menu: shadowPlaceholder,
  motion_pointtowards_menu: shadowPlaceholder,
  sound_sounds_menu: shadowPlaceholder,
  text: shadowPlaceholder,
  colour_picker: shadowPlaceholder,
  control_create_clone_of_menu: shadowPlaceholder,
  math_positive_number: shadowPlaceholder,
  math_whole_number: shadowPlaceholder,
  sensing_distancetomenu: shadowPlaceholder,
  sensing_keyoptions: shadowPlaceholder,
  sensing_of_object_menu: shadowPlaceholder,
  sensing_touchingobjectmenu: shadowPlaceholder,
  music_menu_DRUM: shadowPlaceholder,
  music_menu_INSTRUMENT: shadowPlaceholder,
  note: shadowPlaceholder,
  pen_menu_colorParam: shadowPlaceholder,
  text2speech_menu_languages: shadowPlaceholder,
  text2speech_menu_voices: shadowPlaceholder,
  videoSensing_menu_ATTRIBUTE: shadowPlaceholder,
  videoSensing_menu_SUBJECT: shadowPlaceholder,
  videoSensing_menu_VIDEO_STATE: shadowPlaceholder,
  boost_menu_COLOR: shadowPlaceholder,
  boost_menu_MOTOR_DIRECTION: shadowPlaceholder,
  boost_menu_MOTOR_ID: shadowPlaceholder,
  boost_menu_MOTOR_REPORTER_ID: shadowPlaceholder,
  boost_menu_TILT_DIRECTION: shadowPlaceholder,
  boost_menu_TILT_DIRECTION_ANY: shadowPlaceholder,
  ev3_menu_sensorPorts: shadowPlaceholder,
  ev3_menu_motorPorts: shadowPlaceholder,
  gdxfor_menu_axisOptions: shadowPlaceholder,
  gdxfor_menu_gestureOptions: shadowPlaceholder,
  gdxfor_menu_pushPullOptions: shadowPlaceholder,
  gdxfor_menu_tiltAnyOptions: shadowPlaceholder,
  gdxfor_menu_tiltOptions: shadowPlaceholder,
  makeymakey_menu_KEY: shadowPlaceholder,
  makeymakey_menu_SEQUENCE: shadowPlaceholder,
  matrix: shadowPlaceholder,
  microbit_menu_buttons: shadowPlaceholder,
  microbit_menu_gestures: shadowPlaceholder,
  microbit_menu_tiltDirection: shadowPlaceholder,
  microbit_menu_tiltDirectionAny: shadowPlaceholder,
  microbit_menu_touchPins: shadowPlaceholder,
  translate_menu_languages: shadowPlaceholder,
  wedo2_menu_MOTOR_DIRECTION: shadowPlaceholder,
  wedo2_menu_MOTOR_ID: shadowPlaceholder,
  wedo2_menu_OP: shadowPlaceholder,
  wedo2_menu_TILT_DIRECTION: shadowPlaceholder,
  wedo2_menu_TILT_DIRECTION_ANY: shadowPlaceholder,
  // pseudo-shadows (sometimes not shadow) but always not shadow inside expressions
  argument_reporter_boolean: argumentPlaceholder,
  argument_reporter_string_number: argumentPlaceholder,
};

const typeToMsg = {};

/**
 * For each locale, creates the mapping from an expression opcode to the text of the block.
 */
function setupTypeToMsg(blockly) {
  Object.entries(blockly.ScratchMsgs.locales).forEach((e1) => {
    const [locale, info] = e1;
    if (locale === 'en') {
      typeToMsg[locale] = typeToMsgEn;
      return;
    }
    typeToMsg[locale] = {};
    Object.entries(typeToMsgEn).forEach((e2) => {
      const [type, msg] = e2;
      if (
        [
          shadowPlaceholder,
          variablePlaceholder,
          argumentPlaceholder,
          listPlaceholder,
        ].includes(msg)
      ) {
        typeToMsg[locale][type] = msg;
        return;
      }
      let newValue = info[type
        .replace('operator', 'operators')
        .replace('letter_of', 'letterof')
        .toUpperCase()];
      if (newValue) {
        newValue = newValue.replaceAll(/%([1-9])/g, '{{$1}}');
      } else {
        newValue = extensionsMsgs[locale][type
          .replaceAll('_', '.')
          .replace('getTranslate', 'translateBlock')
          .replace('getViewerLanguage', 'viewerLanguage')
          .replace('microbit.getTiltAngle', 'microbit.tiltAngle')
          .replace('Speed', '')];
        let count = 0;
        newValue = newValue.replaceAll(/\[[_A-Z]+\]/g, () => {
          count += 1;
          return `{{${count}}}`;
        });
      }
      if (msg.includes(dropdownPlaceholder)) {
        const i = msg.indexOf('{{1}}');
        if (i >= 0) {
          if (msg.indexOf(dropdownPlaceholder) < i) {
            newValue = newValue.replace('{{1}}', dropdownPlaceholder);
            newValue = newValue.replace('{{2}}', '{{1}}');
          } else {
            newValue = newValue.replace('{{2}}', dropdownPlaceholder);
          }
        } else {
          newValue = newValue.replace('{{1}}', dropdownPlaceholder);
        }
      }
      typeToMsg[locale][type] = newValue;
    });
  });
}

if (process.env.NODE_ENV === 'testing') {
  typeToMsg.en = typeToMsgEn;
} else {
  /*
   * this could be done before building;
   * however, keeping it this way makes it easier
   * to adapt to new changes in extensions-msgs.js in scratch-l10n,
   * updating ./locales/extensions-msgs.js as needed.
   */
  const blockly = getBlockly();
  if (blockly) setupTypeToMsg(blockly);
}

export default typeToMsg;
