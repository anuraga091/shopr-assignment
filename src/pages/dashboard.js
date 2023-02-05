import React, { useEffect, useState } from 'react'
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
const finnhub = require('finnhub');
import { useRouter } from 'next/router'
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

const user1 = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}
const navigation = [
  { name: 'Dashboard', href: '#', current: true },
]
const userNavigation = [
  { name: 'Sign out', href: 'signup' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export async function getServerSideProps(){
  const res = await fetch(`https://finnhub.io/api/v1/stock/symbol?exchange=US&token=cfd98fpr01qj357esqt0cfd98fpr01qj357esqtg`)
  const data  = await res.json()
  //const data = wholedata.slice(0,100)
  return {
      props: {
        stockData: data,
      }
    }
}

export default function Dashboard({stockData}) {
  const [search, setSearch] = useState("")
  const [data, setData] = useState([])
  const router = useRouter()
  const {user, logout} = useAuth()

  useEffect(() => {
    setData(stockData)

    return () => {}
  },[stockData])
  const slicedData = data.slice(0,100)
  
  const searchData = slicedData.filter((obj,key) => obj.displaySymbol.toLowerCase().includes(search))
  
  const handleClick = (e) => {
    const SYMBOL = e.target.innerText
    router.push(`/dashboard/${SYMBOL}`)
  }
  return (
    <>
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-gray-800">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <img
                        className="h-8 w-8"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                        alt="Your Company"
                      />
                    </div>
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                        {navigation.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className={classNames(
                              item.current
                                ? 'bg-gray-900 text-white'
                                : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                              'px-3 py-2 rounded-md text-sm font-medium'
                            )}
                            aria-current={item.current ? 'page' : undefined}
                          >
                            {item.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                      <button
                        type="button"
                        className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      >
                        <span className="sr-only">View notifications</span>
                        {/* <BellIcon className="h-6 w-6" aria-hidden="true" /> */}
                      </button>

                      {/* Profile dropdown */}
                      <Menu as="div" className="relative ml-3">
                        <div>
                          <Menu.Button className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span className="sr-only">Open user1 menu</span>
                            <img className="h-8 w-8 rounded-full" src={user1.imageUrl} alt="" />
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {userNavigation.map((item) => (
                              <Menu.Item key={item.name}>
                                {({ active }) => (
                                  <Link
                                    href={item.href}
                                    className={classNames(
                                      active ? 'bg-gray-100' : '',
                                      'block px-4 py-2 text-sm text-gray-700'
                                    )}
                                    onClick={() => {logout()}}
                                  >
                                    {item.name}
                                  </Link>
                                )}
                              </Menu.Item>
                            ))}
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>
                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                      ) : (
                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

               <Disclosure.Panel className="md:hidden">
                <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
                  {navigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className={classNames(
                        item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'block px-3 py-2 rounded-md text-base font-medium'
                      )}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
                <div className="border-t border-gray-700 pt-4 pb-3">
                  <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                      <img className="h-10 w-10 rounded-full" src={user1.imageUrl} alt="" />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium leading-none text-white">{user1.name}</div>
                      <div className="text-sm font-medium leading-none text-gray-400">{user1.email}</div>
                    </div>
                    <button
                      type="button"
                      className="ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      <span className="sr-only">View notifications</span>
                      {/* <BellIcon className="h-6 w-6" aria-hidden="true" /> */}
                    </button>
                  </div>
                  <div className="mt-3 space-y-1 px-2">
                    {userNavigation.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as="a"
                        href={item.href}
                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                      >
                        {item.name}
                      </Disclosure.Button>
                    ))}
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
        
        <main className="bg-white shadow ">
          
            <div className='flex justify-center'>
              <input id="search" name="search" type="search" onChange={(e) => setSearch( e.target.value)}
                    className="max-w-sm md:w-96 mt-2 self-center relative block appearance-none rounded rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Search Stocks with their symbol" 
              />
              {/* <MagnifyingGlassIcon className='mt-3.5 bg-blue-700 w-6 h-6'/> */}
              </div>
          
          
          
          <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
              <div className="relative overflow-x-auto" >
                  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                          <tr>
                              <th scope="col" className="px-6 py-3">
                                  Currency
                              </th>
                              <th scope="col" className="px-6 py-3">
                                  Description
                              </th>
                              <th scope="col" className="px-6 py-3">
                                  Symbol
                              </th>
                              <th scope="col" className="px-6 py-3">
                                  Type
                              </th>
                          </tr>
                      </thead>
                      {searchData == {} || searchData == null || slicedData.searchData <= 0 ? "Loading ...." 
                        : 
                        searchData.length > 0 && searchData!= [] ?
                        searchData.map((data, key) => (
                          <tbody key={key}>
                              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                      {data.currency}
                                  </th>
                                  <td className="px-6 py-4">
                                      {data.description}
                                  </td>
                                  <td className="px-6 py-4 cursor-pointer" onClick={(e) => handleClick(e)}>
                                      {data.displaySymbol}
                                  </td>
                                  <td className="px-6 py-4">
                                      {data.type}
                                  </td>
                              </tr>
                          </tbody>
                           ))
                          : <p>No Data</p> }
                      </table>
              </div>
           
         
          </div>
        </main>
      </div>
    </>
  )
}
