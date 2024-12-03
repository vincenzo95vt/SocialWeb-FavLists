export const handleExpiredToken = () => {
    alert("Su sesion ha caducado, se le redigirá al login")
    window.location.href = "/login"
    localStorage.clear()
}

export function formatISOToDDMMYYYY(isoString) {
    const date = new Date(isoString); 
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const year = date.getFullYear(); 
    const hours = String(date.getHours()).padStart(2, '0'); 
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}`; 
}