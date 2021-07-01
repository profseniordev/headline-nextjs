import React from 'react';
import './Contact.scss';
import { PrismicLink } from '../../../Core/Prismic';
import PropTypes from 'prop-types';

/**
 * Contact component
 * @param {string} contactTitle
 * @param {Object[]} contactDetails
 * @param {Object[]} socialLinks
 * @param {Object} contactRef
 * @returns {JSX.Element}
 * @constructor
 */
const Contact = ({ contactTitle, contactDetails, socialLinks, contactRef}) => {

    /**
     * Renders social link list items
     * @param {array} links
     * @returns {*}
     */
    const renderSocialLinks = links => links.map((link, i) => {
        const { url } = link;
        return (
            <a key={ `link-${ i }` } href={ PrismicLink(url) } className="c-footer-contact__social-link" >
                <img src={ link.icon.url } alt={ link.icon.alt } />
            </a>
        );
    });

    /**
     * Renders contact link list items
     * @param {array} links
     * @returns {*}
     */
    const renderContactLinks = links => links.map((link, i) => {
        const { contact_email_link } = link;
        return (
            <div key={ `link-${ i }` } className="c-footer-contact__text-link-container">
                <p className="c-footer-contact__text-link-heading ty-body bold">{ link.contact_text }</p>
                <p><a href={ PrismicLink(contact_email_link) } className="c-footer-contact__text-link ty-link normal" >{ link.contact_email }</a></p>
            </div>
        );
    });

    return (
        <div className="c-footer-contact" ref={ contactRef }>
            <div className="c-footer-contact__inner">
                <h3 className="c-footer-contact__title ty-h3">{ contactTitle }</h3>
                <div className="c-footer-contact__social-container">
                    { renderSocialLinks(socialLinks) }
                </div>
                <div className="c-footer-contact__link-container">
                    { renderContactLinks(contactDetails) }
                </div>
            </div>
        </div>
    );
};

Contact.propTypes = {
    contactTitle: PropTypes.string,
    contactDetails: PropTypes.array,
    socialLinks: PropTypes.array,
    contactRef: PropTypes.object
};

export default Contact;