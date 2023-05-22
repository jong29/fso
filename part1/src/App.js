import { useState } from 'react'

const Button = props => (
  <button onClick={props.handleClick}>{props.text}</button>
)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const all = good + neutral + bad
  const average = (good - bad) / all
  const positive = good / all

  return (
    <div>
      <h1>GIVE FEEDBACK</h1>
      <Button handleClick={() => setGood(good + 1)} text="good"/>
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral"/>
      <Button handleClick={() => setBad(bad + 1)} text="bad"/>

      <h1>STATISTICS</h1>
      <div>good {good}</div>
      <div>netrual {neutral}</div>
      <div>bad {bad}</div>
      <div>all {all} </div>
      <div>average {average}%</div>
      <div>positive {positive}%</div>
    </div>
  )
}

export default App