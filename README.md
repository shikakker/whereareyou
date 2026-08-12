# WhereAreYou — Nuxt 3 Vercel Edge Location Utility

Small Nuxt 3 utility that shows the visitor's IP address and city using request metadata supplied by Vercel's edge infrastructure.

Historical / live project reference:

```text
https://whereareyou.whoisegor.ru/
```

The previous README described a generic HTML / Node / Express geolocation application and even included a hypothetical `/api/location` response with country data. That did not match the repository. The actual implementation is much smaller and more specific: **Nuxt 3 + Nitro on Vercel Edge** with one server endpoint.

## Architecture

```text
visitor request
      |
      v
Vercel Edge / proxy headers
      |
      +-- x-vercel-ip-city
      +-- x-forwarded-for
      |
      v
Nuxt Nitro /api/info
      |
      v
{ city, ip }
      |
      v
Vue / Nuxt UI
```

## Server API

The repository contains:

```text
server/api/info.ts
```

which returns:

```json
{
  "city": "...",
  "ip": "..."
}
```

The current code reads the city from:

```text
x-vercel-ip-city
```

and the IP from the first value in:

```text
x-forwarded-for
```

If a header is unavailable, the route returns:

```text
-
```

for that field.

## No country lookup in the current API

The previous README claimed the application returned:

```text
city
country
ip
```

but the current server endpoint returns only:

```text
city
ip
```

There is no third-party IP-geolocation provider, GeoIP database, or country lookup in the audited implementation.

## Vercel-specific behavior

The project builds with:

```bash
NITRO_PRESET=vercel-edge nuxt build
```

The city value depends on Vercel-provided request headers in the deployed environment.

Local development may therefore show:

```text
-
```

for city unless equivalent headers are supplied manually by a proxy / test request.

Likewise, `x-forwarded-for` reflects proxy metadata. It should not be treated as independently verified identity information.

## IP-address caveats

The value displayed by the application can represent the public network address seen by the deployment infrastructure, which may correspond to:

- a home / office router;
- mobile carrier NAT;
- VPN;
- corporate proxy;
- privacy relay;
- another network intermediary.

It is not a reliable unique user identifier or precise physical-location signal.

## Location accuracy

`x-vercel-ip-city` is IP-derived coarse geolocation metadata.

It should not be presented as:

- GPS location;
- exact address;
- guaranteed current city;
- proof of residence;
- identity verification.

VPNs, mobile networks, ISP routing, geolocation-database lag, and privacy services can make the result inaccurate.

## Privacy boundary

An IP address can be personal data in many privacy contexts.

The current endpoint returns request-derived IP / city information to the requesting client. If analytics, logging, persistence, or sharing are added later, document explicitly:

- whether IP addresses are stored;
- retention duration;
- purpose of processing;
- third-party recipients;
- deletion / access behavior;
- applicable privacy notice / consent requirements.

For a simple diagnostic utility, avoid storing IP data unless there is a clear need.

## Tech stack

- Nuxt 3
- Vue 3
- Nitro server routes
- Vercel Edge preset
- TypeScript

There is no Express backend or external geolocation SDK in the current package.

## Local development

### Requirements

- Node.js compatible with the historical Nuxt 3 dependency
- npm / pnpm

### Install

```bash
git clone https://github.com/shikakker/whereareyou.git
cd whereareyou
npm install
```

Run:

```bash
npm run dev
```

Build for the configured Vercel Edge target:

```bash
npm run build
```

## Current status

**Working small Nuxt / Vercel Edge diagnostic utility.** The actual implementation reads visitor city and IP from deployment request headers and exposes them through one Nitro API route. It does not perform GPS positioning, country lookup, exact geolocation, or identity verification.

## Product intent

WhereAreYou is best understood as a compact infrastructure / edge-runtime experiment: expose a small amount of request metadata in a clean user-facing interface and understand how hosting-platform geolocation headers behave.

## License

Verify the repository license before redistribution; this README does not add additional licensing rights.