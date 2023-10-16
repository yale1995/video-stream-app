import axios from 'axios'

import { Input } from '@/components/Input'
import { useCallback, useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'

export default function Auth() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  const [variant, setVariant] = useState('login')

  const router = useRouter()

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === 'login' ? 'register' : 'login',
    )
  }, [])

  const login = useCallback(async () => {
    event?.preventDefault()
    try {
      await signIn('credentials', {
        email,
        password,
        redirect: false,
        callbackUrl: '/',
      })
      router.push('/')
    } catch (error) {
      console.log(error)
    }
  }, [email, password, router])

  const register = useCallback(async () => {
    event?.preventDefault()
    try {
      await axios.post('/api/register', {
        email,
        name,
        password,
      })

      login()
    } catch (error) {
      console.log(error)
    }
  }, [email, name, password, login])

  return (
    <div className="relative w-full h-screen bg-[url('/images/netflix-hero.jpg')] bg-center bg-no-repeat bg-fixed bg-cover">
      <div className="bg-black w-full h-full lg:bg-opacity-50">
        <nav className="px-12 py-5">
          <img
            src="/images/netflix-logo.png"
            alt="netflix logo"
            className="h-12"
          />
        </nav>

        <div className="flex justify-center">
          <form className="bg-zinc-800 bg-opacity-30 backdrop-blur-[15px] p-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
            <h2 className="text-gray-50 text-4xl mb-8 font-semibold">
              {variant === 'login' ? 'Sign In' : 'Register'}
            </h2>

            <div className="flex flex-col gap-4">
              {variant === 'register' && (
                <Input
                  label="Username"
                  onChange={(event) => {
                    setName(() => event.target.value)
                  }}
                  id="name"
                  value={name}
                />
              )}

              <Input
                label="Email"
                onChange={(event) => {
                  setEmail(() => event.target.value)
                }}
                id="email"
                type="email"
                value={email}
              />

              <Input
                label="Password"
                onChange={(event) => {
                  setPassword(() => event.target.value)
                }}
                id="password"
                type="password"
                value={password}
              />
            </div>

            <button
              onClick={variant === 'login' ? login : register}
              className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition"
            >
              {variant === 'login' ? 'Login' : 'Sign up'}
            </button>

            <p className="text-neutral-500 mt-12">
              {variant === 'login'
                ? 'First time using Netlfix?'
                : 'Already have an account?'}
              <span
                onClick={toggleVariant}
                className="text-white ml-1 hover:underline cursor-pointer"
              >
                {variant === 'login' ? 'Create an account' : 'Login'}
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
