import aluminium from '../assets/selectors/edge-colors/aluminium.png'
import ashShimo from '../assets/selectors/edge-colors/ash-shimo-light.png'
import black from '../assets/selectors/edge-colors/black.png'
import blue from '../assets/selectors/edge-colors/blue.png'
import cream from '../assets/selectors/edge-colors/cream.png'
import grey from '../assets/selectors/edge-colors/grey.png'
import oak from '../assets/selectors/edge-colors/oak.png'
import snowWhite from '../assets/selectors/edge-colors/snow-white.png'
import white from '../assets/selectors/edge-colors/white.png'

const edgeColors = [
  {
    id: 'snow-white',
    title: 'Белоснежная',
    icon: () => <img src={snowWhite} alt={'snow-white'}/>
  },
  {
    id: 'cream',
    title: 'Кремовая',
    icon: () => <img src={cream} alt={'cream'}/>
  },
  {
    id: 'white',
    title: 'Белая',
    icon: () => <img src={white} alt={'white'}/>
  },
  {
    id: 'blue',
    title: 'Светло-синяя',
    icon: () => <img src={blue} alt={'blue'}/>
  },
  {
    id: 'black',
    title: 'Черная',
    icon: () => <img src={black} alt={'black'}/>
  },
  {
    id: 'grey',
    title: 'Светло-серая',
    icon: () => <img src={grey} alt={'grey'}/>
  },
  {
    id: 'ash-shimo-light',
    title: 'Светло-серая',
    icon: () => <img src={ashShimo} alt={'ash-shimo-light'}/>
  },
  {
    id: 'aluminium',
    title: 'Аллюминий',
    icon: () => <img src={aluminium} alt={'alu,inium'}/>
  },
  {
    id: 'oak',
    title: 'Дуб',
    icon: () => <img src={oak} alt={'oak'}/>
  },
]

export default edgeColors