import './PartnerDrawer.scss';
import PropTypes from 'prop-types';
import React from "react";
import BottomDrawer from '../DrawerSlider/BottomDrawer';
import PartnerCard from './PartnerCard/PartnerCard';

/**
 * Partner Drawer component
 * @param {Object||boolean} partner
 * @param {boolean} isOpen
 * @callback [setIsOpen = () => {})] - Optional callback to update open state
 * @param {string} landingPath
 * @returns {JSX.Element}
 * @constructor
 */
const PartnerDrawer = ({ partner, isOpen, setIsOpen = () => {}, landingPath }) => {

    return (
        <div className="c-partner-drawer">
            <BottomDrawer addClass={"c-partner-drawer__bottom-drawer"} isOpen={ isOpen } setIsOpen={ setIsOpen } landingPath={ landingPath } addScrollClass={ true }>
                <PartnerCard partner={ partner.data } setIsOpen={ setIsOpen }/>
            </BottomDrawer>
        </div>
    );
};

PartnerDrawer.propTypes = {
    partner: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
    isOpen: PropTypes.bool,
    setIsOpen: PropTypes.func,
    landingPath: PropTypes.string
};

export default PartnerDrawer;