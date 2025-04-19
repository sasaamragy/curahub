
FHIR.oauth2.authorize({
  client_id: "curahub-client-app",
  scope: "launch openid fhirUser patient/*.read",
  redirect_uri: "https://sasaamragy.github.io/curahub/redirect.html",
 iss: "https://launch.smarthealthit.org/v/r4",
  pkce: true
});
