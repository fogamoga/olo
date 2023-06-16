import { v4 as uuidv4 } from 'uuid'

const blankDetail = {}

const initialState = {
  detail: {},
  orderList: []
}

const setOptionValue = (state, { payload }) => {
  const newOptions = { detail: { ...state.detail, ...payload } }
  const updatedState = { ...state, ...newOptions }
  return { ...state, ...updatedState }
}

const setCustomEdges = (state, { payload }) => {
  return {
    ...state,
    detail: {
      ...state.detail,
      customEdges: payload.customEdges,
    }
  }
}

const addToOrderList = (state) => {
  let edgesDetails = []
  if (state.detail.customEdges) {
    edgesDetails = edgesDetails.concat(Object.keys(state.detail.edges).map((edgeName) => ({
      ...state.detail.edges[edgeName],
      material: {id: 'edge', title: 'Кромка'},
      shape: edgeName,
      quantity: 1,
      id: uuidv4()
    })))
  } else {
    if (state.detail.edge) {
      edgesDetails = edgesDetails.concat([{
        ...state.detail.edge,
        material: { id: 'edge',  title: 'Кромка'},
        quantity: 4,
        shape: 'edge',
        id: uuidv4()
      }])
    }
  }
  
  return {
    ...state,
    detail: { ...blankDetail },
    orderList: [...state.orderList,
      {
        ...state.detail,
        quantity: 1,
        id: uuidv4()
      }].concat(edgesDetails)
  }
}

const removeFromOrderList = (state, {payload}) => ({
  ...state,
  orderList: [...state.orderList.filter(item => item.id !== payload)]
})

const updateQuantityById = (state, {payload}) => ({
  ...state,
  orderList: [...state.orderList.map(item => {
    if (item.id === payload.id) {
      return {...item, quantity: payload.val}
    } else {
      return item
    }
  })]
})

const clearOrder = (state) => {
  return {
    detail: { ...blankDetail},
    orderList: []
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_DETAIL_VALUE':
      return setOptionValue(state, action)
    case 'SET_CUSTOM_EDGES':
      return setCustomEdges(state, action)
    case 'MOVE_TO_ORDER_LIST':
      return addToOrderList(state)
    case 'REMOVE_FROM_ORDERLIST':
      return removeFromOrderList(state, action)
    case 'UPDATE_QUANTITY_BY_ID':
      return  updateQuantityById(state, action)
    case 'CLEAR_ORDER':
      return clearOrder(state, action)
    default:
      return state
  }
}

export default reducer
