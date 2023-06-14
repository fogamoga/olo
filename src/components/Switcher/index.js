import React from 'react'
import styles from './switcher.module.scss'
import clsx from 'clsx'

const Switcher = ({className, ...rest}) => (
  <label className={styles['label']}>
    <input className={clsx(styles['root'], className)} type='checkbox' {...rest} />
    <span className={styles['label-text']}>Разный цвет кромок</span>
  </label>
)

export default Switcher
