export const signUpUser = async (values) => {
    try {
        const bodyValues = {
            username: values.userName,
            email: values.email,
            password: values.password,
            age: values.age,
            name: values.name,
            lastName: values.lastName,
            genre: values.genre
        }
        const url = `http://localhost:4400/users/signup`
        const response = await fetch(url, {
        method:"POST",
        headers:{"Content-type":"application/json"},
        body: JSON.stringify(bodyValues)
        })
        const data = await response.json()
        return data
    } catch (error) {
        console.error(error.message)
    }
}


export const loginUser = async (values) => {
    try {
        const bodyValues = {
            email: values.email,
            password: values.password,
        }
        const url = `http://localhost:4400/users/login`
        const response = await fetch(url, {
        method:"POST",
        headers:{"Content-type":"application/json"},
        body: JSON.stringify(bodyValues)
        })
        const data = await response.json()
        if(data.status === 401 ){
            return data
        }else if(data.status === 200){
            localStorage.setItem("token", data.data.token )
            localStorage.setItem("refresh_token", data.data.token_refresh )
            return data
        }
        return data
    } catch (error) {
        console.error(error.message)
    }
}