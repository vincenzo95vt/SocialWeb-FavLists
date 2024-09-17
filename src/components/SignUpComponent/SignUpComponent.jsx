import React from 'react'
import { Formik, Form, Field } from 'formik'
import { object, string, number } from 'yup'


const SignUpComponent = () => {
  
  let initialValues = {
    userName: undefined,
    email: undefined,
    name: undefined,
    lastName: undefined,
    age: undefined,
    password: undefined,
    genre: undefined,
    description: undefined
  }
  let userSchema = object({
    userName: string().required(),
    email: string().email().required("Email is necessary to log on this website"),
    name: string().required("Tell us your name"),
    lastName: string().required("Tell us your last name"),
    age: number().required().min(18, "La edad minima debe ser 18 años"),
    password: string().required().min(9, "La contraseña debe ser de mas de 9 caracteres"),
    genre: string().required(),
    description: string().max(200)
  })

  return (
    <div>
      <h1>Register</h1>
      <Formik
      initialValues={initialValues}
      validationSchema={userSchema}
      onSubmit={(values) => {
        console.log(values)
      }}>
        {
          ({errors}) => (
            <Form>
              <span>Username</span>
              <Field type="userName" name="userName"/>
              <span>Email</span>
              <Field type="email" name="email"/>
              <span>Name</span>
              <Field type="name" name="name"/>
              <span>Last Name</span>
              <Field type="lastName" name="lastName"/>
              <span>Age</span>
              <Field type="age" name="age"/>
              <span>Password</span>
              <Field type="password" name="password"/>
              <span>Genre</span>
              <Field type="genre" name="genre"/>
              <span>Description</span>
              <Field type="description" name="description"/>
              <button type='submit'>Create user</button>
            </Form>
          )
        }
        
      </Formik>
    </div>
  )
}

export default SignUpComponent
