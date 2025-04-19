
FHIR.oauth2.authorize({
  clientId: "curahub-client-app", // ✅ استخدم clientId بدل client_id
  scope: "launch openid fhirUser patient/*.read",
  redirectUri: "https://sasaamragy.github.io/curahub/redirect.html", // ✅ استخدم camelCase: redirectUri
  iss: "https://launch.smarthealthit.org/v/r4",
  pkce: true
});
