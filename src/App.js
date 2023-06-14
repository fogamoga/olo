import 'normalize.css'
import './App.scss'

import OrderList from './components/OrderList'
import { Provider } from 'react-redux'
import store from './store/index'
import Selectors from './components/Selectors'

function App () {
  return (
    <Provider store={store}>
      <div className={'center'}>
        <div id="react-overlay"/>
        <h1 className={'h1'}>Мебельные детали по индивидуальным размерам</h1>
        <div className="constructor__container">
          <Selectors />
        </div>
        <div className="application__container">
          <OrderList />
        </div>
      </div>
    </Provider>
  )
}

export default App
