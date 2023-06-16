import React, { useCallback, useEffect, useMemo, useState } from 'react'
import styles from './popup.module.scss'
import Select from '../../../../ui/FormControls/Select'
import { useDispatch, useSelector } from 'react-redux'
import clsx from 'clsx'
import sharedStyles from '../../../selectors-shared.module.scss'

const AVAILABLE_HEIGHTS = [0.4, 1, 2]

const EdgesPopup = ({onClose, edgeName, title, edgeColors}) => {
  const {
    edges,
  } = useSelector((state) => ({
    edges: state.detail.edges || null
  }))
  
  const dispatch = useDispatch()
  
  const [edgeState, setEdgeState] = useState(edges[edgeName])
  
  const edge = useMemo(() => edges[edgeName],[edges, edgeName])
  
  useEffect(() => {
    setEdgeValue(edgeState)
  }, [edgeState])
  
  
  const setEdgeValue = useCallback((edgeState) => {
    dispatch({ type: 'SET_DETAIL_VALUE', payload: { edges: { ...edges, [edgeName]: edgeState } } })
  },[dispatch, edgeName, edges])
  
  
  return (
    <div className={styles['popup']} >
    <div className={styles['popup__overlay']} onClick={onClose}/>
    <div className={styles['popup__content-container']}>
      <div className={styles['popup__content']}>
        <div className={clsx(sharedStyles['selector-group__title'], styles['title'])}>{`${title} кромка`}</div>
  
        <Select
          value={edge?.height}
          options={AVAILABLE_HEIGHTS.map(val => ({ label: '' + val, value: val }))}
          label={'Толщина кромки'}
          emptyOptionLabel={'--Очистить--'}
          onChange={(height) => setEdgeState({
            ...edgeState, height
          })}
          fullWidth
          className={styles['height-selector']}
        />
  
        <div className={clsx(sharedStyles['selector-group__title'], styles['title'])}>Цвет</div>
        <div className={
          clsx(sharedStyles['selector-group__controls-container'],
            'flex',
            'flex__wrap_wrap'
          )
        }>
          {edgeColors && edgeColors.map(
            ({ id, title, icon }) => <div
              key={'edgeColor-' + id}
              className={styles['option-container']}
              onClick={() => setEdgeState({
                ...edgeState, color: {id, title}
              })}>
              <div
                className={clsx(sharedStyles.tile, styles.tile, {
                  [sharedStyles.tile_checked]: id === edge?.color.id
                })}
                title={title} id={id}>
                {React.createElement(icon, { className: styles['tile__icon'] })}
              </div>
              <div className={clsx(sharedStyles['tile__title'], styles['option-container__title'])}>{title}</div>
            </div>)}
        </div>
      </div>
    </div>
    </div>
  )
}

export default EdgesPopup