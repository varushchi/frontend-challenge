import { useState, useEffect, useRef } from 'react'
import Card from './components/Card'
import Header from './components/Header'

function App() {

  interface APIResponse{ 
    id: string,
    width: number,
    height: number,
    url: string,
    isliked?: boolean,
    breeds?: [{
        weight: {
          imperial: string,
          metric: string
        },
        id: string,
        name: string,
        temperament :string,
        origin: string,
        country_codes: string,
        country_code: string,
        life_span: string,
        wikipedia_url: string
    }]
  }

  const [cats, setCats] = useState<APIResponse[]>([])
  const [likedCats, setLikedCats] = useState<{id: string, url: string, isLiked?: true}[]>(JSON.parse(localStorage.getItem('likedCats') || '""') !== null ? JSON.parse(localStorage.getItem('likedCats') || '""') : [])
  const [page, setPage] = useState<'All' | 'Liked'>('All')
  const [APIPage, setAPIPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const observerRef = useRef<HTMLDivElement | null>(null);


  async function fetchCats(page: number){
    const response = await fetch(`https://api.thecatapi.com/v1/images/search?limit=20&page=${page}&api_key=${import.meta.env.VITE_CAT_API_KEY}`)
    const data = await response.json()
    return data
  }

  async function loadCats(){
    setLoading(true)
    const newCats = await fetchCats(APIPage)
    setLoading(false)
    setCats([...cats, ...newCats])
    setLoading(false)
  }

  useEffect(() => {
    loadCats()
  }, [APIPage])

  

  useEffect(() => {
    localStorage.setItem('likedCats', JSON.stringify(likedCats))
  },[likedCats])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !loading) {
          setAPIPage(APIPage + 1)
        }
      },
      { threshold: 1.0 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current)
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current)
      }
    }
  }, [loading])


  const catElem = cats && cats.map(elem =>{
    return(
      <Card key={elem.id} id={elem.id} img={elem.url} isLiked={elem.isliked ? elem.isliked : false} handleLike={handleLike}/>
    )
  })

  const likedCatsElem = likedCats && likedCats.map(elem => {
    return(
      <Card key={elem.id} id={elem.id} img={elem.url} isLiked={true} handleLike={handleLike} />
    )
  })  

  function handleLike(e: React.MouseEvent<HTMLButtonElement>){
    const id = e.currentTarget.id
    let flagIdNotfound = true
    setCats(() => {
      return(
        cats?.map(elem => {
          if (elem.id === id){
            flagIdNotfound = false
            if (elem.isliked !== true){
              setLikedCats([{id: elem.id, url: elem.url, isLiked: true}, ...(likedCats || [])])
            }
            else{
              setLikedCats(likedCats?.filter(filterElem => filterElem.id !== id))
            }
            return {...elem, isliked: !elem.isliked}
          }
          return elem
        })
      )
    })

    if (flagIdNotfound){
      setLikedCats(likedCats?.filter(elem => elem.id !== id))
    }
  }

  

  return (
    <div className='min-w-[360px]'>
      <Header handleClick={(type: 'All' | 'Liked') => setPage(type)} type={page}/>
      <div className={`
        mt-[112px]
        mb-[48px]
        grid
        grid-cols-[repeat(auto-fit,225px)]
        w-full
        mx-auto
        justify-center
        items-center
        gap-[48px]
      `}>
        {page === 'All' && cats && catElem}
        {page === 'Liked' && likedCatsElem}
        <div ref={observerRef}></div>
      </div>
      <div className='text-[14px] w-[195px] mx-auto'>{loading && page === 'All' && <p>... загружаем еще котиков ...</p>}</div>
    </div>
  )
}

export default App
