import bcrypt from 'bcrypt'

import { NextApiResponse, NextApiRequest } from 'next'
import { prismaClient } from '@/lib/prismadb'

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  if (request.method !== 'POST') {
    return response.status(405).end()
  }

  try {
    const { email, name, password } = request.body

    const existingUser = await prismaClient.user.findUnique({
      where: {
        email,
      },
    })

    if (existingUser) {
      return response.status(422).json({ error: 'Email taken' })
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    const user = await prismaClient.user.create({
      data: {
        email,
        name,
        hashedPassword,
        image: '',
        emailVerified: new Date(),
      },
    })

    return response.status(200).json(user)
  } catch (error) {
    console.log(error)
    return response.status(400).end()
  }
}
