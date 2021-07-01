import React, { useRef, useEffect } from 'react';
import './Carousel.scss';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import Button from '../../Button/Button';
import CarouselArrow from '../../SVG/CarouselArrow';
import {PrismicLink} from "../../../Core/Prismic";

/**
 * Carousel Component
 * @param {Object[]} slides
 * @param {number} currentSlideIndex
 * @callback [setCurrentSlide = null] - Optional callback to update state with slide number and slide
 * @returns {JSX.Element}
 * @constructor
 */
const Carousel = ({ slides, currentSlideIndex, setCurrentSlideIndex = null }) => {
    const slider = useRef();
    const settings =  {
        slidesToShow: 1,
        slidesToScroll: 1,
        variableWidth: true,
        infinite: true,
        dots: false,
        nextArrow: <Button addClass='c-carousel__arrow c-carousel__arrow-next'><CarouselArrow /></Button>,
        prevArrow: <Button addClass='c-carousel__arrow c-carousel__arrow-previous'><CarouselArrow /></Button>,
        beforeChange: (current, next) => {
            if (setCurrentSlideIndex ) {
                setCurrentSlideIndex(next);
            }
        },
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    centerMode: true,
                    variableWidth: false,
                    centerPadding: 0
                }
            }
        ]
    };

    useEffect(() => {
        slider.current.slickGoTo(currentSlideIndex);
    }, [currentSlideIndex]);


    /**
     * Render carousel slides
     * @param {array} slides
     * @returns {JSX.Element|*}
     */
    const renderSlides = slides => {
        return slides.map((slide, i) => {

            return <div key={ `slide-${ i }` }>
                <div className="c-carousel__slide">
                    <picture>
                        <source srcSet={ slide.image.Mobile.url } media="(max-width: 480px)" />
                        <source srcSet={ slide.image.Tablet.url } media="(max-width: 1024px)" />
                        <img className="c-carousel__slide-image" srcSet={ slide.image.url } alt={ slide.image.alt || slide.image.Tablet.alt || slide.image.Mobile.alt } />
                    </picture>
                    <div className="c-carousel__slide-text-container">
                        <h3 className="c-carousel__title ty-h3">{ slide.title }</h3>
                        <p className="c-carousel__description ty-body">{ slide.description}</p>
                        <a className="c-carousel__link ty-link" href={ PrismicLink(slide.link_url) }>{ slide.link_text }</a>
                    </div>
                </div>
            </div>;
        });
    };

    return (
        <div className="c-carousel">
            <div>
                <Slider { ...settings } ref={ slider }>
                    { renderSlides(slides) }
                </Slider>
                <div className="c-carousel__slide-progress-container">
                    <div className="c-carousel__slide-progress-bar-container">
                        <div className="c-carousel__slide-progress-bar" style={{ left: `${ (100 / slides.length * currentSlideIndex) * .825 }%`}}></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

Carousel.propTypes = {
    slides: PropTypes.array,
    currentSlideIndex: PropTypes.number,
    setCurrentSlideIndex: PropTypes.func
};

export default Carousel;