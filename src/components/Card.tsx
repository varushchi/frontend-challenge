import filledHeart from '../assets/filled_heart.svg'
import hollowedHeart from '../assets/hollow_heart.svg'

interface Props{
  id: string
  img: string
  isLiked: boolean
}

export default function Card(props: Props) {
  return (
    <div id={props.id} className='w-[225px] h-[225px] relative group hover:border  '>
      <img src={props.img} alt={props.id} className="w-full h-full object-cover"/>
      <button className='opacity-0 absolute bottom-2 right-2 group-hover:opacity-100 transition duration-300 '>
        <img src={props.isLiked ? filledHeart : hollowedHeart} alt='heart'/>
      </button>
    </div>
  )
}
