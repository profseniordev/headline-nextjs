import './PartnerCardText.scss';
import PropTypes from 'prop-types';
import React from 'react';
import { PrismicHTML } from '../../../../Core/Prismic';
import HalftoneText from '../../../HalftoneText/HalftoneText';

/**
 * Aligned text and image block for Partner card component
 * @param {Object[]} textBlocks
 * @param {Object} heading
 * @returns {JSX.Element}
 * @constructor
 */
const PartnerCardText = ({ textBlocks, heading }) => {

    /**
     * Render richtext blocks
     * @param {Object} blocks
     * @returns {*}
     */
    const renderRichText = blocks => blocks.map((block, i) => {
        return (
                <div key={ `block-${ i }` } className="c-partner-card-text__container ty-body2 body1-font-size" dangerouslySetInnerHTML={{ __html: PrismicHTML(block.block_text) }}></div>
        );
    });

    return (
        <div className="c-partner-card-text">
            { heading.heading[0] && <div className="c-partner-card-text__heading ty-h2-alt">
                <HalftoneText textObject={ heading.heading} halftoneColor={ heading.halftone_color }/></div> }
            { renderRichText(textBlocks) }
        </div>
    );
};

PartnerCardText.propTypes = {
    textBlocks: PropTypes.array,
    heading: PropTypes.object
};

export default PartnerCardText;