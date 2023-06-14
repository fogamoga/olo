import React from 'react'
import styles from './control-label.module.scss'
import clsx from 'clsx'

const ControlLabel = ({
  value,
  control,
  name = 'name',
  label,
  disabled = false,
  className = '',
  error,
  ...rest
}) => {
  
  const Control =
    React.cloneElement(control, {
      name,
      value,
      disabled,
      id: `name-${name}`,
      ...rest
    }) || null

  return (
    <label className={`${styles['root']} ${className}`}>
      {Control}
      <span className={clsx(styles['label'], {
        [styles['label_hasError']]: error
      })}>{label}</span>
    </label>
  )
}

export default ControlLabel
