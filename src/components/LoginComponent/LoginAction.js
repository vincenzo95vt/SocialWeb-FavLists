export const SUCCESS_USER_LOG = "SUCCESS_USER_LOG"


export const successUserLog = (userData) => {
    return{
        type: SUCCESS_USER_LOG,
        payload: userData
    }
}
