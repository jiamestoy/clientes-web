import { ref } from 'vue';
import { getProductById } from '../services/products.js';

export default function useProduct(id) {
    const product = ref({
        name: '',
        description: '',
        price: 0,
    });

    getProductById(id)
        .then(productData => {
            product.value = productData;
        })
        .catch(err => {
            console.error('[EditProduct useProduct] Error: ', err);
        })

    return {
        product,
    }
}