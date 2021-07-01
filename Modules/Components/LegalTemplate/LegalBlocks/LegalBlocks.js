import React from 'react';
import './LegalBlocks.scss';
import PropTypes from 'prop-types';
import { PrismicHTML } from '../../../Core/Prismic';

/**
 * Pulls in Legal Blocks data from Prismic.
 * @param {object} data - data from Prismic.io.
 */
const LegalBlocks = ({ data, key } = props) => {

    const renderLegalBlocks = (data) => {
        return data.map((block, index) => {

            return <div className="c-legal-block__main" key={`block-key-${index}`}>
                { block.legal_block_title.length > 0 && block.legal_block_title[0].text !== "" && <div className="c-legal-block__title" dangerouslySetInnerHTML={{ __html: PrismicHTML(block.legal_block_title) }} ></div>}
                { block.legal_block_rich_text != null && <div className="c-legal-block__text" dangerouslySetInnerHTML={{ __html: PrismicHTML(block.legal_block_rich_text) }}></div>}
            </div>
        })
    };

    return (
        <>
            <div className="c-legal-blocks__main">
                <div className="c-legal-blocks__inner">
                    { renderLegalBlocks(data.items) }
                </div>
            </div>
        </>
    )
};

LegalBlocks.propTypes = {
    data: PropTypes.object
};

export default LegalBlocks;