import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import clsx from 'clsx'
import Typography from '../../Typography'
import Container from '../../Container'
import InputBase from '../InputBase'
import PropTypes from 'prop-types'
import Icon from '../../Icon'
import styles from '../form-controls.module.scss'
import OutsideClickHandler from 'react-outside-click-handler'
import Spinner from '../../Spinner'
import useDebounce from '../../../utils/useDebounce'

const Select = ({
  variant = 'outlined',
  className = '',
  focus = false,
  fullWidth = false,
  hidden = false,
  disabled = false,
  onChange = () => {},
  onChangeOption = () => {},
  onFocus = () => {},
  onClickHandle = () => {},
  label,
  error,
  placeholder,
  name,
  helperText = null,
  ControlProps = {},
  value = null,
  onBlur = () => {},
  onBlurOption = () => {},
  readOnly = false,
  emptyOptionLabel = '--Select--',
  options = [],
  style = {},
  activeOptionLabelTemplate = (activeOption) => activeOption.label,
  optionLabelTemplate = (option) => option.label,
  mode = 'default',
  getDataMethod = null,
  labelFieldName = 'label',
  showEmptyOption = true,
  groupName = null
}) => {
  const [optionsLoading, setOptionsLoading] = useState(false)
  const dropdownContainer = useRef()
  const [isFocused, setFocused] = useState(focus)
  
  const debounceIsFocused = useDebounce(isFocused, 125)
  
  const emptyOption = useMemo(() => ({ empty: true, label: emptyOptionLabel }),
    [emptyOptionLabel])
  
  const addEmpty = useCallback(
    (opts) => showEmptyOption ? [emptyOption, ...opts] : opts,
    [showEmptyOption, emptyOption])
  
  const [isEmpty, setEmpty] = useState(!value)
  const [currentOptions, setCurrentOptions] = useState(addEmpty(options))
  const [filteredOptions, setFilteredOptions] = useState(addEmpty(options))
  const [searchPhrase, setSearchPhrase] = useState('')
  const filterPagination = useRef()
  
  const selectText = useMemo(
    () => {
      
      const plainOptions = groupName ? currentOptions.reduce((acc, group) => {
        if (group.items) {
          acc = acc.concat(group.items)
        } else {
          acc.push(group)
        }
        
        return acc
      }, []) : currentOptions
      
      const activeOption = plainOptions.find(
        (option) => option.value === value)
      
      return activeOption ? activeOptionLabelTemplate(activeOption) : null
    }, [currentOptions, value, activeOptionLabelTemplate, groupName]
  )
  
  useEffect(() => {
    filterPagination.current = { page: 1, total_pages: 1 }
  }, [])
  
  useEffect(() => {
    if (!getDataMethod) {
      setCurrentOptions(addEmpty(options))
      setFilteredOptions(addEmpty(options))
    }
  }, [options, addEmpty, getDataMethod, setCurrentOptions, setFilteredOptions])
  
  const onChangeHandle = useCallback(
    (option) => {
      
      const { disabled, value, label, empty } = option
      
      setFocused(false)
      if (!disabled) {
        onChange(value || null)
        onChangeOption(option)
        setTimeout(() => {
          onBlur(value || null)
          onBlurOption(option)
        }, 125)
      }
      
      if (mode === 'filter') {
        if (empty) {
          setSearchPhrase('')
        } else {
          if (getDataMethod) {
            setCurrentOptions(filteredOptions)
          }
          setSearchPhrase(label)
        }
        
      }
    },
    [
      onChange,
      onBlur,
      setCurrentOptions,
      filteredOptions,
      setFocused,
      mode,
      getDataMethod,
      setSearchPhrase]
  )
  
  const getOptionsList = useCallback((searchPhrase) => {
    filterPagination.current = { page: 1, total_pages: 1 }
    
    setFilteredOptions([])
    setOptionsLoading(true)
    getDataMethod({ searchPhrase, page: filterPagination.current.page })
      .then(({ items, pagination }) => {
        setFilteredOptions(addEmpty(items))
        filterPagination.current = pagination
      })
      .then(() => setOptionsLoading(false))
      .catch(() => {
        setFilteredOptions(addEmpty([]))
      })
    
  }, [
    filterPagination,
    setOptionsLoading,
    getDataMethod,
    setFilteredOptions,
    setCurrentOptions,
    addEmpty])
  
  const getNextOptions = useCallback(() => {
    if (optionsLoading) {
      return false
    }
    
    setOptionsLoading(true)
    
    getDataMethod({ searchPhrase, page: filterPagination.current.page + 1 })
      .then(({ items, pagination }) => {
        setFilteredOptions(prev => ([...prev, ...items]))
        filterPagination.current = pagination
      })
      .then(() => setOptionsLoading(false))
      .catch((err) => {
        console.info(err)
      })
    
  }, [
    searchPhrase,
    optionsLoading,
    filteredOptions,
    setOptionsLoading,
    filterPagination,
    setFilteredOptions])
  
  useEffect(() => {
    
    if (debounceIsFocused && mode === 'filter' && getDataMethod) {
      getOptionsList(searchPhrase)
    } else {
      setFilteredOptions(
        searchPhrase ? [
          ...currentOptions.filter(
            (opt) => opt[labelFieldName].toLowerCase()
              .includes(searchPhrase.toLowerCase()))
        ] : currentOptions)
      
    }
  }, [searchPhrase])
  
  useEffect(() => {
    setEmpty(!value)
  }, [value])
  
  useEffect(() => {
    if (debounceIsFocused) {
    
    } else {
      
      if (mode === 'filter') {
        setSearchPhrase('')
        if (!getDataMethod) {
          setCurrentOptions(addEmpty(options))
          setFilteredOptions(addEmpty(options))
        }
      }
    }
  }, [
    debounceIsFocused,
    value,
    addEmpty,
    options,
  ])
  
  const handleClick = useCallback(
    (e) => {
      let ev = e.nativeEvent || e
      
      if (disabled || readOnly) {
        ev.stopImmediatePropagation()
        ev.preventDefault()
        
      } else {
        onClickHandle(e)
        setFocused(!debounceIsFocused)
      }
      
    },
    [debounceIsFocused, disabled, readOnly]
  )
  
  const startAdornment = ControlProps.startAdornment ? (
    <div
      className={clsx(
        styles['control__adornment'],
        styles['control__adornment_start']
      )}
    >
      {ControlProps.startAdornment}
    </div>
  ) : null
  
  const endAdornment = ControlProps.endAdornment ? (
    <div
      className={clsx(
        styles['control__adornment'],
        styles['control__adornment_end']
      )}
    >
      {ControlProps.endAdornment}
    </div>
  ) : null
  
  const Component = useMemo(() => mode === 'filter' ?
    <div className={clsx(styles['control'], ControlProps.className || '', {
      [styles['control_startAdornment']]: !!startAdornment,
      [styles['control_endAdornment']]: !!endAdornment
    })}>
      <div className={clsx(styles['control-component_select__current-value'], {
        [styles['control-component_select__current-value_visible']]: searchPhrase.length ===
        0,
        [styles['control-component_select__current-value_focused']]: debounceIsFocused
      })}>
        {selectText}
      </div>
      <InputBase
        value={searchPhrase}
        onChange={({ currentTarget: { value } }) => setSearchPhrase(value)}
        onFocus={() => {
          setFocused(true)
        }}
        onBlur={() => setTimeout(() => {
          setFocused(false)
        }, 125)}
        fullWidth
        className={styles['control-component_select__filter-input']}
      />
    </div>
    :
    React.createElement('input', {
      readOnly: true,
      value: selectText ? selectText : isEmpty && !!!label
        ? placeholder
        : '',
      onBlur: () => setTimeout(() => {
        setFocused(false)
      }, 125),
      className: clsx(styles['control'], ControlProps.className || '', {
        [styles['control_startAdornment']]: !!startAdornment,
        [styles['control_endAdornment']]: !!endAdornment
      }),
    }), [
    mode,
    selectText,
    isEmpty,
    startAdornment,
    endAdornment,
    debounceIsFocused,
    searchPhrase,
  ])
  
  return (
    <span
      className={clsx(
        'control-component',
        styles['control-component'],
        styles[`control-component_variant_${variant}`],
        styles[`control-component_select`],
        {
          [styles['control-component_empty']]: isEmpty && !disabled,
          [styles['control-component_focused']]: debounceIsFocused,
          [styles['control-component_error']]: error,
          [styles['control-component_fullWidth']]: fullWidth,
          [styles['control-component_withHelperText']]: helperText,
          [styles['control-component_hasAdornment']]:
          ControlProps.hasOwnProperty('startAdornment') ||
          ControlProps.hasOwnProperty('endAdornment'),
          [styles['control-component_hasStartAdornment']]:
          ControlProps.hasOwnProperty('startAdornment') &&
          ControlProps.startAdornment,
          [styles['control-component_hasEndAdornment']]:
          ControlProps.hasOwnProperty('endAdornment') &&
          ControlProps.endAdornment,
          [styles['control-component_hasLabel']]: !!label,
          [styles['control-component_disabled']]: disabled,
          [styles['control-component_hidden']]: hidden,
          [styles['control-component_readonly']]: readOnly
        },
        className
      )}
      style={style}
    >
      <OutsideClickHandler
        disabled={!debounceIsFocused}
        useCapture={true}
        onOutsideClick={handleClick}>
        <Container
          display={'flex'}
          component={'span'}
          className={clsx('control__wrapper', styles['control__wrapper'], {
            'control__wrapper_hasError': error,
          })}
        >
          <Typography
            variant={'p8'}
            component={
              <span
                className={clsx(
                  'control__controlWrapper',
                  styles['control__controlWrapper']
                )}
                onClick={handleClick}
              >
                {label && (
                  <label
                    className={clsx(styles['control__label'], {
                      [styles['control__label_shrink']]: debounceIsFocused ||
                      disabled || !isEmpty
                    })}
                  >
                    {label}
                  </label>
                )}
                {startAdornment}
                {Component}
      
                <div className={styles['control__triggerButtonContainer']}>
                  <Icon
                    name={'chevron-down'}
                    size={'m'}
                    className={clsx(styles['control__triggerButton'], {
                      [styles['control__triggerButton_disabled']]: disabled ||
                      readOnly
                    })}
                  />
                </div>
      
                {endAdornment}
              </span>
            }
          />
  
          {
            <div className={clsx(styles['control__dropdown'], {
              [styles['control__dropdown_visible']]: debounceIsFocused
            })}
                 ref={dropdownContainer}>
      
              <ul className={styles['control__dropdown-list']}>
                {filteredOptions?.length > 0 && (
                  filteredOptions.map((option) => {
                    return (!option[groupName]) ?
                      <li
                        key={name + '-' + option.value}
                        className={clsx(styles['control__dropdown-list-item'],
                          {
                            [styles['control__dropdown-list-item_empty']]:
                            option.empty,
                            [styles['control__dropdown-list-item_disabled']]:
                            option.disabled
                          })}
                        onClick={() => onChangeHandle(option)}
                      >
                        {option.empty ? option.label : optionLabelTemplate(
                          option)}
                      </li>
                      :
                      <li
                        className={styles['control__dropdown-list-group-item']}>
                        <div
                          className={styles['control__dropdown-list-group-name']}>{option.group}</div>
                        <ul>
                          {
                            option.items.map(option => <li
                              key={name + '-' + option.value}
                              className={clsx(
                                styles['control__dropdown-list-item'], {
                                  [styles['control__dropdown-list-item_empty']]:
                                  option.empty,
                                  [styles['control__dropdown-list-item_disabled']]:
                                  option.disabled
                                })}
                              onClick={() => onChangeHandle(option)}
                            >
                              {option.empty
                                ? option.label
                                : optionLabelTemplate(
                                  option)}
                            </li>)
                          }
                        </ul>
                      </li>
                  }))
                }
              </ul>
            </div>
          }
          
        </Container>
      </OutsideClickHandler>
      
      
      {helperText && (
        <Container
          display={'flex'}
          className={styles['control__helperText']}
        >
          <Icon
            name={!!error ? 'status error' : 'status warning'}
            color={error ? 'text-error' : 'secondary-42'}
            width={14}
          />
          <Typography
            variant={'p11'}
            component={'div'}
            className={styles['control__helperText-phrase']}
          >
            {helperText}
          </Typography>
        </Container>
      )}
      
    </span>
  )
}

Select.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    PropTypes.oneOf([null])
  ]),
  disabled: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  fullWidth: PropTypes.bool,
  helperText: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string,
    PropTypes.node
  ]),
  hidden: PropTypes.bool,
  ControlProps: PropTypes.object,
  label: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  variant: PropTypes.oneOf(['standard', 'outlined']),
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
      value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      disabled: PropTypes.bool
    })
  ),
  style: PropTypes.object,
  tabIndex: PropTypes.number,
  readOnly: PropTypes.bool,
  onClickHandle: PropTypes.func,
  onBlur: PropTypes.func,
  onFocusHandle: PropTypes.func,
  name: PropTypes.string,
  focus: PropTypes.bool,
  className: PropTypes.string,
  activeOptionLabelTemplate: PropTypes.func,
  mode: PropTypes.oneOf(['default', 'filter']),
  labelFieldName: PropTypes.string
}

export default Select