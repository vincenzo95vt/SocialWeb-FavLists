import React, { useState } from 'react'
import { Formik, Form, Field } from 'formik'
import { object, string, number } from 'yup'
import "./SignUpComponent.css"
import { signUpUser } from '../../core/services/userServices/userServices'
import { useNavigate } from 'react-router-dom'

const SignUpComponent = () => {
  const [submit, setSubmit] = useState(undefined)
  const [validEmail, setValidEmail] = useState(undefined)

  const navigate = useNavigate()

  let initialValues = {
    userName: undefined,
    email: undefined,
    name: undefined,
    lastName: undefined,
    age: undefined,
    password: undefined,
    genre: undefined,
    privacy:undefined,
  }
  let userSchema = object({
    userName: string().required("Username is required").matches(/^\S*$/, 'UserName cannot contain spaces'),
    email: string().email().required("Email is necessary to log on this website"),
    name: string().required("Tell us your name"),
    lastName: string().required("Tell us your last name"),
    age: number().required().min(18, "Minimum age must be 18").max(100, "Your age cannot exceed over 100 years"),
    password: string().required().min(9, "Your password must contain at least 9 characters"),
    genre: string().required(),
    privacy: string().required()
  })
  return (
    <div className='signup-container'>
      {
        submit  ? 
        (
        <div className="success-message">
          <span className="tick">✔️ {submit.message}</span>
        </div>
        ) 
        :
        (
          validEmail && <div><span>{validEmail.message}</span></div>
        )
      }
      <h1>Register</h1>
      <Formik
      initialValues={initialValues}
      validationSchema={userSchema}
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={async (values, {resetForm}) => {        
        const userData = await signUpUser(values)
        if(userData.status === 400){
          console.log("En status 400", userData)
          setValidEmail(userData)
        }else{
          console.log(userData)
          setSubmit(userData)
          setTimeout(() =>{
            setSubmit(undefined)
            navigate("/")
          }, 3000)
          resetForm()
          setValidEmail(false)
        }
      }}>
        {
          ({errors}) => (
            <Form className='form-container'>
              <div className='container-info'>
                <Field placeholder="Username" className="input" type="userName" name="userName"/>
                {errors.userName && <div className='container-error'><span>{errors.userName}</span></div>}
              </div>
              <div className='container-info'>
                <Field placeholder="Email" className="input"  type="email" name="email"/>
                {errors.email && <div className='container-error'><span>{errors.email}</span></div>}
              </div>
              <div className='container-info'>        
                <Field placeholder="Name" className="input"  type="name" name="name"/>
                {errors.name && <div className='container-error'><span>{errors.name}</span></div>}
              </div>
              <div className='container-info'> 
                <Field placeholder="Last Name" className="input"  type="lastName" name="lastName"/>
                {errors.lastName && <div className='container-error'><span>{errors.lastName}</span></div>}
              </div>
              <div className='container-info'> 
                <Field placeholder="Age" className="input"  type="age" name="age"/>
                {errors.age && <div className='container-error'><span>{errors.age}</span></div>}
              </div>
              <div className='container-info'>
                <Field placeholder="Password" className="input"  type="password" name="password"/>
                {errors.password && <div className='container-error'><span>{errors.password}</span></div>}
              </div>
              <div className='container-info'>
                <Field as="select" placeholder="Genre" className="input select"  type="genre" name="genre">
                  <option value="">Select Genre</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </Field>
                {errors.genre && <div className='container-error'><span>{errors.genre}</span></div>}
              </div>
              <div className="container-privacy">
                <Field as="select" placeholder="Privacy" className="input select" type="privacy" name=""privacy>
                  <option value="">Select Privacy</option>
                  <option value="private">Private</option>
                  <option value="public">Public</option>
                </Field>
              </div>
              <button type='submit'>Next Step</button>
            </Form>
          )
        }
      </Formik>
      <div>
        <span className='phrase'>Do you have an account? </span>
        <span onClick={() => navigate("/login")} className='login-btn'>Login</span>
      </div>
    </div>
  )
}

export default SignUpComponent
