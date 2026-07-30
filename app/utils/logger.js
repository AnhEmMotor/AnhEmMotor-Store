/* eslint-disable no-console */
 
export const logError = (...args) => {
  if (import.meta.client) {
    console.error('[StoreLogger]', ...args)
  }
}
