import { NextApiRequest } from 'next'
import { getSession } from 'next-auth/react'

import { prismaClient } from './prismadb'

export const serverAuth = async (req: NextApiRequest) => {
  const session = await getSession({ req })

  if (!session?.user?.email) throw new Error('Not signed in')

  const currentUser = await prismaClient.user.findUnique({
    where: {
      email: session.user.email,
    },
  })

  if (!currentUser) throw new Error('Not signed in')

  return { currentUser }
}