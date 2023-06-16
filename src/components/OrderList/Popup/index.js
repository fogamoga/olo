import React, { useCallback, useState } from 'react'
import styles from './popup.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import clsx from 'clsx'
import sharedStyles from '../../Selectors/selectors-shared.module.scss'
import TextInput from '../../ui/FormControls/TextInput'
import Container from '../../ui/Container'
import Button from '../../ui/Button'

const EdgesPopup = ({ onClose, edgeName, title, edgeColors }) => {
  const {
    orderList,
  } = useSelector((state) => ({
    orderList: state.orderList
  }))
  
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  
  const dispatch = useDispatch()
  
  const sendOrder = useCallback(() => {
    !!global.sendOrder && global.sendOrder({ orderList, name, phone })
    
    dispatch({ type: 'CLEAR_ORDER' })
  }, [orderList, name, phone])
  
  return (
    <div className={styles['popup']}>
      <div className={styles['popup__overlay']} onClick={onClose}/>
      <div className={styles['popup__content-container']}>
        <div className={styles['popup__content']}>
          <Container
            display={'flex'}
            flexJustify={'center'}
            className={
              clsx(sharedStyles['selector-group__title'], styles['title'])
            }>
            Отправить заявку
          </Container>
          <p>
            <TextInput
              placeholder={'Ваше имя'}
              name={'name'}
              fullWidth
              onChange={(e) => setName(e.currentTarget.value)}
            />
          </p>
          <p>
            <TextInput placeholder={'Контакнтый номер'} name={'phone'} fullWidth
                       onChange={(e) => setPhone(e.currentTarget.value)}/>
          </p>
          
          <ul className={styles['order-text']}>
            {orderList.map(({
              material,
              width,
              length,
              height,
              radius,
              shape,
              color,
              quantity,
            }) => <li
              className={styles['order-item']}>{`Материал: ${material.title}, ${shape.title
              ? 'Форма: ' + shape.title + ','
              : ''} Габариты (ШВТ): ${width || '—'} × ${length ||
            '—'} × ${height || '—'} ${radius
              ? '× R' + radius
              : ''}, Цвет: ${color.title}, Кол-во: ${quantity}`}</li>)}
          </ul>
          
          <Container display={'flex'} flexJustify={'flex-end'}>
            <Button onClick={() => sendOrder()}>Отправить</Button>
          </Container>
        
        </div>
      </div>
    </div>
  )
}

export default EdgesPopup