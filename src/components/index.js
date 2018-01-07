import ElButton from './button/index.vue'
import Loading from './loading/index.vue'

const components = [
  ElButton,
  Loading
]

export default {
  install(Vue, opts = {}){
    components.map(component => {
      Vue.component('Vc' + component.name, component)
    })
  }
}
