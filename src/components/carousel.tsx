import React from 'react';

interface CarouselProps {
    images: CarouselImage[];
}

export interface CarouselImage {
    url: string;
    title: string;
}

const Carousel: React.FC<CarouselProps> = ({ images }) => {
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const [rotatedImages, setRotatedImages] = React.useState(images);
    const [transitionDuration, setTransitionDuration] = React.useState('duration-300');
    const [isTransitioning, setIsTransitioning] = React.useState(false);

    // Update rotatedImages when images prop changes
    React.useEffect(() => {
        setRotatedImages(images);
    }, [images]);

    const handleNext = () => {
        if (isTransitioning) return;

        setIsTransitioning(true);

        if (currentIndex === rotatedImages.length - 3) {
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
                        src="/src/icons/left-arrow.png"
                        alt="Arrow left"
                        className="h-icon-size cursor-pointer"
                        onClick={handlePrev}
                    />
                    <div className="flex overflow-hidden w-full">
                        <div
                            className={`flex transition-transform ${transitionDuration}`}
                            style={{
                                transform: `translateX(-${(currentIndex * 100) / 3}%)`,
                                width: `${(rotatedImages.length / 3) * 100}%`,
                            }}
                        >
                            {rotatedImages.map((card, index) => (
                                <div
                                    className="flex-none w-1/3 p-4"
                                    key={index}
                                >
                                    <img
                                        className="w-full h-[400] object-cover mb-4 rounded-lg"
                                        src={card.url}
                                        alt="Card"
                                    />
                                    {/* <h5 className="">{card.title}</h5> */}
                                </div>
                            ))}
                        </div>
                    </div>
                    <img
                        src="/src/icons/right-arrow.png"
                        alt="Arrow right"
                        className="h-icon-size cursor-pointer"
                        onClick={handleNext}
                    />
                </div>
            </div>
        </div>
    );
};

export default Carousel;