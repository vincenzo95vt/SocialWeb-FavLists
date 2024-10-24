export const followUser = async (userId) => {
    try {
        console.log(userId)
        const token = localStorage.getItem("token")
        const url = `http://localhost:4400/users/followUser/${userId}`
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": token
            }
        })
        if(response.status === 400){
            const data = await response.json()
            console.log(data)
            return data
        }else if(response.status === 200){
            const data = await response.json()
            localStorage.removeItem("userData")
            console.log(data)
            localStorage.setItem("userData", JSON.stringify(data.data))
            return data.message
        }
    } catch (error) {
        console.error(error)
    }
}


export const requestFollowUser = async (userId) => {
    try {
        const token = localStorage.getItem("token")
        const url = `http://localhost:4400/followRequests/${userId}`
        const response = await fetch(url, {
            method: "POST",
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


export const showFollowRequests = async () => {
    try {
       const token = localStorage.getItem("token")
       const url = `http://localhost:4400/followRequests/`
       const response = await fetch(url,{
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
        return data
       }
    } catch (error) {
        console.error(error)
    }
}


export const acceptFollowRequest = async(id) => {
    try {   
        const token = localStorage.getItem("token")
        const url = `http://localhost:4400/followRequests/${id}/accept`
        const response = await fetch(url, {
            method: "POST",
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
            return data
        }
    } catch (error) {
        console.log(error)
    }
}

export const rejectFollowRequest = async (id) => {
    try {   
        const token = localStorage.getItem("token")
        const url = `http://localhost:4400/followRequests/${id}/reject`
        const response = await fetch(url, {
            method: "POST",
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
            return data
        }
    } catch (error) {
        console.log(error)

    }
}