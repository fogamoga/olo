import React, { useCallback, useEffect, useRef, useState } from 'react'
import styles from './inputbase.module.scss'
import clsx from 'clsx'
import Typography from '../../Typography'
import Container from '../../Container'
import PropTypes from 'prop-types'

const InputBase = ({
  autocomplete = 'on',
  className,
  focus = false,
  fullWidth,
  hidden,
  disabled,
  onChange = () => {},
  error,
  placeholder,
  name,
  type = 'text',
  multiline = false,
  value = undefined,
  onFocus = () => {},
  onBlur = () => {}
}) => {
  const [isFocused, setFocused] = useState(focus)
  const [isEmpty, setEmpty] = useState(false)
  const inputRef = useRef(null)

  const onChangeHandle = useCallback(
    (e) => {
      onChange(e)
    },
    [onChange]
  )

  const onFocusHandle = useCallback(
    (e) => {
      setFocused(true)
      onFocus(e)
    },
    [onFocus]
  )

  const onBlurHandle = useCallback(
    (e) => {
      setFocused(false)
      onBlur(e)
    },
    [onBlur]
  )

  useEffect(() => {
    setEmpty(!value || value.length === 0)
  }, [value])

  const props = {
    name,
    disabled,
    hidden,
    value,
    onChange: onChangeHandle,
    onFocus: onFocusHandle,
    onBlur: onBlurHandle,
    ref: inputRef,
    placeholder: placeholder,
    type,
    autoComplete: autocomplete
  }
  const Component = React.createElement(multiline ? 'textarea' : 'input', {
    className: clsx(styles['input']),
    ...props
  })

  return (
    <span
      className={clsx(className, styles['input-component'], {
        [styles['input-component_hidden']]: hidden,
        [styles['input-component_disabled']]: disabled,
        [styles['input-component_empty']]: isEmpty,
        [styles['input-component_focused']]: isFocused,
        [styles['input-component_error']]: error,
        [styles['input-component_fullWidth']]: fullWidth
      })}
    >
      <Container
        display={'flex'}
        component={'span'}
        className={styles['input__wrapper']}
      >
        <Typography variant={'p8'} component={Component} />
      </Container>
    </span>
  )
}

InputBase.propTypes = {
  cleanButton: PropTypes.bool,
  variant: PropTypes.oneOf(['standard', 'outlined']),
  defaultValue: PropTypes.string,
  fullWidth: PropTypes.bool,
  hidden: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  helperText: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  multiline: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  InputProps: PropTypes.object
}

export default InputBase
