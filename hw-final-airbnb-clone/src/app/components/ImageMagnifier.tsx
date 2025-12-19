"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

interface ImageMagnifierProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  magnifierHeight?: number;
  magnifierWidth?: number;
  zoomLevel?: number;
}

export default function ImageMagnifier({
  src,
  alt,
  width = 600,
  height = 400,
  magnifierHeight = 150,
  magnifierWidth = 150,
  zoomLevel = 2.5,
}: ImageMagnifierProps) {
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Получаем размеры изображения после загрузки
  useEffect(() => {
    if (imgRef.current) {
      setImageSize({
        width: imgRef.current.offsetWidth,
        height: imgRef.current.offsetHeight,
      });
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imgRef.current || !containerRef.current) return;

    const { left, top } = containerRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    // Ограничиваем координаты внутри изображения
    const boundedX = Math.max(0, Math.min(x, imageSize.width));
    const boundedY = Math.max(0, Math.min(y, imageSize.height));

    setMousePosition({ x: boundedX, y: boundedY });
    setShowMagnifier(true);
  };

  const handleMouseLeave = () => {
    setShowMagnifier(false);
  };

  return (
    <div className="relative">
      <div
        ref={containerRef}
        className="relative overflow-hidden rounded-xl group"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setShowMagnifier(true)}
        onMouseLeave={handleMouseLeave}
      >
        <Image
          ref={imgRef}
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
          onLoad={() => {
            if (imgRef.current) {
              setImageSize({
                width: imgRef.current.offsetWidth,
                height: imgRef.current.offsetHeight,
              });
            }
          }}
        />
        
        {/* Иконка лупы при наведении */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="bg-black/40 backdrop-blur-sm rounded-full p-3 animate-pulse">
            <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 10l-3.5 3.5" />
            </svg>
          </div>
        </div>
        
        {/* Увеличительное стекло */}
        {showMagnifier && (
          <div
            className="absolute border-2 border-white rounded-lg pointer-events-none shadow-2xl z-50 overflow-hidden"
            style={{
              left: `${mousePosition.x - magnifierWidth / 2}px`,
              top: `${mousePosition.y - magnifierHeight / 2}px`,
              width: `${magnifierWidth}px`,
              height: `${magnifierHeight}px`,
              backgroundImage: `url(${src})`,
              backgroundPosition: `-${mousePosition.x * zoomLevel - magnifierWidth / 2}px -${mousePosition.y * zoomLevel - magnifierHeight / 2}px`,
              backgroundSize: `${imageSize.width * zoomLevel}px ${imageSize.height * zoomLevel}px`,
              backgroundRepeat: 'no-repeat',
              opacity: 0.95,
            }}
          >
            {/* Перекрестие */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="h-full w-px bg-white/50"></div>
              <div className="w-full h-px bg-white/50"></div>
            </div>
            
            {/* Обводка */}
            <div className="absolute inset-0 border border-black/20"></div>
          </div>
        )}
      </div>
      
      {/* Подсказка */}
      <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        Наведите курсор для детального просмотра
      </div>
    </div>
  );
}