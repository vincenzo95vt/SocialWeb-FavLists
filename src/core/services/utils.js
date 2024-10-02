export const handleExpiredToken = () => {
    alert("Su sesion ha caducado, se le redigirá al login")
    window.location.href = "/login"
    localStorage.clear()
}

export function formatISOToDDMMYYYY(isoString) {
    const date = new Date(isoString); // Convierte la cadena ISO a un objeto Date
    const day = String(date.getDate()).padStart(2, '0'); // Extrae el día y lo formatea
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Extrae el mes y lo formatea
    const year = date.getFullYear(); // Extrae el año
    const hours = String(date.getHours()).padStart(2, '0'); // Extrae la hora y la formatea
    const minutes = String(date.getMinutes()).padStart(2, '0'); // Extrae los minutos y los formatea

    return `${day}/${month}/${year} ${hours}:${minutes}`; // Retorna la fecha y hora en formato ddmmaaaa hh:mm
}