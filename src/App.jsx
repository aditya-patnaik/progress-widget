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
    <svg width="120" height="120" viewBox="0 0 120 120">
      <circle
        cx="60"
        cy="60"
        r={radius}
        stroke="#ddd"
        strokeWidth={strokeWidth}
        fill="none"
      />
      <circle
        cx="60"
        cy="60"
        r={radius}
        stroke="blue"
        strokeWidth={strokeWidth}
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
      />
      <text
        x="60"
        y="60"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="16"
        fontWeight="bold"
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
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "50px" }}>
      <CircularProgress percentage={percentage} />
      <p>{progress.currentValue} / {progress.targetValue}</p>
    </div>
  );
}

export default App;