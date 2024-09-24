export const handleExpiredToken = () => {
    alert("Su sesion ha caducado, se le redigirá al login")
    localStorage.clear()
}