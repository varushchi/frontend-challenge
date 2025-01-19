import { useState, useEffect } from 'react'
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

  const [cats, setCats] = useState<APIResponse[] | null>()
  const [likedCats, setLikedCats] = useState<{id: string, url: string, isLiked?: true}[] | undefined>(JSON.parse(localStorage.getItem('likedCats') || '""') !== null ? JSON.parse(localStorage.getItem('likedCats') || '""') : [])
  const [page, setPage] = useState<'All' | 'Liked'>('All')

  useEffect(() => {
    
    async function getCats() {
      const res = await fetch(`https://api.thecatapi.com/v1/images/search?limit=10&api_key=${import.meta.env.CAT_API_KEY}`)
      if(res.status === 200){
        const data = await res.json()
        setCats(data)
      }
    }
    getCats()
  }, [])

  useEffect(() => {
    localStorage.setItem('likedCats', JSON.stringify(likedCats))
    console.log('sdsdfsdfsfsfsf')
  },[likedCats])


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
        gap-[48px]
      `}>
        {(cats && catElem) && page === "All" ? catElem : (likedCatsElem && likedCatsElem.length > 0 ? likedCatsElem : <p> любимых котиков нет</p>)}
      </div>
    </div>
  )
}

export default App
