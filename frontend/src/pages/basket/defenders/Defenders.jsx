import React, { useEffect, useMemo, useState } from 'react'
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
import DefenderBottom from './DefenderBottom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, fetchUserSelectedPlayer, removeFromCart } from '@/redux/cart/cartSlice';
import toast from 'react-hot-toast';
import { useAddSelectedPlayerMutation, useFetchSelectedPlayerQuery, useRemoveSelectedPlayerMutation } from '@/redux/features/user-selection/userSelectionApi';


const userId ="c1b6da17-bdf6-459f-b567-f7db0eb579e1"

const Defenders = () => {
  
  const [pageCount, setPageCount] = useState(1);
  const [filters, setFilters] = useState({
    player: '',
    country: '',
    position: '',
    age: ''
  });
  
  const [addSelectedPlayer] = useAddSelectedPlayerMutation();
  const [removeSelectedPlayer]=useRemoveSelectedPlayerMutation();

  // Fetch players with filters
  const { data: playerData, isLoading, isError } = useGetDefendersPlayersQuery({ page: pageCount, ...filters });

  const dispatch=useDispatch();

  const cartItems=useSelector((state)=>state.cart.cartItems);

  useEffect(() => {
      dispatch(fetchUserSelectedPlayer(userId));
  }, []);

  const players = useMemo(() => playerData?.data || [], [playerData]);

  const handlePaginationNext = () => {
    setPageCount(pageCount+1)
  };

  const handlePaginationPrev = () => {
    if(pageCount <= 0){
      setPageCount(0);
    }
    else{
      setPageCount(pageCount-1);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleResetFilter=(e)=>{
    e.preventDefault();
    setFilters({player: '',country: '',position: '',age: ''});
  }

  const handleRemoveClick=async(player)=>{
    dispatch(removeFromCart(player));

    toast.success("Successfully Removed",{
      duration: 1000,
      position: 'bottom-center',
    })
    const formData={
      player_id:player.player_id,
      user_id:userId
    }
    try {
      await removeSelectedPlayer(formData).unwrap();
    } catch (error) {
      console.log("Error in removing selection",error);
    }
  }

  const handleCartAdd=async(player)=>{
  
      dispatch(addToCart(player));
    
      toast.success("Successfully Added to Cart",{
        duration: 1000,
        position: 'bottom-center',
      })
      const formData={
        user_id:userId,
        player_id:player.player_id
      }
      try{
        await addSelectedPlayer(formData).unwrap();
      }catch{
        toast.error("Failed To Add !",{
          duration: 1000,
          position: 'bottom-center',
        })
      }

  
    
  }

  return (
    <>
      <section className="bg-gray-50 xl:w-[1300px] mx-auto p-4 mt-10">
        <div className="mx-auto">
            
            <div className="bg-white relative shadow-md sm:rounded-lg overflow-hidden">
                {/* table header */}
                <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                    <div className="w-full md:w-1/2">
                      <label htmlFor="player-search" className="sr-only">Search</label>
                      <div className="relative w-full">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                              <svg aria-hidden="true" className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                              </svg>
                          </div>
                          <input type="text" id="player-search" name="player" value={filters.player} onChange={handleFilterChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Search by player name" required="" autoComplete='off'/>
                      </div>
                    </div>

                    <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                      <Sheet>
                        <SheetTrigger className='font-semibold border px-2 py-1 rounded-md flex gap-2 items-center'>
                        <Filter className='size-5'/>
                        <span>Filter</span>
                        </SheetTrigger>
                        <SheetContent>
                          <SheetHeader className="flex flex-col gap-6">
                            <SheetTitle>Apply Filters On Players</SheetTitle>
                            
                            <form onSubmit={handleResetFilter}>
                              <div className="flex flex-col gap-4">

                                {/* Player Name Input */}
                                <div className="flex flex-col gap-2">
                                  <label htmlFor="player" className="font-bold self-start">Player</label>
                                  <input 
                                    type="text" 
                                    id="player" 
                                    name='player'
                                    placeholder="Enter Player Name" 
                                    className="bg-gray-100 border-none outline-none p-2 rounded-md" 
                                    value={filters.player}
                                    onChange={handleFilterChange} 
                                    autoComplete='off'
                                  />
                                </div>

                                {/* Country Input */}
                                <div className="flex flex-col gap-2">
                                  <label htmlFor="country" className="font-bold self-start">Country</label>
                                  <input 
                                    type="text" 
                                    id="country" 
                                    name='country'
                                    placeholder="Enter Country" 
                                    className="bg-gray-100 border-none outline-none p-2 rounded-md" 
                                    value={filters.country}
                                    onChange={handleFilterChange} 
                                    autoComplete='off'
                                  />
                                </div>

                                {/* Position Dropdown */}
                                <div className="flex flex-col gap-2">
                                  <label htmlFor="position" className="font-bold self-start">Position</label>
                                  <select 
                                    id="position" 
                                    name="position"
                                    className="bg-gray-100 border-none outline-none p-2 rounded-md" 
                                    onChange={handleFilterChange} 
                                    value={filters.position}
                                    autoComplete='off'
                                  >
                                    <option value="">Select Position</option>
                                    <option value="CB">CB</option>
                                    <option value="RCB">RCB</option>
                                    <option value="LCB">LCB</option>
                                    <option value="LB">LB</option>
                                    <option value="RB">RB</option>
                                    <option value="LWB">LWB</option>
                                    <option value="RWB">RWB</option>
                                  </select>
                                </div>

                                {/* Age Dropdown (Fixed) */}
                                <div className="flex flex-col gap-2">
                                  <label className="font-bold self-start" htmlFor="age">Age</label>
                                  <select 
                                    id="age" 
                                    name="age"
                                    className="bg-gray-100 border-none outline-none p-2 rounded-md"  
                                    onChange={handleFilterChange} 
                                    value={filters.age}
                                    autoComplete='off'
                                  >
                                    <option value="">Select Age</option>
                                    <option value="20">Above 20</option>
                                    <option value="25">Above 25</option>
                                    <option value="30">Above 30</option>
                                    <option value="35">Above 35</option>
                                  </select>
                                </div>

                                {/* Submit Button */}
                                <button className="bg-blue-600 p-2 text-white font-semibold text-md rounded-md mt-4">
                                  Reset Filters
                                </button>

                              </div>
                            </form>
                          
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
                                <th scope="col" className="px-4 py-3">Player name</th>
                                <th scope="col" className="px-4 py-3">Sold</th>
                                <th scope="col" className="px-4 py-3">Nationality</th>
                                <th scope="col" className="px-4 py-3">Age</th>
                                <th scope="col" className="px-4 py-3">Overall Score</th>
                                <th scope="col" className="px-4 py-3">Position</th>
                                <th scope="col" className="px-4 py-3 flex justify-center">
                                    <span className="">Actions</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {players.map((player,index)=>(
                              <tr className="border-b dark:border-gray-700" key={index}>
                              <th scope="row" className="px-4 font-medium text-blue-600 whitespace-nowrap hover:underline flex items-center gap-2 cursor-pointer">
                                  <img src={player.player_face_url} className='size-8'/>
                                  <p className='pt-3'>{player.short_name}</p>
                              </th>
                              <td className="px-4 py-3">
                                {player.bought===0?
                                  <div className="size-3 bg-red-500 rounded-full"></div>:
                                  <div className="size-3 bg-green-500 rounded-full"></div>
                                }
                              </td>
                              <td className="px-4 py-3">{player.nationality_name}</td>
                              <td className="px-4 py-3">{player.age}</td>
                              <td className="px-4 py-3">{player.overall}</td>
                              <td className="px-4 py-3">{player.club_position}</td>
                              <td className="px-4 py-3 flex items-center justify-center gap-1">
                                  {
                                    cartItems.some(item => item.player_id === player.player_id)?
                                    <div className='flex w-24 justify-between items-center'>
                                      <button className="text-xs font-medium text-center text-white w-14 py-2 bg-green-500 rounded-md" type="button" 
                                      onClick={()=>(toast.error("Already Added !",{
                                        duration: 1000,
                                        position: 'bottom-center',
                                      }))}>
                                      Added
                                      </button>
                                      <Drawer>
                                        <DrawerTrigger asChild>
                                          <button><X className='text-red-500 size-8' /></button>
                                        </DrawerTrigger>
                                        <DrawerContent>
                                           <DrawerHeader className="flex flex-col items-center">
                                            <DrawerTitle>Are you absolutely sure?</DrawerTitle>
                                            <DrawerDescription>This action will remove player from the cart</DrawerDescription>
                                          </DrawerHeader>
                                          <DrawerFooter className="flex flex-col items-center">
                                            <Button onClick={() => handleRemoveClick(player)}>Remove</Button>
                                            <DrawerClose asChild>
                                              <Button variant="outline">Cancel</Button>
                                            </DrawerClose>
                                          </DrawerFooter>
                                        </DrawerContent>
                                      </Drawer>
                                  
                                    </div>:
                                    <button className="w-24 text-xs font-medium text-center text-white py-2 bg-blue-500 rounded-md" type="button" onClick={()=>handleCartAdd(player)}>
                                      Add
                                    </button>

                                  }
                                  
                              </td>
                              </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {/* table footer  */}
                <nav className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4" aria-label="Table navigation">
                    <div className="text-sm font-normal text-gray-500 flex gap-4">
                      <ul className='flex items-center gap-2'>
                        <li className='size-3 rounded-full bg-red-500'></li>
                        <li className='font-semibold'>Unsold</li>
                      </ul>
                      <ul className='flex items-center gap-2'>
                        <li className='size-3 rounded-full bg-green-500'></li>
                        <li className='font-semibold'>Sold</li>
                      </ul>
                    </div>
                    <ul className="inline-flex items-stretch -space-x-px">
                      <Pagination>
                          <PaginationContent>
                              <PaginationItem onClick={handlePaginationPrev}>
                                <PaginationPrevious href="#"/>
                              </PaginationItem>
                            <PaginationItem>
                                  <PaginationEllipsis />
                              </PaginationItem>
                            <PaginationItem onClick={handlePaginationNext} className="cursor-pointer">
                              <PaginationNext href="#"  />
                            </PaginationItem>
                          </PaginationContent>
                      </Pagination>
                    </ul>
                </nav>
            </div>
        </div>
      </section>
      <DefenderBottom/>
    </>
  )
}

export default Defenders