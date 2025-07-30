import React, { useRef, useEffect } from "react";

const generateCaptchaText = (length = 6) => {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

const drawCaptcha = (text, canvasRef) => {
  const canvas = canvasRef.current;
  const ctx = canvas.getContext("2d");

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Background
  ctx.fillStyle = "#f3f3f3";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Noise lines
  for (let i = 0; i < 5; i++) {
    ctx.strokeStyle = "rgba(200,0,0,0.5)";
    ctx.beginPath();
    ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
    ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
    ctx.stroke();
  }

  // Draw CAPTCHA characters aligned in a line with slight vertical jitter
  ctx.font = "28px Arial";
  ctx.fillStyle = "#000";
  ctx.textBaseline = "middle";
  const spacing = canvas.width / (text.length + 1);

  for (let i = 0; i < text.length; i++) {
    const x = spacing * (i + 1);
    const y = canvas.height / 2 + (Math.random() * 8 - 4); // slight up/down
    ctx.fillText(text[i], x, y);
  }
};

const CaptchaBox = ({ onChange }) => {
  const canvasRef = useRef(null);

  const regenerateCaptcha = () => {
    const captcha = generateCaptchaText();
    drawCaptcha(captcha, canvasRef);
    onChange(captcha);
  };

  useEffect(() => {
    regenerateCaptcha();
  }, []);

  return (
    <div className="d-flex align-items-center gap-2 ">
      <canvas ref={canvasRef} width={150} height={37} style={{ border: "1px solid #ccc" }}  className=""/>
      <button  type="button" className="btn btn-outline-secondary  btn-sm rounded-circle" onClick={regenerateCaptcha}>
        ↻
      </button>
    </div>
  );
};

export default CaptchaBox;
