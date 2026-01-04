import { useState, useRef } from "react";

interface SingleRangerProps {
  value: number | null;
  setValue: (val: number) => void;
}

export default function SingleRanger({ value, setValue }: SingleRangerProps) {
  //const [value, setValue] = useState(100);
  const [dragging, setDragging] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  const maxValue = 500;

  const handleDrag = (e: MouseEvent) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    let newValue = (x / rect.width) * maxValue;
    newValue = Math.max(0, Math.min(maxValue, newValue));
    setValue(Math.round(newValue));
  };

  const startDrag = (e: React.MouseEvent) => {
    e.preventDefault();
    setDragging(true);

    const move = (ev: MouseEvent) => handleDrag(ev);
    const up = () => {
      setDragging(false);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
  };

  // tạo vạch chia
  const ticks = [];
  const tickCount = 5;
  for (let i = 0; i <= tickCount; i++) {
    ticks.push(Math.round((maxValue / tickCount) * i));
  }

  return (
    <div className="w-full max-w-xl">
      <div className="flex justify-start items-center gap-2">
        <p className="font-semibold mb-2">Minimum User Votes:</p>
        <p className="font-semibold mb-2">{value}</p>
      </div>
      <div
        className="relative h-16 flex items-center select-none"
        ref={sliderRef}
      >
        {/* TRACK */}
        <div className="absolute left-0 right-0 top-6 h-2 bg-gray-300 rounded-full z-0"></div>

        {/* ACTIVE TRACK */}
        <div
          className="absolute h-2 bg-blue-400 rounded-full top-6 z-0"
          style={{ width: `${((value as number) / maxValue) * 100}%` }}
        ></div>

        {/* TICKS */}
        {ticks.map((tick, index) => (
          <div
            key={index}
            className="absolute w-[1px] bg-gray-500"
            style={{
              left: `${(tick / maxValue) * 100}%`,
              top: "38px", // đặt dưới track
              height: "12px",
              transform: "translateX(-0.5px)",
              zIndex: 10,
            }}
          ></div>
        ))}

        {/* THUMB */}
        <div
          className="absolute h-5 w-5 bg-blue-400 border-3 border-white rounded-full shadow cursor-pointer z-20"
          style={{
            left: `calc(${((value as number) / maxValue) * 100}% - 10px)`,
            top: "43%",
            transform: "translateY(-50%)",
          }}
          onMouseDown={startDrag}
        >
          {/* TOOLTIP */}
          {dragging && (
            <div className="absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-1 bg-blue-500 text-white text-xs rounded">
              {value}
            </div>
          )}
        </div>
      </div>

      {/* MIN/MAX LABELS */}
      <div className="flex justify-between mt-[-10px] text-sm">
        <span className="ml-[-5px]">0</span>
        <span className="mr-[-10px]">{maxValue}</span>
      </div>
    </div>
  );
}
