function startSmartLogin() {
  const serviceUrl = "https://launch.smarthealthit.org/v/r4/sim/WzMsIiIsIiIsIkFVVE8iLDAsMCwwLCJsYXVuY2ggb3BlbmlkIGZoaXJVc2VyIHBhdGllbnQvKi5yZWFkIiwiaHR0cHM6Ly9zdXBlci1nZWxhdG8tNzg0YmM3Lm5ldGxpZnkuYXBwL3JlZGlyZWN0Lmh0bWwiLCIiLCIiLCIiLCIiLCIiLDAsMiwiIl0/fhir";

  FHIR.oauth2.authorize({
    client_id: "my-web-app", // ده اسمك اللي استخدمته في SMART Launcher
    scope: "launch openid fhirUser patient/*.read",
    redirect_uri: "https://super-gelato-784bc7.netlify.app/redirect.html",
    iss: serviceUrl
  });
}
