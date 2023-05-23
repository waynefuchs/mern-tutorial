import { useState } from "react"
import { useDispatch } from "react-redux"
import { createGoal } from "../features/goals/goalSlice"

function GoalForm() {
  //////////////////////////////////////////////////////////////////////// STATE
  const [text, setText] = useState("")

  //////////////////////////////////////////////////////////////////////// SETUP
  const dispatch = useDispatch()

  ///////////////////////////////////////////////////////////// HELPER FUNCTIONS
  const onSubmit = (e) => {
    e.preventDefault()

    dispatch(createGoal({ text }))
    setText("")
  }

  const onChange = (e) => {
    setText(e.target.value)
  }

  /////////////////////////////////////////////////////////////////////// OUTPUT
  return (
    <form className="form form-group" onSubmit={onSubmit}>
      <label htmlFor="text">Goal</label>
      <input
        type="text"
        name="text"
        id="text"
        placeholder="Type your new goal here..."
        value={text}
        onChange={onChange}
      />

      <button type="submit">Add Goal</button>
    </form>
  )
}

export default GoalForm
