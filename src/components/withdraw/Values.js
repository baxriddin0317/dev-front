import React from 'react'

const coinname = 'MEOX'

const Values = () => {
  return (
    <div className='grid grid-cols-2 lg:gap-x-10 xl:gap-x-16 gap-y-5 xl:gap-y-8 pt-4'>
      <div className=''>
        <h4 className='text-xs font-bold text-gray-700 dark:text-gray-500'>{coinname} Account Equity</h4>
        <p className='text-sm text-black dark:text-white font-bold'>1.123445 {coinname}</p>
      </div>
      <div className=''>
        <h4 className='text-xs font-bold text-gray-700 dark:text-gray-500'>Minimum Withdrawal Amount</h4>
        <p className='text-sm text-black dark:text-white font-bold'>1.123445 {coinname}</p>
      </div>
      <div className=''>
        <h4 className='text-xs font-bold text-gray-700 dark:text-gray-500'>Withdrawal fee</h4>
        <p className='text-sm text-black dark:text-white font-bold'>1.123445 {coinname}</p>
      </div>
      <div className=''>
        <h4 className='text-xs font-bold text-gray-700 dark:text-gray-500'>24H Withdrawal Limit</h4>
        <p className='text-sm text-black dark:text-white font-bold'>1.123445 {coinname}</p>
      </div>
    </div>
  )
}

export default Values