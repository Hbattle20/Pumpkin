"use client";

import { useState } from "react";
import Image from "next/image";

export default function Gallery() {
  const [currentImage, setCurrentImage] = useState(0);

  const images = [
    { src: "/gallery3.jpg", alt: "Pumpkin Display" },
    { src: "/gallery1.jpg", alt: "Front Porch Pumpkin Display" },
    { src: "/gallery2.jpg", alt: "Walkway Pumpkin Display" },
    // { src: "", alt: "Pumpkin Display 4", placeholder: true },
    // { src: "", alt: "Pumpkin Display 5", placeholder: true },
    // { src: "", alt: "Pumpkin Display 6", placeholder: true },
  ];

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Main Image Display */}
      <div className="relative mb-6 max-w-4xl mx-auto">
        <div className="aspect-[16/10] bg-gradient-to-br from-autumn-orange/20 to-autumn-gold/20 rounded-lg flex items-center justify-center text-foreground/50 text-2xl overflow-hidden">
          <Image
            src={images[currentImage].src}
            alt={images[currentImage].alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1024px"
            priority={currentImage === 0}
          />
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevImage}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-autumn-red p-3 rounded-full shadow-lg transition-all z-10"
          aria-label="Previous image"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-autumn-red p-3 rounded-full shadow-lg transition-all z-10"
          aria-label="Next image"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Thumbnail Navigation */}
      <div className="flex justify-center gap-2 md:gap-4">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className={`w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-autumn-orange/20 to-autumn-gold/20 rounded-lg flex items-center justify-center text-foreground/50 text-xs md:text-sm transition-all overflow-hidden relative ${
              currentImage === index
                ? "ring-2 ring-autumn-orange shadow-lg scale-105"
                : "hover:scale-105 hover:shadow-md"
            }`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 96px, 128px"
            />
          </button>
        ))}
      </div>
    </div>
  );
}