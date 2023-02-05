import Link from 'next/link'
import { useRouter } from 'next/router'
import React,{useState} from 'react'
import { useAuth } from '@/context/AuthContext'

export default function Signup() {

    const router = useRouter()
    const { user, signup} = useAuth()
    console.log(user)
    const [data, setData] = useState({
        email: '',
        password: '',
    })
    const handleSignup = async (e) => {
        e.preventDefault()
        try {
        await signup(data.email, data.password)
        router.push('/dashboard')
        } catch (err) {
        console.log(err)
        }

        console.log(data)
  }

  return (
    <>
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Sign up for new account
            </h2>
          </div>
          <form className="mt-8 space-y-6" action="#" onSubmit={handleSignup}>
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
                  autoComplete="email"
                  value={data.email}
                  onChange={(e) => setData({...data, email: e.target.value,})}
                  required
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <div className="mb-4 space-y-6">
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={data.password}
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
                Sign up
              </button>
            </div>
            <div className="flex flex-end">
              <div className="text-sm">
                <Link href='/login' className="font-medium text-indigo-600 hover:text-indigo-500" >
                  Already have an account? Sign in
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}