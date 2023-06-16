import React, { useMemo } from 'react'
import Icon from '../../ui/Icon'
import styles from '../order-list.module.scss'
import shapes from '../../../config/shapes'
import Quantifier from './Quantfier'

const OrderRow = ({
  material,
  width,
  length,
  height,
  shape,
  color,
  quantity,
  id,
  radius,
  removeRow = () => {},
  updateQuantity = () => {}
}) => {
  
  const IconComponent = useMemo(
    () => {
      const icon = shapes.find(item => item.id === shape.id)?.icon
      return icon ? icon : () =>
        <span>—</span>
    }, [shape, shapes])
  
  return (
    <tr>
      <td>{material.title}</td>
      <td>{`${width || '—'} × ${length || '—'} ${radius ? '× R'+radius : ''}`}</td>
      <td>{height || '—'}</td>
      <td className={styles['order-row__shape-column']} title={shape?.title}>
        <IconComponent/></td>
      <td>{color.title}</td>
      <td className={styles['order-row__quantity-column']}>
        <Quantifier quantity={quantity} updateQuantity={(val) => updateQuantity(id, val)}/>
      </td>
      <td>
        <span
          onClick={() => removeRow(id)}
          className={styles['order-row__remove-button']}>
          <Icon name={'remove'} color={'#DADADA'} size={'m'}/>
        </span>
      </td>
    </tr>
  )
}

export default OrderRow