import ellipsImage from '../assets/selectors/shapes/ellips.png'
import halfRoundImage from '../assets/selectors/shapes/half-round.png'
import hexagonImage from '../assets/selectors/shapes/hexagon.png'
import ovalImage from '../assets/selectors/shapes/oval.png'
import rectangleImage from '../assets/selectors/shapes/rectangle.png'
import roundImage from '../assets/selectors/shapes/round.png'
import squareImage from '../assets/selectors/shapes/square.png'
import triangleImage from '../assets/selectors/shapes/triangle.png'
import triangleIsoImage from '../assets/selectors/shapes/triangle-isosceles.png'
import quadrantImage from '../assets/selectors/shapes/quadrant.png'
import roundedRectangleImage from '../assets/selectors/shapes/rounded-rectangle.png'

const shapes = [
  {
    id: 'rectangle',
    title: 'Прямоугольная',
    icon: () => <img src={rectangleImage} alt={'rectangle'} />,
    measures: {
      width: 0,
      height: 0,
      length: 0,
    }
  },
  {
    id: 'hexagon',
    title: 'Шестигранный',
    icon: () => <img src={hexagonImage} alt={'hexagon'}/>,
    measures: {
      width: 0,
      height: 0,
      length: 0,
    }
  },
  {
    id: 'round',
    title: 'Круг',
    icon: () => <img src={roundImage} alt={'round'}/>,
    measures: {
      width: 0,
      height: 0,
      length: 0,
    }
  },
  {
    id: 'quadrant',
    title: 'Четверть окружности',
    icon: () => <img src={quadrantImage} alt={'quadrant'}/>,
    measures: {
      width: 0,
      height: 0,
      length: 0,
    }
  },
  {
    id: 'half-round',
    title: 'Полукруг',
    icon: () => <img src={halfRoundImage} alt={'half-round'}/>,
    measures: {
      width: 0,
      height: 0,
      length: 0,
    }
  },
  
  {
    id: 'triangle-isosceles',
    title: 'Треугольник равнобедренный',
    icon: () => <img src={triangleIsoImage} alt={'trianle-isosceles'}/>,
    measures: {
      width: 0,
      height: 0,
      length: 0,
    }
  },
  {
    id: 'triangle',
    title: 'Треугольник',
    icon: () => <img src={triangleImage} alt={'triangle'}/>,
    measures: {
      width: 0,
      height: 0,
      length: 0,
    }
  },
  {
    id: 'square',
    title: 'Квадратная',
    icon: () => <img src={squareImage} alt={'square'}/>,
    measures: {
      width: 0,
      height: 0,
      length: 0,
    }
  },
  {
    id: 'oval',
    title: 'Овальная',
    icon: () => <img src={ovalImage} alt={'oval'}/>,
    measures: {
      width: 0,
      height: 0,
      length: 0,
    }
  },
  {
    id: 'ellips',
    title: 'Элипс',
    icon: () => <img src={ellipsImage} alt={'ellips'}/>,
    measures: {
      width: 0,
      height: 0,
      length: 0,
      radius: 50
    }
  },
  {
    id: 'rounded-rectangle',
    title: 'Прямоугольная с закруглением',
    icon: () => <img src={roundedRectangleImage} alt={'round-rectangle'}/>,
    measures: {
      width: 0,
      height: 0,
      length: 0,
      radius: 50
    }
    
  }
]

export default shapes