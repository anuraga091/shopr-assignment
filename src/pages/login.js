import { useRouter } from 'next/router'
import Link from 'next/link'
import React,{useState} from 'react'
import { useAuth } from '@/context/AuthContext'


export default function Login() {
    const router = useRouter()
    const { user, login} = useAuth()
    //const { user, login } = useAuth()
    const [data, setData] = useState({
        email: '',
        password: '',
    })

  const handleLogin = async (e) => {
    e.preventDefault()

    console.log(user)
    try {
      await login(data.email, data.password)
      router.push('/dashboard')
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <>
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>
          <form className="mt-8 mb-4 space-y-6" action="#" onSubmit={handleLogin}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div className="mb-4 space-y-6">
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  value={data.email}
                  autoComplete="email"
                  onChange={(e) => setData({...data, email: e.target.value,})}
                  required
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={data.password}
                  autoComplete="current-password"
                  onChange={(e) => setData({...data, password: e.target.value,})}
                  required
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Sign in
              </button>
            </div>
             <div className="flex items-center flex-end">
              <div className="text-sm">
                <Link href='/signup' className="font-medium text-indigo-600 hover:text-indigo-500">
                  Do not have account? Sign up
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}