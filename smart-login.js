
FHIR.oauth2.authorize({
  clientId: "curahub-client-app",
  scope: "launch openid fhirUser patient/*.read",
  redirectUri: "https://sasaamragy.github.io/curahub/redirect.html",
  iss: "https://launch.smarthealthit.org/v/r4",
  pkce: true
});
