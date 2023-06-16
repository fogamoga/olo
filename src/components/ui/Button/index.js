import React from 'react'
import styles from  './button.module.scss'
import clsx from 'clsx'

const Button = ({children, className = '', ...rest}) => {
  return (
      <button className={clsx(styles.button, className)} {...rest}>
        {children}
      </button>
  )
}

export default Button