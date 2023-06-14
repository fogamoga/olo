import ashWhite from '../assets/selectors/colors/ash-white.png'
import ashClassic from '../assets/selectors/colors/ash-classic.png'
import doratoOak from '../assets/selectors/colors/dorato-oak.png'
import goncalo from '../assets/selectors/colors/goncalo.png'
import wenge from '../assets/selectors/colors/wenge.png'
import wengeSheetPanel from '../assets/selectors/colors/wenge-sheet-panel.png'

const colors = [
  {
    id: 'wenge-sheet-panel',
    title: 'Листовая панель мдф венге',
    icon: () => <img src={wengeSheetPanel} alt={'wenge-sheet-panel'}/>
  },
  {
    id: 'wenge',
    title: 'Стеновая панель мдф венге',
    icon: () => <img src={wenge} alt={'wenge'}/>
  },
  {
    id: 'dorato-oak',
    title: 'Cтеновая панель мдф дуб дорато',
    icon: () => <img src={doratoOak} alt={'dorato-oak'}/>
  },
  {
    id: 'goncalo',
    title: 'Cтеновая панель мдф гонкало',
    icon: () => <img src={goncalo} alt={'goncalo'}/>
  },
  {
    id: 'ash-white',
    title: 'Стеновая панель МДФ Ясень белый',
    icon: () => <img src={ashWhite} alt={'ash-white'}/>
  },
  {
    id: 'ash-classic',
    title: 'Стеновая панель МДФ Ясень классический',
    icon: () => <img src={ashClassic} alt={'ash-classic'}/>
  },
]

export default colors