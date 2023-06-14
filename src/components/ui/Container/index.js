import React from 'react'
import styles from './container.module.scss'
import clsx from 'clsx'
import * as PropTypes from 'prop-types'

const Container = ({
  component,
  children,
  display,
  className,
  textAlign,
  vAlign,
  flexAlign,
  flexAlignSelf,
  flexJustify,
  flexDirection,
  centered,
  flexWrap,
  flexGrow,
  ...rest
}) => React.createElement(component || 'div', {...rest, children: children, className: clsx(className, {
    [styles['centered']]: !!centered,
    [styles[`text-align-${textAlign}`]]: textAlign,
    [styles[`vertical-align-${vAlign}`]]: vAlign,
    [styles[`display-${display}`]]: display,
    [styles[`flex-justify-${flexJustify}`]]: flexJustify,
    [styles[`flex-align-${flexAlign}`]]: flexAlign,
    [styles[`flex-direction-${flexDirection}`]]: flexDirection,
    [styles[`flex-align-self-${flexAlignSelf}`]]: flexAlignSelf,
    [styles[`flex-wrap-${flexWrap}`]]: flexWrap
  } ), style: {
  flexGrow
}})

Container.propTypes = {
  style: PropTypes.object,
  className: PropTypes.string,
  centered: PropTypes.bool,
  textAlign: PropTypes.oneOf([
    'left', 'center', 'right']),
  vAlign: PropTypes.oneOf([
    'baseline',
    'bottom',
    'middle',
    'sub',
    'super',
    'text-bottom',
    'text-top',
    'top',
    'inherit']),
  display: PropTypes.string,
  flexAlign: PropTypes.oneOf(['flex-start', 'center', 'flex-end', 'stretch', 'baseline']),
  flexJustify: PropTypes.oneOf([
    'flex-start',
    'center',
    'flex-end',
    'space-between',
    'space-around',
    'space-evenly']),
  flexWrap: PropTypes.oneOf([
    'nowrap',
    'wrap',
    'wrap-reverse',
  ])
}

export default Container
