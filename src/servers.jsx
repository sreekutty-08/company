export const SERVER = "https://telcom-backend-tigo.onrender.com/api/";

fetch(`${SERVER}company/`)
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => console.log("Data:", data))
  .catch(error => console.error("Error fetching data:", error));
