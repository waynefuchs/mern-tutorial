import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import Spinner from "../components/Spinner"

function Dashboard() {
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)
  useEffect(() => {
    if (!user) navigate("/login")
  }, [user, navigate])

  if (!user) return <Spinner />
  return <div>Dashboard</div>
}

export default Dashboard
