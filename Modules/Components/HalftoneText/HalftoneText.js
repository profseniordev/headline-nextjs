import React from 'react';
import './HalftoneText.scss';
import PropTypes from 'prop-types';
import { PrismicHTML } from '../../Core/Prismic';

/**
 * Returns Prismic rich text object or string with halftone pattern background
 * @param {Object||string} textObject
 * @param {string} halftoneColor
 * @returns {JSX.Element}
 * @constructor
 */
const HalftoneText = ({ textObject, halftoneColor }) => {

    const renderText = ( textObject,  halftoneColor ) => {

        if (typeof textObject === 'string') {
            return  <span className={ `c-halftone-text__halftone-${ halftoneColor }` }>{ textObject }</span>
        } else {
            const type = textObject[0].type;
            const text = textObject[0].text;

            switch (type) {
                case 'heading1':
                    return <h1><span className={ `c-halftone-text__halftone-${ halftoneColor }` }>{ text }</span></h1>
                case 'heading2':
                    return <h2><span className={ `c-halftone-text__halftone-${ halftoneColor }` }>{ text }</span></h2>
                case 'heading3':
                    return <h3><span className={ `c-halftone-text__halftone-${ halftoneColor }` }>{ text }</span></h3>
                case 'heading4':
                    return <h4><span className={ `c-halftone-text__halftone-${ halftoneColor }` }>{ text }</span></h4>
                case 'heading5':
                    return <h5><span className={ `c-halftone-text__halftone-${ halftoneColor }` }>{ text }</span></h5>
                case 'heading6':
                    return <h6><span className={ `c-halftone-text__halftone-${ halftoneColor }` }>{ text }</span></h6>
                case 'paragraph':
                    return <p><span className={ `c-halftone-text__halftone-${ halftoneColor }` }>{ text }</span></p>
                default:
                    return <div dangerouslySetInnerHTML={{ __html: PrismicHTML(textObject) }}></div>
            }
        }
    }
    
    return (
        <div className="c-halftone-text">
            { renderText(textObject, halftoneColor)}
        </div>
    );
};

HalftoneText.propTypes = {
};

export default HalftoneText;