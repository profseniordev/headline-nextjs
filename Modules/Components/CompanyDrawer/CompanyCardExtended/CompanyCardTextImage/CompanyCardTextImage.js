import './CompanyCardTextImage.scss';
import PropTypes from 'prop-types';
import React from 'react';
import { PrismicHTML } from '../../../../Core/Prismic';

/**
 * Aligned text and image block for extended Portfolio component
 * @param {Object} image
 * @param {string} imageCaption
 * @param {Object[]} textBlock
 * @returns {JSX.Element}
 * @constructor
 */
const CompanyCardTextImage = ({ image, imageCaption, textBlock }) => {

    return (
        <div className="c-company-card-text-image">
            { image.url && <div className="c-company-card-extended__column column-left">
                <div className="c-company-card-text-image__image-caption-container">
                    { image && <div className="c-company-card-text-image__image-container">
                        <picture>
                            <source srcSet={ image.Mobile.url } media="(max-width: 480px)"/>
                            <source srcSet={ image.Tablet.url } media="(max-width: 1024px)"/>
                            <img className="c-company-card-text-image__image" srcSet={ image.url }
                                 alt={ image.alt || image.Tablet.alt || image.Mobile.alt }/>
                        </picture>
                    </div> }
                    <p className="c-company-card-text-image__caption ty-caption bold">{ imageCaption }</p>
                </div>
            </div> }
            { textBlock && <div className="c-company-card-extended__column c-company-card-text-image__text ty-body2"
                  dangerouslySetInnerHTML={{ __html: PrismicHTML(textBlock) }}></div> }
        </div>
    );
};

CompanyCardTextImage.propTypes = {
    image: PropTypes.object,
    imageCaption: PropTypes.string,
    textBlock: PropTypes.array
};

export default CompanyCardTextImage;