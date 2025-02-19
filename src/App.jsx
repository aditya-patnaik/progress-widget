import { useEffect, useState } from "react";

const getParams = () => {
  const params = new URLSearchParams(window.location.search);
  return {
    currentValue: Number(params.get("currentValue") || 0),
    targetValue: Number(params.get("targetValue") || 100),
  };
};

// eslint-disable-next-line react/prop-types
const CircularProgress = ({ percentage }) => {
  const strokeWidth = 10;
  const radius = 50 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - percentage / 100);

  return (
    <svg width="240" height="240" viewBox="0 0 140 140">
      {/* Background Circle */}
      <circle
        cx="70"
        cy="70"
        r={radius}
        stroke="#F4F4F4"
        strokeWidth={strokeWidth + 5}
        fill="none"
        filter="url(#innerShadow)"
      />
      {/* Progress Circle with Gradient */}
      <defs>
        <filter id="innerShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="2" />
          <feOffset dx="3" dy="3" result="offsetblur" />
          <feFlood floodColor="rgba(0, 0, 0, 0.5)" />
          <feComposite in2="offsetblur" operator="in" />
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#A104F4" />
          <stop offset="100%" stopColor="#EC4EC3" />
        </linearGradient>
      </defs>
      <circle
        cx="70"
        cy="70"
        r={radius}
        stroke="url(#progressGradient)"
        strokeWidth={strokeWidth}
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
        // transform="rotate(-90 70 70)"
      />
      {/* Percentage Text */}
      <text
        x="70"
        y="70"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="14"
        fontWeight="bold"
        fill="#333"
      >
        {percentage}%
      </text>
    </svg>
  );
};

function App() {
  const [progress, setProgress] = useState({ currentValue: 0, targetValue: 100 });

  useEffect(() => {
    setProgress(getParams());
  }, []);

  const percentage = Math.min(
    100,
    (progress.currentValue / progress.targetValue) * 100
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
      <CircularProgress percentage={percentage} />
      {/* <p>{progress.currentValue} / {progress.targetValue}</p> */}
    </div>
  );
}

export default App;