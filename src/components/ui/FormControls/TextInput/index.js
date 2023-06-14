import React, {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react'
import clsx from 'clsx'
import Typography from '../../Typography'
import Container from '../../Container'
import PropTypes from 'prop-types'
import styles from '../form-controls.module.scss'

const mergeRefs = (...refs) => {
  return (node) => {
    for (const ref of refs) {
      if (ref) {
        if (typeof ref === 'function') ref(node)
        if ('current' in ref) ref.current = node
      }
    }
  }
}

const InputComponent = forwardRef(({ multiline, InputProps, ...rest }, ref) =>
  React.createElement(multiline ? 'textarea' : 'input', {
    ref,
    title: rest.value,
    className: clsx(styles['control'], InputProps.className || '', {
      [styles['control_startAdornment']]: !!InputProps.startAdornment,
      [styles['control_endAdornment']]: !!InputProps.endAdornment
    }),
    ...rest
  })
)

const TextInput = forwardRef(
  (
    {
      defaultValue = undefined,
      searchInput = false,
      autocomplete = 'on',
      cleanButton = false,
      variant = 'outlined',
      className,
      focus = false,
      fullWidth,
      hidden,
      disabled,
      onChange = () => {},
      onPaste = () => {},
      label,
      error,
      placeholder,
      name,
      helperText,
      type = 'text',
      multiline = false,
      InputProps = {},
      value = undefined,
      onFocus = () => {},
      onBlur = () => {},
      onKeyDown = () => {},
      onKeyUp = () => {},
      readOnly = false,
      style,
      maxLength,
      autoFocus = false,
      min, max
    },
    ref
  ) => {
    const inputRef = useRef(null)
    
    const [isFocused, setFocused] = useState(focus)
    const [isActive, setActive] = useState(false)
    const [isEmpty, setEmpty] = useState(false)
    
    useEffect(() => {
      
      if (inputRef?.current?.value) {
        setEmpty(!inputRef.current.value)
      } else {
        if (typeof defaultValue !== 'undefined') {
          setEmpty(!defaultValue)
        } else {
          setEmpty(!value)
        }
      }
    }, [defaultValue, value, inputRef])
    
    const onChangeHandle = useCallback(
      (e) => {
        onChange(e)
        setEmpty(e.currentTarget.value.length === 0)
      },
      [onChange]
    )
  
    const onPasteHandle = useCallback(
      (e) => {
        onPaste(e)
        setEmpty(e.clipboardData.getData('Text').length === 0)
      },
      [onChange]
    )
    
    const onFocusHandle = (e) => {
      if (readOnly) {
        e.preventDefault()
        return
      }
      setFocused(true)
      onFocus(e)
    }
    
    const onBlurHandle = (e) => {
      if (readOnly) {
        e.preventDefault()
        return
      }
      setFocused(false)
      onBlur(e)
    }
    
    const onMouseDownHandle = (e) => {
      !readOnly && setActive(true)
    }
    
    const onMouseUpHandle = (e) => {
      !readOnly && setActive(false)
    }
    
    const setFocus = useCallback(
      () => !readOnly && inputRef.current && inputRef.current.focus(),
      [inputRef, readOnly]
    )
    
    const props = {
      name,
      disabled,
      hidden,
      value,
      onPaste: onPasteHandle,
      onChange: onChangeHandle,
      onFocus: onFocusHandle,
      onBlur: onBlurHandle,
      onMouseDown: onMouseDownHandle,
      onMouseUp: onMouseUpHandle,
      onKeyDown,
      onKeyUp,
      placeholder,
      type,
      autoComplete: autocomplete,
      defaultValue,
      readOnly,
      maxLength,
      autoFocus,
      min,
      max
    }
    
    const startAdornment = InputProps.startAdornment ? (
      <div
        className={clsx(
          styles['control__adornment'],
          styles['control__adornment_start']
        )}
      >
        {InputProps.startAdornment}
      </div>
    ) : null
    
    const endAdornment = InputProps.endAdornment ? (
      <div
        className={clsx(
          styles['control__adornment'],
          styles['control__adornment_end']
        )}
      >
        {InputProps.endAdornment}
      </div>
    ) : null
    
    return (
      <span
        className={clsx(
          'control-component',
          styles['control-component'],
          styles[`control-component_variant_${variant}`],
          {
            [styles['control-component_empty']]: isEmpty && !disabled,
            [styles['control-component_focused']]: isFocused,
            [styles['control-component_active']]: isActive,
            [styles['control-component_error']]: error,
            [styles['control-component_fullWidth']]: fullWidth,
            [styles['control-component_withHelperText']]: helperText,
            [styles['control-component_hasAdornment']]:
            (InputProps.hasOwnProperty('startAdornment') &&
              !!InputProps.startAdornment) ||
            (InputProps.hasOwnProperty('endAdornment') &&
              !!InputProps.endAdornment),
            [styles['control-component_hasStartAdornment']]:
              InputProps.hasOwnProperty('startAdornment') && !!InputProps.startAdornment,
            [styles['control-component_hasEndAdornment']]:
            InputProps.hasOwnProperty('endAdornment') && !!InputProps.endAdornment,
            [styles['control-component_hasLabel']]: !!label,
            [styles['control-component_disabled']]: disabled,
            [styles['control-component_hidden']]: hidden,
            [styles['control-component_readonly']]: readOnly
          },
          className
        )}
        style={style}
      >
        <Container
          display={'flex'}
          component={'span'}
          className={clsx('control__wrapper', styles['control__wrapper'], {
            control__wrapper_hasError: error
          })}
        >
          <div className={styles['control__label-height-wrapper']}>
          {label && (
            <label
              className={clsx(styles['control__label'], {
                [styles['control__label_shrink']]: isFocused || !isEmpty
              })}
            >
              {label}
            </label>
          )}
            <Typography
              variant={'p8'}
              component={
                <span
                  onClick={setFocus}
                  className={clsx(
                    'control__controlWrapper',
                    styles['control__controlWrapper'],
                    {
                      [styles['control__controlWrapper_default']]: !searchInput
                    }
                  )}
                >
                {startAdornment}
        
                  <InputComponent
                    multiline={multiline}
                    InputProps={InputProps}
                    ref={mergeRefs(ref, inputRef)}
                    {...props}
                  />
        
                  {endAdornment}
              </span>
              }
            />
        </div>
          {helperText && (
            <Container
              display={'flex'}
              className={styles['control__helperText']}
            >
              <Typography
                variant={'p11'}
                component={'div'}
                className={styles['control__helperText-phrase']}
              >
                {helperText}
              </Typography>
            </Container>
          )}
        </Container>
        
      </span>
    )
  }
)

TextInput.propTypes = {
  cleanButton: PropTypes.bool,
  disabled: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  fullWidth: PropTypes.bool,
  helperText: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  hidden: PropTypes.bool,
  InputProps: PropTypes.object,
  label: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  multiline: PropTypes.bool,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  variant: PropTypes.oneOf(['standard', 'outlined'])
}

export default TextInput
