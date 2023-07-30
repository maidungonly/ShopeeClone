import React from 'react'
import { Link } from 'react-router-dom'
import ProductRating from 'src/components/ProductRating'
import path from 'src/constants/path'
import { Product as ProductType } from 'src/types/product.type'
import { formatCurrency, formatNumberToSocialStyle, generateNameID } from 'src/utils/utils'

interface Props {
  product: ProductType
}
export default function Product({ product }: Props) {
  return (
    <Link to={`${path.home}${generateNameID({ name: String(product.name), id: product._id })}`}>
      <div className='overflow-hidden rounded-lg bg-white shadow transition-transform duration-100 hover:translate-y-[-0.06rem] hover:shadow-md'>
        <div className='width-full relative pt-[100%]'>
          <img src={product.image} alt='' className='absolute left-0 top-0 h-full w-full bg-white object-cover' />
        </div>
        <div className='p2 overflow-hidden'>
          <div className='lint mr-2 min-h-[2rem] text-xs line-clamp-2'>{product.name}</div>
          <div className='mt-3 flex items-center'>
            <div className='max-w-[50%] truncate text-xs text-gray-500 line-through'>
              <span className='text-xs'>₫</span>
              <span className=''>{formatCurrency(product.price_before_discount)}</span>
            </div>
            <div className='ml-1 truncate text-orange'>
              <span className='text-xs'>₫</span>
              <span>{formatCurrency(product.price)}</span>
            </div>
          </div>
          <div className='mt-3 flex items-center justify-end'>
            <ProductRating rating={product.rating} />
            <div className='ml-2 text-sm'>
              <span>{formatNumberToSocialStyle(product.sold)}</span>
              <span className='ml-1'>Đã bán</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
