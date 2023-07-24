import './CardCarousel.css';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useState, useEffect } from 'react';

export default function CardCarousel({ currentIndex, index, restaurant }) {
    const [selectedIndex, setSelectedIndex] = useState(0);

    useEffect(() => {
        document.querySelectorAll('.carousel-img-html-attribution a')
            .forEach((anchor) => {
                anchor.setAttribute('target', '_blank');
            })
    }, [selectedIndex]);
    return (
        <div>
            {restaurant.photos.length === 0 ?
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
                    {restaurant.photos.map((photo, index) => {
                        if (index === selectedIndex || index === selectedIndex - 1 || index === selectedIndex + 1) {
                            return (
                                <div key={index}>
                                    <img alt="restaurant" src={photo.url} referrerPolicy="no-referrer"/>
                                    <div className="carousel-img-html-attribution" dangerouslySetInnerHTML={{ __html: photo.htmlAttributions.length >= 1 ? photo.htmlAttributions[0] : '' }}></div>
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