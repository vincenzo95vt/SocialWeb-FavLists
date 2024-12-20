import { refreshToken } from "../userServices/userServices"

export const getDataFromBack = async () => {
    try {
        let token = localStorage.getItem("token")
        if(!token) {
            throw new Error("Token not found")
        }
        const url = `https://favlists-337f03969760.herokuapp.com/posts/`
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

export const sendComment = async (comment, idPost) => {
    try {
        const url = `https://favlists-337f03969760.herokuapp.com/posts/addNewComment/${idPost}`;
        let token = localStorage.getItem("token");

        let response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": token,
            },
            body: JSON.stringify(comment),
        });

        if (response.status === 200) {
            return await response.json();
        }

        if (response.status === 401) {
            console.log("Token is invalid, trying to refresh...");
            const refreshData = await refreshToken();
            
            if (refreshData && refreshData.token) {
                token = refreshData.token;
                localStorage.setItem("token", token);

                response = await fetch(url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "auth-token": token,
                    },
                    body: JSON.stringify(comment),
                });

                if (response.status === 200) {
                    return await response.json();
                }
            }

            throw new Error("Unable to refresh token");
        }
        
        throw new Error(`Failed to send comment, status: ${response.status}`);
    } catch (error) {
        console.error("Error sending comment:", error.message);
    }
};

export const getPostsLists  = async (postId) => {
    try {
        const token = localStorage.getItem("token")
        const url = `https://favlists-337f03969760.herokuapp.com/posts/${postId}`
        const response = await fetch(url, {
            method:"GET",
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
        console.error("Error geting list:", error.message);

    }
}

export const deletePost = async (postId) => {
    try {
        const token = localStorage.getItem("token")
        const url = `https://favlists-337f03969760.herokuapp.com/posts/${postId}`
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": token
            }
        })
        if(response.status === 400){
            throw new Error("Error deleting post")
        }else if(response.status === 200){
            const data = await response.json()
            console.log(data)
            return data
        }
    } catch (error) {
        console.error(error)
    }
}