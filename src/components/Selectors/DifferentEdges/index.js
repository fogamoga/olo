import React, { useEffect, useState } from 'react'
import sharedStyles from '../selectors-shared.module.scss'
import clsx from 'clsx'
import styles from './different-edges.module.scss'
import { useDispatch } from 'react-redux'
import Switcher from '../../ui/Switcher'

const DifferentEdges = () => {
  const dispatch = useDispatch()
  const [customEdges, setCustomEdges] = useState(false)
  
  useEffect(()=>{
    dispatch({ type: 'SET_CUSTOM_EDGES', payload: {customEdges} })
  },[customEdges])
  
  return (
    <div className={clsx(sharedStyles['selector-group__container'], styles['selector-group__container'])}>
      <Switcher value={customEdges} onChange={(e) => setCustomEdges(e.target.checked)}/>
    </div>
  )
}

export default DifferentEdges