import AuthenticationService from '../services/AuthenticationService'
import store from '../store'

export default async (to, from, next) => {
  const userString = localStorage.getItem('user')
  if (userString && userString !== 'undefined') {
    // verify user with jwt token
    const userData = JSON.parse(userString)
    const payload = { 'api_token': userData.api_token }
    console.log(payload)
    if (payload.api_token) {
      const result = await AuthenticationService.verify(payload)
      // console.log(result.data)
      if (result.data.status === 'passed') {
        store.commit('user/SET_USER_STATE', result.data)
        next()
      } else {
        localStorage.removeItem('user')
        next('/user/login')
      }
    } else {
      localStorage.removeItem('user')
      next('/user/login')
    }
  }else {
        localStorage.removeItem('user')
        next('/user/login')
      }
}