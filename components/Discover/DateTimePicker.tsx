"use client";

import { format } from "date-fns";
import { useRef, useState } from "react";

interface DateTimePickerProps {
  value: string; // yyyy-MM-dd string
  onChange: (val: string) => void;
  placeholder?: string;
  maxDate?: Date;
}

export default function DateTimePicker({
  value,
  onChange,
  placeholder,
}: DateTimePickerProps) {
  const today = new Intl.DateTimeFormat("en-CA").format(new Date());

  console.log(value);

  return (
    <div className="relative w-full flex items-center gap-2 cursor-pointer">
      <input
        type="date"
        id="start"
        name="date-time-picker"
        value={value}
        max={today}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border p-2 cursor-pointer"
      />
    </div>
  );
}
