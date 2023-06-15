import React from 'react'
import sharedStyles from '../../Selectors/selectors-shared.module.scss'

const GroupTitle = ({title, description = null}) => {
  return (
    <div className={sharedStyles['selector-group__title-container']}>
      <div className={sharedStyles['selector-group__title']}>{title}</div>
      {description && <div className={sharedStyles['selector-group__description']}>{description}</div>}
    </div>
  )
}

export default GroupTitle