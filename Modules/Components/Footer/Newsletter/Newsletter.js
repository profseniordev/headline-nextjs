import React, { useState, useRef } from 'react';
import './Newsletter.scss';
import PropTypes from 'prop-types';

/**
 * Newsletter component
 * @param {string} newsletterTitle
 * @param {string} newsletterPlaceholder
 * @param {string} newsletterButtonText
 * @param {string} newsletterURL
 * @param {string} newsletterSuccessMessage
 * @param {Object} newsletterRef
 * @returns {JSX.Element}
 * @constructor
 */
const Newsletter = ({ newsletterTitle, newsletterPlaceholder, newsletterButtonText, newsletterURL, newsletterSuccessMessage, newsletterRef }) => {
    const [isSubmitted, setIsSubmitted] = useState(false);

    // TODO: add success state to form

    return (
        <div className="c-footer-newsletter" ref={ newsletterRef }>
            <div className="c-footer-newsletter__inner">
                <h3 className="c-footer-newsletter__title ty-h3">{ newsletterTitle }</h3>
                <div className="c-footer-newsletter__form-container">
                    { isSubmitted === false ?
                        <form id="footer__form" method="post" action={ newsletterURL } target="_blank">
                            <input type="email" name="EMAIL" className="ty-body" placeholder={ newsletterPlaceholder }  required></input>
                            <button type="submit" className="button-primary-accent">{ newsletterButtonText }</button>
                        </form>
                    :
                        <div className="c-footer-newsletter__form-success">
                            <p className="ty-body">{ newsletterSuccessMessage }</p>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

Newsletter.propTypes = {
    newsletterTitle: PropTypes.string,
    newsletterPlaceholder: PropTypes.string,
    newsletterButtonText: PropTypes.string,
    newsletterURL: PropTypes.string,
    newsletterSuccessMessage: PropTypes.string,
    newsletterRef: PropTypes.object
};

export default Newsletter;