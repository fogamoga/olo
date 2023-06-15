import React, { useCallback, useEffect, useMemo } from 'react'
import sharedStyles from '../selectors-shared.module.scss'
import GroupTitle from '../../ui/GroupTitle'
import clsx from 'clsx'
import config from '../../../config'
import styles from './colors.module.scss'
import { useDispatch, useSelector } from 'react-redux'

const ColorSelector = () => {
  
  const {
    color,
    material
  } = useSelector((state) => ({
    color: state.detail.color,
    material: state.detail.material
  }))
  
  const dispatch = useDispatch()
  
  const colors = useMemo(() => config.find(item => item.id === material.id)?.availableOpts.colors || [],[material])
  
  useEffect(() => {
    setColor(color || {id:colors[0].id, title :colors[0].title})
  }, [])
  
  const setColor = useCallback(({id, title}) => {
    dispatch({ type: 'SET_DETAIL_VALUE', payload: { color: { id, title } } })
  }, [])
  
  return (
    <div className={clsx(sharedStyles['selector-group__container'], styles['selector-group__container'] )}>
      <GroupTitle title={'Цвет детали'}/>
      <div className={
        clsx(sharedStyles['selector-group__controls-container'],
          'flex',
          'flex__wrap_wrap'
        )
      }>
        {colors.map(
          ({ id, title, icon }, i) => <div key={'color-'+id} className={styles['option-container']} onClick={() => setColor({id, title})}>
            <div
              className={clsx(sharedStyles.tile, styles.tile, {
                [sharedStyles.tile_checked]: color && (color.id === id)
              })}
              title={title} id={id}>
              {React.createElement(icon, { className: styles.tile__icon })}
            </div>
            <div className={clsx(sharedStyles['tile__title'], styles['option-container__title'])}>{title}</div>
          </div>)}
      </div>
    </div>
  )
}

export default ColorSelector