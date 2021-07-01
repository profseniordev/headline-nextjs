import './BannerWithButton.scss';
import PropTypes from 'prop-types';
import React from "react";
import { PrismicHTML } from '../../Core/Prismic';

/**
 * Banner Component with button to trigger function
 * @param {string}
 * @returns {JSX.Element}
 * @constructor
 */
const BannerWithButton = ({ text, buttonText, clickMethod }) => {

    return (
        <div className="c-banner">
            <div className="c-banner__text-container ty-body" dangerouslySetInnerHTML={{__html:  PrismicHTML(text) }}></div>
            <button onClick={ clickMethod } className="c-banner__button button-primary" value={ buttonText }>{ buttonText }</button>
        </div>
    );
};

BannerWithButton.propTypes = {
};

export default BannerWithButton;