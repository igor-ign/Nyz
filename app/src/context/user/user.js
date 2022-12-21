import createGlobalState from 'react-create-global-state'

import { useLocalStorage } from '../../hooks'

import { USER_KEY } from '../../constants'

const user = JSON.parse(localStorage.getItem(USER_KEY)) || {}

const [_useGlobalUser, UserGlobalProvider] = createGlobalState(user)

function useGlobalUser() {
  const [globalUser, _setGlobalUser] = _useGlobalUser()
  const localStorage = useLocalStorage()

  function setGlobalUser(user) {
    localStorage.setItem(USER_KEY, user)
    _setGlobalUser(user)
  }

  return [globalUser, setGlobalUser]
}

export { useGlobalUser, UserGlobalProvider }
