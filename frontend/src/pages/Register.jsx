import { useState, useEffect } from "react"
import { FaUser } from "react-icons/fa"

import "../styles/Form.css"

function Register() {
  // State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
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
