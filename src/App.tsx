import { useState, useEffect } from 'react'
import Card from './components/Card'

function App() {

  interface APIResponse{ 
    id: string,
    width: number,
    height: number,
    url: string,
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
      <Card key={elem.id} id={elem.id} img={elem.url} isLiked={false} />
    )
  })
  
  

  return (
    <div>
      {cats && catElem}
    </div>
  )
}

export default App
