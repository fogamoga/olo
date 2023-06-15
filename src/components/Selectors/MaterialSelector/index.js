import React, { useCallback, useEffect } from 'react'
import sharedStyles from '../selectors-shared.module.scss'
import clsx from 'clsx'
import config from '../../../config'
import styles from './material.module.scss'
import GroupTitle from '../../ui/GroupTitle'
import { useDispatch, useSelector } from 'react-redux'

const MaterialSelector = () => {
  
  const dispatch = useDispatch()
  
  const {
    material
  } = useSelector((state) => ({
    material: state.detail.material
  }))
  
  const setMaterial = useCallback(({ id, title }) => {
    dispatch({ type: 'SET_DETAIL_VALUE', payload: { material: { id, title } } })
  }, [dispatch])
  
  useEffect(() => {
    setMaterial({ id: config[0].id, title: config[0].title })
  }, [])
  
  useEffect(() => {
    if (!material) {
      setMaterial({ id: config[0].id, title: config[0].title })
    }
  }, [material])
  
  return <div
    className={sharedStyles['selector-group__container']}>
    <GroupTitle title={'Материал'}/>
    <div className={
      clsx(sharedStyles['selector-group__controls-container'],
        'flex',
        'flex__wrap_wrap'
      )
    }>
      {config.map(
        ({ id, title, icon }, i) => <div
          key={'material-' + id}
          className={styles.tile__title}
          onClick={() => setMaterial({ id, title })}>
          <div
            className={clsx(sharedStyles.tile, styles.tile, {
              [sharedStyles.tile_checked]: material && (material.id === id)
            })}
            title={title} id={id}>
            {React.createElement(icon, { className: styles.tile__icon })}
          </div>
          <div className={sharedStyles['tile__title']}>{title}</div>
        </div>)}
    </div>
  </div>
  
}

export default MaterialSelector