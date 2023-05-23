import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { register, reset } from "../features/auth/authSlice"
import { FaUser } from "react-icons/fa"
import Spinner from "../components/Spinner"

import "../styles/Form.css"

function Register() {
  //////////////////////////////////////////////////////////////////////// STATE
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  })

  // Destructured State (read-only)
  const { name, email, password, password2 } = formData

  //////////////////////////////////////////////////////////////////////// REACT
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

  // Form Submitted
  const onSubmit = (e) => {
    e.preventDefault()

    // Check if passwords match
    if (password !== password2) {
      toast.error("Passwords do not match")
      return
    }

    // Use axios to hit the backend api to register a new user
    const userData = { name, email, password }
    dispatch(register(userData))
  }

  /////////////////////////////////////////////////////////////////////// OUTPUT
  if (isLoading) return <Spinner />
  if (user) return <Spinner />

  return (
    <>
      <section className="heading">
        <h1>
          <FaUser />
          Register
        </h1>
        <p>Please create an account</p>
      </section>

      <section className="form">
        <form className="form-group" onSubmit={onSubmit}>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={name}
            placeholder="Enter your name"
            onChange={onChange}
          />

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

          <input
            type="password"
            className="form-control"
            id="password2"
            name="password2"
            value={password2}
            placeholder="Confirm password"
            onChange={onChange}
          />

          <button type="submit">Submit</button>
        </form>
      </section>
    </>
  )
}

export default Register
