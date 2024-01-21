"use client";
import { useEffect, useRef, useState } from "react";
import { animate } from "framer-motion";

const numbers = [
  "M99.9922 273.8V265.2H124.592V273.8C124.592 285 130.792 293.8 145.192 293.8C159.592 293.8 165.592 285.6 165.592 272.8V168.8H191.192V274.2C191.192 300 173.192 317.6 145.392 317.6C115.392 317.6 99.9922 299 99.9922 273.8ZM213.144 265.4C213.144 234.6 235.344 213.4 265.944 213.4C296.544 213.4 318.744 234.6 318.744 265.4C318.744 296.2 296.544 317.4 265.944 317.4C235.344 317.4 213.144 296.2 213.144 265.4ZM237.544 265.4C237.544 283.4 249.144 295.6 265.944 295.6C282.744 295.6 294.344 283.4 294.344 265.4C294.344 247.4 282.744 235.2 265.944 235.2C249.144 235.2 237.544 247.4 237.544 265.4ZM382.284 317.6C352.884 317.6 332.284 296.2 332.284 265.6C332.284 234.6 352.484 213.2 381.484 213.2C411.084 213.2 429.884 233 429.884 263.8V271.2L355.484 271.4C357.284 288.8 366.484 297.6 382.684 297.6C396.084 297.6 404.884 292.4 407.684 283H430.284C426.084 304.6 408.084 317.6 382.284 317.6ZM381.684 233.2C367.284 233.2 358.484 241 356.084 255.8H405.684C405.684 242.2 396.284 233.2 381.684 233.2ZM474.013 315H449.813V166.2H474.013V315Z",
];

export default function CircleSvg() {
  const [index, setIndex] = useState(0);
  const paths = useRef<Array<SVGPathElement | null>>([]);
  const circleNo = 300;
  const circles = useRef<Array<SVGCircleElement | null>>([]);
  const radius = 20;

  useEffect(() => {
    const pathLength = paths.current[index]?.getTotalLength();
    if (!pathLength) return;
    const step = pathLength / circleNo;

    circles.current.forEach((circle, i) => {
      if (!circle) return;

      const { x, y } = paths.current[index]?.getPointAtLength(step * i) || {
        x: 0,
        y: 0,
      };

      animate(circle, { cx: x, cy: y }, { delay: i * 0.0025, ease: "easeOut" });
    });
  }, [index]);

  return (
    <main className="w-full h-full flex justify-center items-center">
      <svg width={500} height={500} className="w-[500px]">
        <defs>
          <filter id="filter">
            <feGaussianBlur in="SourceAlpha" stdDeviation="10" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 25 -15"
              result="filter"
            />
          </filter>
        </defs>
        <g>
          {numbers.map((path, i) => {
            return (
              <path
                key={`p_${i}`}
                ref={(ref) => (paths.current[i] = ref)}
                d={path}
              />
            );
          })}
        </g>
        {[...Array(circleNo)].map((_, i) => (
          <circle
            key={i}
            ref={(ref) => (circles.current[i] = ref)}
            cx={250}
            cy={250}
            r={radius}
          />
        ))}
      </svg>
    </main>
  );
}
