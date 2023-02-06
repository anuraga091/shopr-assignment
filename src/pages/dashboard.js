import React, { useEffect, useState } from 'react'
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon, PlusCircleIcon,MinusCircleIcon,ShoppingCartIcon } from '@heroicons/react/24/outline'
const finnhub = require('finnhub');
import { useRouter } from 'next/router'
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
//import Portfolio from './portfolio';



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
  const wholedata  = await res.json()
  const data = wholedata.slice(0,100)
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
  const [selectedStocks, setSelectedStocks] = useState([])
  const [selectedStocksSymbol, setSelectedStocksSymbol] = useState([])
  

  useEffect(() => {
    setData(stockData)
  },[stockData])

  useEffect(() => {
    setSelectedStocks(selectedStocks)
    setSelectedStocksSymbol(selectedStocksSymbol)
  },[selectedStocks, selectedStocksSymbol])
  
  
  const handleClick = (e) => {
    const SYMBOL = e.target.innerText
    router.push(`/dashboard/${SYMBOL}`)
  }

  const addToPortfolio = (e, key) => {
    let symbol = data[key].displaySymbol
    let clickedStock = data[key]
    if(!selectedStocksSymbol.includes(symbol)){
      const temp_selectedStocks = [...selectedStocks,clickedStock]
      const temp_selectedStocksSymbol = [...selectedStocksSymbol,symbol]
      setSelectedStocks(temp_selectedStocks)
      setSelectedStocksSymbol(temp_selectedStocksSymbol)
    }
  }

  const showAddedStocks = () => {
    router.push("/portfolio")
  }
