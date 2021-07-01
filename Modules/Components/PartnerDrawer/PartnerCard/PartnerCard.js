import './PartnerCard.scss';
import PropTypes from 'prop-types';
import React from 'react';
import CloseIcon from '../../SVG/CloseIcon';
import Router from 'next/router';
import { PrismicHTML, PrismicLink } from '../../../Core/Prismic';
import CardRelatedPressLinks from '../../CardRelatedPressLinks/CardRelatedPressLinks';
import CardQuote from '../../CardQuote/CardQuote';
import PartnerCardText from './PartnerCardText/PartnerCardText';

/**
 * Partner Drawer Card component
 * @param {Object||boolean} partner
 * @param {boolean} isOpen
 * @callback [setIsOpen = () => {})] - Optional callback to update open state
 * @returns {JSX.Element}
 * @constructor
 */
const PartnerCard = ({ partner, setIsOpen = () => {} }) => {
    const close = () => {
        setIsOpen(false);
        Router.push('/team');
    }

    /**
     * Renders contact list items
     * @param {array} links
     * @returns {*}
     */
    const renderContact = contacts => contacts.map((contact, i) => {
        return (
            <a key={ `contact-${ i }` } href={ PrismicLink(contact.contact_link) } className="c-partner-card__profile-info-contact-icon" >
                <img src={ contact.contact_icon.url } alt={ contact.contact_icon.alt } />
            </a>
        );
    });

    /**
     * Renders blocks
     * @param {Object[]} blocks
     * @returns {*}
     */
    const renderBlocks = blocks => blocks.map((block, i) => {
        switch (block.slice_type) {
            case 'quote':
                return <div key={ `block-${ i }` } className="c-partner-card__quote-container" >
                    <CardQuote quote={ block.primary.quote_text } halftoneColor={ block.primary.halftone_color } />
                </div>
            case 'related_press_section':
                return <CardRelatedPressLinks key={ `block-${ i }` } title={ block.primary.press_title } links={ block.items } />
            case 'text_block':
                return <PartnerCardText key={ `block-${ i }` } textBlocks={ block.items } heading={ block.primary }/>
            default:
                break;
        }
    });

    // Use if-statement to check if a partner is selected to retain smooth animation
    if (partner) {
        return (
            <div className="c-partner-card">
                <div className="c-partner-card__close" onClick={ () => close() }>
                    <CloseIcon />
                </div>
                <div className="c-partner-card__main">
                    <div className="c-partner-card__header-name ty-h2-alt" dangerouslySetInnerHTML={{ __html:  PrismicHTML(partner.page_title) }}></div>
                    <div className="c-partner-card__profile c-partner-card__column">
                        <div className="c-partner-card__profile-info">
                            <div className="c-partner-card__profile-info-name ty-h2-alt" dangerouslySetInnerHTML={{ __html:  PrismicHTML(partner.page_title) }}></div>
                            <p className="c-partner-card__profile-info-title ty-body bold">{ partner.tagline }</p>
                            <div className="c-partner-card__profile-info-contact">
                                { renderContact(partner.contact) }
                            </div>
                        </div>
                        <div className={ `c-partner-card__profile-headshot background-${ partner.partner_headshot_background_color }` }>
                            <img
                                className="c-partner-card__profile-headshot-image"
                                src={ partner.partner_headshot.url }
                                alt={ partner.partner_headshot.alt }
                            />
                        </div>
                    </div>
                    <div className="c-partner-card__article c-partner-card__column">
                        { renderBlocks(partner.body1) }
                    </div>
                </div>
            </div>
        );
    } else {
        return <div></div>
    }

};

PartnerCard.propTypes = {
    partner: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
    setIsOpen: PropTypes.func
};

export default PartnerCard;