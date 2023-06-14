import React from 'react'
import { useSelector } from 'react-redux'
import Icon from '../ui/Icon'
import styles from './order-list.module.scss'
import OrderRow from './Row'

const OrderList = () => {
  
  const {
    orderList
  } = useSelector((state) => ({
    orderList: state.orderList
  }))
  
  return (orderList.length > 0 && <div className={styles['container']}>
      <table className={styles['table']}>
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
          <td>
            Форма
          </td>
          <td>
            Цвет
          </td>
          <td>
            Количество
          </td>
          <td>
          
          </td>
        </tr>
        </thead>
        <tbody>
        {orderList.map(item => <OrderRow {...item} />)}
        </tbody>
      
      </table>
    </div>)
}

export default OrderList