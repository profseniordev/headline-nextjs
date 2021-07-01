import React, { useState } from 'react';
import './Locations.scss';
import { PrismicHTML } from '../../../Core/Prismic';
import PropTypes from 'prop-types';

/**
 * Contact component
 * @param { Object[] } locations
 * @param {Object} locationsRef
 * @returns {JSX.Element}
 * @constructor
 */
const Locations = ({ locations, locationsRef }) => {
    const [openLocationIndex, setOpenLocationIndex] = useState(0);
    /**
     * Renders location list items
     * @param {Object[]} locations
     * @returns {*}
     */
    const renderLocations = locations => locations.map((location, i) => {
        return (
            <div key={ `location-${ i }` } className={ `c-footer-locations__location-container ${ openLocationIndex === i && 'is-open' }` } onClick={ () => setOpenLocationIndex(i) }>
                <h3 className="c-footer-locations__heading ty-h3">{ location.name }</h3>
                <div className="c-footer-locations__body ty-body">
                    <div dangerouslySetInnerHTML={{__html:  PrismicHTML(location.address) }}></div>
                    { location.phone && <p>{ location.phone }</p> }
                    { location.email && <p><a href={ `mailto:${ location.email }` }>{ location.email }</a></p> }
                </div>
            </div>
        );
    });

    return (
        <div className="c-footer-locations" ref={ locationsRef }>
            { renderLocations(locations) }
        </div>
    );
};

Locations.propTypes = {
    locations: PropTypes.array,
    locationsRef: PropTypes.object
};

export default Locations;