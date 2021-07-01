import React from 'react';
import './TextBlocks.scss';
import PropTypes from 'prop-types';
import {PrismicHTML, PrismicLink} from '../../Core/Prismic';

/**
 * Repeatable Text Blocks
 * @param {array} title
 * @param {Object} additionalInfoContent
 * @returns {JSX.Element}
 * @constructor
 */
const TextBlocks = ({ textBlocks, additionalInfoContent }) => {

    /**
     * Renders text blocks
     * @param {array} blocks
     * @returns {*}
     */
    const renderBlocks = (blocks) => blocks.map((block, i) => {

        return (
            <div key={ `block-${ i }` } className="c-text-blocks__block ty-body bold">
                { block.title && <h2 className="c-text-blocks__heading">{block.title}</h2> }
                <div className="c-text-blocks__text" dangerouslySetInnerHTML={{__html:  PrismicHTML(block.text) }}></div>
            </div>
        );
    });
    
    return (
        <div className="c-text-blocks">
            <div className="c-text-blocks__block-container">
                { renderBlocks(textBlocks) }
            </div>
            <div className="c-text-blocks__additional-container">
                <h2 className="c-text-blocks__heading">{ additionalInfoContent.primary.additional_title }</h2>
                { renderBlocks(additionalInfoContent.items) }
            </div>
        </div>
    );
};

TextBlocks.propTypes = {
    textBlocks: PropTypes.array,
    additionalInfoContent: PropTypes.object
};

export default TextBlocks;