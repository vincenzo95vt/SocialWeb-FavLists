import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { object, string } from 'yup'
import "./UpdateProfileComponent.css"
import { updateUserData } from '../../core/services/userServices/userServices'
import { useNavigate } from 'react-router-dom'
const UpdateProfileComponent = ({path}) => {
    
    const navigate = useNavigate()
    let initialValues ={
        name: undefined,
        lastName: undefined,
        description: "",
        userName: undefined
    }
    let validatonSchema = object({
        name: string(),
        lastName: string(),
        userName: string(),
        description: string().max(240, 'El comentario no puede superar los 240 caracteres'),
    })
    console.log(path)
  return (
    <div className='update-container'>
        <h1>Update profile</h1>
        <Formik
            initialValues={initialValues}
            validationSchema={validatonSchema}
            onSubmit={async (values)=> {
                console.log(values)
                await updateUserData(values)
                navigate("/profile")        
            }}>
                {
                ({errors, values}) => (
                    <Form>
                        <div>
                            <label htmlFor="name">Name</label>
                            <Field type="name" name="name" className="name" />
                        </div>
                        <div>
                        <label htmlFor="lastName">Last Name</label>
                            <Field type="lastName" name="lastName" className="lastName" />
                        </div>
                        <div>
                            <label htmlFor="userName">User Name</label>
                            <Field type="userName" name="userName" className="userName" />
                        </div>
                        <div>
                            <label htmlFor="description">Description</label>
                            <Field as="textarea" type="text" name="description" className="description" maxLength="240"/>
                            <div className='count-words-left'><span>{values.description.length}/240</span></div>
                        </div>
                        {errors && <div><span>{errors.description}</span></div>}
                        <button type='submit'>Submit</button>
                    </Form>
                )
                }
        </Formik>
      
    </div>
  )
}

export default UpdateProfileComponent
