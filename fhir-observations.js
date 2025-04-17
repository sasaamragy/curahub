// js/fhir-observations.js

document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");

  if (!code) {
    document.getElementById("observations-container").innerText = "No authorization code found.";
    return;
  }

  const tokenUrl = "https://launch.smarthealthit.org/v/r4/sim/eyJrIjoiMSJ9/token";
  const clientId = "my-client-id";

  try {
    const response = await fetch(tokenUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams({
        code: code,
        grant_type: "authorization_code",
        redirect_uri: window.location.origin + "/observations.html",
        client_id: clientId
      })
    });

    const data = await response.json();

    if (data.access_token && data.patient) {
      fetchObservations(data.access_token, data.patient);
    } else {
      document.getElementById("observations-container").innerText = "Failed to obtain access token.";
    }
  } catch (error) {
    document.getElementById("observations-container").innerText = "Error fetching access token.";
    console.error(error);
  }
});

async function fetchObservations(token, patientId) {
  try {
    const res = await fetch(`https://launch.smarthealthit.org/v/r4/Observation?patient=${patientId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const data = await res.json();
    const container = document.getElementById("observations-container");

    if (!data.entry || data.entry.length === 0) {
      container.innerText = "No observations found.";
      return;
    }

    container.innerHTML = "";

    data.entry.forEach(entry => {
      const obs = entry.resource;
      const value = obs.valueQuantity?.value || obs.valueString || "N/A";
      const unit = obs.valueQuantity?.unit || "";
      const date = obs.effectiveDateTime || "Unknown Date";
      const code = obs.code?.text || "Observation";

      const div = document.createElement("div");
      div.className = "obs-box";
      div.innerHTML = `
        <strong>${code}</strong><br>
        Value: ${value} ${unit}<br>
        Date: ${new Date(date).toLocaleDateString()}
      `;
      container.appendChild(div);
    });
  } catch (error) {
    document.getElementById("observations-container").innerText = "Error loading observations.";
    console.error(error);
  }
}
