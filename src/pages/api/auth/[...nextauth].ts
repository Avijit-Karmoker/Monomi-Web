import { NextApiRequest, NextApiResponse } from 'next'
import NextAuth, { NextAuthOptions, CallbacksOptions } from 'next-auth'
import Providers from 'next-auth/providers'

const options: NextAuthOptions = {
  secret: process.env.SECRET,
  session: {
    jwt: true,
  },
  providers: [
    Providers.Credentials({
      name: 'accessToken',
      credentials: {
        accessToken: { type: 'text' },
      },
      authorize: async ({ accessToken }) =>
        accessToken ? { accessToken } : null,
    }),
  ],
  callbacks: {
    signIn: async ({ accessToken }) => !!accessToken,
    async jwt(token, user) {
      if (user) {
        token = { accessToken: user.accessToken }
      }

      return token
    },
    session: ((session, { accessToken }) => {
      session.accessToken = accessToken as string

      return session
    }) as CallbacksOptions['session'],
  },
}

export default (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, options)
