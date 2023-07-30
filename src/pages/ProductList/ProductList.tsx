import React, { useState } from 'react'
import SortProductList from '../../components/SortProductList'
import AsideFilter from '../../components/AsideFilter'
import Product from '../../components/Product'
import { useQuery } from '@tanstack/react-query'
import productAPI from 'src/apis/product.api'
import Pagination from 'src/components/Pagination'
import { ProductListConfig } from 'src/types/product.type'
import categoryAPI from 'src/apis/category.api'
import useQueryConfig from 'src/hooks/useQueryConfig'

export type QueryConfig = {
  [key in keyof ProductListConfig]: string
}

export function ProductList() {
  const queryConfig = useQueryConfig()
  const { data: productData } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => {
      return productAPI.getProducts(queryConfig as ProductListConfig)
    },
    keepPreviousData: true,
    staleTime: 3 * 60 * 1000
  })

  const { data: categoriesData } = useQuery({
    queryKey: ['categories'],
    queryFn: () => {
      return categoryAPI.getCategories()
    }
  })

  return (
    <div className='bg-white py-6'>
      <div className='container'>
        {productData && (
          <div className='grid grid-cols-12 gap-6'>
            <div className='col-span-2'>
              <AsideFilter queryConfig={queryConfig} categories={categoriesData?.data.data || []} />
            </div>
            <div className='col-span-10'>
              <SortProductList queryConfig={queryConfig} pageSize={productData.data.data.pagination.page_size} />
              <div className='mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
                {productData.data.data.products.map((product) => (
                  <div className='col-span-1' key={product._id}>
                    <Product product={product} />
                  </div>
                ))}
              </div>
              <Pagination queryConfig={queryConfig} pageSize={productData.data.data.pagination.page_size} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
