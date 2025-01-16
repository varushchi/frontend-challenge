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

  const filterCats =  cats && cats.filter(elem => elem.isliked === true)

  const targetArray = cats && filterCats && (page === 'All' ? [...cats] : [...filterCats])

  const catElem = targetArray && targetArray.map(elem =>{
    return(
      <Card key={elem.id} id={elem.id} img={elem.url} isLiked={Math.random() < 0.5 ? true : false} />
    )
  })

  const imgSize = 225
  const gapSize = 10
  console.log(2*imgSize+gapSize)

  return (
    <div>
      <Header handleClick={(type: 'All' | 'Liked') => setPage(type)}/>
      <div className={`
        grid
        grid-cols-[repeat(1,_${imgSize}px)] w-[${imgSize}px]
        sm:grid-cols-[repeat(2,_${imgSize}px)] sm:w-[${2*imgSize+gapSize}px]
        md:grid-cols-[repeat(3,_${imgSize}px)] md:w-[${3*imgSize+2*gapSize}px]
        lg:grid-cols-[repeat(4,_${imgSize}px)] lg:w-[${4*imgSize+3*gapSize}px]
        gap-[${gapSize}px] mx-auto`}>
        {cats && catElem}
      </div>
    </div>
  
    



  )
}

export default App
