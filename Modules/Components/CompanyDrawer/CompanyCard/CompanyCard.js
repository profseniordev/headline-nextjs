import './CompanyCard.scss';
import PropTypes from 'prop-types';
import React from 'react';
import CloseIcon from '../../SVG/CloseIcon';
import Router from 'next/router';
import { PrismicHTML, PrismicLink } from '../../../Core/Prismic';
import GlobeIcon from '../../SVG/GlobeIcon';
import ExternalLink from '../../SVG/ExternalLink';

/**
 * Company Drawer Card component
 * @param {Object||boolean} company
 * @param {boolean} isOpen
 * @callback [setIsOpen = () => {})] - Optional callback to update open state
 * @returns {JSX.Element}
 * @constructor
 */
const CompanyCard = ({ company, setIsOpen = () => {} }) => {

    /**
     * Renders text blocks
     * @param {Object[]} blocks
     * @returns {*}
     */
    const renderTextBlocks = blocks => blocks.map((block, i) => {
        return (
            <div key={ `block-${ i }` } className="c-company-card__text-block ty-body">
                <div dangerouslySetInnerHTML={{ __html:  PrismicHTML(block.text) }}></div>
            </div>
        );
    });

    // Use if-statement to check if a company is selected to retain smooth animation
    if (company) {
        return (
            <div className="c-company-card">
                <div className="c-company-card__header">
                    <div className="c-company-card__header-top">
                        <div className="c-company-card__logo-container">
                            <img className="c-company-card__logo" src={ company.logo.url } alt={ company.logo.alt } />
                            { company.link.url && <div className="c-company-card__external-link-container ty-body" >
                                <GlobeIcon />
                                <a className="c-company-card__external-link" target="_blank" href={ PrismicLink(company.link) }>{ company.external_link_text } <ExternalLink /></a>
                            </div> }
                        </div>
                        <p className="c-company-card__header-blurb ty-body bold">{ company.blurb }</p>
                    </div>

                    <div className="c-company-card__header-bottom">
                        { renderTextBlocks(company.text_blocks) }
                    </div>
                </div>
            </div>
        );
    } else {
        return <div></div>
    }

};

CompanyCard.propTypes = {
    company: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
    setIsOpen: PropTypes.func
};

export default CompanyCard;