import React, { useState } from 'react';
import './LegalTemplate.scss';
import moment from "moment";
import PropTypes from 'prop-types';
import { PrismicHTML, PrismicSliceData } from '../../Core/Prismic';
import LegalBlocks from './LegalBlocks/LegalBlocks';


/**
 * LegalTemplate component
 * @param {Object} data
 * @returns {JSX.Element}
 * @constructor
 */
const LegalTemplate = ({ data}) => {
    const components = PrismicSliceData(data);

    /**
     * Renders the page slice components based on the type from Prismic.
     * @param {object} components - The slice components.
     */
    const renderComponents = (components) => {
        return components.map((component, index) => {
            const key = `component-key-${index}`;
            switch (component.slice_type) {
                case 'legal_block':
                    return <div key={key}>
                        <LegalBlocks data={component} />
                    </div>;
            }
        })
    };


    const renderLastUpdatedDate = (data) => {
        // moment.js formatting
        const m = moment(data).format("ll");

        return `Last updated ${m}`;
    };


    return (
        <div className="c-legal__main">
            <div className="c-legal__inner">
                <div className="c-legal__hero-main">
                    <div className="c-legal__hero-title" dangerouslySetInnerHTML={{ __html: PrismicHTML(data.legal_title) }} ></div>
                    <div className="c-legal__hero-last-updated-date">
                        { renderLastUpdatedDate(data.legal_last_updated_date) }
                    </div>
                </div>
                <div className="c-legal__components">
                    { renderComponents(components) }
                </div>
            </div>
        </div>
    );
};

LegalTemplate.propTypes = {
};

export default LegalTemplate;