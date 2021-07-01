import React, { useState } from 'react';
import './TextHero.scss';
import PropTypes from 'prop-types';
import { PrismicLink } from '../../Core/Prismic';
import Arrow from '../SVG/arrow';
import HalftoneBorder from '../HalftoneBorder/HalftoneBorder';

/**
 * Repeatable Text Hero component
 * @param {string} title
 * @param {string} color
 * @param {Object} image
 * @param {string} description
 * @param {string} largeDescription
 * @param {Object[]} links
 * @param {string} linkText
 * @param {Object} linkURL
 * @returns {JSX.Element}
 * @constructor
 */
const TextHero = ({
      title,
      color,
      image,
      description,
      largeDescription,
      links,
      linkText,
      linkURL
}) => {
    const [listHover, setListHover] = useState(false);
    const [visibleMainImage, setVisibleMainImage] = useState(false);
    const [listHoverIndex, setListHoverIndex] = useState(null);

    /**
     * Renders link list items
     * @param {array} links
     * @param {string} color
     * @returns {*}
     */
    const renderLinks = (links, color) => links.map((link, i) => {
        const url = link.company_url || link.location_url;

        return (
            <li key={ `link-${ i }` } className="c-texthero__link-container">
                <a href={ PrismicLink(url) } className={ `c-texthero__link text-hover-${ color }` }
                   onMouseEnter={ () => {
                        setListHover(true);
                        setListHoverIndex(i);
                    } }
                   onMouseLeave={ () => {
                       setListHover(false);
                       setListHoverIndex(null);
                   } }
                >
                    { link.company_name || link.location_name }
                </a>
            </li>
        );
    });

    /**
     * Renders link list images
     * @param {array} images
     * @returns {*}
     */
    const renderLinkImages = (links) => links.map((link, i) => {
        const hoverImage = link.company_hover_image || link.location_hover_image;
        const imageHeight = link.company_image_height || link.location_image_height || '100';
        const imageVerticalAlignment = link.company_image_valignment || link.location_image_valignment;
        const imageVerticalDistance = link.company_image_vdistance || link.location_image_vdistance || '0';
        const imageHorizontalAlignment = link.company_image_halignment || link.location_image_halignment;
        const imageHorizontalDistance = link.company_image_hdistance || link.location_image_hdistance || '0';
        const imageStyle = {
            height: `${ imageHeight }%`,
            [imageVerticalAlignment]: `${ imageVerticalDistance }%`,
            [imageHorizontalAlignment]: `${ imageHorizontalDistance }%`
        }

        return (
            <div key={ `link-image-${ i }` } className={ `c-texthero__list-hover-image-container ${ listHoverIndex === i && 'is-visible' }` }>
                <img className="c-texthero__list-hover-image" src={ hoverImage.url } alt={ hoverImage.alt } style={ imageStyle }/>
            </div>
        );
    });

    return (
        <div className="c-texthero">
            <div className="c-texthero__halftone-container">
                <HalftoneBorder direction={ 'column' } color={ color }/>
            </div>
            <div className="c-texthero__main">
                <h1 className="c-texthero__heading ty-h1">
                    <a className={ `c-texthero__heading-link text-hover-${ color }` } href={ PrismicLink(linkURL) } onMouseEnter={ () => setVisibleMainImage(true) } onMouseLeave={ () => setVisibleMainImage(false) }>{ title }</a>
                </h1>
                <div className="c-texthero__main-text-container ty-h5">
                    <p className="c-texthero__description">{ description }</p>

                    { links &&
                        <ul className={ `c-texthero__link-list ${ listHover === true && 'is-hovered' }` }>
                            { renderLinks(links, color) }
                        </ul>
                    }

                    { largeDescription &&
                        <div className="c-texthero__large-description">
                            { largeDescription }
                        </div>
                    }
                    <div className="c-texthero__section-link-container ty-link">
                        <a className="c-texthero__section-link" href={ PrismicLink(linkURL) }>{ linkText } <Arrow /></a>
                    </div>
                </div>
            </div>
            <div className={ `c-texthero__section-image-container ${ visibleMainImage && 'is-visible' }` }>
                <img className="c-texthero__section-image" src={ image.url } alt={ image.alt }/>
            </div>

            { links && renderLinkImages(links) }
        </div>
    );
};

TextHero.propTypes = {
    title: PropTypes.string,
    color: PropTypes.string,
    image: PropTypes.object,
    description: PropTypes.string,
    largeDescription: PropTypes.string,
    links: PropTypes.array,
    linkText: PropTypes.string,
    linkURL: PropTypes.object
};

export default TextHero;