import React, { useEffect, useRef, useState } from 'react';
import './BottomDrawer.scss';
import PropTypes from 'prop-types';
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import Router from 'next/router';

/**
 * Sliding Bottom Drawer component
 * @param {ReactChildren} children - Children components
 * @param {string} addClass - Additional modifier class name
 * @param {boolean} isOpen
 * @callback [setIsOpen = () => {})] - Optional callback to update open state
 * @param {string} landingPath
 * @param {boolean} addScrollClass
 * @returns {JSX.Element}
 * @constructor
 */
const BottomDrawer = ({ children, addClass = '', isOpen, setIsOpen = () => {}, landingPath, addScrollClass = false, scrollLock = true }) => {
    const mainRef = useRef();
    const [isScrolled, setIsScrolled] = useState(false);

    if (addScrollClass === true) {
        const scroll = () => setIsScrolled(mainRef.current.scrollTop > 5);

        useEffect(() => {
            if (mainRef && mainRef.current) {
                mainRef.current.addEventListener('scroll', scroll);
                mainRef.current.addEventListener('touchmove', scroll);

                return () => {
                    mainRef.current.removeEventListener('scroll', scroll);
                    mainRef.current.removeEventListener('touchmove', scroll);
                };
            }
        }, [mainRef]);
    }

    useEffect(() => {
        scrollLock === true && isOpen === true ? disableBodyScroll(mainRef.current) : enableBodyScroll(mainRef.current);
        return () => {
            mainRef.current.scrollTop = 0;
            clearAllBodyScrollLocks();
        };
    }, [isOpen]);

    const close = () => {
        setIsOpen(false);
        Router.push(`/${ landingPath }`);
    }

    return (
        <div className={ `c-bottom-drawer ${ addClass } ${ isOpen ? 'is-open' : 'is-closed' }` }>
            <div className="c-bottom-drawer__overlay" onClick={ () => close() }></div>
            <div className={ `c-bottom-drawer__main ${ addScrollClass && isScrolled ? 'is-scrolled' : '' }` }  ref={ mainRef }>
                { children }
            </div>
        </div>
    );
};

BottomDrawer.propTypes = {
    children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    addClass: PropTypes.string
};

export default BottomDrawer;