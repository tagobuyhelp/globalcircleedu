import React from 'react';

interface RangeSliderProps {
  min: number;
  max: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
  step?: number;
  label?: string;
}

export const RangeSlider: React.FC<RangeSliderProps> = ({
  min,
  max,
  value,
  onChange,
  step = 1,
  label,
}) => {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}
      <div className="flex items-center space-x-4">
        <input
          type="range"
          min={min}
          max={max}
          value={value[0]}
          onChange={(e) => onChange([Number(e.target.value), value[1]])}
          step={step}
          className="w-full"
        />
        <input
          type="range"
          min={min}
          max={max}
          value={value[1]}
          onChange={(e) => onChange([value[0], Number(e.target.value)])}
          step={step}
          className="w-full"
        />
      </div>
      <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
        <span>{value[0]}</span>
        <span>{value[1]}</span>
      </div>
    </div>
  );
};