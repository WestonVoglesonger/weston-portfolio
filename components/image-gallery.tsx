'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, X, Images } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
}

interface ImageGalleryProps {
  images: GalleryImage[];
  className?: string;
}

export function ImageGallery({ images, className = '' }: ImageGalleryProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      } else if (e.key === 'ArrowLeft') {
        goToPrevious();
      } else if (e.key === 'ArrowRight') {
        goToNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!images || images.length === 0) return null;

  const currentImage = images[currentIndex];

  return (
    <>
      {/* Gallery Trigger Button */}
      <Button
        variant="outline"
        onClick={() => setIsOpen(true)}
        className={`flex items-center gap-2 ${className}`}
      >
        <Images className="h-4 w-4" />
        View Gallery ({images.length})
      </Button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Modal Content */}
          <div className="relative z-10 w-full h-full max-w-7xl mx-auto p-4 flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="text-white">
                <h3 className="text-lg font-semibold">Gallery</h3>
                <p className="text-sm text-white/70">{currentIndex + 1} of {images.length}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/10"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Main Image */}
            <div className="relative flex-1 min-h-0 flex items-center justify-center">
              <div className="relative w-full h-full max-h-[70vh]">
                <Image
                  src={currentImage.src}
                  alt={currentImage.alt}
                  fill
                  className="object-contain"
                  priority
                />
              </div>

              {/* Navigation Arrows */}
              {images.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/10"
                    onClick={goToPrevious}
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/10"
                    onClick={goToNext}
                  >
                    <ChevronRight className="h-6 w-6" />
                  </Button>
                </>
              )}
            </div>

            {/* Caption */}
            {currentImage.caption && (
              <div className="mt-4 text-center">
                <p className="text-white/90">
                  {currentImage.caption}
                </p>
              </div>
            )}

            {/* Thumbnail Navigation */}
            {images.length > 1 && (
              <div className="mt-6 flex flex-wrap gap-2 justify-center max-h-20 overflow-y-auto">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`relative aspect-[16/9] w-16 overflow-hidden rounded border-2 transition-all flex-shrink-0 ${
                      index === currentIndex
                        ? 'border-white scale-105'
                        : 'border-white/30 hover:border-white/60'
                    }`}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover object-top"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
