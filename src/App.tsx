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
  const [strength, setStrength] = useState<String>("⚔️⚔️")

  const [currentCard, setCurrentCard] = useState<Enemy>(cards[0])
  
  useEffect(() => {
    console.log("fetch")
    getCards().then(data => 
    setCards(data)
    )
  }, [])

  useEffect(() => {
    console.log("pick")
    if (cards.length != 0 && !currentCard)
      pick()
  }, [cards])

  const pick = () => {
    if(!cards) return
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
    const damage = Math.floor(Math.random() * 6) + 1 + strength.length / 2

    alert("damage: " + damage)
    if (damage > currentCard?.level)
    {
      let sziv = currentCard.reward.replaceAll("⚔️", "").length / 2
      let newHealth = health
      for (let i = 0; i < sziv; i++) 
      {
        newHealth = health.replace("💀", "❤️")
      }

      let kard = currentCard.reward.replaceAll("❤️", "").length / 2
      let newStrength = strength
      for (let i = 0; i < kard; i++) 
      {
        newStrength += "⚔️"
      }

      setHealth(newHealth)
      setStrength(newStrength)
      let medal = currentCard.reward.replaceAll("⚔️", "").replaceAll("❤️", "").length
      if (medal != 0)
        alert("NYERTÉL BAZ+")
      pick()
    }
    else
    {
      alert("Vesztettél")

      let sziv = currentCard.penalty.replaceAll("⚔️", "").length / 2
      let ujHealth = health
      for (let i = 0; i < sziv; i++) 
      {
        //alert("Penalty szivek: " + sziv)
        ujHealth = ujHealth.replace("❤️", "💀")
      }

      let kard = currentCard.reward.replaceAll("❤️", "").length / 2
      let ujKard = strength
      for (let i = 0; i < kard; i++) 
        {
          //alert("Penalty cardok? " + kard)
          ujKard = ujKard.replace("⚔️", "")
        }
        
      setHealth(ujHealth)
      if(health.replaceAll("💀", "").length / 2 == 0)
        alert("VESZTETTÉL BAZZ+++")

      setStrength(ujKard)

      visszatesz(currentCard)
      pick()
    }
  }

  const flee = (card: Enemy) => {
    if(!currentCard) return
    if (fleeList.length < 2){
      setFleeList(prev => [...prev, card])
      pick()
    }
  }

  const fleeToBattle = (card: Enemy) => {
    if(!card) return
    visszatesz(currentCard)
    setCurrentCard(card)
    setFleeList(fleeList.filter(c => c !== card))
  }

  return (
    <main>
      <section>
        <h1>Max 2 talonban</h1>
        <div className='talon'>
          {fleeList.map(c => <Card {...c}/>)} 
        </div>
        <button onClick={() => fleeList[0] ? fleeToBattle(fleeList[0]) : null}>➡️</button>
      </section>
      <section className='battleField'>
        {currentCard && <Card {...currentCard} />}
        <button id='dice'>
          🎲
        </button>
        <button className='fightBtn' onClick={() => fight()}>
          Fight⚔️
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