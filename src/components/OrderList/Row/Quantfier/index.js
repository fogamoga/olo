import React from 'react'
import Container from '../../../ui/Container'
import styles from './quantifier.module.scss'
import PropTypes from 'prop-types'

const Quantifier = ({quantity, updateQuantity}) => {
  return (
    <Container display="flex" className={styles['quantifier']} flexJustify={'space-between'}>
      <span className={styles['quantifier__button']} onClick={() => updateQuantity(quantity-1)}>—</span>
      <span className={styles['quantifier__value']}>{quantity}</span>
      <span className={styles['quantifier__button']} onClick={() => updateQuantity(quantity+1)}>+</span>
    </Container>
  )
}

Quantifier.propTypes = {
  quantity: PropTypes.number,
  updateQuantity: PropTypes.func
}

export default Quantifier