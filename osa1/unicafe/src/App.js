import React, { useState } from 'react'

const StatisticsLine = ({text, value}) => {
  return (
    <div>
      {text}: {value}
    </div>
  )
}
const Statistics = ({good, bad, neutral}) => {
  if (!good && !bad && !neutral) {
    return (
      <div>
        <h3>statistics</h3>
        No statistics given
      </div>
    )
  } else {
    return (
      <div>
        <h3>statistics</h3>
        <StatisticsLine text="good" value={good} />
        <StatisticsLine text="neutral" value={neutral} />
        <StatisticsLine text="bad" value={bad} />
        <StatisticsLine text="all" value={good+neutral+bad} />
        <StatisticsLine text="average" value={good+(bad*-1)/(good+neutral+bad)}/>
        <StatisticsLine text="positive" value={(good/(good+neutral+bad))*100}/>
      </div>
    )
  }
}

const Button = ({handleClick, text}) => (
  <button onClick = {handleClick}>
    {text}
  </button>
)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h3>Give feedback</h3>
      <Button handleClick={() => setGood(good +1)} text="good" />
      <Button handleClick={() => setNeutral(neutral +1)} text="neutral" />
      <Button handleClick={() => setBad(bad +1)} text="bad" />
      <Statistics good={good} bad={bad} neutral={neutral}/>
    </div>
  )
}

export default App
