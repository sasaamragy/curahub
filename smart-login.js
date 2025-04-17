function startSmartLogin() {
  const clientId = "curahub-client-app"; // ✅ Client ID بتاعك (أي اسم مؤقت في SMART Launcher)
  const redirectUri = "https://your-site-name.netlify.app/redirect.html"; // ✅ بدّلي ده بالرابط الفعلي لموقعك

  const scope = "launch openid fhirUser patient/*.read";
  const fhirServer = "https://launch.smarthealthit.org/v/r4";
  const authorizeUrl = `${fhirServer}/auth/authorize`;

  const url = `${authorizeUrl}?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scope)}&aud=${encodeURIComponent(fhirServer)}`;

  window.location.href = url;
}
