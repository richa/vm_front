import _ from 'lodash'
import axios from 'axios'
import { CONFIG } from '../config'

export default async function callApi (endpoint, method = 'get', body) {
  const token = await localStorage.accessToken
  const headers = {
    'Content-Type': 'application/json',
  }

  if (token) {
    _.extend(headers, { 'Authorization': `Bearer ${token}` })
  }

  let payload = {
    method,
    url: `${CONFIG.api_base_url}/${endpoint}`,
    headers,
  };

  if (_.includes(['post', 'put', 'patch'], method)) {
    _.extend(payload, { data: JSON.stringify(body) })
  }

  return axios(payload)
    .then((res) => res)
    .catch((err) => err.response)
}
