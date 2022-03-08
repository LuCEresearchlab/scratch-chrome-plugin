import React from 'react';

function ETLogo() {
  return (
    <g>
      <circle
        cx="0"
        cy="0"
        r="15"
        style={{
          stroke: 'black',
          strokeWidth: '1px',
          fill: 'white',
        }}
      />
      <text
        x="-8"
        y="8"
      >
        <tspan
          style={{
            fontStyle: 'normal',
            fontVariant: 'normal',
            fontWeight: 'bold',
            fontStretch: 'normal',
            fontSize: '30px',
            lineHeight: 1.25,
            fontFamily: 'PT Serif',
            fill: '#2fba2f',
            fillOpacity: 1,
            strokeWidth: '0.769572px',
          }}
        >
          e
        </tspan>
      </text>
    </g>
  );
}

export default ETLogo;
