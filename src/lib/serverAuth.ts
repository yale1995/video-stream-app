import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'

import { prismaClient } from './prismadb'
import { authOptions } from '@/pages/api/auth/[...nextauth]'

export const serverAuth = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions)

  if (!session?.user?.email) throw new Error('Not signed in 1')

  const currentUser = await prismaClient.user.findUnique({
    where: {
      email: session.user.email,
    },
  })

  if (!currentUser) throw new Error('Not signed in 2')

  return { currentUser }
}
