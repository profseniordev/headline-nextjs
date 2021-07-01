import React from 'react';
import './TitleImageHero.scss';
import PropTypes from 'prop-types';
import HalftoneBorder from '../HalftoneBorder/HalftoneBorder';

/**
 * Image Hero component with Text
 * @param {string} title
 * @param {string} subtitle
 * @param {string} desktopImageURL
 * @param {string} desktopImageAlt
 * @param {Object} tabletImage
 * @param {Object} mobileImage
 * @param {string} backgroundColor
 * @returns {JSX.Element}
 * @constructor
 */
const TitleImageHero = ({ title, subtitle, desktopImageURL, desktopImageAlt, tabletImage, mobileImage, backgroundColor }) => {

    return (
        <div className={ `c-title-image-hero background-${ backgroundColor }` }>
            <div className="c-title-image-hero__main">
                <h1 className="c-title-image-hero__heading ty-h1">{ title }</h1>
                <p className="c-title-image-hero__subheading ty-body">{ subtitle }</p>
            </div>

            <picture>
                <source srcSet={ mobileImage.url } media="(max-width: 480px)" />
                <source srcSet={ tabletImage.url } media="(max-width: 1024px)" />
                <img className="c-title-image-hero__background-image" srcSet={ desktopImageURL } alt={ desktopImageAlt || tabletImage.alt || mobileImage.alt } />
            </picture>

            <div className="c-title-image-hero__halftone-container">
                <HalftoneBorder />
            </div>
        </div>
    );
};

TitleImageHero.propTypes = {
    title: PropTypes.string,
    desktopImageURL: PropTypes.string,
    desktopImageAlt: PropTypes.string,
    tabletImage: PropTypes.object,
    mobileImage: PropTypes.object,
    backgroundColor: PropTypes.string
};

export default TitleImageHero;