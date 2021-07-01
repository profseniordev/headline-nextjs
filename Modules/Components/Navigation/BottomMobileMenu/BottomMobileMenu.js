import React from 'react';
import './BottomMobileMenu.scss';
import { PrismicLink } from '../../../Core/Prismic';
import PropTypes from 'prop-types';

/**
 * Separate navigation component for bottom of screen on mobile
 *
 * @param {array} links - the link list
 * @param {string} pageType - string representing the Prismic pageType
 * @returns {JSX.Element}
 * @constructor
 */
const BottomMobileMenu = ({ links, pageType }) => {
    /**
     * Renders link list items
     * @param {array} links
     * @returns {*}
     */
    const renderNavLinks = links => links.map((link, i) => {
        const { url } = link;
        return (
            <li key={ `link-${ i }` } className="c-bottom-navigation__navigation-item cta">
                <a href={ PrismicLink(url) } className={ `${ url.slug === pageType ? 'is-selected' : 'is-not-selected' }` }>
                    { link.title }
                </a>
            </li>
        );
    });

    return (
        <div className="c-bottom-navigation">
            <ul className="c-bottom-navigation__link-list">
                { renderNavLinks(links) }
            </ul>
        </div>
    );
};

BottomMobileMenu.propTypes = {
    links: PropTypes.array,
    pageType: PropTypes.string
};

export default BottomMobileMenu;