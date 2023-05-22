import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
)

const Statistics = ({good, neutral, bad}) => {
  const all = good + neutral + bad
  
  let average = 0
  let positive = 0
  if (all !== 0) {
    average = (good - bad) / all
    positive = (good / all) * 100
  }
  

  return (
    <div>
      <h1>STASTISTICS</h1>
      <div>good {good}</div>
      <div>neutral {neutral}</div>
      <div>bad {bad}</div>
      <div>all {all} </div>
      <div>average {average}</div>
      <div>positive {positive}%</div>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  

  return (
    <div>
      <h1>GIVE FEEDBACK</h1>
      <Button handleClick={() => setGood(good + 1)} text="good"/>
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral"/>
      <Button handleClick={() => setBad(bad + 1)} text="bad"/>

      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App