import React, { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './order-list.module.scss'
import OrderRow from './Row'
import Button from '../ui/Button'
import Container from '../ui/Container'
import { createPortal } from 'react-dom'
import Popup from './Popup'

const OrderList = () => {
  
  const {
    orderList
  } = useSelector((state) => ({
    orderList: state.orderList
  }))
  
  const dispatch = useDispatch()
  const [openPopup, setOpenPopup] = useState(false)
  const onRemoveRow = useCallback((id) => {
    dispatch({ type: 'REMOVE_FROM_ORDERLIST', payload: id })
  }, [dispatch])
  
  const onUpdateQuantity = useCallback((id, val) => {
    if (val !== 0) {
      dispatch({ type: 'UPDATE_QUANTITY_BY_ID', payload: { val, id } })
    }
    
  }, [dispatch])
  
  return (orderList.length > 0 && <div className={styles['container']}>
    <table className={styles['order-table']}>
      <thead>
      <tr>
        <td>
          Материал
        </td>
        <td>
          Габариты, мм
        </td>
        <td>
          Толщина, мм
        </td>
        <td className={styles['order-row__shape-column']}>
          Форма
        </td>
        <td>
          Цвет
        </td>
        <td className={styles['order-row__quantity-column']}>
          Количество
        </td>
        <td>
        
        </td>
      </tr>
      </thead>
      <tbody>
      {orderList.map(item => <OrderRow
        {...item}
        removeRow={onRemoveRow}
        updateQuantity={onUpdateQuantity}
      />)}
      </tbody>
    </table>
    <Container display={'flex'} flexJustify={'flex-end'}>
      <Button onClick={() => setOpenPopup(true)}>Отправить заявку</Button>
    </Container>
    {openPopup && createPortal(<Popup onClose={() => setOpenPopup(false)}/>,
      document.querySelector('#react-overlay'))}
  </div>)
}

export default OrderList