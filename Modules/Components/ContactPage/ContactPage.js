import React from 'react';
import './ContactPage.scss';
import PropTypes from 'prop-types';
import TextBlocks from '../TextBlocks/TextBlocks';
import { PrismicHTML } from '../../Core/Prismic';

/**
 * Content page container
 * @param {object} data - page data from Prismic
 * @returns {JSX.Element}
 * @constructor
 */
const ContactPage = ({ data }) => {

        return (
            <div className="c-contact">
                <div className="c-contact__inner">
                    <div className="c-contact__header ty-h1">
                        <div className="c-contact__heading" dangerouslySetInnerHTML={{__html:  PrismicHTML(data.main_title) }}></div>
                        <div className="c-contact__border"></div>
                    </div>
                    <div className="c-contact__main">
                        <TextBlocks textBlocks={ data.text_block } additionalInfoContent={ data.body[0] }/>
                    </div>
                </div>
            </div>
        );
};

ContactPage.propTypes = {
    data: PropTypes.object
};

export default ContactPage;
