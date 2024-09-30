import { refreshToken } from "../userServices/userServices"

export const getDataFromBack = async () => {
    try {
        let token = localStorage.getItem("token")
        if(!token) {
            throw new Error("Token not found")
        }
        const url = `http://localhost:4400/posts/`
        let response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                "auth-token": token
                }
        })
        if(response.status === 401){
            const refreshData = await refreshToken() 
            if(refreshData && refreshData.token){
                token = refreshData.token
                response = await fetch(url, {
                    method:"GET",
                    headers:{"auth-token": token}
                })
            }else{
                throw new Error("Unable to refresh token")
            }
        }
        
        if(response.ok){
            
            const data = await response.json()
            return data
        }else{
            throw new Error(`Error: ${response.statusText}`);
        }


    } catch (error) {
        console.error(error.message)
    }
}