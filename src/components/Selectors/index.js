import React, { useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ShapeSelector from './ShapeSelector'
import MaterialSelector from './MaterialSelector'
import ColorSelector from './ColorSelector'
import Measures from './Measures'
import DifferentEdges from './DifferentEdges'
import {SameEdges, CustomEdges} from './EdgesSettings'
import Button from '../ui/Button'
import config from '../../config'

const Selectors = () => {
  
  const dispatch = useDispatch()
  
  const {
    detail
  } = useSelector((state) => ({
    detail: state.detail
  }))
  
  const availableSelector = useMemo(() => {
    if (!detail.material) {
      return []
    }
    
    return Object.keys(
      config.find(item => item.id === detail.material.id).availableOpts)
  }, [detail])
  
  const addToOrderList = useCallback(() => {
    dispatch({type: 'MOVE_TO_ORDER_LIST'})
  },[dispatch])
  
  return (
    <div>
      <MaterialSelector/>
      {availableSelector.includes('shapes') && <ShapeSelector/>}
      {availableSelector.includes('colors') && <ColorSelector/>}
      <Measures/>
      {
        availableSelector.includes('edgeColors') && <>
          <DifferentEdges />
          { detail.customEdges ? <CustomEdges /> : <SameEdges />}
        </>
      }
      <Button className="add-button" onClick={()=> addToOrderList()}>Добавить в заявку</Button>
    </div>
  )
}

export default Selectors