//To remove stocks from portfolio
  // const removeFromPortfolio = (e, key) => {
    
  //   let symbol = data[key].displaySymbol
  //   console.log('clicked', selectedStocksSymbol.includes(symbol))
  //   if(selectedStocksSymbol.includes(symbol)){
  //     let temp_SelectedStocks = selectedStocks
  //     let temp_SelectedStocksSymbol = selectedStocksSymbol
  //     const index = temp_SelectedStocks.findIndex(obj => obj.displaySymbol == symbol)
  //     if(index > -1){
  //         temp_SelectedStocks.splice(index,1)
  //     } 
  //     const symbolIndex = temp_SelectedStocksSymbol.indexOf(symbol)
  //     if(index > -1){
  //         temp_SelectedStocksSymbol.splice(symbolIndex,1)
  //     }
  //     setSelectedStocks(temp_SelectedStocks)
  //     setSelectedStocksSymbol(temp_SelectedStocksSymbol)
  //   }
    
  // }
 
  const searchData = data.filter((obj,key) => obj.displaySymbol.toLowerCase().includes(search))
  

  return (
    <>
      {!user ? "Loading ..." :
      <div className="min-h-full ">
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
                      <div className="text-sm font-medium leading-none text-gray-400">{user.email}</div>
                    </div>
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
            <div className='flex justify-evenly'>
              <input id="search" name="search" type="search" onChange={(e) => setSearch( e.target.value)}
                    className="max-w-sm md:w-96 mt-2 self-center relative block appearance-none rounded rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Search Stocks with their symbol" 
              />
              <div className='flex'>
                  <ShoppingCartIcon className='mt-3.5 w-6 h-6'/>
                  <p className='bg-red-700 rounded-full mb-5 mt-1 p-0.5'>{selectedStocks.length}</p>
              </div>
            </div>
         
            
            <div className="min-h-screen  py-6 px-4 sm:px-6 lg:px-8 sm ">
              <div className="container space-y-8 text-sm mx-auto" >
                <div className='space-y-2'>
                  <div className='bg-white shadow-lg hover:shadow-xl rounded-md overflow-hidden'>
                      <table className=" table flex table-auto leading-normal w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                          <tr className='hidden md:table-row'>
                              <th className="px-6 py-3">
                                  Currency
                              </th>
                              <th  className="px-6 py-3">
                                  Description
                              </th>
                              <th className="px-6 py-3">
                                  Symbol
                              </th>
                              <th  className="px-6 py-3">
                                  Type
                              </th>
                              <th className="px-6 py-3">
                                  Add to Portfolio
                              </th>
                          </tr>
                      </thead>
                      {searchData == {} || searchData == null || searchData.length <= 0 ? 
                      <tbody className='flex-1 sm:flex-none'>
                              <tr className="border-t first:border-t-0 flex p-1 md:p-3  md:table-row flex-col w-full flex-wrap bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    <label class="text-xs text-gray-500 uppercase font-semibold md:hidden" for="">Currency</label>
                                    <p class="">Loading ....</p>
                                      
                                  </th>
                                  <td className="px-6 py-4">
                                      <label class="text-xs text-gray-500 uppercase font-semibold md:hidden" for="">Description</label>
                                      <p class="">Loading ....</p>
                                  </td>
                                  <td className="px-6 py-4" >
                                     <label class="text-xs text-gray-500 uppercase font-semibold md:hidden" for="">Symbol</label>
                                      <p class="">Loading ....</p>
                                  </td>
                                  <td className="px-6 py-4">
                                      <label class="text-xs text-gray-500 uppercase font-semibold md:hidden" for="">Type</label>
                                      <p class="">Loading ....</p>
                                  </td>
                                  <td className="px-6 py-4">
                                      <label class="text-xs text-gray-500 uppercase font-semibold md:hidden" for="">Add to Portfolio</label>
                                      <p class="">Loading ....</p>
                                  </td>
                              </tr>
                          </tbody> 
                        : 
                        searchData.length > 0 && searchData!= [] ?
                        searchData.map((data, key) => {
                          const stockSelected = data.displaySymbol
                          return(
                            <tbody key={key} className='flex-1 sm:flex-none'>
                              <tr className="border-t first:border-t-0 flex p-1 md:p-3  md:table-row flex-col w-full flex-wrap bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    <label class="text-xs text-gray-500 uppercase font-semibold md:hidden" for="">Currency</label>
                                    <p class="">{data.currency}</p>
                                      
                                  </th>
                                  <td className="px-6 py-4">
                                      <label class="text-xs text-gray-500 uppercase font-semibold md:hidden" for="">Description</label>
                                      <p class="">{data.description}</p>
                                  </td>
                                  <td className="px-6 py-4" >
                                     <label class="text-xs text-gray-500 uppercase font-semibold md:hidden" for="">Symbol</label>
                                      <p onClick={(e) => handleClick(e)} class="cursor-pointer">{data.displaySymbol}</p>
                                  </td>
                                  <td className="px-6 py-4">
                                      <label class="text-xs text-gray-500 uppercase font-semibold md:hidden" for="">Type</label>
                                      <p class=""> {data.type}</p>
                                  </td>
                                  <td className="px-6 py-4">
                                      <label class="text-xs text-gray-500 uppercase font-semibold md:hidden" for="">Add to Portfolio</label>
                                      { selectedStocksSymbol.includes(stockSelected) ? 
                                        <MinusCircleIcon key={key} style={{width: 24, height: 24}} /*onClick={(e) => removeFromPortfolio(e, key)}*//>
                                        :
                                        <PlusCircleIcon key={key} style={{width: 24, height: 24}} onClick={(e) => addToPortfolio(e, key)}/>
                                      }
                                  </td>
                              </tr>
                          </tbody>
                          
                           )})
                          :  <tbody className='flex-1 sm:flex-none'>
                              <tr className="border-t first:border-t-0 flex p-1 md:p-3  md:table-row flex-col w-full flex-wrap bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    <label class="text-xs text-gray-500 uppercase font-semibold md:hidden" for="">Currency</label>
                                    <p class="">No Data</p>
                                      
                                  </th>
                                  <td className="px-6 py-4">
                                      <label class="text-xs text-gray-500 uppercase font-semibold md:hidden" for="">Description</label>
                                      <p class="">No Data</p>
                                  </td>
                                  <td className="px-6 py-4" >
                                     <label class="text-xs text-gray-500 uppercase font-semibold md:hidden" for="">Symbol</label>
                                      <p class="">No Data</p>
                                  </td>
                                  <td className="px-6 py-4">
                                      <label class="text-xs text-gray-500 uppercase font-semibold md:hidden" for="">Type</label>
                                      <p class="">No Data</p>
                                  </td>
                                  <td className="px-6 py-4">
                                      <label class="text-xs text-gray-500 uppercase font-semibold md:hidden" for="">Add to Portfolio</label>
                                      <p class="">No Data</p>
                                  </td>
                              </tr>
                          </tbody>  }
                      </table>
                  </div>
                      
                </div>
                  
              </div>
           
         
          </div>
          
          
        </main>
      </div>
}
    </>
  )
}
