export const SHOW_DATA_USER_FOUND = "SHOW_DATA_USER_FOUND"

export const showDataUserFound = (data) =>{
    return {
        type: SHOW_DATA_USER_FOUND,
        payload: data
    }
}