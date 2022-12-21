export function useLocalStorage() {
    function setItem(key, item) {
      const itemStringify = JSON.stringify(item)
  
      localStorage.setItem(key, itemStringify)
    }
  
    function getItem(key) {
      const item = localStorage.getItem(key)
  
      return JSON.parse(item)
    }
  
    function removeItem(key) {
      localStorage.removeItem(key)
    }
  
    return { getItem, setItem, removeItem }
  }
  