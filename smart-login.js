function startSmartLogin() {
  FHIR.oauth2.authorize({
    client_id: "my-web-app", // ده اسم افتراضي في SMART Launcher، ممكن تغيريه لو سجلتي اسم مختلف
    scope: "launch openid fhirUser patient/*.read",
    redirect_uri: "https://super-gelato-784bc7.netlify.app/redirect.html"
  });
}
