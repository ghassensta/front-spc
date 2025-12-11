import React, { useEffect, useRef, useState } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { CONFIG } from 'src/config-global';

export default function ProductCarousel({ gallery = [], image = "" }) {
    const [images, setImages] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const newImages = [];
        if (image) {
            newImages.push(image);
        }
        if (Array.isArray(gallery)) {
            const filteredGallery = gallery.filter((img) => img && img.trim() !== "");
            newImages.push(...filteredGallery);
        }
        setImages(newImages);
    }, [image, gallery]);

    const timerRef = useRef(null);

    // Auto-slide functionality
    useEffect(() => {
        if (images.length <= 1) {
            return () => clearInterval(timerRef.current);
        }

        const startTimer = () => {
            timerRef.current = setInterval(() => {
                setCurrentSlide((prev) => (prev + 1) % images.length);
            }, 5000); // Change slide every 5 seconds
        };

        startTimer();

        return () => clearInterval(timerRef.current);
    }, [images]);

    const resetTimer = () => {
        clearInterval(timerRef.current);
        timerRef.current = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % images.length);
        }, 5000);
    };

    const goToSlide = (index) => {
        setCurrentSlide(index);
        resetTimer();
    };

    const goToPrev = () => {
        setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
        resetTimer();
    };

    const goToNext = () => {
        setCurrentSlide((prev) => (prev + 1) % images.length);
        resetTimer();
    };

    if (!images.length) {
        return null;
    }

    return (
        <div className="relative w-auto rounded-md">
            <div className=" w-full  h-[300px] relative overflow-hidden rounded-md">
                {images.map((src, index) => (
                    <img
                        key={index}
                        src={CONFIG.serverUrl + "/storage/" + src}
                        alt={`Spa & Prestige Slide ${index + 1}`}
                        className={`absolute top-0 h-[300px] left-0 w-full object-cover transition-transform duration-1000 ease-in-out ${currentSlide === index
                            ? "translate-x-0"
                            : index < currentSlide
                                ? "-translate-x-full"
                                : "translate-x-full"
                            }`}
                        loading="lazy"
                    />
                ))}
            </div>
            <button
                onClick={goToPrev}
                className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white p-2 rounded-full transition-colors duration-300"
                aria-label="Previous slide"
            >
                <FaChevronLeft size={20} />
            </button>
            <button
                onClick={goToNext}
                className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white p-2 rounded-full transition-colors duration-300"
                aria-label="Next slide"
            >
                <FaChevronRight size={20} />
            </button>
            {/* Navigation Dots (limited to max 20) */}
            <div className="absolute mt-3 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {(() => {
                    const MAX_DOTS = 20;
                    const dotCount = Math.min(images.length, MAX_DOTS);
                    if (dotCount <= 1) return null;

                    // create mapping from dot index -> image index (spread evenly)
                    const mapDotToIndex = (dotIdx) => {
                        if (dotCount === 1) return 0;
                        // spread across 0..images.length-1
                        return Math.round((dotIdx * (images.length - 1)) / (dotCount - 1));
                    };

                    // compute which dot should be active for currentSlide
                    const activeDot = Math.round((currentSlide * (dotCount - 1)) / Math.max(1, images.length - 1));

                    return Array.from({ length: dotCount }).map((_, dotIdx) => {
                        const targetIndex = mapDotToIndex(dotIdx);
                        return (
                            <button
                                key={dotIdx}
                                onClick={() => goToSlide(targetIndex)}
                                className={`w-2 h-2 rounded-full ${activeDot === dotIdx ? "bg-black" : "bg-gray-400"} hover:bg-[#B6B498] transition-colors duration-300`}
                                aria-label={`Go to slide ${targetIndex + 1}`}
                                title={images.length > dotCount ? `${targetIndex + 1} / ${images.length}` : undefined}
                            />
                        );
                    });
                })()}
            </div>
        </div>
    )
}