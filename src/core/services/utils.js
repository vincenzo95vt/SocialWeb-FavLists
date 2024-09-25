export const handleExpiredToken = () => {
    alert("Su sesion ha caducado, se le redigirá al login")
    localStorage.clear()
}

export function formatISOToDDMMYYYY(isoString) {
    const date = new Date(isoString); // Convierte la cadena ISO a un objeto Date
    const day = String(date.getDate()).padStart(2, '0'); // Extrae el día y lo formatea
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Extrae el mes y lo formatea
    const year = date.getFullYear(); // Extrae el año

    return `${day}/${month}/${year}`; // Retorna la fecha en formato ddmmaaaa
}