import { confirm, notify } from "@/mixins/notify"
import http from "@/plugins/axios"
import router from "@/router"
import { defineStore } from "pinia"


export const useFormStore = defineStore('formSurvey', {
  state: () => ({
    form: [],
    detail: {},
  }),
  actions: {
    getForm(){
      http.get('form')
        .then(({ data })=> {
          this.form = data.data.results
        })
    },
    getDetailForm(id){
      http.get(`form/${id}`)
        .then(({ data })=> {
          data.data.quiz.forEach(e=> {
            if(e.type == 'check-box'){
              e.value = []
            }else{
              e.value = ''
            }
          })
          data.data.surveyor.forEach(e=> {
            e.detail= false
          })
          this.detail = data.data
        })
    },
    setShow(i, val){
      this.detail.surveyor[i].detail = val
    },
    postFrom(form){
      http.post('form', form)
        .then(({ data })=> {
          notify(data.message)
          router.push({ name: 'dashboard' })
        })
        .catch(err => notify(err.response.data.message))
    },
    updateFrom(id, form){
      http.patch(`form/${id}`, form)
        .then(({ data })=> {
          notify(data.message)
          router.push({ name: 'dashboard' })
        })
        .catch(err => notify(err.response.data.message))
    },
    storeSurveyor(id, form){
      http.patch(`form/surveyor/${id}`, form)
        .then(({ data })=> {
          notify(data.message)
          router.push({ name: 'survey-finish' })
        })
        .catch(err => notify(err.response.data.message))
    },
    deleteForm(id){
      confirm(()=>{
        http.delete(`form/${id}`)
          .then(({ data }) => {
            notify(data.message)
            this.getForm()
            router.push({ name: 'dashboard' })
          })
          .catch(err => notify(err.response.data.message))
      })
    },
  },
})
