import {
    fetchProductsRequest,
    fetchProductsSuccess,
    fetchProductsFailure
} from './actions'
import { ApiClient } from '../../ApiClient'

let client = new ApiClient()

export const fetchProducts = () => {
    return (dispatch) => {
        dispatch(fetchProductsRequest())
        client.get('products')
            .then(response => {
                const products = response.data.data.products
                dispatch(fetchProductsSuccess(products))
            })
            .catch(error => {
                const errorMsg = error.message
                dispatch(fetchProductsFailure(errorMsg))
            })
    }
}
