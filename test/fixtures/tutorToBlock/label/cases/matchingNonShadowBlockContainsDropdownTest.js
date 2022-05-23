const test = {
  it: 'label diagram of block (current month): matching block with dropdown',
  args: [
    {
      nodes: [
        {
          nodePlug: {
            valA: 0,
            valB: 0,
          },
          content: [
            {
              type: 'other',
              content: 'current month',
            },
          ],
          type: 'Number',
          value: '2022',
        },
      ],
      edges: [],
      root: {
        nodePlug: {
          valA: 0,
          valB: 0,
        },
        content: [
          {
            type: 'other',
            content: 'current month',
          },
        ],
        type: 'Number',
        value: '2022',
      },
    },
  ],
  expected: {
    nodes: [
      {
        nodePlug: {
          valA: 0,
          valB: 0,
        },
        content: [
          {
            type: 'other',
            content: 'current month',
          },
        ],
        type: 'Number',
        value: '2022',
      },
    ],
    edges: [],
    root: {
      nodePlug: {
        valA: 0,
        valB: 0,
      },
      content: [
        {
          type: 'other',
          content: 'current month',
        },
      ],
      type: 'Number',
      value: '2022',
      opcode: [
        [
          'sensing_current',
          'month',
        ],
        [
          'event_broadcast_menu',
          null,
        ],
        [
          'looks_backdrops',
          null,
        ],
        [
          'looks_costume',
          null,
        ],
        [
          'math_angle',
          null,
        ],
        [
          'math_integer',
          null,
        ],
        [
          'math_number',
          null,
        ],
        [
          'motion_glideto_menu',
          null,
        ],
        [
          'motion_goto_menu',
          null,
        ],
        [
          'motion_pointtowards_menu',
          null,
        ],
        [
          'sound_sounds_menu',
          null,
        ],
        [
          'text',
          null,
        ],
        [
          'colour_picker',
          null,
        ],
        [
          'control_create_clone_of_menu',
          null,
        ],
        [
          'math_positive_number',
          null,
        ],
        [
          'math_whole_number',
          null,
        ],
        [
          'sensing_distancetomenu',
          null,
        ],
        [
          'sensing_keyoptions',
          null,
        ],
        [
          'sensing_of_object_menu',
          null,
        ],
        [
          'sensing_touchingobjectmenu',
          null,
        ],
        [
          'music_menu_DRUM',
          null,
        ],
        [
          'music_menu_INSTRUMENT',
          null,
        ],
        [
          'note',
          null,
        ],
        [
          'pen_menu_colorParam',
          null,
        ],
        [
          'text2speech_menu_languages',
          null,
        ],
        [
          'text2speech_menu_voices',
          null,
        ],
        [
          'videoSensing_menu_ATTRIBUTE',
          null,
        ],
        [
          'videoSensing_menu_SUBJECT',
          null,
        ],
        [
          'videoSensing_menu_VIDEO_STATE',
          null,
        ],
        [
          'boost_menu_COLOR',
          null,
        ],
        [
          'boost_menu_MOTOR_DIRECTION',
          null,
        ],
        [
          'boost_menu_MOTOR_ID',
          null,
        ],
        [
          'boost_menu_MOTOR_REPORTER_ID',
          null,
        ],
        [
          'boost_menu_TILT_DIRECTION',
          null,
        ],
        [
          'boost_menu_TILT_DIRECTION_ANY',
          null,
        ],
        [
          'ev3_menu_sensorPorts',
          null,
        ],
        [
          'ev3_menu_motorPorts',
          null,
        ],
        [
          'gdxfor_menu_axisOptions',
          null,
        ],
        [
          'gdxfor_menu_gestureOptions',
          null,
        ],
        [
          'gdxfor_menu_pushPullOptions',
          null,
        ],
        [
          'gdxfor_menu_tiltAnyOptions',
          null,
        ],
        [
          'gdxfor_menu_tiltOptions',
          null,
        ],
        [
          'makeymakey_menu_KEY',
          null,
        ],
        [
          'makeymakey_menu_SEQUENCE',
          null,
        ],
        [
          'matrix',
          null,
        ],
        [
          'microbit_menu_buttons',
          null,
        ],
        [
          'microbit_menu_gestures',
          null,
        ],
        [
          'microbit_menu_tiltDirection',
          null,
        ],
        [
          'microbit_menu_tiltDirectionAny',
          null,
        ],
        [
          'microbit_menu_touchPins',
          null,
        ],
        [
          'translate_menu_languages',
          null,
        ],
        [
          'wedo2_menu_MOTOR_DIRECTION',
          null,
        ],
        [
          'wedo2_menu_MOTOR_ID',
          null,
        ],
        [
          'wedo2_menu_OP',
          null,
        ],
        [
          'wedo2_menu_TILT_DIRECTION',
          null,
        ],
        [
          'wedo2_menu_TILT_DIRECTION_ANY',
          null,
        ],
        [
          'argument_reporter_boolean',
          null,
        ],
        [
          'argument_reporter_string_number',
          null,
        ],
      ],
    },
  },
};

export default test;
