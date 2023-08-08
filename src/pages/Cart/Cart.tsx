import { useMutation, useQuery } from '@tanstack/react-query'
import { produce } from 'immer'
import { keyBy, result } from 'lodash'
import React, { useContext, useEffect, useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import purchaseAPI from 'src/apis/purchase.api'
import Button from 'src/components/Button'
import QuantityController from 'src/components/QuantityController'
import path from 'src/constants/path'
import { purchasesStatus } from 'src/constants/purchase'
import { AppContext } from 'src/contexts/app.context'
import { Purchase } from 'src/types/purchase.type'
import { formatCurrency, generateNameID, rateSale } from 'src/utils/utils'
import noPurchase from 'src/img/no-purchase.png'
import traHang from 'src/img/trahang.png'
import sale_88 from 'src/img/sale_8-8.png'

export default function Cart() {
  const { extendedPurchases, setExtendedPurchases } = useContext(AppContext)
  const { data: purchasesIncartData, refetch } = useQuery({
    queryKey: ['purchases', { status: purchasesStatus.inCart }],
    queryFn: () => purchaseAPI.getPurchases({ status: purchasesStatus.inCart })
  })
  const updatePurchaseMutation = useMutation({
    mutationFn: purchaseAPI.updatePurchase,
    onSuccess: () => {
      refetch()
    }
  })
  const buyProductMutation = useMutation({
    mutationFn: purchaseAPI.buyProducts,
    onSuccess: (data) => {
      refetch()
      toast.success(data.data.message, {
        position: 'top-center',
        autoClose: 1000
      })
    }
  })
  const deleteProductMutation = useMutation({
    mutationFn: purchaseAPI.deletePurchase,
    onSuccess: () => {
      refetch()
    }
  })
  const purchasesIncart = purchasesIncartData?.data.data

  const isAllChecked = useMemo(() => extendedPurchases.every((purchase) => purchase.checked), [extendedPurchases])
  const handleCheckAll = () => {
    setExtendedPurchases((prev) =>
      prev.map((purchase) => ({
        ...purchase,
        checked: !isAllChecked
      }))
    )
  }
  const checkedPurchases = useMemo(() => extendedPurchases.filter((purchase) => purchase.checked), [extendedPurchases])
  const checkedPurchaseCount = checkedPurchases.length

  const handleTypeQuantity = (purchaseIndex: number) => (value: number) => {
    setExtendedPurchases(
      produce((draft) => {
        draft[purchaseIndex].buy_count = value
      })
    )
  }
  const location = useLocation()
  const choosenPurchaseIdFromLocation = (location.state as { purchaseId: string } | null)?.purchaseId
  useEffect(() => {
    setExtendedPurchases((prev) => {
      const extendedPurchasesObject = keyBy(prev, '_id')
      return (
        purchasesIncart?.map((purchase) => {
          const isChoosenPurchaseFromLocation = choosenPurchaseIdFromLocation === purchase._id
          return {
            ...purchase,
            disabled: false,
            checked: isChoosenPurchaseFromLocation || Boolean(extendedPurchasesObject[purchase._id]?.checked)
          }
        }) || []
      )
    })
  }, [purchasesIncart, choosenPurchaseIdFromLocation, setExtendedPurchases])

  useEffect(() => {
    return () => {
      history.replaceState(null, '')
    }
  })
  const handleChecked = (purchaseIndex: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setExtendedPurchases(
      produce((draft) => {
        draft[purchaseIndex].checked = event.target.checked
      })
    )
  }
  const handleQuantity = (purchaseIndex: number, value: number, enable: boolean) => {
    if (enable) {
      const purchase = extendedPurchases[purchaseIndex]
      setExtendedPurchases(
        produce((draft) => {
          draft[purchaseIndex].disabled = true
        })
      )
      updatePurchaseMutation.mutate({ product_id: purchase.product._id, buy_count: value })
    }
  }
  const handleDelete = (purchaseIndex: number) => () => {
    const purchaseID = extendedPurchases[purchaseIndex]._id
    deleteProductMutation.mutate([purchaseID])
  }

  const handleDeleteManyPurchases = () => {
    const purchasesIDs = checkedPurchases.map((purchase) => purchase._id)
    deleteProductMutation.mutate(purchasesIDs)
  }
  const totalCheckedPurchasePrice = useMemo(
    () =>
      checkedPurchases.reduce((result, current) => {
        return result + current.product.price_before_discount * current.buy_count
      }, 0),
    [checkedPurchases]
  )
  const totalCheckedPurchaseSavingPrice = useMemo(
    () =>
      checkedPurchases.reduce((result, current) => {
        return result + (current.product.price_before_discount - current.product.price) * current.buy_count
      }, 0),
    [extendedPurchases]
  )
  const handleBuyPurchases = () => {
    if (checkedPurchases.length > 0) {
      const body = checkedPurchases.map((purchase) => ({
        product_id: purchase.product._id,
        buy_count: purchase.buy_count
      }))
      buyProductMutation.mutate(body)
    }
  }

  return (
    <div className='bg-neutral-100 py-16'>
      <div className='container'>
        {extendedPurchases.length > 0 ? (
          <>
            <div className='overflow-auto'>
              <div className='min-w-[1000px]'>
                <div className='capitalze grid grid-cols-12 rounded-sm bg-white px-9 py-5 text-sm text-gray-500 shadow'>
                  <div className='col-span-6'>
                    <div className='flex items-center'>
                      <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                        <input
                          type='checkbox'
                          className='h-5 w-5 accent-orange'
                          checked={isAllChecked}
                          onClick={handleCheckAll}
                        />
                      </div>
                      <div className='flex-grow text-left text-black'>Sản phẩm</div>
                    </div>
                  </div>
                  <div className='col-span-6'>
                    <div className='grid grid-cols-5 text-center'>
                      <div className='col-span-2'>Đơn giá</div>
                      <div className='col-span-1'>Số lượng</div>
                      <div className='col-span-1'>Số tiền</div>
                      <div className='col-span-1'>Đơn giá</div>
                    </div>
                  </div>
                </div>
                {extendedPurchases.length > 0 && (
                  <div className='my-3 rounded-sm bg-white p-5 shadow'>
                    {extendedPurchases?.map((purchase, index) => (
                      <div
                        key={purchase._id}
                        className='mt-5 grid grid-cols-12 items-center rounded-sm border border-gray-200 bg-white px-4 py-5 text-center first:mt-0'
                      >
                        <div className='col-span-6'>
                          <div className='flex'>
                            <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                              <input
                                type='checkbox'
                                className='h-5 w-5 accent-orange'
                                checked={purchase.checked}
                                onChange={handleChecked(index)}
                              />
                            </div>
                            <div className='flex-grow'>
                              <div className='flex'>
                                <Link
                                  to={`${path.home}${generateNameID({
                                    name: String(purchase.product.name),
                                    id: purchase.product._id
                                  })}`}
                                  className='h-20 w-20 flex-shrink-0'
                                >
                                  <img alt={String(purchase.product.name)} src={purchase.product.image} />
                                </Link>
                                <div className='flex-grow px-2 pb-2 pt-1 text-left'>
                                  <div className='grid-row-4 grid'>
                                    <div className='rows-span-2'>
                                      <Link
                                        to={`${path.home}${generateNameID({
                                          name: String(purchase.product.name),
                                          id: purchase.product._id
                                        })}`}
                                        className='font-medium line-clamp-5'
                                      >
                                        {purchase.product.name}
                                      </Link>
                                    </div>
                                  </div>
                                  <div className='row-span-1 pb-2 pt-2'>
                                    <img src={sale_88} alt='trahang' className='w-30 h-5' />
                                  </div>

                                  <div className='row-span-1'>
                                    <div className='sm:justify-left flex items-center'>
                                      <div className=''>
                                        <img src={traHang} alt='trahang' className='h-4 w-4' />
                                      </div>
                                      <div className='ml-2 text-sm text-orange'>Trả hàng trong 7 ngày</div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className='col-span-6'>
                          <div className='grid grid-cols-5 text-center'>
                            <div className='col-span-2'>
                              <div className='flex items-center justify-center'>
                                <span className='text-xs text-gray-300 line-through'>
                                  ₫{formatCurrency(purchase.product.price_before_discount)}
                                </span>
                                <span className='ml-3 grid grid-rows-2 pt-3 text-base'>
                                  <span className='rows-span-1'>₫{formatCurrency(purchase.product.price)}</span>
                                  <div
                                    className='rows-span-1 ml-4 h-5 w-9 rounded-lg bg-orange px-1 
                                  py-[2px] text-left text-xs font-semibold uppercase text-white '
                                  >
                                    -{rateSale(purchase.product.price_before_discount, purchase.product.price)}
                                  </div>
                                </span>
                              </div>
                            </div>
                            <div className='col-span-1'>
                              <QuantityController
                                max={purchase.product.quantity}
                                value={purchase.buy_count}
                                classNameWrapper='flex items-center w-5 text-center pt-3'
                                onIncrease={(value) => handleQuantity(index, value, value <= purchase.product.quantity)}
                                onDecrease={(value) => handleQuantity(index, value, value >= 1)}
                                onType={handleTypeQuantity(index)}
                                onFocusOut={(value) => {
                                  handleQuantity(
                                    index,
                                    value,
                                    value >= 1 &&
                                      value <= purchase.product.quantity &&
                                      value !== (purchasesIncart as Purchase[])[index].buy_count
                                  )
                                }}
                                disabled={purchase.disabled}
                              />
                            </div>
                            <div className='col-span-1 pt-3'>
                              <span className=' text-orange'>
                                ₫{formatCurrency(purchase.product.price * purchase.buy_count)}
                              </span>
                            </div>
                            <div className='cols-span-1 pt-3'>
                              <button
                                onClick={handleDelete(index)}
                                className='g-none transition-color text-black hover:text-orange'
                              >
                                Xóa
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className='sticky bottom-0 z-10 mt-10 flex flex-col rounded-sm border-gray-100 bg-white p-5 shadow sm:flex-row sm:items-center'>
              <div className='flex items-center'>
                <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                  <input
                    type='checkbox'
                    className='h-5 w-5 accent-orange'
                    defaultChecked={isAllChecked}
                    onClick={handleCheckAll}
                  />
                </div>
                <button className='mx-3 border-none bg-none'>Chọn tất cả ({extendedPurchases.length})</button>
                <button onClick={handleDeleteManyPurchases} className='mx-3 border-none bg-none'>
                  Xóa
                </button>
              </div>
              <div className='mt-5 flex flex-col items-center sm:ml-auto sm:mt-0 sm:flex-row'>
                <div className=''>
                  <div className='flex items-center sm:justify-end'>
                    <div className=''>Tổng thanh toán ({checkedPurchaseCount} sản phẩm): </div>
                    <div className='ml-2 text-2xl text-orange'>₫{formatCurrency(totalCheckedPurchasePrice)}</div>
                  </div>
                  <div className='flex items-center text-sm sm:justify-end'>
                    <div className='text-gray-500'>Tiết kiệm</div>
                    <div className='ml-6 text-orange'>₫{formatCurrency(totalCheckedPurchaseSavingPrice)}</div>
                  </div>
                </div>
                <Button
                  onClick={handleBuyPurchases}
                  disabled={buyProductMutation.isLoading}
                  className='mt-5 flex h-10 w-52 items-center justify-center rounded bg-red-500 text-center text-sm uppercase text-white hover:bg-red-600 sm:ml-4 sm:mt-0'
                >
                  Mua hàng
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className='text-center'>
            <img src={noPurchase} alt='no-purchase' className='mx-auto h-20 w-20' />

            <div className='mt-5 font-bold text-gray-600'>Chưa có sản phẩm</div>
            <div className='mt-5 text-center'>
              <Link
                to={path.home}
                className=' bg-orange px-8 py-2 uppercase text-white transition-all hover:bg-orange/80'
              >
                Mua ngay
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
