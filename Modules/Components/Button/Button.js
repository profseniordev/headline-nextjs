import React from 'react';
import PropTypes from 'prop-types';

/**
 * Generic Button
 *
 * @param {Object} onClick - Function handler for onClick event
 * @param {ReactChildren} children - Children components
 * @param {boolean} disabled - Disabled state
 * @param {string} addClass - Additional modifier class name
 * @param {string} value - Initial value
 * @param {('button'|'reset'|'submit')} type - Type of button
 * @returns {*}
 * @constructor
 */
const Button = ({
       onClick = () => {},
       disabled = false,
       addClass = '',
       value = '',
       type = 'button',
       children
   }) =>
    <button
        className={ `ra-button ${ addClass }` }
        onClick={ onClick }
        disabled={ disabled }
        value={ value }
        type={ type }
    >
        { children }
    </button>;

Button.propTypes = {
    onClick: PropTypes.func,
    addClass: PropTypes.string,
    disabled: PropTypes.bool,
    value: PropTypes.string,
    type: PropTypes.oneOf(['submit', 'reset', 'button']),
    children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

export default Button;
