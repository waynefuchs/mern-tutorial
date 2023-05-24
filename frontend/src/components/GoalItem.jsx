import { useState } from "react"

import "../styles/GoalItem.css"

function GoalItem({ goal }) {
  return (
    <li className="goal-card">
      <div>{new Date(goal.createdAt).toLocaleString("en-US")}</div>
      <h2>{goal.text}</h2>
    </li>
  )
}

export default GoalItem
