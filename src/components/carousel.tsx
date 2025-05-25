import React from 'react';
import { useState, useEffect } from 'react';
import { FunctionComponent } from 'react';

interface CarouselProps {
    images: CarouselImage[];
    onItemClicked?: (item: CarouselImage) => void;
}

export interface CarouselImage {
    url: string;
    title: string;
    props?: Record<string, any>;
}

const Carousel: FunctionComponent<CarouselProps> = ({ images, onItemClicked }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [rotatedImages, setRotatedImages] = useState(images);
    const [transitionDuration, setTransitionDuration] = useState('duration-300');
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [visibleItems, setVisibleItems] = useState(3);

    // Update rotatedImages when images prop changes
    useEffect(() => {
        setRotatedImages(images);
    }, [images]);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024)
                setVisibleItems(3); // Large screens
            else if (window.innerWidth >= 895)
                setVisibleItems(2); // Medium screens
            else
                setVisibleItems(1); // Small screens
        };
    
        window.addEventListener("resize", handleResize);
        handleResize();
    
        return () => window.removeEventListener("resize", handleResize);
      }, []);

    const handleNext = () => {
        if (isTransitioning) return;

        setIsTransitioning(true);

        if (currentIndex === rotatedImages.length - visibleItems) {
            const newImages = [...rotatedImages.slice(1), rotatedImages[0]];
            setRotatedImages(newImages);
            setTransitionDuration('duration-0');
            setCurrentIndex(currentIndex - 1);
            setTimeout(() => {
                setTransitionDuration('duration-300');
                setCurrentIndex(currentIndex);
                setIsTransitioning(false);
            }, 0);
        } else {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % rotatedImages.length);
            setIsTransitioning(false);
        }
    };

    const handlePrev = () => {
        if (isTransitioning) return;

        setIsTransitioning(true);

        if (currentIndex === 0) {
            const newImages = [rotatedImages[rotatedImages.length - 1], ...rotatedImages.slice(0, -1)];
            setRotatedImages(newImages);
            setTransitionDuration('duration-0');
            setCurrentIndex(1);
            setTimeout(() => {
                setTransitionDuration('duration-300');
                setCurrentIndex(0);
                setIsTransitioning(false);
            }, 0);
        } else {
            setCurrentIndex((prevIndex) => (prevIndex - 1 + rotatedImages.length) % rotatedImages.length);
            setIsTransitioning(false);
        }
    };

    return (
        <div className="mt-2">
            <div className="relative">
                <div className="flex items-center">
                    <img
                        src="/icons/left-arrow.png"
                        alt="Arrow left"
                        className="h-icon-size-mobile lg:h-icon-size cursor-pointer"
                        onClick={handlePrev}
                    />
                    <div className="flex overflow-hidden w-full">
                        <div
                            className={`flex transition-transform ${transitionDuration}`}
                            style={{
                                // transform: `translateX(-${(currentIndex * 100) / visibleItems}%)`,
                                transform: `translateX(-${100 / rotatedImages.length * currentIndex}%)`,
                                width: `${(rotatedImages.length / visibleItems) * 100}%`,
                                flexShrink: 0,
                            }}
                        >
                            {rotatedImages.map((img, index) => (
                                <div
                                    className='flex-none p-4 overflow-hidden'
                                    style={{ width: `${100 / rotatedImages.length}%` }}
                                    key={index}
                                >
                                    <img
                                        className="w-full object-cover mb-4 rounded-lg h-[25vh]"
                                        style={{ cursor: onItemClicked ? 'pointer' : 'default' }}
                                        src={img.url}
                                        onClick={onItemClicked ? () => onItemClicked(img) : undefined}
                                        alt="Card"
                                    />
                                    <div>
                                        <h5 className="text-center overflow-hidden">{img.title}</h5>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <img
                        src="/icons/right-arrow.png"
                        alt="Arrow right"
                        className="h-icon-size-mobile lg:h-icon-size cursor-pointer"
                        onClick={handleNext}
                    />
                </div>
            </div>
        </div>
    );
};

export default Carousel;