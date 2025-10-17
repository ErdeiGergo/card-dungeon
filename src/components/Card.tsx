import type { Enemy } from "../App"

const Card = (props: Enemy) => {

  return (
    <div>

      <div className="card">
        <h1>{props.enemyName}</h1>
        <h2>{props.enemyIcon}</h2>
        <h3>level {props.level}</h3>
        <h5>Reward: {props.reward}</h5>
        <h5>Penalty: {props.penalty}</h5>
      </div>

      <button className='fightBtn'>
        Fight⚔️
      </button>
    </div>
  )
}

export default Card