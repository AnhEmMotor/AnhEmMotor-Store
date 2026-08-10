import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { getVehicleType } from '~/utils/vehicleType';

export const useCompareStore = defineStore('compare', () => {
  const products = ref([]);

  const lockedType = computed(() => {
    if (products.value.length > 0) {
      return getVehicleType(products.value[0].name);
    }
    return null;
  });

  const addProduct = (product) => {
    if (products.value.length >= 3) {
      return { success: false, error: 'Đã đạt số lượng so sánh tối đa (3 xe)!' };
    }
    const newType = getVehicleType(product.name);
    if (
      lockedType.value &&
      lockedType.value !== 'Khác' &&
      newType !== 'Khác' &&
      newType !== lockedType.value
    ) {
      return {
        success: false,
        error: `Vui lòng chọn xe cùng loại (${lockedType.value}) để so sánh!`,
      };
    }

    if (!products.value.find((p) => p.id === product.id)) {
      products.value.push(product);
    }
    return { success: true };
  };

  const removeProduct = (productId) => {
    products.value = products.value.filter((p) => p.id !== productId);
  };

  const clearAll = () => {
    products.value = [];
  };

  return {
    products,
    lockedType,
    addProduct,
    removeProduct,
    clearAll,
  };
});
