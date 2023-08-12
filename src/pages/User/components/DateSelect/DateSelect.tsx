import { range } from 'lodash'
import React, { useEffect, useState } from 'react'

interface Props {
  onChange?: (value: Date) => void
  value?: Date
  errorMessage?: string
}
export default function DateSelect({ onChange, value, errorMessage }: Props) {
  const [date, setDate] = useState({
    date: value?.getDate() || 1,
    month: value?.getMonth() || 1,
    year: value?.getFullYear() || 1
  })
  useEffect(() => {
    if (value) {
      setDate({
        date: value?.getDate(),
        month: value?.getMonth(),
        year: value?.getFullYear()
      })
    }
  }, [value])
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value: valueFromSelect, name } = event.target
    const newDate = {
      date: value?.getDate() || date.date,
      month: value?.getMonth() || date.month,
      year: value?.getFullYear() || date.year,
      [name]: Number(valueFromSelect)
    }
    setDate(newDate)
    onChange && onChange(new Date(newDate.year, newDate.month, newDate.date))
  }
  return (
    <div className='mt-2 flex flex-wrap'>
      <div className='w-[20%] truncate pt-3 text-right capitalize'>Ngày sinh</div>
      <div className='pl-5 sm:w-[80%]'>
        <div className='flex justify-between'>
          <select
            onChange={handleChange}
            name='date'
            value={String(value?.getDate()) || String(date.date)}
            className='h-10 w-[32%] cursor-pointer rounded-sm border border-black/10 px-3 hover:border-orange'
          >
            <option disabled>Ngày</option>
            {range(1, 32).map((items) => (
              <option value={items} key={items}>
                {items}
              </option>
            ))}
          </select>
          <select
            onChange={handleChange}
            name='month'
            value={String(value?.getMonth()) || String(date.month)}
            className='h-10 w-[32%] cursor-pointer rounded-sm border border-black/10 px-3 hover:border-orange'
          >
            <option disabled>Tháng</option>
            {range(0, 12).map((items) => (
              <option value={items} key={items}>
                {items + 1}
              </option>
            ))}
          </select>
          <select
            onChange={handleChange}
            name='year'
            value={String(value?.getFullYear()) || String(date.year)}
            className='h-10 w-[32%] cursor-pointer rounded-sm border border-black/10 px-3 hover:border-orange'
          >
            <option disabled>Năm</option>
            {range(1990, 2024).map((items) => (
              <option value={items} key={items}>
                {items}
              </option>
            ))}
          </select>
        </div>
        <div className='ml-2 mt-1 min-h-[1.25rem] text-left text-sm text-red-600'>{errorMessage}</div>
      </div>
    </div>
  )
}
