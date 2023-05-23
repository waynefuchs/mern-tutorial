import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { login, reset } from "../features/auth/authSlice"
import { FaSignInAlt } from "react-icons/fa"
import Spinner from "../components/Spinner"

import "../styles/Form.css"

function Login() {
  //////////////////////////////////////////////////////////////////////// STATE
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  // Destructured State (read-only)
  const { name, email, password, password2 } = formData

  //////////////////////////////////////////////////////////////////////// SETUP
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    if (isError) toast.error(message)
    if (isSuccess || user) navigate("/")
  }, [user, isError, isSuccess, message, navigate, dispatch])

  ///////////////////////////////////////////////////////////// HELPER FUNCTIONS
  // Form Input Changed
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  // Form Submitted (Login)
  const onSubmit = (e) => {
    e.preventDefault()

    // Use axios to hit the backend api to login a user
    const userData = { email, password }
    dispatch(login(userData))
  }

  /////////////////////////////////////////////////////////////////////// OUTPUT
  if (isLoading) return <Spinner />
  if (user) return <Spinner />

  return (
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt />
          Login
        </h1>
        <p>Login and start setting goals</p>
      </section>

      <section className="form">
        <form className="form-group" onSubmit={onSubmit}>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={email}
            placeholder="Enter your email"
            onChange={onChange}
          />

          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={password}
            placeholder="Enter password"
            onChange={onChange}
          />

          <button type="submit">Submit</button>
        </form>
      </section>
    </>
  )
}

export default Login
