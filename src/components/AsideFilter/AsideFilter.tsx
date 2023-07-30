import React from 'react'
import { Link, createSearchParams, useNavigate } from 'react-router-dom'
import Button from 'src/components/Button'
import Input from 'src/components/Input'
import path from 'src/constants/path'
import { QueryConfig } from '../../pages/ProductList/ProductList'
import { Category } from 'src/types/category.type'
import { useForm, Controller } from 'react-hook-form'
import classNames from 'classnames'
import InputNumber from 'src/components/InputNumber'
import { Schema, schema } from 'src/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import { noUndefinedField } from 'src/types/utils.type'
import RatingStars from 'src/components/RatingStars/RatingStars'
import { omit } from 'lodash'

interface Props {
  queryConfig: QueryConfig
  categories: Category[]
}
type FormData = noUndefinedField<Pick<Schema, 'price_max' | 'price_min'>>
const priceSchema = schema.pick(['price_min', 'price_max'])

export default function AsideFilter({ queryConfig, categories }: Props) {
  const { category } = queryConfig
  const {
    control,
    handleSubmit,
    trigger,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: {
      price_min: '',
      price_max: ''
    },
    resolver: yupResolver(priceSchema),
    shouldFocusError: false
  })
  const navigate = useNavigate()
  const onSubmit = handleSubmit((data) => {
    navigate({
      pathname: path.home,
      search: createSearchParams({
        ...queryConfig,
        price_max: data.price_max,
        price_min: data.price_min
      }).toString()
    })
  })
  const handleRemoveAll = () => {
    navigate({
      pathname: path.home,
      search: createSearchParams(omit(queryConfig, ['price_min', 'price_max', 'rating_filter', 'category'])).toString()
    })
  }
  return (
    <div className='rounded-lg border-2 border-dashed border-opacity-5 bg-white px-2 py-4'>
      <Link
        to={path.home}
        className={classNames('flex items-center text-sm font-bold', {
          'text-orange': !category
        })}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='mr-1 h-4 w-4'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z'
          />
        </svg>
        TẤT CẢ DANH MỤC
      </Link>
      <div className='my-4 h-[1px] bg-gray-300' />
      <ul className='text-left'>
        {categories.map((categoryItem) => {
          const isActive = category === categoryItem._id
          return (
            <li className='py-2 pl-2' key={categoryItem._id}>
              <Link
                to={{
                  pathname: path.home,
                  search: createSearchParams({
                    ...queryConfig,
                    category: categoryItem._id
                  }).toString()
                }}
                className={classNames('relative px-2', {
                  'font-semibold text-orange': isActive
                })}
              >
                {categoryItem.name}
              </Link>
            </li>
          )
        })}
      </ul>
      <Link to={path.home} className='my-4 flex items-center text-sm font-bold'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='mr-1 h-4 w-4'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z'
          />
        </svg>
        BỘ LỌC TÌM KIẾM
      </Link>
      <div className='my-4 h-[1px] bg-gray-300' />
      <div className='my-2'>
        <div className='text-left text-sm'>Khoảng giá</div>
        <form className='mt-2' onSubmit={onSubmit}>
          <div className='flex items-start'>
            <Controller
              control={control}
              name='price_min'
              render={({ field }) => {
                return (
                  <InputNumber
                    type='text'
                    className='grow'
                    placeholder='Từ'
                    classNameInput='w-full rounded border border-gray-300 p-1 outline-none focus:border-gray-500 focus:shadow-sm'
                    classNameError='hidden'
                    {...field}
                    onChange={(event) => {
                      field.onChange(event)
                      trigger('price_max')
                    }}
                  />
                )
              }}
            />

            <div className='mx-2 mt-2 shrink-0'>→</div>
            <Controller
              control={control}
              name='price_max'
              render={({ field }) => {
                return (
                  <InputNumber
                    type='text'
                    className='grow'
                    placeholder='Đến'
                    classNameInput='w-full rounded border border-gray-300 p-1 outline-none focus:border-gray-500 focus:shadow-sm'
                    classNameError='hidden'
                    {...field}
                    onChange={(event) => {
                      field.onChange(event)
                      trigger('price_min')
                    }}
                  />
                )
              }}
            />
          </div>
          <div className='ml-2 mt-1 min-h-[1.25rem] text-left text-sm text-red-600'>{errors.price_min?.message}</div>
          <Button className='flex w-full items-center justify-center rounded-lg bg-orange p-2 text-sm uppercase text-white hover:bg-orange/80'>
            Áp dụng
          </Button>
        </form>
      </div>
      <div className='my-4 h-[1px] bg-gray-300' />
      <div className='text-left text-sm'>Đánh giá</div>
      <RatingStars queryConfig={queryConfig} />
      <div className='my-4 h-[1px] bg-gray-300' />
      <Button
        onClick={handleRemoveAll}
        className='flex w-full items-center justify-center rounded-lg bg-orange p-2 text-sm uppercase text-white hover:bg-orange/80'
      >
        Xóa tất cả
      </Button>
    </div>
  )
}
