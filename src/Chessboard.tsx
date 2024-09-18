import { useEffect, useState } from "react";

interface ChessboardProps {
  solution: number[];
}

export default function Chessboard({ solution }: ChessboardProps) {
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState<number>(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const n = solution.length;
  const board: number[] = [];

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      board.push(solution[i] === j ? 1 : 0);
    }
  }

  const boardSize =
    windowWidth < 768 ? (windowWidth - 50) / n : (windowHeight - 200) / n;

  return (
    <div
      className="grid grid-cols-8 w-full h-full"
      style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}
    >
      {board.map((value, index) => {
        const row = Math.floor(index / n); // سطر فعلی
        const col = index % n; // ستون فعلی

        // الگوریتم برای تعیین رنگ بر اساس مختصات
        const isWhite = (row + col) % 2 === 0;
        const color = isWhite ? "rgb(250,250,250)" : "rgb(9,9,11)";

        return (
          <div
            className="flex items-center justify-center"
            style={{
              backgroundColor: color,
              width: `${boardSize}px`,
              height: `${boardSize}px`,
            }}
            key={index}
          >
            {value === 1 && <Queen />}
          </div>
        );
      })}
    </div>
  );
}

const Queen = () => <img src="/public/minister.png" />;
