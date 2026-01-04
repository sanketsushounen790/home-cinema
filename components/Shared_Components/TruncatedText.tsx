"use client";
import { useState } from "react";
interface TruncatedTextProps {
  text: string;
  maxLength: number;
}
export default function TruncatedText({
  text,
  maxLength = 120,
}: TruncatedTextProps) {
  const [expanded, setExpanded] = useState(false);

  const isLongText = text.length > maxLength;
  const displayedText = expanded ? text : text.slice(0, maxLength);

  return (
    <div className="text-[17px] leading-relaxed">
      <span>{displayedText}</span>

      {/* Nếu dài thì mới show nút */}
      {isLongText && !expanded && (
        <button
          onClick={() => setExpanded(true)}
          className="ml-1 text-blue-500 cursor-pointer hover:underline"
        >
          ...Read more
        </button>
      )}

      {/* Nút thu gọn nếu muốn */}
      {expanded && (
        <button
          onClick={() => setExpanded(false)}
          className="ml-2 text-blue-500 cursor-pointer hover:underline"
        >
          Show less
        </button>
      )}
    </div>
  );
}
