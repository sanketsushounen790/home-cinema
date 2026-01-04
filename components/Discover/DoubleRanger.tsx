import { useState, useRef } from "react";

interface DoubleRanger {
  min: number | null;
  setMin: (val: number) => void;
  max: number | null;
  setMax: (val: number) => void;
}

export default function DoubleRanger({
  min,
  setMin,
  max,
  setMax,
}: DoubleRanger) {
  // const [min, setMin] = useState(2);
  // const [max, setMax] = useState(8);
  const [draggingThumb, setDraggingThumb] = useState<"min" | "max" | null>(
    null
  );

  const sliderRef = useRef<HTMLDivElement>(null);

  const maxValue = 10;

  const handleDrag = (type: "min" | "max", e: MouseEvent) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    let value = (x / rect.width) * maxValue; // maxValue = 10
    value = Math.max(0, Math.min(maxValue, value));

    if (min === max && max === 10) {
      // chỉ khi min = max = 10
      if (value < 10) {
        setMin(Number(value.toFixed(1)));
        setMax(Number(value.toFixed(1)));
      }
      // nếu value >= 10, không làm gì → không cho kéo lên
      return;
    }

    // bình thường
    if (type === "min")
      setMin(Number(Math.min(value, max as number).toFixed(1)));
    else setMax(Number(Math.max(value, min as number).toFixed(1)));
  };

  const startDrag = (type: "min" | "max") => (e: React.MouseEvent) => {
    e.preventDefault();
    setDraggingThumb(type);

    const move = (ev: MouseEvent) => handleDrag(type, ev);
    const up = () => {
      setDraggingThumb(null);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
  };

  // ticks
  const tickCount = 10; // 0–10 chia 10 tick
  const ticks = Array.from({ length: tickCount + 1 }, (_, i) => i);

  // active track từ nhỏ đến lớn
  const left = Math.min(min as number, max as number);
  const right = Math.max(min as number, max as number);

  return (
    <div className="w-full">
      <div className="flex justify-start items-center gap-2">
        <p className="font-semibold">User Score:</p>
        <p className="font-semibold">{min}</p>
        <p className="font-semibold">⎯</p>
        <p className="font-semibold">{max}</p>
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
          style={{
            left: `${(left / maxValue) * 100}%`,
            right: `${100 - (right / maxValue) * 100}%`,
          }}
        ></div>

        {/* TICKS */}
        {ticks.map((tick) => (
          <div
            key={tick}
            className="absolute w-[1px] bg-gray-500"
            style={{
              left: `${(tick / maxValue) * 100}%`,
              top: "38px",
              height: "12px",
              transform: "translateX(-0.5px)",
              zIndex: 10,
            }}
          ></div>
        ))}

        {/* THUMB MIN */}
        <div
          className="absolute h-5 w-5 bg-blue-400 border-3 border-white rounded-full shadow cursor-pointer z-20"
          style={{
            left: `calc(${((min as number) / maxValue) * 100}% - 10px)`,
            top: "45%",
            transform: "translateY(-50%)",
          }}
          onMouseDown={startDrag("min")}
        >
          {/* TOOLTIP */}
          {draggingThumb === "min" && (
            <div className="absolute w-auto -top-7 left-1/2 -translate-x-1/2 px-2 py-1 bg-blue-500 text-white text-xs rounded">
              {(min as number).toFixed(1)}
            </div>
          )}
        </div>

        {/* THUMB MAX */}
        <div
          className="absolute h-5 w-5 bg-blue-400 border-3 border-white rounded-full shadow cursor-pointer z-20"
          style={{
            left: `calc(${((max as number) / maxValue) * 100}% - 10px)`,
            top: "45%",
            transform: "translateY(-50%)",
          }}
          onMouseDown={startDrag("max")}
        >
          {/* TOOLTIP */}
          {draggingThumb === "max" && (
            <div className="absolute w-auto -top-7 left-1/2 -translate-x-1/2 px-2 py-1 bg-blue-500 text-white text-xs rounded">
              {(max as number).toFixed(1)}
            </div>
          )}
        </div>
      </div>

      {/* MIN/MAX LABELS */}
      <div className="flex justify-between mt-[-10px] text-sm">
        <span className="ml-[-5px]">0</span>
        <span className="mr-[-7px]">{maxValue}</span>
      </div>
    </div>
  );
}
