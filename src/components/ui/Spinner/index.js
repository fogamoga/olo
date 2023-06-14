import React from 'react'
import Icon from '../Icon'
import clsx from 'clsx'
import styles from './spinner.module.scss'
import PropTypes from 'prop-types'

const Spinner = ({
  className,
  width = 40,
  color = 'basic-primary-blue',
  ...rest
}) => {
  return <Icon
    name={'spinner'}
    className={clsx(className, styles.spinner)}
    width={width}
    color={color}
    {...rest} />
}

Spinner.propTypes = {
  className: PropTypes.string,
  width: PropTypes.number,
  color: PropTypes.string
}

export default Spinner
