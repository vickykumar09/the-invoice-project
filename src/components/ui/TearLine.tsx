import React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

type TearLineProps = {
  color?: string;
  height?: number;
  strokeWidth?: number;
};

export default function TearLine({
  color = '#ccc',
  height = 12,
  strokeWidth = 1,
}: TearLineProps) {
  return (
    <View style={{ width: '100%', overflow: 'hidden' }}>
      <Svg width="100%" height={height} viewBox="0 0 100 10" preserveAspectRatio="none">
        <Path
          d="
            M0 5 
            L2.5 0 L5 5 
            L7.5 0 L10 5 
            L12.5 0 L15 5 
            L17.5 0 L20 5 
            L22.5 0 L25 5 
            L27.5 0 L30 5 
            L32.5 0 L35 5 
            L37.5 0 L40 5 
            L42.5 0 L45 5 
            L47.5 0 L50 5 
            L52.5 0 L55 5 
            L57.5 0 L60 5 
            L62.5 0 L65 5 
            L67.5 0 L70 5 
            L72.5 0 L75 5 
            L77.5 0 L80 5 
            L82.5 0 L85 5 
            L87.5 0 L90 5 
            L92.5 0 L95 5 
            L97.5 0 L100 5
          "
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
        />
      </Svg>
    </View>
  );
}