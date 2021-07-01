import React from 'react';
import './Ticker.scss';
import PropTypes from 'prop-types';
import {PrismicHTML} from "../../Core/Prismic";

/**
 * Quote ticker for bottom of desktop screen
 * @param {string} logoUrl - url for the logo
 * @param {string} logoAlt - alt text for the logo
 * @param {Object[]} list
 * @returns {JSX.Element}
 * @constructor
 */
const Ticker = ({ logoUrl, logoAlt, list, timePerItem = 15 }) => {

    /**
     * Renders link list items
     * @param {array} links
     * @returns {*}
     */
    const renderListItems = list => list.map((item, i) => {
        return (
            <li key={ `item-${ i }` } className="c-homepage-ticker__item" dangerouslySetInnerHTML={{__html:  PrismicHTML(item.ticker_text) }}>
            </li>
        );
    });

    return (
        <div className="c-homepage-ticker">
            <div className="c-homepage-ticker__gradient-overlay">
            </div>
            <div className="c-homepage-ticker__logo-container">
                <img className="c-homepage-ticker__logo" src={ logoUrl } alt={ logoAlt } />
            </div>
            <div className="c-homepage-ticker__list">
                <ul className="c-homepage-ticker__list-inner" style={{ animationDuration: `${ list.length * timePerItem }s` }}>
                    { renderListItems(list) }
                </ul>
            </div>
        </div>
    );
};

Ticker.propTypes = {
    logoUrl: PropTypes.string,
    logoAlt: PropTypes.string,
    lists: PropTypes.array
};

export default Ticker;