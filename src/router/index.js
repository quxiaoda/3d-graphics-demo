import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import routes from '@/router/route'

let routeArray = []

routes.forEach((val, index) => {
  let _copy = [].concat(val.list)
  let _base = val.base

  _copy.forEach((v, i) => {
    v.path = `/${_base}${v.path}`
    v.component = require(`@/components${v.path}`).default
    routeArray.push(v)
  })
})

Vue.use(Router)

routeArray.push({
  path: '/',
  name: 'Hello',
  component: Hello
})

export default new Router({
  base: __dirname,
  routes: routeArray
})
