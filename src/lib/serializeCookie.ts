import cookie from 'cookie'
import { NextApiRequest } from 'next'
// add types for serializeCookie params..
export const serializeCookie = (name: string, value: string, req: any, options = {})  => {
  const { origin } = req.headers
  const domain = origin ? getDomain(origin) : null // Gets the full domain from origin
  const { maindomain } = domain ? getSubdomain(domain) : { maindomain: null } // Gets the subdomain and main domain
  return cookie.serialize(name, String(value), {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7,
    sameSite: 'none',
    secure: true,
    path: '/',
    domain: maindomain ? '.' + maindomain : undefined,
    ...options,
  })
}

// Create the getDomain function
export const getDomain = (origin: string) => {
  const url = new URL(origin)
  return url.hostname
}

// Create the getSubdomain function
export const getSubdomain = (domain: string) => {
  const parts = domain.split('.')
  const maindomain = parts.slice(-2).join('.')
  const subdomain = parts.slice(0, -2).join('.')
  return { subdomain, maindomain }
}