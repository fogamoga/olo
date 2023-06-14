import fireboardImage from '../assets/selectors/materials/fireboard.png'
import glassImage from '../assets/selectors/materials/glass.png'
import laminatedChipboardImage from '../assets/selectors/materials/laminated-chipboard.png'
import mdfImage from '../assets/selectors/materials/mdf.png'
import plywoodImage from '../assets/selectors/materials/plywood.png'
import shapes from './shapes'
import colors from './colors'
import edgeColors from './edge-colors'

const materials =  [
  {
    id: 'fireboard',
    title: 'ДВП',
    icon: () => <img src={fireboardImage} alt={'fireboard'}/>,
    availableOpts: {
      shapes,
      colors,
    },
    availableMeasures: {
      radius: [50,100,150,200,250],
      height: [4],
      width: {
        min: 100,
        max: 1700
      },
      length: {
        min: 100,
        max: 2750
      }
    }
  },
  {
    id: 'glass',
    title: 'Стекло',
    icon: () => <img src={glassImage} alt={'glass'}/>,
    availableOpts: {
      shapes
    },
    availableMeasures: {
      radius: [50,100,150,200,250],
      height: [3, 6, 9],
      width: {
        min: 100,
        max: 1605,
      },
      length:  {
        min: 100,
        max: 2550
      }
    }
  },
  {
    id: 'laminated-fireboard',
    title: 'ЛДСП',
    icon: () => <img src={laminatedChipboardImage} alt={'laminated-fireboard'}/>,
    availableOpts: {
      shapes,
      colors,
      edgeColors
    },
    availableMeasures: {
      radius: [50,100,150,200,250],
      height: [16,26],
      width: {
        min: 100,
        max: 1380,
      },
      length:  {
        min: 100,
        max: 2700
      }
    }
  },
  {
    id: 'mdf',
    title: 'МДФ',
    icon: () => <img src={mdfImage} alt={'mdf'}/>,
    availableOpts: {
      shapes,
      colors,
      edgeColors
    },
    availableMeasures: {
      radius: [50,100,150,200,250],
      height: [16,26],
      width: {
        min: 100,
        max: 2380,
      },
      length:  {
        min: 100,
        max: 2600
      }
    }
  },
  {
    id: 'plywood',
    title: 'Фанера',
    icon: () => <img src={plywoodImage} alt={'plywood'}/>,
    availableOpts: {
      shapes,
    },
    availableMeasures: {
      radius: [50,100,150,200,250],
      height: [10,18],
      width: {
        min: 100,
        max: 1525,
      },
      length:  {
        min: 100,
        max: 1525
      }
    }
  },
]

export default materials