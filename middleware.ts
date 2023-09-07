export { default } from 'next-auth/middleware'

export const config = {
    matcher: [
        '/notifications',
        '/profile/:path*',
        '/search'
    ]
}