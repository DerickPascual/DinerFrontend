import './CardCarousel.css';
import { Carousel } from 'react-responsive-carousel';
import { useState, useEffect } from 'react';

export default function CardCarousel({ currentIndex, index, restaurant }) {
    const [selectedIndex, setSelectedIndex] = useState(0);

    useEffect(() => {
        console.log(selectedIndex);
    }, [selectedIndex]);

    return (
        <div>
            <Carousel
                showThumbs={false}
                showIndicators={false}
                swipeable={false}
                autoPlay={index === currentIndex}
                onChange={(index) => setSelectedIndex(index)}
                renderArrowPrev={(clickHandler, hasPrev) => {
                    if (hasPrev) {
                        return (
                            <button
                                onClick={clickHandler}
                                className="pressable carousel-button-left"
                            >
                            </button>
                        )
                    }
                }}
                renderArrowNext={(clickHandler, hasNext) => {
                    if (hasNext) {
                        return (
                            <button onClick={clickHandler} className="pressable carousel-button-right">
                            </button>
                        )
                    }
                }
                }
            >
                {restaurant.photoUrls.map((url, index) => {
                    if (index === selectedIndex || index === selectedIndex - 1 || index === selectedIndex + 1 || index === selectedIndex - 2 || index === selectedIndex + 2) {
                        return (
                            <div>
                                <img src={url} />
                            </div>
                        )
                    }
                }
                )}
            </Carousel>
        </div>
    )
};