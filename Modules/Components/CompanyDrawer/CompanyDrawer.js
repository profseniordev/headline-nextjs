import './CompanyDrawer.scss';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import BottomDrawer from '../DrawerSlider/BottomDrawer';
import CompanyCard from './CompanyCard/CompanyCard';
import CompanyCardExtended from './CompanyCardExtended/CompanyCardExtended';
import CloseIcon from '../SVG/CloseIcon';
import Router from 'next/router';
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';

/**
 * Company Drawer component
 * @param {Object||boolean} company
 * @param {boolean} isOpen
 * @callback [setIsOpen = () => {})] - Optional callback to update open state
 * @param {string} landingPath
 * @returns {JSX.Element}
 * @constructor
 */
const CompanyDrawer = ({ company, isOpen, setIsOpen = () => {}, landingPath }) => {
    const scrollRef = useRef();

    const close = () => {
        setIsOpen(false);
        Router.push('/portfolio');
    }

    useEffect(() => {
        isOpen === true ? disableBodyScroll(scrollRef.current) : enableBodyScroll(scrollRef.current);
        return () => {
            scrollRef.current.scrollTop = 0;
            clearAllBodyScrollLocks();
        };
    }, [isOpen]);

    return (
        <div className="c-company-drawer">
            <BottomDrawer addClass={"c-company-drawer__bottom-drawer"} isOpen={ isOpen } setIsOpen={ setIsOpen } landingPath={ landingPath } scrollLock={ false }>
                <div className="c-company-drawer__close" onClick={ () => close() }>
                    <CloseIcon />
                </div>
                <div className="c-company-drawer__main-container" ref={ scrollRef }>
                    <div className="c-company-drawer__main-container-inner">
                        <CompanyCard company={ company.data } setIsOpen={ setIsOpen }/>
                        { company && company.data.body1[0] && <CompanyCardExtended extendedTitle={ company.data.extended_title } extendedBody={ company.data.body1 }/> }
                    </div>
                </div>
            </BottomDrawer>
        </div>
    );
};

CompanyDrawer.propTypes = {
    company: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
    isOpen: PropTypes.bool,
    setIsOpen: PropTypes.func,
    landingPath: PropTypes.string
};

export default CompanyDrawer;