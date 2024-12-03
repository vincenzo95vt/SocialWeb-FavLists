import React, { useState } from 'react'
import { Field, Form, Formik } from 'formik'
import "./LoginComponent.css"
import { object, string } from 'yup'
import { loginUser } from '../../core/services/userServices/userServices'
import { useDispatch } from 'react-redux'
import { successUserLog } from './LoginAction'
import { useNavigate } from 'react-router-dom'

const LoginComponent = () => {
  const [noLog, setNoLog] = useState(undefined)
  const [successLog, setSuccessLog] = useState(undefined)

  const dispatch = useDispatch()
  const navigate = useNavigate()
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
      {
        noLog ? 
        (
          <div className='no-log-message'><span>❌{noLog}</span></div>
        )
        :
        (
          successLog && 
          (
            <div className='success-log-message'><span>✅{successLog}</span></div>
          )
        )
      }
      <h1>Tell us your credentials!</h1>
      <Formik
      validationSchema={validationSchema}
      initialValues={initialValues}
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={async (values) => {
        const data = await loginUser(values)
        if(data.status === 401){
          setNoLog(data.message)
        }else if(data.status === 200){
          setNoLog(undefined)
          setSuccessLog(data.message)
          dispatch(successUserLog(data.data))
          setTimeout(() => {
            navigate("/index")  
          }, 3000);
        }
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
