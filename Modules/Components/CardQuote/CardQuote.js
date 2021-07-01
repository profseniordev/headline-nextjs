import './CardQuote.scss';
import PropTypes from 'prop-types';
import React from "react";
import HalftoneBorder from '../HalftoneBorder/HalftoneBorder';

/**
 * Quote with halftone border block for extended card components
 * @param {string} quote
 * @param {string} halftoneColor
 * @returns {JSX.Element}
 * @constructor
 */
const CardQuote = ({ quote, halftoneColor }) => {

    return (
        <div className="c-card-quote">
            <div className="c-card-quote__halftone-column column-left">
                <div className="c-card-quote__halftone-container">
                    <HalftoneBorder direction={ 'column' } color={ halftoneColor }/>
                </div>
            </div>
            <div className="c-card-quote__quote-column ty-h3">
                <div className="c-card-quote__quote">
                    <div className={ `c-card-quote__floating-quotation-mark text-${ halftoneColor }` }>“</div>
                    <p>{ quote }<span className={ `text-${ halftoneColor }` }>”</span></p>
                </div>
            </div>
        </div>
    );
};

CardQuote.propTypes = {
    quote: PropTypes.string,
    halftoneColor: PropTypes.string
};

export default CardQuote;