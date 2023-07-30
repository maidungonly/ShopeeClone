import { Purchase, PurchaseListStatus } from 'src/types/purchase.type'
import { SuccessResponseApi } from 'src/types/utils.type'
import http from 'src/utils/http'

const URL = 'purchases'

const purchaseAPI = {
  addToCart(body: { product_id: string; buy_count: number }) {
    return http.post<SuccessResponseApi<Purchase>>(`${URL}/add-to-cart`, body)
  },
  getPurchases(params: { status: PurchaseListStatus }) {
    return http.get<SuccessResponseApi<Purchase[]>>(`${URL}`, {
      params
    })
  }
}

export default purchaseAPI
