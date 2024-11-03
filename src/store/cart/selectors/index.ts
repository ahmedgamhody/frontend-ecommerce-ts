import { createSelector } from "@reduxjs/toolkit";

import { RootState } from "@store/store";
const getCartTotalQuantitySelector = createSelector(
  (state: RootState) => state.cart.items, // هنا بعمل lisen على ال state عشان ما تشتغلش علطول
  (items) => {
    const totalQuantity = Object.values(items).reduce((acc, crr) => {
      return acc + crr;
    }, 0);
    return totalQuantity;
  }
);

export { getCartTotalQuantitySelector };
