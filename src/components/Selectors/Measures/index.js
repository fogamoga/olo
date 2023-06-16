import React, { useCallback, useEffect, useMemo, useState } from 'react'
import sharedStyles from '../selectors-shared.module.scss'
import GroupTitle from '../../ui/GroupTitle'
import clsx from 'clsx'
import { useDispatch, useSelector } from 'react-redux'
import config from '../../../config'
import TextInput from '../../ui/FormControls/TextInput'
import Select from '../../ui/FormControls/Select'
import styles from './measures.module.scss'

const HAS_RADIUS_MEASURE = ['rounded-rectangle', 'ellips']

const Measures = () => {
  
  const dispatch = useDispatch()
  
  const {detail
  } = useSelector((state) => ({
    detail: state.detail
  }))
  
  const [width, setWidth] = useState()
  const [height, setHeight] = useState()
  const [length, setLength] = useState()
  const [radius, setRadius] = useState()
  
  useEffect(()=>{
    const {width, height, length, radius} = detail
    if (!width) { setWidth(undefined)}
    if (!height) { setHeight(undefined)}
    if (!length) { setLength(undefined)}
    if (!radius) { setRadius(undefined)}
  },[detail])
  
  const availableMeasuresValues = useMemo(
    () => !detail.material ? null : config.find(
      item => item.id === detail.material.id).availableMeasures, [detail.material])
  
  const checkMinMax = useCallback((e, setter) => {
    if (e.target.value.length) {
      if (+e.target.value < +e.target.min) {
        setter(parseInt(+e.target.min))
        return
      }
      
      if (+e.target.value > +e.target.max) {
        setter(parseInt(+e.target.max))
        return
      }
  
      setter(parseInt(+e.target.value))
    }
  }, [])
  
  useEffect(() => {
    dispatch({ type: 'SET_DETAIL_VALUE', payload: { width: width, height: height, length: length, radius: radius } })
  },[width, height, length, radius])
  
  const showRadiusSelect = useMemo(() => HAS_RADIUS_MEASURE.includes(detail.shape?.id),[detail.shape])
  
  return (
    <div className={sharedStyles['selector-group__container']}>
      <GroupTitle title={'Габариты'} description={'Целые числа в мм'}/>
      <div className={
        clsx(sharedStyles['selector-group__controls-container'],
          'flex',
          'flex__wrap_wrap'
        )
      }>
        {availableMeasuresValues && <>
          <TextInput
            className={styles['input']}
            value={width}
            onChange={(e) => setWidth(e.currentTarget.value)}
            onBlur={(e) => checkMinMax(e, setWidth)}
            type={'number'}
            label={'Ширина, мм'}
            min={availableMeasuresValues?.width?.min || 0}
            max={availableMeasuresValues?.width?.max || undefined}
            helperText={`от ${availableMeasuresValues?.width?.min} до ${availableMeasuresValues?.width?.max}`}
          
          />
          
          <TextInput
            className={styles['input']}
            value={length}
            onChange={(e) => setLength(e.currentTarget.value)}
            onBlur={(e) => checkMinMax(e, setLength)}
            type={'number'}
            label={'Длина, мм'}
            min={availableMeasuresValues?.length?.min || 0}
            max={availableMeasuresValues?.length?.max || 0}
            helperText={`от ${availableMeasuresValues?.length?.min} до ${availableMeasuresValues?.length?.max}`}
          />
          
          <Select
            className={styles['select']}
            value={height}
            label={'Толщина, мм'}
            emptyOptionLabel={'--Очистить--'}
            options={availableMeasuresValues.height.map(
              (val) => ({ value: val, label: ''+val }))}
            onChange={setHeight}
          />

          {availableMeasuresValues.radius && showRadiusSelect && <Select
            value={radius}
            className={styles['select']}
            label={'Радиус, мм'}
            emptyOptionLabel={'--Очистить--'}
            options={availableMeasuresValues.radius.map(
              (val, i) => ({ value: val, label: ''+val }))}
            onChange={setRadius}
          />}
          
          
        
        </>}
      
      </div>
    </div>
  )
}

export default Measures