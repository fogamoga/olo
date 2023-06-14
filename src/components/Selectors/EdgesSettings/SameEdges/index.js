import React, { useCallback, useEffect, useMemo, useState } from 'react'
import sharedStyles from '../../Shared/selectors-shared.module.scss'
import GroupTitle from '../../Shared/GroupTitle'
import clsx from 'clsx'
import config from '../../../../config'
import styles from '../../ColorSelector/colors.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import Select from '../../../ui/FormControls/Select'
import Container from '../../../ui/Container'

const AVAILABLE_HEIGHTS = [0.4, 1, 2]

const SameEdges = () => {
  const {
    material,
    edge,
  } = useSelector((state) => ({
    material: state.detail.material,
    edge: state.detail.edge
  }))
  
  const [edgeState, setEdgeState] = useState(edge)
  const edgeColors = useMemo(
    () => config.find(item => item.id === material.id)?.availableOpts.colors || [],
    [material])
  const dispatch = useDispatch()
  
  useEffect(() => {
    console.log(edgeState)
    setEdgeValue(edgeState)
  }, [edgeState])
  
  useEffect(() => {
    const {id, title} = edgeColors[0]
    setEdgeState(edge || {color: {id, title}, height: AVAILABLE_HEIGHTS[0]})
  }, [edgeColors])
  
  const setEdgeValue = useCallback((edgeState) => {
    dispatch({ type: 'SET_DETAIL_VALUE', payload: { edge: edgeState } })
  },[dispatch])
  
  return (
    <div
      className={sharedStyles['selector-group__container']}>
      <GroupTitle
        title={'Цвет кромки'}
        description={'Кромка одинаковая по всем сторонам изделия'}/>
      <Container display={'flex'} flexDirection={'column'}>
        <div className={
          clsx(sharedStyles['selector-group__controls-container'],
            'flex',
            'flex__wrap_wrap'
          )
        }>
          {edgeColors.map(
            ({ id, title, icon }, i) => <div
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
                {React.createElement(icon, { className: styles.tile__icon })}
              </div>
              <div className={
                clsx(sharedStyles['tile__title'],
                  styles['option-container__title'])
              }>{title}</div>
            </div>)}
        </div>
        <div>
          <Select
            value={edge?.height}
            options={AVAILABLE_HEIGHTS.map(val => ({ label: '' + val, value: val }))}
            label={'Толщина кромки'}
            emptyOptionLabel={'--Очистить--'}
            onChange={(height) => setEdgeState({
              ...edgeState, height
            })}
            fullWidth
          />
        </div>
      </Container>
    </div>
  )
}

export default SameEdges