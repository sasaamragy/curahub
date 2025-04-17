// js/careplan.js

document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");

  if (!code) {
    document.getElementById("careplans-container").innerText = "No authorization code found.";
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
        redirect_uri: window.location.origin + "/careplan.html",
        client_id: clientId
      })
    });

    const data = await response.json();

    if (data.access_token) {
      fetchCarePlans(data.access_token, data.patient);
    } else {
      document.getElementById("careplans-container").innerText = "Failed to obtain access token.";
    }
  } catch (error) {
    document.getElementById("careplans-container").innerText = "Error fetching access token.";
    console.error(error);
  }
});

async function fetchCarePlans(token, patientId) {
  try {
    const res = await fetch(`https://launch.smarthealthit.org/v/r4/CarePlan?patient=${patientId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const result = await res.json();
    const container = document.getElementById("careplans-container");

    if (!result.entry || result.entry.length === 0) {
      container.innerHTML = "<p>No care plans found.</p>";
      return;
    }

    container.innerHTML = "";
    result.entry.forEach(entry => {
      const plan = entry.resource;
      const title = plan.title || "Untitled Care Plan";
      const status = plan.status || "Unknown";
      const date = plan.period?.start || "No Start Date";

      const box = document.createElement("div");
      box.className = "plan-box";
      box.innerHTML = `
        <strong>Title:</strong> ${title}<br>
        <strong>Status:</strong> ${status}<br>
        <strong>Start Date:</strong> ${date}
      `;
      container.appendChild(box);
    });
  } catch (err) {
    document.getElementById("careplans-container").innerText = "Error loading care plans.";
    console.error(err);
  }
}
