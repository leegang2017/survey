import fetch from 'dva/fetch';
import { SERVICE_URI } from '../constants';

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}


/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default async function request(url, options = {}) {
  options.headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }

  return fetch(SERVICE_URI + url, options)
    .then(checkStatus)
    .then(response => response.json())
    .catch(err => ({ err }));
}
  // checkStatus(response);
  // const result = response.json();
  // return result
// }
