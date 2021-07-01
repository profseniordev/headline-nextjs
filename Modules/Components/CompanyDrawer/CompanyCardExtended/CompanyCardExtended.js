import './CompanyCardExtended.scss';
import PropTypes from 'prop-types';
import React from 'react';
import CompanyCardTextImage from './CompanyCardTextImage/CompanyCardTextImage';
import CompanyCardQuote from '../../CardQuote/CardQuote'
import CardRelatedPressLinks from '../../CardRelatedPressLinks/CardRelatedPressLinks';
import HalftoneBorder from '../../HalftoneBorder/HalftoneBorder';

/**
 * Extended Company Drawer component
 * @param {string} extendedTitle
 * @param {Object[]} extendedBody
 * @returns {JSX.Element}
 * @constructor
 */
const CompanyCardExtended = ({ extendedTitle, extendedBody }) => {

    /**
     * Renders text blocks
     * @param {Object[]} blocks
     * @returns {*}
     */
    const renderBlocks = blocks => blocks.map((block, i) => {
        switch (block.slice_type) {
            case 'quote':
                return <CompanyCardQuote key={ `block-${ i }` } quote={ block.primary.quote_text } halftoneColor={ block.primary.halftone_color } />
            case 'related_press_section':
                return <CardRelatedPressLinks key={ `block-${ i }` } title={ block.primary.press_title } links={ block.items } />
            case 'text_and_image_block':
                return <CompanyCardTextImage key={ `block-${ i }` } image={ block.primary.block_image } imageCaption={ block.primary.block_image_caption } textBlock={  block.primary.block_text } />
            default:
                break;
        }
    });

    return (
        <div className="c-company-card-extended">
            <HalftoneBorder />
            <div className="c-company-card-extended__column">
                <h3 className="ty-h2-alt">{ extendedTitle }</h3>
            </div>
            { renderBlocks(extendedBody) }
        </div>
    );
};

CompanyCardExtended.propTypes = {
    extendedTitle: PropTypes.string,
    extendedBody: PropTypes.array
};

export default CompanyCardExtended;