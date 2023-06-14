import React from 'react'
import clsx from 'clsx'
import iconsSet from './config'
import styles from './icon.module.scss'
import * as PropTypes from 'prop-types'

const sizeMap = {
  s: 16,
  m: 24,
  l: 32,
  xl: 40
}

const Icon = ({
  name,
  size = 'l',
  color,
  className,
  width,
  height,
  bgColor= null,
  rounded = false,
  active = false,
  inheritColor = false,
  style,
  ...rest
}) => {
  
  const widthVal = width ? width : sizeMap[size]
  const heightVal = height ? height : !height && width ? width : sizeMap[size]
  
  if (!iconsSet[name]) {
    return <span/>
  }
  
  const alterSizes = typeof iconsSet[name]['render'] === 'undefined'
    ? Object.values(iconsSet[name])
    : null
  
  const Component = typeof iconsSet[name][size] !== 'undefined'
    ? iconsSet[name][size]
    : (alterSizes && alterSizes.length > 0 ? alterSizes[alterSizes.length-1] : iconsSet[name])
  
  const colorsStaticSuffix = inheritColor ? '' : '-static'
  
  const sizeProps = size === 'as-is' ? {} : {
    width: widthVal,
    height: heightVal
  }
  
  return <Component
    className={
    clsx(
      'icon',
      styles.root,
      styles[size], {
        [`color${colorsStaticSuffix}-${color}`]: !inheritColor && color,
        [`bg-color${colorsStaticSuffix}-${bgColor}`]: !inheritColor && bgColor,
        [styles.inheritColor]: !!inheritColor
      },
      className)
    }
    {...sizeProps}
    style={{...style, minWidth: widthVal}}
    {...rest}
  />
}


Icon.propTypes = {
  width: PropTypes.number,
  name: PropTypes.string,
  size: PropTypes.oneOf(['s', 'm', 'l', 'xl', 'as-is']),
  rounded: PropTypes.bool
}

export default Icon
