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


  const catElem = cats && cats.map(elem =>{
    return(
      <Card key={elem.id} id={elem.id} img={elem.url} isLiked={elem.isliked ? elem.isliked : false} handleLike={handleLike}/>
    )
  })

  const filterCats =  catElem && catElem.filter(elem => elem.props.isLiked === true)

  function handleLike(e: React.MouseEvent<HTMLButtonElement>){
    const id = e.currentTarget.id
    setCats(() => {
      return(
        cats?.map(elem => {
          if (elem.id === id){
            return {...elem, isliked: !elem.isliked}
          }
          return elem
        })
      )
    })
  }

  return (
    <div>
      <Header handleClick={(type: 'All' | 'Liked') => setPage(type)} type={page}/>
      <div className={`
        grid
        grid-cols-[repeat(auto-fit,225px)]
        w-full
        mx-auto
        justify-center
        gap-[20px]
      `}>
        {(cats && catElem) && page === "All" ? catElem : filterCats}
      </div>
    </div>
  )
}

export default App
