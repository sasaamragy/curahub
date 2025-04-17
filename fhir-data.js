// js/fhir-data.js

document.addEventListener("DOMContentLoaded", async () => {
  const accessToken = sessionStorage.getItem("access_token");
  const patientId = sessionStorage.getItem("patient_id");

  if (!accessToken || !patientId) {
    document.getElementById("patient-info").innerText = "No patient data found. Please login again.";
    return;
  }

  try {
    const response = await fetch(`https://launch.smarthealthit.org/v/r4/Patient/${patientId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    const patient = await response.json();
    const info = `
      <strong>Name:</strong> ${patient.name?.[0]?.given?.[0] || "N/A"} ${patient.name?.[0]?.family || ""}<br>
      <strong>Gender:</strong> ${patient.gender || "N/A"}<br>
      <strong>Birth Date:</strong> ${patient.birthDate || "N/A"}
    `;

    document.getElementById("patient-info").innerHTML = info;
  } catch (error) {
    document.getElementById("patient-info").innerText = "Error loading patient data.";
    console.error(error);
  }
});
