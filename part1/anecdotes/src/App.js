/* eslint-disable no-sequences */
import { useState } from 'react'
import './App.css';

const StatisticLine = (props) =>{
  const {text,value} = props
  return (
    <>
      <tr>
        <td>{text} </td>
        <td>{value} </td>
      </tr>
    </>
  )
}

const Button = ({action,text}) =>{
  return <button className="item" onClick={action}>{text}</button>
}

const App = (props) => {
  // // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const goodCount = () => setGood(good+1)
  const neutralCount = () => setNeutral(neutral+1)
  const badCount = () => setBad(bad+1)

  return (
    <div>
      <div className="body">
        <h1>give feedback</h1>
        <div className="rate-button">
          <Button text="good" action={goodCount} />
          <Button text="neutral" action={neutralCount} />
          <Button text="bad" action={badCount} />
        </div>
        <h1>statistics</h1>
      {(good===0 && bad ===0 && neutral ===0)?
            (<p>no feedback given</p>)
         :
        (<>
          <table >
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={good+bad+neutral} />
          <StatisticLine text="average" value={good-bad} />
          <StatisticLine text="positive" value={(good)/(good+bad+neutral)*100} />
          </table>
        </>
        
        )}
      
      </div>
    </div>
  )
}

export default App