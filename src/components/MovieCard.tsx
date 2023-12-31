import { BsChevronDown, BsFillPlayFill } from 'react-icons/bs'
import { FavoriteButton } from './FavoritesButton'
import { useRouter } from 'next/router'
import { useInfoModal } from '@/hooks/useInfoModal'

interface MovieCardProps {
  data: Record<string, unknown>
}

export function MovieCard({ data }: MovieCardProps) {
  const router = useRouter()
  const { openModal } = useInfoModal()

  return (
    <div className="group bg-zinc-900 col-pan relative h-[12vw]">
      <img
        className="cursor-pointer object-cover transition duration shadow-xl rounded-md group-hover:opacity-90 sm:group-hover:opacity-0 delay-300 w-full h-full"
        src={data.thumbnailUrl as string}
        alt="thumbnail"
      />

      <div className="opacity-0 absolute top-0 transition duration duration-200 z-10 invisible sm:visible delay-300 w-full scale-0 group-hover:scale-110 group-hover:-translate-y-[6vw] group-hover:translate-x-[2vw] group-hover:opacity-100">
        <img
          className="cursor-pointer object-cover transition duration duration shadow-xl rounded-t-md w-full h-[12vw]"
          src={data.thumbnailUrl as string}
          alt="thumbnail"
        />

        <div className="z-10 bg-zinc-800 p-2 lg:p-4 absolute w-full transition shadow-md rounded-b-md">
          <div className="flex flex-row items-center gap-3">
            <div
              onClick={() => router.push(`/watch/${data?.id}`)}
              className="cursor-pointer w-6 h-6 lg:w-10 lg:h-10 bg-white rounded-full flex justify-center items-center transition hover:bg-neutral-300"
            >
              <BsFillPlayFill size={30} />
            </div>
            <FavoriteButton movieId={data.id as string} />

            <div
              onClick={() => openModal(data?.id as string)}
              className="cursor-pointer ml-auto group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300"
            >
              <BsChevronDown className="text-white group-hover/item:text-neutral-300" />
            </div>
          </div>
          <p className="text-green-400 font-semibold mt-4">
            New <span className="text-white">2023</span>
          </p>

          <div className="flex flex-row mt-4 gap-2 items-center">
            <p className="text-white text-[10px] lg:text-sm">
              {data?.duration as string}
            </p>
          </div>

          <div className="flex flex-row mt-4 gap-2 items-center">
            <p className="text-white text-[10px] lg:text-sm">
              {data?.genre as string}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
