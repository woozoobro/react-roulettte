import React from "react";
import { Wheel } from "react-custom-roulette";
import { WheelData } from 'react-custom-roulette/dist/components/Wheel/types';

type RouletteWheelProps = {
  data: WheelData[];
  mustStartSpinning: boolean;
  prizeNumber: number;
  onStopSpinning: () => void;
};

const RouletteWheel: React.FC<RouletteWheelProps> = ({ data, mustStartSpinning, prizeNumber, onStopSpinning }) => {
  return (
    <Wheel 
      mustStartSpinning={mustStartSpinning}
      prizeNumber={prizeNumber}
      data={data}
      backgroundColors={['#E46E80', '#F18575', "#FBC85B", "#32B9C1", "#77b2ff", "#8579EF"]}
      textColors={['#ffffff']}
      onStopSpinning={onStopSpinning}      
      outerBorderWidth={4}
      outerBorderColor="#CACFD9"
      radiusLineColor=""
      spinDuration={0.5}
    />
  )
}

export default RouletteWheel;

