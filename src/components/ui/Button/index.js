import React from 'react'
import styles from  './button.module.scss'
import clsx from 'clsx'
import sharedStyles from '../../Selectors/Shared/selectors-shared.module.scss'

const Button = ({children, className = '', ...rest}) => {
  return (
    <div className={sharedStyles['selector-group__container']}>
      <button className={clsx(styles.button, className)} {...rest}>
        {children}
      </button>
    </div>
  )
}

export default Button