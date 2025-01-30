import { useEffect, useState } from "react"
import filledHeart from "../assets/filled_heart.svg"
import hollowedHeart from "../assets/hollow_heart.svg"
import hoveredHeart from "../assets/hovered_heart.svg"

interface Props {
  id: string
  img: string
  isLiked: boolean
  handleLike: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export default function Card(props: Props) {
  const [imageSrc, setImageSrc] = useState<string | undefined>(undefined)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>

    const img = new Image()
    img.src = props.img
    
    img.onload = () => {
      setImageSrc(props.img)
      setLoading(false)
      clearTimeout(timeoutId)
    };

    img.onerror = () => {
      setImageSrc(undefined)
      setLoading(false)
      clearTimeout(timeoutId)
    };

    
    timeoutId = setTimeout(() => {
      console.error("Image load timeout:", props.img)
      setImageSrc(undefined)
      setLoading(false)
    }, 10000)

    return () => clearTimeout(timeoutId)
  }, [])


  return (
    <div
      className='w-[225px] h-[225px] 
      relative group
      hover:outline outline-[30px] outline-white 
      hover:shadow-[0px_5px_5px_32px_rgba(0,0,0,0.3)]'>
      
      {loading ?
        <p className='text-[14px] w-fill text-center'>...загружаем картинку...</p> :
        <img
          src={imageSrc}
          loading='lazy'
          alt={props.id}
          className="w-full h-full object-cover"
        />
      }
      <div
        className='absolute bottom-0 
        h-[64px] w-full 
        group-hover:bg-gradient-to-b 
        from-[rgba(255,255,255,0)] to-[rgba(255,255,255,1)]'>
        <button
          id={props.id}
          className='
            group/img 
            w-[48px] h-[48px] 
            flex justify-center items-center
            opacity-0 
            absolute bottom-0 right-0 
            group-hover:opacity-100'
          onClick={props.handleLike}>
          <img
            className='block group-hover/img:hidden'
            src={props.isLiked ? filledHeart : hollowedHeart}
            alt='heart'/>
          <img
            className='hidden group-hover/img:block'
            src={hoveredHeart}
            alt='heart'/>
        </button>
      </div>
    </div>
  )
}
