/* eslint-disable no-underscore-dangle */

const data = [
  'motion_direction',
  'motion_yposition',
  'motion_xposition',
  'motion_glideto_menu',
  'motion_goto_menu',
  'motion_pointtowards_menu',
  'looks_backdropnumbername',
  'looks_costume',
  'looks_backdrops',
  'looks_size',
  'looks_costumenumbername',
  'sound_volume',
  'sound_sounds_menu',
  'control_create_clone_of_menu',
  'sensing_answer',
  'sensing_username',
  'sensing_touchingobjectmenu',
  'sensing_timer',
  'sensing_of_object_menu',
  'sensing_mousey',
  'sensing_mousex',
  'sensing_mousedown',
  'sensing_loudness',
  'sensing_keyoptions',
  'sensing_distancetomenu',
  'sensing_dayssince2000',
  'sensing_current',
  'sensing_coloristouchingcolor',
  'operator_add',
  'operator_or',
  'operator_subtract',
  'operator_round',
  'operator_random',
  'operator_not',
  'operator_multiply',
  'operator_mod',
  'operator_mathop',
  'operator_lt',
  'operator_letter_of',
  'operator_length',
  'operator_join',
  'operator_gt',
  'operator_equals',
  'operator_divide',
  'operator_contains',
  'operator_and',
  'data_variable',
  'data_listcontents',
  'data_listcontainsitem',
  'data_lengthoflist',
  'data_itemoflist',
  'data_itemnumoflist',
  'data_insertatlist',
  'music_menu_INSTRUMENT',
  'note',
  'music_menu_DRUM',
  'music_getTempo',
  'pen_menu_colorParam',
  'videoSensing_menu_VIDEO_STATE',
  'videoSensing_videoOn',
  'videoSensing_menu_ATTRIBUTE',
  'videoSensing_menu_SUBJECT',
  'text2speech_menu_languages',
  'text2speech_menu_voices',
  'translate_getTranslate',
  'translate_menu_languages',
  'translate_getViewerLanguage',
  'makeymakey_menu_SEQUENCE',
  'makeymakey_menu_KEY',
  'microbit_menu_tiltDirectionAny',
  'microbit_menu_touchPins',
  'microbit_menu_gestures',
  'microbit_menu_buttons',
  'microbit_isTilted',
  'microbit_isButtonPressed',
  'microbit_getTiltAngle',
  'microbit_menu_tiltDirection',
  'matrix',
  'ev3_menu_sensorPorts',
  'ev3_menu_motorPorts',
  'ev3_getMotorPosition',
  'ev3_getDistance',
  'ev3_getBrightness',
  'ev3_buttonPressed',
  'boost_getMotorPosition',
  'boost_menu_MOTOR_REPORTER_ID',
  'boost_menu_TILT_DIRECTION_ANY',
  'boost_menu_COLOR',
  'boost_menu_MOTOR_ID',
  'boost_menu_MOTOR_DIRECTION',
  'boost_getTiltAngle',
  'boost_menu_TILT_DIRECTION',
  'wedo2_getDistance',
  'wedo2_menu_TILT_DIRECTION_ANY',
  'wedo2_menu_OP',
  'wedo2_menu_MOTOR_ID',
  'wedo2_menu_MOTOR_DIRECTION',
  'wedo2_isTilted',
  'wedo2_getTiltAngle',
  'wedo2_menu_TILT_DIRECTION',
  'gdxfor_getAcceleration',
  'gdxfor_menu_axisOptions',
  'gdxfor_menu_tiltAnyOptions',
  'gdxfor_menu_gestureOptions',
  'gdxfor_menu_pushPullOptions',
  'gdxfor_isTilted',
  'gdxfor_getTilt',
  'gdxfor_menu_tiltOptions',
  'gdxfor_getSpinSpeed',
  'gdxfor_getForce',
  'argument_reporter_string_number',
  'argument_reporter_boolean',
];

// eslint-disable-next-line no-undef
if (Blockly) {
  // eslint-disable-next-line no-undef
  const workspace = Blockly.getMainWorkspace();
  workspace.addChangeListener((event) => {
    if (event.type === 'endDrag') {
      const block = workspace.getBlockById(event.blockId);
      if (!block) return;
      console.log(block.type);
      if (data.includes(block.type)
        && (block.parentBlock_ === null || !data.includes(block.parentBlock_.type))) {
        if (block.svgGroup_.querySelector(':scope > .exp') === null) {
          const svgns = 'http://www.w3.org/2000/svg';
          const svgButton = document.createElementNS(svgns, 'rect');
          svgButton.classList.add('exp');
          svgButton.setAttribute('data-block', event.blockId);
          svgButton.setAttribute('x', '-10');
          svgButton.setAttribute('y', '-10');
          svgButton.setAttribute('width', '30');
          svgButton.setAttribute('height', '30');
          svgButton.setAttribute('fill', '#5cceee');
          svgButton.addEventListener('mousedown', (ev) => {
            const blockId = ev.target.dataset.block;
            const b = workspace.getBlockById(blockId).toString();
            window.postMessage(
              {
                direction: 'from-page-script',
                message: b,
              },
              '*',
            );
          });
          block.svgGroup_.append(svgButton);
        }
      } else if (block.svgGroup_.querySelector(':scope > .exp') !== null) {
        block.svgGroup_.removeChild(block.svgGroup_.querySelector(':scope > .exp'));
      }
    }
  });
}
