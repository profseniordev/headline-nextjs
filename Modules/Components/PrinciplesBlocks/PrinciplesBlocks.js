import React from 'react';
import './PrinciplesBlocks.scss';
import PropTypes from 'prop-types';
import {PrismicHTML} from '../../Core/Prismic';

/**
 * Repeatable Text Blocks for Principles Section
 * @param {Object[]} title
 * @param {Object[]} principles
 * @returns {JSX.Element}
 * @constructor
 */
const PrinciplesBlocks = ({ title, principles }) => {

    /**
     * Renders text blocks
     * @param {array} blocks
     * @returns {*}
     */
    const renderBlocks = (principles) => principles.map((principle, i) => {
        return (
            <div key={ `principle-${ i }` } className="c-principles-blocks__block ty-h2">
                <p className="c-principles-blocks__block-super-text ty-body bold">{ i + 1 }</p>
                <p className="c-principles-blocks__block-text">{ principle.principles_block_text }</p>
            </div>
        );
    });
    
    return (
        <div className="c-principles-blocks">
            <div className="c-principles-blocks__header ty-h4" dangerouslySetInnerHTML={{__html:  PrismicHTML(title) }}>
            </div>
            <div className="c-principles-blocks__block-container">
                { renderBlocks(principles) }
            </div>
        </div>
    );
};

PrinciplesBlocks.propTypes = {
    title: PropTypes.array,
    principles: PropTypes.array,
};

export default PrinciplesBlocks;