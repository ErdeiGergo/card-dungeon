import { useEffect, useState } from 'react'
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
  const [cards, setCards] = useState<Enemy[]>([])
  const [fleeList, setFleeList] = useState<Enemy[]>([])

  const [health, setHealth] = useState<String>("❤️❤️❤️❤️❤️")
  const [strength, setStrength] = useState<number>(1)

  const [currentCard, setCurrentCard] = useState<Enemy>(cards[0])
  
  useEffect(() => {
    getCards().then(data => 
    setCards(data)
    )
  }, [])

  const pick = () => {
    if(!cards || currentCard) return
    const random = Math.floor(Math.random() * cards.length)
    const card = cards[random]
    setCurrentCard(card)
    setCards(prev => prev.filter(e => e != card))
  }

  function visszatesz(card: Enemy){
    setCards(prev => [...prev, card])
  }

  const fight = () => {
    if(!currentCard)return
    const damage = Math.floor(Math.random() * 6) + 1 + strength
    alert(damage)
    if (damage > currentCard?.level)
      alert("Nyertél")
    else
      alert("Vesztettél")
  }

  const flee = (card: Enemy) => {
    if (fleeList.length < 2){
      setFleeList(prev => [...prev, card])
      pick()
    }
  }

  return (
    <main>
      <section>
        <h1>Max 2 talonban</h1>
        <div className='talon'>
          {fleeList.map(c => <Card {...c}/>)} 
        </div>
      </section>
      <section className='battleField'>
        {currentCard && <Card {...currentCard} />}
        <button id='dice'>
          🎲
        </button>
        <button id='fleeBtn' onClick={() => flee(currentCard)}>
          Flee👣
        </button>
      </section>
      <section className='stats'>
        <div>
          <h1>Max 5</h1>
          <p>Health: {health}</p>
          <p>Strength: {strength}</p>
        </div>
        <div id='deck' onClick={()=>pick()}>{cards?.length}</div>
      </section>
    </main> 
  )
}

export default App