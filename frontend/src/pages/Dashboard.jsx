import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { getGoals, reset } from "../features/goals/goalSlice"
import GoalForm from "../components/GoalForm"
import GoalItem from "../components/GoalItem"
import Spinner from "../components/Spinner"

function Dashboard() {
  //////////////////////////////////////////////////////////////////////// STATE
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const { goals, isLoading, isError, message } = useSelector(
    (state) => state.goals
  )

  useEffect(() => {
    if (isError) console.log(message)
    if (!user) navigate("/login")
    dispatch(getGoals())
    dispatch(reset())
  }, [user, navigate, isError, message, dispatch])

  /////////////////////////////////////////////////////////////////////// OUTPUT
  if (isLoading) return <Spinner />
  if (!user) return <Spinner />
  return (
    <>
      <section className="heading">
        <h1>Goals Dashboard</h1>
        <p>Welcome, {user && user.name}</p>
      </section>

      <GoalForm />

      <ul>
        {goals.length > 0 ? (
          goals.map((goal) => <GoalItem key={goal._id} goal={goal} />)
        ) : (
          <li>You have not set any goals {goals.length}</li>
        )}
      </ul>
    </>
  )
}

export default Dashboard
