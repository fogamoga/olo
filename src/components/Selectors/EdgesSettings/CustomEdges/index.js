import React, { useCallback, useEffect, useMemo, useState } from 'react'
import sharedStyles from '../../selectors-shared.module.scss'
import Container from '../../../ui/Container'
import clsx from 'clsx'
import { useDispatch, useSelector } from 'react-redux'
import styles from '../../ColorSelector/colors.module.scss'
import Icon from '../../../ui/Icon'
import config from '../../../../config'
import customEdgesStyles from './custom-edge.module.scss'
import { createPortal } from 'react-dom'
import Popup from './Popup'
import GroupTitle from '../../../ui/GroupTitle'

const AVAILABLE_HEIGHTS = [0.4, 1, 2]

const CustomEdges = () => {
  const {
    material,
    edges,
  } = useSelector((state) => ({
    material: state.detail.material,
    edges: state.detail.edges || null
  }))
  
  const [openPopup, setOpenPopup] = useState(false)
  
  const [edgesState, setEdgesState] = useState(edges)
  const edgeColors = useMemo(
    () => config.find(item => item.id === material.id)?.availableOpts.edgeColors || [],
    [material])
  
  const dispatch = useDispatch()
  
  useEffect(() => {
    setEdgesValue(edgesState)
  }, [edgesState])
  
  useEffect(() => {
    const defaultColor =  {id: edgeColors[0].id, title: edgeColors[0].title}
    
    const defaultHeight = AVAILABLE_HEIGHTS[0]
    
    setEdgesState(edges || {
      left: {
        title: 'Левая',
        color: defaultColor,
        height: defaultHeight
      },
      right: {
        title: 'Правая',
        color: defaultColor,
        height: defaultHeight
      },
      top: {
        title: 'Верхняя',
        color: defaultColor,
        height: defaultHeight
      },
      bottom: {
        title: 'Нижняя',
        color: defaultColor,
        height: defaultHeight
      }
    })
  }, [edgeColors])
  
  const setEdgesValue = useCallback((edgesState) => {
    dispatch({ type: 'SET_DETAIL_VALUE', payload: { edges: edgesState } })
  }, [dispatch])
  
  const customizeEdge = useCallback((edgeName) => {
    setOpenPopup(edgeName)
  },[])
  
  return (
    <div
      className={sharedStyles['selector-group__container']}>
      <GroupTitle
        title={'Разные кромки'}
        description={'Настройте каждую кромку изделия'}/>
      <Container display={'flex'} flexDirection={'column'}>
        <div className={
          clsx(sharedStyles['selector-group__controls-container'],
            'flex',
            'flex__wrap_wrap'
          )
        }>
          {edges && Object.keys(edges).map((edgeName, i) => <div
            key={'edgeTile-' + edgeName}
            className={
              clsx(styles['option-container'],
                customEdgesStyles['option-container'])}
            title={edgeName}
            onClick={() => customizeEdge(edgeName)}
          >
            <div className={customEdgesStyles['edge-icon-container']}>
              <Icon name={'edge-' + edgeName}/>
            </div>
            <div
              className={clsx(sharedStyles.tile, styles.tile,
                customEdgesStyles.tile)}
              title={edgeName}>
              {
                React.createElement(edgeColors.find(
                    item => item.id === edges[edgeName].color.id).icon,
                  {
                    className: styles.tile__icon
                  })
              }
            </div>
            
            <div className={
              clsx(sharedStyles['tile__title'],
                styles['option-container__title'])
            }>
              {edges[edgeName].title}
            </div>
            <div className={customEdgesStyles['edge-icon-size']}>
              {`${edges[edgeName].height} мм`}
            </div>
          
          </div>)}
        </div>
      </Container>
      {openPopup && createPortal(<Popup edgeName={openPopup} edgeColors={edgeColors} title={edges[openPopup].title} onClose={()=>setOpenPopup(false)}/>, document.querySelector('#react-overlay'))}
    </div>
  )
}

export default CustomEdges