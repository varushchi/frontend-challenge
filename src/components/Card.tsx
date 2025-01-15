// import filledHeart from '../assets/filled_heart.svg'
// import hollowedHeart from './assets/hollow_heart.svg'

interface Props{
  id: string
  img: string
  isLiked: boolean
}

export default function Card(props: Props) {
  return (
    <div id={props.id}>
      <img src={props.img} alt='cat image'/>
      {/* {props.isLiked ? filledHeart : hollowedHeart} */}
    </div>
  )
}
