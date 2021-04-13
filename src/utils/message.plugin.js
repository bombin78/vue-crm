export default {
  install(Vue, options) {

    console.log('Options for messagePlagin', options);
    
    Vue.prototype.$message = function(html) {
      window.M.toast({html})
    }

    Vue.prototype.$error = function(html) {
      window.M.toast({html: `[Ошибка]: ${html}`})
    }
  }
}
