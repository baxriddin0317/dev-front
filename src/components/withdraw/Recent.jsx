import PageTitle from 'components/Typography/PageTitle'
import React from 'react'

const recent = [
  {
    title: "crypto",
    value: "TRX"
  },
  {
    title: "time",
    value: "14:00:00"
  },
  {
    title: "status",
    value: "Completed"
  },
  {
    title: "amount",
    value: "2"
  },
  {
    title: "Withdraw Address",
    value: "TRX"
  },
  {
    title: "Fee",
    value: "0.001"
  },
  {
    title: "balance",
    value: "1"
  },
]

const Recent = () => {
  return (
    <div className='mt-6'>
      <h2 className='text-lg font-bold text-gray-700 dark:text-gray-300 mb-2'>Recent Withdraw</h2>
      <div className='xl:w-2/3 border-y border-black dark:border-white py-2 px-3'>
        <div className='flex items-stretch flex-wrap sm:flex-nowrap justify-between gap-2'>
          {recent.map((item,idx) => (
            <div key={idx} className='flex flex-col gap-3'>
              <h4 className='font-bold text-xs text-gray-700 dark:text-gray-500 capitalize'>{item.title}</h4>
              <p className='text-xs text-black dark:text-white/80'>{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Recent