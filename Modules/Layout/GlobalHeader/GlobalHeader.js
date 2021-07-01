import React from 'react';
import './global-header.scss';
import Navigation from '../../Components/Navigation/Navigation';
import PropTypes from 'prop-types';

/**
 * Renders the GlobalHeader component
 * @param {object} data - header data from Prismic
 * @param {string} pageType - string representing the Prismic pageType
 * @returns {JSX.Element}
 * @constructor
 */
const GlobalHeader = ({ data, pageType}) => {
    return (
        <>
            <header className="c-global-header">
                <Navigation
                    logoUrl={ data.logo.url }
                    logoAlt={ data.logo.alt }
                    links={ data.links }
                    pageType={ pageType }
                />
            </header>
        </>
    );
};

GlobalHeader.propTypes = {
    data: PropTypes.object,
    pageType: PropTypes.string
};

export default GlobalHeader;
