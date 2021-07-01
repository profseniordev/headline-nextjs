import React, { useState, useEffect } from 'react';
import './Navigation.scss';
import { PrismicLink } from '../../Core/Prismic';
import PropTypes from 'prop-types';

/**
 * Nav Bar wrapper component
 *
 * @param logoUrl - url for the logo
 * @param logoAlt - alt text for the logo
 * @param {array} links - the link list
 * @param {string} pageType - string representing the Prismic pageType
 * @returns {JSX.Element}
 * @constructor
 */
const Navigation = ({ logoUrl, logoAlt, links, pageType }) => {
    const [hasScrolled, setHasScrolled] = useState(false);
    const scroll = () => setHasScrolled(window.pageYOffset > 5);

    useEffect(() => {
        window.addEventListener('scroll', scroll);
        window.addEventListener('touchmove', scroll);

        return () => {
            window.removeEventListener('scroll', scroll);
            window.removeEventListener('touchmove', scroll);
        };
    }, []);

    /**
     * Renders link list items
     * @param {array} links
     * @returns {*}
     */
    const renderNavLinks = links => links.map((link, i) => {
        const { url } = link;
        return (
            <li key={ `link-${ i }` } className={ `c-navigation__navigation-item cta ${ link.is_hidden_mobile ? 'is-hidden-mobile' : '' }` }>
                <a href={ PrismicLink(url) } className={ `${ url.slug === pageType ? 'is-selected' : '' }` }>
                    { link.title }
                </a>
            </li>
        );
    });

    return (
        <nav className={ `c-navigation ${ hasScrolled ? 'is-scrolled' : '' }` } role="navigation" aria-label="Main Navigation">
            <div className="c-navigation__inner">
                <div className="c-navigation__navigation-left">
                    <a className="c-navigation__logo" href="/">
                        <img src={ logoUrl } alt={ logoAlt } />
                    </a>
                </div>
                <div className="c-navigation__navigation-right">
                    <ul className="c-navigation__link-list">
                        { renderNavLinks(links) }
                    </ul>
                </div>
            </div>
        </nav>
    );
};

Navigation.propTypes = {
    logoUrl: PropTypes.string,
    logoAlt: PropTypes.string,
    links: PropTypes.array,
    pageType: PropTypes.string
};

export default Navigation;