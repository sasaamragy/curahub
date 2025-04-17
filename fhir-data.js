// js/fhir-data.js

document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");

  if (!code) {
    document.getElementById("patient-info").innerText = "No authorization code found.";
    return;
  }

  const tokenUrl = "https://launch.smarthealthit.org/v/r4/sim/eyJrIjoiMSJ9/token";
  const clientId = "my-client-id"; // لازم يكون نفس الـ client ID المستخدم

  try {
    const response = await fetch(tokenUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams({
        code: code,
        grant_type: "authorization_code",
        redirect_uri: window.location.origin + "/patient-data.html",
        client_id: clientId
      })
    });

    const data = await response.json();

    if (data.access_token) {
      fetchPatientData(data.access_token, data.patient);
    } else {
      document.getElementById("patient-info").innerText = "Failed to obtain access token.";
    }
  } catch (error) {
    document.getElementById("patient-info").innerText = "Error fetching access token.";
    console.error(error);
  }
});

async function fetchPatientData(token, patientId) {
  try {
    const patientRes = await fetch(`https://launch.smarthealthit.org/v/r4/Patient/${patientId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const patient = await patientRes.json();
    const info = `
      <strong>Name:</strong> ${patient.name?.[0]?.given?.[0] || "N/A"} ${patient.name?.[0]?.family || ""}<br>
      <strong>Gender:</strong> ${patient.gender || "N/A"}<br>
      <strong>Birth Date:</strong> ${patient.birthDate || "N/A"}
    `;

    document.getElementById("patient-info").innerHTML = info;
  } catch (err) {
    document.getElementById("patient-info").innerText = "Error loading patient data.";
    console.error(err);
  }
}
