import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
)

const StatisticLine = ({text, value}) => {
  return (
    <div>{text} {value}</div>
  )
}

const Statistics = ({good, neutral, bad}) => {
  const all = good + neutral + bad
  
  let average = 0
  let positive = 0
  if (all !== 0) {
    average = (good - bad) / all
    positive = (good / all) * 100
  }
  
  if (good === 0 && neutral === 0 && bad === 0) {
    return (
      <div>
        <h1>STASTISTICS</h1>
        <div>No feedback given</div>
      </div>
    ) 
  }
  return (
    <div>
      <h1>STASTISTICS</h1>
      <StatisticLine text="good" value={good}/>
      <StatisticLine text="neutral" value={neutral}/>
      <StatisticLine text="bad" value={bad}/>
      <StatisticLine text="all" value={all}/>
      <StatisticLine text="average" value={average}/>
      <StatisticLine text="positive" value={positive}/>
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