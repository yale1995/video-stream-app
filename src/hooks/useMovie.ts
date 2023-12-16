import useSWR from 'swr'
import { fetcher } from '@/lib/fetcher'

export const useMovie = (id: string) => {
  const { data, error, isLoading } = useSWR(`/api/movies/${id}`, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  })

  return { data, error, isLoading }
}
