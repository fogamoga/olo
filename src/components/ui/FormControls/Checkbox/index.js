import React from 'react'

const Checkbox = ({ onChangeHandle, ...rest }) => <input type="checkbox" onChange={onChangeHandle} onTouchEnd={onChangeHandle} {...rest} />


export default Checkbox
