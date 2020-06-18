import PlButton from './button'
import PlActionBtn from './action-button'

PlButton.install = Vue => Vue.component(PlButton.name, PlButton)
PlActionBtn.install = Vue => Vue.component(PlActionBtn.name, PlActionBtn)
export default PlButton
export { PlActionBtn }
