import { defineStore } from "pinia"
import { ref } from "vue"
import { nanoid } from "nanoid"

/**
 * 商品初始狀態
 * @returns {object} 返回一個預設的商品
 */
const getDefaultProduct = () => {
  return {
    mainProduct: {
      productId: nanoid(),
      productName: "",
      productClass: { label: "選擇商品類別", value: "" },
      amount: "",
      shippingMethod: [
        { label: "宅配", value: "home_delivery", available: false },
        {
          label: "超商取貨",
          value: "convenience_store_pickup",
          available: false,
        },
      ],
      description: "",
      image: [],
    },
  }
}

const useProductStore = defineStore("Policy", () => {
  const products = ref(getDefaultProduct())

  const isImageEmpty = () => {
    return products.value.mainProduct.image.length === 0
  }

  const resetProduct = () => {
    const oldProductId = products.value.mainProduct.productId
    products.value = getDefaultProduct()
    products.value.mainProduct.productId = oldProductId // 保持 productId 不變
  }

  return {
    products,
    isImageEmpty,
    resetProduct,
  }
})

export default useProductStore
