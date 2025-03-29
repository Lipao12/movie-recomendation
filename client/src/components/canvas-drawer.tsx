import { useEffect, useRef, useState } from "react";

const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth >= 450 ? 840 : 260,
    height: window.innerWidth >= 450 ? 165 : 130,
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth >= 450 ? 840 : 260,
        height: window.innerWidth >= 450 ? 165 : 130,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.strokeStyle = "white";
    ctx.lineWidth = 3;
    ctxRef.current = ctx;
  }, [dimensions]);

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas || !ctxRef.current) return;

    const rect = canvas.getBoundingClientRect();
    const x = (e as React.TouchEvent).touches
      ? (e as React.TouchEvent).touches[0].clientX - rect.left
      : (e as React.MouseEvent).nativeEvent.offsetX;
    const y = (e as React.TouchEvent).touches
      ? (e as React.TouchEvent).touches[0].clientY - rect.top
      : (e as React.MouseEvent).nativeEvent.offsetY;

    ctxRef.current.beginPath();
    ctxRef.current.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing || !ctxRef.current) return;
    e.preventDefault();

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = (e as React.TouchEvent).touches
      ? (e as React.TouchEvent).touches[0].clientX - rect.left
      : (e as React.MouseEvent).nativeEvent.offsetX;
    const y = (e as React.TouchEvent).touches
      ? (e as React.TouchEvent).touches[0].clientY - rect.top
      : (e as React.MouseEvent).nativeEvent.offsetY;

    ctxRef.current.lineTo(x, y);
    ctxRef.current.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    if (!canvasRef.current || !ctxRef.current) return;
    ctxRef.current.clearRect(
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );
  };

  return (
    <div className="canvas-actual">
      <canvas
        ref={canvasRef}
        className="canvas-actual"
        width={dimensions.width}
        height={dimensions.height}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
        style={{
          touchAction: "none", // Impede o zoom/paneio no mobile
          backgroundColor: "transparent",
        }}
      />
      <div className="flex justify-end">
        <button
          className="h-5 w-8 drop-shadow-md cursor-pointer bg-red-600 rounded-2xl text-sm"
          onClick={clearCanvas}
        >
          🗑️
        </button>
      </div>
    </div>
  );
};

export default Canvas;
