import React, { useEffect, useState, useRef } from 'react';
import './Footer.scss';
import { PrismicLink } from '../../Core/Prismic';
import PropTypes from 'prop-types';
import Contact from './Contact/Contact';
import Locations from './Locations/Locations';
import Newsletter from './Newsletter/Newsletter';
import HalftoneBorder from '../HalftoneBorder/HalftoneBorder';

/**
 * Footer component
 * @param {object} data - header data from Prismic
 * @param {string} pageType - string representing the Prismic pageType
 * @returns {JSX.Element}
 * @constructor
 */
const Footer = ({ data, pageType }) => {
    const [footerHeight, setFooterHeight] = useState(null);
    const newsletterContainer = useRef(null);
    const locationsContainer = useRef(null);
    const contactContainer = useRef(null);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768 ) {
                setFooterHeight(Math.max(contactContainer.current.offsetHeight + newsletterContainer.current.offsetHeight, locationsContainer.current.offsetHeight));
            } else {
                setFooterHeight('auto');
            }
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    /**
     * Renders link list items
     * @param {array} links
     * @returns {*}
     */
    const renderLegalLinks = links => links.map((link, i) => {
        const { url } = link;
        return (
            <div key={ `link-${ i }` } className="c-footer__legal-container">
                <a href={ PrismicLink(url) } className="c-footer__legal-link ty-caption" >
                    { link.title }
                </a>
            </div>
        );
    });

    return (
        <div className="c-footer">
            <div className="c-footer__border">
                <HalftoneBorder />
            </div>
            <div className="c-footer__main" style={{ height: footerHeight }}>
                <Newsletter
                    newsletterTitle={ data.newsletter_title }
                    newsletterPlaceholder={ data.newsletter_placeholder }
                    newsletterButtonText={ data.newsletter_button_text }
                    newsletterURL={ data.newsletter_url }
                    newsletterSuccessMessage={ data.newsletter_success_message }
                    newsletterRef={ newsletterContainer }
                />
                <Locations locations={ data.location_details } locationsRef={ locationsContainer }/>
                <Contact
                    contactTitle={ data.contact_title }
                    contactDetails={ data.contact_details }
                    socialLinks={ data.social_links }
                    contactRef={ contactContainer }
                />
            </div>
            <div className={ `c-footer__legal ${ pageType === 'homepage' && 'bottom-padding'}` }>
                <div className="c-footer__legal-inner">
                    { renderLegalLinks(data.legal) }
                </div>
            </div>
        </div>
    );
};

Footer.propTypes = {
    data: PropTypes.object,
    pageType: PropTypes.string
};

export default Footer;