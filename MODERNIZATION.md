# WhereAreYou — Edge Utility Modernization Roadmap

This is a compact Nuxt/Nitro utility that reports city and IP from Vercel request metadata. Its strength is precision: the project should stay small and accurately scoped.

## 10 tasks

1. Parse `x-forwarded-for` defensively and document trusted-proxy assumptions.
2. Decode/normalize `x-vercel-ip-city` safely and handle missing/encoded values.
3. Add a privacy note explaining that IP/city request metadata is displayed to the visitor.
4. Avoid logging or persisting IP addresses unless explicitly required.
5. Add API response typing and a stable error/missing-data contract.
6. Add tests for missing headers, multiple forwarded IPs and encoded city names.
7. Add a local-development fallback/mock mode because Vercel-specific headers may not exist locally.
8. Add CI for lint/type checks/tests/build.
9. Verify behavior on the live deployment and document that results depend on hosting/proxy infrastructure rather than browser GPS.
10. Position as a concise edge-computing/Nuxt utility, not a full geolocation platform.

## Portfolio value

Small but credible supporting engineering artifact demonstrating Nuxt server routes, edge request metadata and careful product scoping.