import React, { useRef, useEffect, useState } from "react";

const imageNames = [
  "red_near", "green_near", "blue_near",
  "red_far", "green_far", "blue_far"
];

const nameTranslations = {
  "red_near": "Красный ближний",
  "green_near": "Зелёный ближний",
  "blue_near": "Синий ближний",
  "red_far": "Красный задний",
  "green_far": "Зелёный задний",
  "blue_far": "Синий задний"
};

const defaultCoeffs = {
  red_near: 0, green_near: 1, blue_near: 0,
  red_far: 1, green_far: 0, blue_far: 0,
};

export default function AmbiknightEmulator() {
  const canvasRef = useRef(null);
  const [coeffs, setCoeffs] = useState(defaultCoeffs);
  const [images, setImages] = useState({});

  useEffect(() => {
    const loadedImages = {};
    let loaded = 0;

    imageNames.forEach(name => {
      const img = new Image();
      img.src = `/${name}.jpg`;
      img.onload = () => {
        loadedImages[name] = img;
        loaded++;
        if (loaded === imageNames.length) {
          setImages(loadedImages);
        }
      };
    });
  }, []);

  useEffect(() => {
    if (Object.keys(images).length !== imageNames.length) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
	
	ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.globalCompositeOperation = "lighter";

    imageNames.forEach(name => {
      const alpha = coeffs[name];
      if (!images[name] || alpha === 0) return;
      ctx.globalAlpha = alpha;
      ctx.drawImage(images[name], 0, 0, canvas.width, canvas.height);
    });

  
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = "source-over";
  }, [coeffs, images]);

  const handleSlider = (name, value) => {
    setCoeffs(prev => ({ ...prev, [name]: parseFloat(value) }));
  };

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold">Потыкать зарево Ambiknight</h1>
	  <p>Нет, это не 3D, это мы стакаем труъ-фотки</p>
      <div className="grid grid-cols-3 gap-6">
      {imageNames.map(name => (
  <div key={name} className="space-y-1">
    <label className="block text-sm font-medium text-gray-700">
      {nameTranslations[name]} {(coeffs[name] * 100).toFixed(1)}%
    </label>
    <input
      type="range"
      min="0"
      max="1"
      step="0.001"
      value={coeffs[name]}
      onChange={e => handleSlider(name, e.target.value)}
      className={`w-full slider ${name}`}
    />
  </div>
))}

      </div>
      <canvas
        ref={canvasRef}
        width={780}
        height={585}
        className="border rounded-lg shadow-lg"
      />
    </div>
  );
}
