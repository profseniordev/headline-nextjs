import React, { useState } from 'react';
import './FeaturedCarousel.scss';
import PropTypes from 'prop-types';
import {PrismicHTML, PrismicLink} from "../../Core/Prismic";
import Carousel from './Carousel/Carousel';

/**
 * Image Hero component with Text
 * @param {string} title
 * @param {Object[]} featuredItems
 * @returns {JSX.Element}
 * @constructor
 */
const FeaturedCarousel = ({ title, featuredItems }) => {
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

    /**
     * Renders location list items
     * @param {Object[]} locations
     * @returns {*}
     */
    const renderMenuItem = items => items.map((item, i) => {
        return (
            <div key={ `item-${ i }` } className={ `c-featured-carousel__item-container ${ currentSlideIndex === i && 'is-open' }` } onClick={ () => setCurrentSlideIndex(i) }>
                <h3 className="c-featured-carousel__title ty-h3">{ item.title }</h3>
                <p className="c-featured-carousel__description ty-caption">{ item.description}</p>

                <a className="button-primary ty-link" href={ PrismicLink(item.link_url) }>{ item.link_text }</a>
            </div>
        );
    });

    return (
        <div className="c-featured-carousel">
            <div className="c-featured-carousel__header">
                <h4 className="c-featured-carousel__heading ty-h4">{ title }</h4>
            </div>
            <div className="c-featured-carousel__main">
                <div className="c-featured-carousel__column-small">
                    { renderMenuItem(featuredItems)}
                </div>
                <div className="c-featured-carousel__column-large">
                    <Carousel
                        slides={ featuredItems }
                        currentSlideIndex={ currentSlideIndex }
                        setCurrentSlideIndex={ setCurrentSlideIndex }
                    />
                </div>
            </div>
        </div>
    );
};

FeaturedCarousel.propTypes = {
    title: PropTypes.string,
    featuredItems: PropTypes.array
};

export default FeaturedCarousel;