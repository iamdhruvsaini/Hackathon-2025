import React from 'react'

import promoPlayer from '@/assets/Images/promo-player.jpg'

const Promo = () => {
  return (
    <section className="bg-white px-4 py-6 antialiased dark:bg-gray-900">
  <div className="mx-auto grid max-w-screen-xl rounded-xl p-4 dark:bg-gray-800 md:p-8 lg:grid-cols-12 lg:gap-8 lg:p-16 xl:gap-16">
    <div className="lg:col-span-5 lg:mt-0">
      <a href="#">
        <img className="mb-4 h-56 w-56 dark:hidden sm:h-96 sm:w-96 rounded-lg xl:w-full" src={promoPlayer} alt="peripherals" />
      </a>
    </div>
    <div className="me-auto place-self-center lg:col-span-7">
      <h1 className="mb-3 text-2xl font-bold leading-tight tracking-tight  md:text-4xl">
        Save $500 today on your purchase <br />
        of a new iMac computer.
      </h1>
      <p className="mb-6 text-gray-500 dark:text-gray-400">Reserve your new Apple iMac 27” today and enjoy exclusive savings with qualified activation. Pre-order now to secure your discount.</p>
      <a href="#" className="inline-flex items-center justify-center rounded-lg bg-primary-700 px-5 py-3 text-center text-base font-medium  hover:bg-primary-800 focus:ring-2 focus:ring-primary-300 dark:focus:ring-primary-900"> Pre-order now </a>
    </div>
  </div>
</section>
  )
}

export default Promo