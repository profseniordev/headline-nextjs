import React, { useEffect, useRef, useState } from 'react';
import './TitleTextHero.scss';
import PropTypes from 'prop-types';
import HalftoneBorder from '../HalftoneBorder/HalftoneBorder';
import {PrismicHTML} from '../../Core/Prismic';

/**
 * Repeatable Text Hero component
 * @param {string} titleHalftone
 * @param {string} titleNoHalftone
 * @param {Object[]} description
 * @returns {JSX.Element}
 * @constructor
 */
const TitleTextHero = ({ titleHalftone, titleNoHalftone, description }) => {
    const [expandedDescription, setExpandedDescription] = useState(false);
    const [halfToneHeight, setHalfToneHeight] = useState(null);
    const [halfToneWidth, setHalfToneWidth] = useState(null);
    const halftoneTextRef = useRef();

    useEffect(() => {
        setBorderSize();
        window.addEventListener('resize', setBorderSize);
        return () => window.removeEventListener('resize', setBorderSize);
    }, []);

    const setBorderSize = () => {
        setHalfToneHeight(halftoneTextRef.current.offsetHeight);
        setHalfToneWidth(halftoneTextRef.current.offsetWidth);
    }

    return (
        <div className="c-title-text-hero">
            <div className="c-title-text-hero__main">
                <div className="c-title-text-hero__heading-container ty-h2">
                    <div className="c-title-text-hero__heading">
                        <h3><span className="c-title-text-hero__heading-with-halftone" ref={ halftoneTextRef }>{ titleHalftone }</span> { titleNoHalftone }</h3>
                    </div>
                    <div className="c-title-text-hero__heading-halftone-container" style={{ width: halfToneWidth, height: halfToneHeight * .8 }}>
                        <HalftoneBorder color={ 'Blue'} />
                    </div>
                </div>
                <div className={ `c-title-text-hero__description-container ${ expandedDescription ? 'is-open' : '' }` }>
                    <div className="c-title-text-hero__description ty-body" dangerouslySetInnerHTML={{__html:  PrismicHTML(description) }}></div>
                    <div className={ `c-title-text-hero__description-container-overlay ${ expandedDescription ? 'is-open' : '' }` }></div>
                </div>
                { expandedDescription === false && <button className="c-title-text-hero__description-container-expand-button ty-link" onClick={() => setExpandedDescription(true)}>Read more</button> }
            </div>
            <HalftoneBorder />
        </div>
    );
};

TitleTextHero.propTypes = {
    titleHalftone: PropTypes.string,
    titleNoHalftone: PropTypes.string,
    description: PropTypes.array
};

export default TitleTextHero;