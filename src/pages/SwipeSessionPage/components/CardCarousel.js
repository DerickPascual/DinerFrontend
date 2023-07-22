import './CardCarousel.css';
import { Carousel } from 'react-responsive-carousel';
import { useState, useEffect } from 'react';

export default function CardCarousel({ currentIndex, index, restaurant }) {
    const [selectedIndex, setSelectedIndex] = useState(0);

    return (
        <div>
            {restaurant.photoUrls.length === 0 ?
                <div style={{ position: 'absolute', width: '100%', textAlign: 'center', top: '30%' }}>
                    <h2>Restaurant has no photos :(</h2>
                </div>
                :
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
                        if (index === selectedIndex || index === selectedIndex - 1 || index === selectedIndex + 1) {
                            return (
                                <div>
                                    <img alt="restaurant" src={url} />
                                </div>
                            )
                        }
                    }
                    )}
                </Carousel>
            }
        </div>
    )
};