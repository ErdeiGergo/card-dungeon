import React, { useEffect, useState } from 'react'
import Card from './components/Card'

export type Enemy = {
  enemyName: string,
  enemyIcon: string,
  level: number,
  reward: string,
  penalty: string
}

async function getCards() {
  try{
    const res = await fetch(`cards.json`)
    return res.json()
  }catch{
    console.error("Hiba")
    return[]
  }
}

const App = () => {
  const [cards, setCards] = useState<Enemy[]>()

  useEffect(() => {
    getCards().then(data => 
    setCards(data)
    )
  }, [])

  
  useEffect(() => {
    if (cards) {
      setCards([...cards].sort(() => Math.random() - 0.5));
    }
  }, []);


  return (
    <main>
      <div className='cardList'>
        {cards?.map(card => <Card {...card}/>)}
      </div>
    </main> 
  )
}

export default App