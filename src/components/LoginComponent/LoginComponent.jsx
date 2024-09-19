import React from 'react'
import { Field, Form, Formik } from 'formik'
import "./LoginComponent.css"
import { object, string } from 'yup'
import { loginUser } from '../../core/services/services'

const LoginComponent = () => {
  
  const initialValues = {
    email: undefined,
    password: undefined
  }
  const validationSchema = object({
    email: string().required("Email must be provided to log into your account"),
    password: string().required("Without a password we cannot validate your user")
  })

  return (
    <div className='login-container'>
      <h1>Tell us your credentials!</h1>
      <Formik
      validationSchema={validationSchema}
      initialValues={initialValues}
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={async (values) => {
        const data = await loginUser(values)
        console.log(data)
      }}>
        {
          ({errors}) => (
            <Form className='form-container'>
              <Field className="input" placeholder="Email" type="email" name="email"/>
              {errors.email && <div><span>{errors.email}</span></div>}
              <Field className="input" placeholder="Password" type="password" name="password"/>
              {errors.password && <div><span>{errors.password}</span></div>}
              <button type='submit'>Login</button>
            </Form>
          )
        }
        
      </Formik>
    </div>
  )
}

export default LoginComponent
