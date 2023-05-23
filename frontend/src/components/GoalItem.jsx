import { useState } from "react"

function GoalItem({ goal }) {
  return (
    <li className="goal-card">
      <div>{new Date(goal.createdAt).toLocaleString("en-US")}</div>
      <h2>{goal.text}</h2>
    </li>
  )
}

export default GoalItem
