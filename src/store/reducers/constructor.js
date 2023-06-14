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
      material: 'edge',
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

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_DETAIL_VALUE':
      return setOptionValue(state, action)
    case 'SET_CUSTOM_EDGES':
      return setCustomEdges(state, action)
    case 'MOVE_TO_ORDER_LIST':
      return addToOrderList(state)
    default:
      return state
  }
}

export default reducer
