import { useState, useEffect } from "react"
import { FaSignInAlt } from "react-icons/fa"

import "../styles/Form.css"

function Login() {
  // State
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  // Destructured State (read-only)
  const { name, email, password, password2 } = formData

  // Helper Functions
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt />
          Register
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
