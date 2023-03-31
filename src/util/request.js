import axios from 'axios'
import vue from 'vue'

const request = (type, url, data, headers = {}) => {
  let http = ''
  switch (type) {
    case 'get' :
      console.log('get:', headers, url, data)
      http = axios.get(url, {params: data,headers})
      break
    case 'post' :
      http = axios.post(url, data, {headers})
      break
  }
  return http
}
vue.prototype.$http = request
