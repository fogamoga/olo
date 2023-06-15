import React, { useMemo } from 'react'
import Icon from '../../ui/Icon'

const OrderRow = ({
  material,
  width,
  length,
  height,
  shape,
  color,
  quantity
}) => {
  
  return (
    <tr>
      <td>{material.title}</td>
      <td>{`${width || '—'} × ${length || '—'}`}</td>
      <td>{height || '—'}</td>
      <td>{shape?.title || '—'}</td>
      <td>{color.title}</td>
      <td>{quantity}</td>
      <td><Icon name={'remove'} color={'#DADADA'} size={'m'}/></td>
    </tr>
  )
}

export default OrderRow