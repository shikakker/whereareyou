function decodeHeader(value: string | undefined) {
  if (!value) return null
  try {
    return decodeURIComponent(value)
  } catch {
    return value
  }
}

function maskIp(value: string | undefined) {
  if (!value) return null
  const first = value.split(',')[0]?.trim()
  if (!first) return null

  if (first.includes(':')) {
    const parts = first.split(':').filter(Boolean)
    return parts.length >= 2 ? `${parts.slice(0, 2).join(':')}::/32` : 'IPv6'
  }

  const octets = first.split('.')
  if (octets.length !== 4) return null
  return `${octets[0]}.${octets[1]}.${octets[2]}.0/24`
}

export default defineEventHandler((event) => {
  return {
    city: decodeHeader(getHeader(event, 'x-vercel-ip-city')),
    region: decodeHeader(getHeader(event, 'x-vercel-ip-country-region')),
    country: decodeHeader(getHeader(event, 'x-vercel-ip-country')),
    maskedIp: maskIp(getHeader(event, 'x-forwarded-for')),
    source: 'Vercel request headers',
  }
})
