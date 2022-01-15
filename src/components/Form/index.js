import { useState } from "react"
import './index.css'
const Form = () => {
    const [form, setForm] = useState({
        email:'',
        password:'',
        errors:{
            email:null,
            password:null,
        },
    })
    const passwordChecker =(password)=> {
        if(password.length < 6) {
            return "password must be more than 6 chars"
        } else if (!(/[0-9]/g.test(password))) {
            return "password must contains digit number"
        } else if (!(/[A-Z]/g.test(password))) {
            return "password must contanins uppercase char"
        }else if (!(/[a-z]/g.test(password))) {
            return "password must contanins lowercase char"
        }else if (!(/[!@#$%]/g.test(password))) {
            return "password must contanins atleast one of !@#$% chars"
        }
        else {
            return null
        }
    }
    const handleError = (name,value) => {
        const errors = form.errors
        switch (name) {
            case 'email':{
                errors.email= /([a-zA-Z0-9]+)([\.{1}])?([a-zA-Z0-9]+)\@gmail([\.])com/ig.test(value.trim())
                ? null
                : "please enter a valid email : example@gmail.com";
                break;
            }
            case 'password':{
                errors.password = passwordChecker(value)
                break
            }
            default:
                break;
        }
        return errors
    }
    const handleChange = (e) => {
        e.preventDefault()
        const { name, value } = e.target
        const errors = handleError(name, value)
        setForm((prevForm) => ({ ...prevForm, [name]: value, errors }))
    }
    const validateForm = (errors) => {
        return Object.values(errors).every((val) => !val)
      }
    const submitChecker = () => {
        let errors = handleError('password',form.password)
        setForm((prevForm) => ({ ...prevForm, errors }))
        errors = handleError('email',form.email)
        setForm((prevForm) => ({ ...prevForm, errors }))
    }
      const handleSubmit = (e) => {
        e.preventDefault()
        submitChecker()
        if (validateForm(form.errors)) {
            const {email,password } = form
          console.log('Email:',email)
          console.log('password:',password)
        }
      }
return (
    <form onSubmit={handleSubmit}>
        <h1>Login Form</h1>
        <div>
        <input
          className={`form-input ${form.errors.email? 'error': ''}` }
          placeholder="Email"
          type="email"
          name="email"
          onChange={handleChange}
        />
            {form.errors.email && (
          <div className="text-error">{form.errors.email}</div>
        )}
        </div>
        <div>
            <input 
            className={`form-input ${form.errors.password? 'error': ''}` }
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            />
            {form.errors.password && (
          <div className="text-error">{form.errors.password}</div>
        )}
        </div>
        <button type="submit" className="submit">Login</button>
    </form>
)}
export default Form