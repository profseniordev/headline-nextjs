import React, { useEffect, useState, useRef } from 'react';
import './HalftoneBorder.scss';
import PropTypes from 'prop-types';

/**
 * Border with Halftone svg component
 * {string} direction - Must be 'row' or 'column'
 * {string} color
 * @returns {JSX.Element}
 * @constructor
 */
const HalftoneBorder = ({ direction = 'row', color = 'Black' }) => {

    return (
        <div className={ `c-halftone-border border-${ direction }` }>
            <div className={ `halftone-small halftone-small-${ color }` }></div>
            <div className={ `halftone-medium halftone-medium-${ color }` }></div>
            <div className={ `halftone-large halftone-large-${ color }` }></div>
        </div>
    );
};

HalftoneBorder.propTypes = {
    direction: PropTypes.string,
    color: PropTypes.string
};

export default HalftoneBorder;