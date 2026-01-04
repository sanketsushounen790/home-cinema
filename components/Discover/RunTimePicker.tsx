import { useState } from "react";

interface RunTimePickerProps {
  minRunTime: string;
  maxRunTime: string;
  onChange: (min: string, max: string) => void;
}

export default function RunTimePicker({
  minRunTime,
  maxRunTime,
  onChange,
}: RunTimePickerProps) {
  const [min, setMin] = useState(minRunTime);
  const [max, setMax] = useState(maxRunTime);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMin(value);
    onChange(value, max);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMax(value);
    onChange(min, value);
  };

  return (
    // <div className="flex items-center gap-2">
    //   <div className="flex flex-col">
    //     <label className="text-sm font-medium">Min Runtime (min)</label>
    //     <input
    //       type="number"
    //       min={0}
    //       value={min}
    //       onChange={handleMinChange}
    //       className="w-24 px-2 py-1 border rounded focus:outline-none focus:ring focus:ring-blue-300"
    //     />
    //   </div>

    //   <span className="text-gray-500 mt-5">-</span>

    //   <div className="flex flex-col">
    //     <label className="text-sm font-medium">Max Runtime (min)</label>
    //     <input
    //       type="number"
    //       min={0}
    //       value={max}
    //       onChange={handleMaxChange}
    //       className="w-24 px-2 py-1 border rounded focus:outline-none focus:ring focus:ring-blue-300"
    //     />
    //   </div>
    // </div>
    <div className="space-y-2">
      <h3 className="font-semibold">Runtime</h3>

      <div className="flex justify-center items-center gap-3">
        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-500">Min Runtime (min)</label>
          <input
            type="number"
            className="
          w-28 rounded-md border border-gray-300 bg-base-100 px-2 py-1.5
          text-sm shadow-sm
          focus:border-blue-500 focus:ring-2 focus:ring-blue-200
          outline-none transition
        "
            min={0}
            value={min}
            onChange={handleMinChange}
          />
        </div>

        <div className="h-full flex justify-center items-center mt-4 text-gray-500">
          —
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-500">Max Runtime (min)</label>
          <input
            type="number"
            className="
          w-28 rounded-md border border-gray-300 bg-base-100 px-2 py-1.5
          text-sm shadow-sm
          focus:border-blue-500 focus:ring-2 focus:ring-blue-200
          outline-none transition
        "
            min={0}
            value={max}
            onChange={handleMaxChange}
          />
        </div>
      </div>
    </div>
  );
}
