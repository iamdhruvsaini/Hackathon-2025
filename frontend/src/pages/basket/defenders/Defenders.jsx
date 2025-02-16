import React, { useEffect, useState } from 'react'
import { Check } from 'lucide-react';
import { X } from 'lucide-react';
import { Filter } from 'lucide-react';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"


import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from '@/components/ui/button';
import { useGetDefendersPlayersQuery } from '@/redux/features/position/playerPositionApi';


const Defenders = () => {
  const [pageCount,setPageCount]=useState(0);
  const { data: player, isLoading, isError } = useGetDefendersPlayersQuery(pageCount);
  const [players, setPlayers] = useState([]); // State to store players

  // Update state when data is fetched
  useEffect(() => {
    if (player?.data) {
      setPlayers(player.data);
    }
  }, [player]);

  const handlePaginationNext=()=>{
    if(!player?.hasMore){
      setPageCount(0);
    }
    else{
      setPageCount(pageCount+1);
    }
  }
  const handlePaginationPrev=()=>{
    if(pageCount<=0){
      setPageCount(0);
    }
    else{
      setPageCount(pageCount-1);
    }
  }


  return (
    <section className="bg-gray-50 xl:w-[1300px] mx-auto p-4 mt-10">
    <div className="mx-auto">
        
        <div className="bg-white relative shadow-md sm:rounded-lg overflow-hidden">
            {/* table header */}
            <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                <div className="w-full md:w-1/2">
                    <form className="flex items-center">
                        <label htmlFor="simple-search" className="sr-only">Search</label>
                        <div className="relative w-full">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg aria-hidden="true" className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <input type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Search" required=""/>
                        </div>
                    </form>
                </div>
                <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                  <Sheet>
                    <SheetTrigger className='font-semibold border px-2 py-1 rounded-md flex gap-2 items-center'>
                     <Filter className='size-5'/>
                     <span>Filter</span>
                    </SheetTrigger>
                    <SheetContent className="bg-gray-200">
                      <SheetHeader>
                        <SheetTitle>Are you absolutely sure?</SheetTitle>
                        <SheetDescription>
                          This action cannot be undone. This will permanently delete your account
                          and remove your data from our servers.
                        </SheetDescription>
                      </SheetHeader>
                    </SheetContent>
                  </Sheet>
                </div>
            </div>
            {/* main table  */}
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-4 py-3">Product name</th>
                            <th scope="col" className="px-4 py-3">Category</th>
                            <th scope="col" className="px-4 py-3">Brand</th>
                            <th scope="col" className="px-4 py-3">Description</th>
                            <th scope="col" className="px-4 py-3">Price</th>
                            <th scope="col" className="px-4 py-3">
                                <span className="sr-only">Actions</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {players.map((player,index)=>(
                          <tr className="border-b dark:border-gray-700" key={index}>
                          <th scope="row" className="px-4 font-medium text-gray-900 whitespace-nowrap dark:text-white flex items-center gap-2">
                              <img src={player.player_face_url} className='size-8'/>
                              <p className='pt-3'>{player.short_name}</p>
                          </th>
                          <td className="px-4 py-3">PC</td>
                          <td className="px-4 py-3">Apple</td>
                          <td className="px-4 py-3">300</td>
                          <td className="px-4 py-3">$2999</td>
                          <td className="px-4 py-3 flex items-center justify-end gap-1">
                              <button className="inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100" type="button">
                                  <Check className='text-green-500 size-8'/>
                              </button>
                              <Drawer >
                                <DrawerTrigger><X className='text-red-500 size-8'/></DrawerTrigger>
                                <DrawerContent className="bg-red-50">
                                  <DrawerHeader className="flex flex-col items-center">
                                    <DrawerTitle>Are you absolutely sure?</DrawerTitle>
                                    <DrawerDescription>This action will remove player from cart</DrawerDescription>
                                  </DrawerHeader>
                                  <DrawerFooter className="flex flex-col items-center">
                                    <Button>Remove</Button>
                                    <DrawerClose>
                                      <Button variant="outline">Cancel</Button>
                                    </DrawerClose>
                                  </DrawerFooter>
                                </DrawerContent>
                              </Drawer>
                          </td>
                          </tr>
                      
                        ))}
                    </tbody>
                </table>
            </div>
            {/* table footer  */}
            <nav className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4" aria-label="Table navigation">
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                    Showing
                    <span className="font-semibold text-gray-900 dark:text-white">1-10</span>
                    of
                    <span className="font-semibold text-gray-900 dark:text-white">1000</span>
                </span>
                <ul className="inline-flex items-stretch -space-x-px">
                  <Pagination>
                      <PaginationContent>
                          <PaginationItem>
                             <PaginationPrevious onClick={handlePaginationPrev}/>
                          </PaginationItem>
                         <PaginationItem>
                              <PaginationEllipsis />
                          </PaginationItem>
                        <PaginationItem herf="#" onClick={handlePaginationNext}>
                          <PaginationNext  />
                        </PaginationItem>
                        </PaginationContent>
                  </Pagination>
                </ul>
            </nav>
        </div>
    </div>
    </section>
  )
}

export default Defenders