import React, { useCallback, useEffect, useMemo } from 'react'
import sharedStyles from '../selectors-shared.module.scss'
import config from '../../../config'
import styles from './shape-selecctor.module.scss'
import clsx from 'clsx'
import GroupTitle from '../../ui/GroupTitle'
import { useDispatch, useSelector } from 'react-redux'

const ShapeSelector = () => {
  const {
    shape,
    material
  } = useSelector((state) => ({
    shape: state.detail.shape,
    material: state.detail.material
  }))
  
  const shapes = useMemo(() => config.find(item => item.id === material.id)?.availableOpts.shapes || [],[material])
  
  const dispatch = useDispatch()
  
  useEffect(() => {
    setShape(shape || {id: shapes[0]?.id, title: shapes[0]?.title})
  }, [shapes])
  
  const setShape = useCallback(({id, title}) => {
    dispatch({ type: 'SET_DETAIL_VALUE', payload: { shape: {id, title} } })
  }, [])
  
  return <div className={sharedStyles['selector-group__container']}>
    <GroupTitle title={'Форма'} />
    <div className={
      clsx(sharedStyles['selector-group__controls-container'],
        'flex',
        'flex__wrap_wrap'
      )
    }>
      {shapes.map(
        ({ id, title, icon }, i) => <div onClick={() => setShape({id, title})}
          className={clsx(sharedStyles.tile, styles.tile, {
            [sharedStyles.tile_checked]: !!shape && (shape.id === id)
          })}
          key={'shape-'+id}
          title={title} id={id}>
          {React.createElement(icon, { className: styles.tile__icon })}
        </div>)}
    </div>
  </div>
}

export default ShapeSelector