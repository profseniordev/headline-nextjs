import './CardRelatedPressLinks.scss';
import PropTypes from 'prop-types';
import React from "react";
import { PrismicLink } from "../../Core/Prismic";
import ExternalLink from "../SVG/ExternalLink";

/**
 * Extended Company Drawer component
 * @param {string} title
 * @param {Object[]} links
 * @returns {JSX.Element}
 * @constructor
 */
const CardRelatedPressLinks = ({ title, links }) => {

    /**
     * Render links
     * @param {Object[]} blocks
     * @returns {*}
     */
    const renderLinks = links => links.map((link, i) => {
        return (
            <div key={ `link-${ i }` } className="c-card-press-links__link-container">
                <a className="c-card-press-links__link" href={ PrismicLink(link.article_link) }>
                    { link.article_link_text }
                </a>
                <ExternalLink />
            </div>
        );
    });

    return (
        <div className="c-card-press-links ty-body">
            <h4 className="c-card-press-links__title ty-h2-alt">{ title }</h4>
            { renderLinks(links) }
        </div>
    );
};

CardRelatedPressLinks.propTypes = {
    title: PropTypes.string,
    links: PropTypes.array
};

export default CardRelatedPressLinks;