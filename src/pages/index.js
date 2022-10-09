import Link from 'next/link'

export default function Home() {
  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 py-12'>
      <div className='flex flex-col justify-center items-center lg:items-start'>
        <p className='text-sm lg:text-base uppercase text-archivo font-bold text-grayDark tracking-widest py-8'>Browse products here at</p>
        <h1 className='text-7xl lg:text-semi xl:text-full font-bold leading-none'>Vending</h1>
        <h1 className='text-7xl lg:text-semi xl:text-full font-bold leading-none no-border'>Machine</h1>
        <Link href='/products'>
          <a className='text-white bg-secondaryDark p-3 lg:p-6 text-base lg:text-lg xl:text-xl text-archivo uppercase lg:w-2/3 xl:w-1/2 text-center my-8 tracking-wider hover:bg-secondary'>
            Browse Products
          </a>
        </Link>
      </div>
      <div className='flex flex-col justify-center items-center lg:items-end'>
        <img src='/images/hero.png' className='min-w-4/5'/>
      </div>
    </div>
  )
}
