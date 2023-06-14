import React from 'react';
import clsx from 'clsx'
import PropTypes from 'prop-types';
import './typography.scss';
import styles from './typography.module.scss';

const variantMapping = {
  'h1': 'h1',
  'h2': 'h2',
  'h3': 'h3',
  'h4': 'h4',
  'h5': 'h5',
  'h6': 'h6',
  'h7': 'div',
  'p0': 'p',
  'p1': 'p',
  'p2': 'p',
  'p3': 'p',
  'p4': 'p',
  'p5': 'p',
  'p6': 'p',
  'p7': 'p',
  'p8': 'p',
  'p9': 'p',
  'p10': 'p',
  'p11': 'p',
  'p12': 'p',
}

const Typography = ({
  children,
  className,
  component,
  variant,
  color = null,
  weight = 'regular',
  noMargin,
  ...rest
}) => {
  
  const props = {...rest, className: clsx(
      className,
      styles.root,
      styles[weight],
      {
        [styles[variant]]: variant,
        [`color-static-${color}`]: color,
        [styles['no-margin']]: noMargin
      },
    ), children: children}
    
  if (React.isValidElement(component) ) {
    return React.cloneElement(component, {...props, ...component.props , className: clsx(props.className, component.props.className || {})})
  }
  
  
  const Component = component || (variantMapping[variant.toLowerCase()] || 'span')
  
  return <Component {...props}>
    {children}
  </Component>
};

Typography.propTypes = {
  'component': PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  'variant': PropTypes.oneOf(Object.keys(variantMapping)),
  'weight': PropTypes.oneOf(['light','regular', 'medium', 'bold']),
  'noMargin': PropTypes.bool,
};

Typography.defaultProps = {
  'variant': 'p1',
  'weight': 'regular'
};

export default Typography
