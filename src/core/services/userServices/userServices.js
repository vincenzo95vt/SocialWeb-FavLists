import { handleExpiredToken } from "../utils"

export const signUpUser = async (values) => {
    try {
        const bodyValues = {
            userName: values.userName,
            email: values.email,
            password: values.password,
            age: values.age,
            name: values.name,
            lastName: values.lastName,
            genre: values.genre
        }
        console.log(bodyValues)
        const url = `https://favlists-337f03969760.herokuapp.com/users/signup`
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
        const url = `https://favlists-337f03969760.herokuapp.com/users/login`
        const response = await fetch(url, {
        method:"POST",
        headers:{"Content-type":"application/json"},
        body: JSON.stringify(bodyValues)
        })
        const data = await response.json()
        if(data.status === 401 ){
            console.log(data.status)
            return data
        }else if(data.status === 200 && data.data && data.data.userData){
            console.log(data.data.userData)
            localStorage.setItem("token", data.data.token )
            localStorage.setItem("refresh_token", data.data.token_refresh )
            localStorage.setItem("userData", JSON.stringify(data.data.userData))
            return data
        }
        return data
    } catch (error) {
        console.error(error.message)
    }
}

export const refreshToken = async () => {
    try {
        const token_refresh = localStorage.getItem("refresh_token")
        console.log(token_refresh)
        if(!token_refresh){
            throw new Error("No refresh token available");

        }
        const url = `https://favlists-337f03969760.herokuapp.com/users/refreshToken`
        const response = await fetch(url, {
            method:"POST",
            headers:{"Content-type":"application/json",
                "auth-token" : token_refresh
            },
        })
        if(!response.ok){
            throw new Error("No refresh token available");
        }
        const data = await response.json()
        if(data.token && data.refresh_token){
            localStorage.setItem("token", data.token )
            localStorage.setItem("refresh_token", data.refresh_token )
        }
        return data
    } catch (error) {
        handleExpiredToken()
        console.error("Error refreshing token", error)
    }
}

export const  addPostToUserList = async (listId, postId) => {
    try {
        const token = localStorage.getItem("token")
        const url = `https://favlists-337f03969760.herokuapp.com/users/addPostToList/${listId}`
        const response = await fetch(url, {
            method: "PATCH",
            headers: {
                "Content-type": "application/json",
                "auth-token": token ,
            },
            body: JSON.stringify({ postId }),
        })
        if(response.status === 400){
            console.log(response)
        }else if(response.status === 200){
            const data = await response.json()
            console.log(data)
            return data
        }
    } catch (error) {
        console.error(error)
    }
}

export const createNewList = async (value, postId) => {
    let token = localStorage.getItem("token")
    try {
        const bodyValues = {
            name: value.listName,
            postId: postId
        }
        console.log(bodyValues)
        const url = "https://favlists-337f03969760.herokuapp.com/users/addNewList"
        let response = await fetch(url, {
            method: "PATCH",
            headers: {
                "Content-type":"application/json",
                "auth-token": token
            },
            body: JSON.stringify(bodyValues)
            }
        )
        if(response.status === 401){
            const refreshData = await refreshToken();
            if (refreshData && refreshData.token) {
                token = refreshData.token;
                localStorage.setItem("token", token);

                response = await fetch(url, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        "auth-token": token,
                    },
                    body: JSON.stringify(value),
                });

                if (response.status === 200) {
                    const data = await response.json()
                    console.log(data)
                }
            }
        }else{
            const data = await response.json()
            console.log(data)
        }
    } catch (error) {
        console.error(error.error)
    }
}

export const refreshUserData =  async () => {
    try {
        const token = localStorage.getItem("token")
        const url = "https://favlists-337f03969760.herokuapp.com/users/refreshUserData"
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": token
            }
        })  
        const data = await response.json()
        console.log("hecho", data)
        localStorage.setItem("userData", JSON.stringify(data.data))
    } catch (error) {
        console.error(error)
    }
}

export const findUserByName = async (name) => {
    try {
        const token = localStorage.getItem("token")
        const url = `https://favlists-337f03969760.herokuapp.com/users/findUserByName/${name}`
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": token
            }
        })
        if(response.status === 404){
            const data = await response.json()
            console.log(data)
            return data
        }else if(response.status === 200){
            const data = await response.json()
            console.log(data)
            return data
        }
    } catch (error) {
        console.error(error.error)
    }
}

export const updateUserData = async (values) => {
    try {
        const token = localStorage.getItem("token");
        const url = `https://favlists-337f03969760.herokuapp.com/users/`
        const response = await fetch(url, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "auth-token": token
                },
                body: JSON.stringify(values)
        })
        if(response.status === 400){
            const data = await response.json()
            console.log(data)
        }else if(response.status === 200){
            const data = await response.json()
            console.log(data)
            const userData = localStorage.setItem("userData",JSON.stringify(data.data))
        }
    } catch (error) {
        console.error(error)
    }
}

export const findUserById = async (id) => {
    try {
        const token = localStorage.getItem("token")
        const url = `https://favlists-337f03969760.herokuapp.com/users/${id}`
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": token
            }
        })
        if(response.status === 400){
            const data = await response.json()
            console.log(data)
        }else if(response.status === 200){
            const data = await response.json()
            console.log(data)
            return data.data
        }
    } catch (error) {
        console.error(error)
    }
}

