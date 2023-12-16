import { NextApiRequest, NextApiResponse } from 'next'
import { without } from 'lodash'
import { prismaClient } from '@/lib/prismadb'
import { serverAuth } from '@/lib/serverAuth'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.method === 'POST') {
      const { currentUser } = await serverAuth(req, res)

      const { movieId } = req.body

      const existingMovie = await prismaClient.movie.findUnique({
        where: {
          id: movieId,
        },
      })

      if (!existingMovie) throw new Error('Invalid Id')

      const user = await prismaClient.user.update({
        where: {
          email: currentUser?.email as string,
        },
        data: {
          favoriteIds: {
            push: movieId,
          },
        },
      })

      return res.status(200).json(user)
    }

    if (req.method === 'DELETE') {
      const { currentUser } = await serverAuth(req, res)

      const { movieId } = req.body

      const existingMovie = await prismaClient.movie.findUnique({
        where: {
          id: movieId,
        },
      })

      if (!existingMovie) throw new Error('Invalid Id')

      const updatedFavoriteIds = without(currentUser?.favoriteIds, movieId)

      const updatedUser = await prismaClient.user.update({
        where: {
          email: currentUser?.email as string,
        },
        data: {
          favoriteIds: updatedFavoriteIds,
        },
      })

      res.status(200).json(updatedUser)
    }

    return res.status(405).end()
  } catch (Error) {
    console.log(Error)
    return res.status(500).end()
  }
}
