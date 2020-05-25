import AuthenticationService from '../services/AuthenticationService'

export default (to, from, next) => {

  const userString = localStorage.getItem('user')
  if (userString != null && userString.length > 0) {
    // verify user with jwt token
    const userData = JSON.parse(userString)
    const payload = { 'api_token': userData.api_token }
    if (userData.api_token) {
      AuthenticationService.verify(payload).then(({ data }) => {
        if (data.status == 'passed') {
          next()
        }
      }).catch(err => {
        localStorage.removeItem('user')
        next('/user/login')
      })
    } else {
      localStorage.removeItem('user')
      next('/user/login')
    }
  } else {
    localStorage.removeItem('user')
    next('/user/login')
  }
}
