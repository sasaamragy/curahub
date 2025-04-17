document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("prom-form");
  const message = document.getElementById("submission-message");

  // الخطوة 1: نجيب بيانات الدخول من الجلسة أو localStorage
  const accessToken = sessionStorage.getItem("access_token");
  const patientId = sessionStorage.getItem("patient_id");

  form?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    console.log("PROM submission:", data);

    if (accessToken && patientId) {
      await sendPromToFhir(data, patientId, accessToken);
      message.textContent = "Thank you! Your responses have been submitted to your medical record.";
    } else {
      message.textContent = "Submission failed: Patient not authenticated.";
    }

    form.reset();
  });
});

// الخطوة 2: دالة إرسال بيانات الاستبيان إلى FHIR API
async function sendPromToFhir(data, patientId, token) {
  const questionnaireResponse = {
    resourceType: "QuestionnaireResponse",
    status: "completed",
    subject: {
      reference: `Patient/${patientId}`
    },
    authored: new Date().toISOString(),
    item: [
      {
        linkId: "overall_health",
        text: "How would you rate your overall health today?",
        answer: [{ valueString: data.overall_health }]
      },
      {
        linkId: "pain",
        text: "Do you feel any pain currently?",
        answer: [{ valueBoolean: data.pain === "yes" }]
      }
    ]
  };

  const response = await fetch("https://launch.smarthealthit.org/v/r4/QuestionnaireResponse", {
    method: "POST",
    headers: {
      "Content-Type": "application/fhir+json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(questionnaireResponse)
  });

  if (response.ok) {
    console.log("PROM successfully sent to FHIR server");
  } else {
    console.error("Failed to send PROM", await response.text());
  }
}
