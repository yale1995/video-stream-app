import axios from 'axios'

import { FunctionComponent, useCallback, useMemo } from 'react'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import { useFavorites } from '@/hooks/useFavorites'

import { AiOutlinePlus, AiOutlineCheck } from 'react-icons/ai'

interface FavoriteButtonProps {
  movieId: string
}

export const FavoriteButton: FunctionComponent<FavoriteButtonProps> = ({
  movieId,
}) => {
  const { mutate: mutateFavorites } = useFavorites()
  const { data: currentUser, mutate } = useCurrentUser()

  const isFavorite = useMemo(() => {
    const list = currentUser?.favoriteIds || []

    return list?.includes(movieId)
  }, [currentUser, movieId])

  const toggleFavorites = useCallback(async () => {
    let response

    if (isFavorite) {
      response = await axios.delete('/api/favorite', { data: { movieId } })
    } else {
      response = await axios.post('/api/favorite', { movieId })
    }

    const updatedFavoriteIds = await response?.data?.favoriteIds

    mutate({
      ...currentUser,
      favoriteIds: updatedFavoriteIds,
    })

    const retornoMutateFavorites = await mutateFavorites()

    console.log(retornoMutateFavorites, 'retornoMutateFavorites')
  }, [movieId, isFavorite, currentUser, mutate, mutateFavorites])

  const Icon = isFavorite ? AiOutlineCheck : AiOutlinePlus

  return (
    <div
      onClick={toggleFavorites}
      className="cursor-pointer group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300"
    >
      <Icon className="text-white" size={25} />
    </div>
  )
}
