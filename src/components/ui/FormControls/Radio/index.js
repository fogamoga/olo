import React, { useCallback } from 'react'
import styles from './radio.module.scss'
import clsx from 'clsx'

const Radio = ({ onChangeHandle, ...rest }) => {
  
  const onChange = useCallback((e) => {
    if (typeof onChangeHandle === 'function') {
      onChangeHandle(e.currentTarget.value)
    }
  },[onChangeHandle])
  
  return <span className={clsx(styles['radio-input'], {
    [styles['radio-input_disabled']]: rest.disabled,
    [styles['radio-input_checked']]: rest.checked,
  })}>
    
    <span className={styles['radio-input__control']}>
      <svg className={styles['radio-input__circle']} width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="9" cy="9" r="8" stroke="currentColor" strokeWidth="2"/>
      </svg>
    
      {!!rest.checked && <svg className={styles['radio-input__point']} width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="4" cy="4" r="4" fill="currentColor"/>
      </svg>}
    </span>
    
    <input
      {...rest}
      type="radio"
      onChange={onChange}
      className={styles['radio-input__native-control']}
    />
  </span>
}

export default Radio

