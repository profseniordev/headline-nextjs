import React from 'react';
import './global-footer.scss';
import Footer from '../../Components/Footer/Footer';
import PropTypes from 'prop-types';

/**
 * Renders the GlobalFooter component
 * @param {object} data - header data from Prismic
 * @param {string} pageType - string representing the Prismic pageType
 * @returns {JSX.Element}
 * @constructor
 */
const GlobalFooter = ({ data, pageType}) => {
    return (
        <>
            <footer className="c-global-footer">
                <Footer
                    data={ data }
                    pageType={ pageType }
                />
            </footer>
        </>
    );
};

GlobalFooter.propTypes = {
    data: PropTypes.object,
    pageType: PropTypes.string
};

export default GlobalFooter;

