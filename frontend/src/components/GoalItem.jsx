import { useDispatch } from "react-redux"
import { deleteGoal } from "../features/goals/goalSlice"
import { FaTrashAlt } from "react-icons/fa"

import "../styles/GoalItem.css"

function GoalItem({ goal }) {
  const dispatch = useDispatch()

  return (
    <li className="goal-card">
      <div>{new Date(goal.createdAt).toLocaleString("en-US")}</div>
      <button onClick={() => dispatch(deleteGoal(goal._id))}>
        <FaTrashAlt />
      </button>
      <h2>{goal.text}</h2>
    </li>
  )
}

export default GoalItem
