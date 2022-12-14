import { TIMEOUT_SECONDS } from '../js/config';
import { API_URL } from '../js/config';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};
export const AJAX = async function (url, uploadData = undefined) {
  try {
    const fetchPro = uploadData
      ? fetch(`${API_URL + url}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(uploadData),
        })
      : fetch(`${API_URL + url}`);

    const result = await Promise.race([fetchPro, timeout(TIMEOUT_SECONDS)]);
    const data = await result.json();

    if (!result.ok) throw new Error(`${data.message} (${result.status})`);
    return data;
  } catch (err) {
    throw err;
  }
};

/*
export const getJSON = async function (url) {
  try {
    const fetchPro = fetch(url);
    const result = await Promise.race([fetchPro, timeout(TIMEOUT_SECONDS)]);
    const data = await result.json();

    if (!result.ok) throw new Error(`${data.message} (${result.status})`);
    return data;
  } catch (err) {
    throw err;
  }
};

export const sendJSON = async function (url, uploadData) {
  try {
    const fetchPro = fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(uploadData),
    });
    const result = await Promise.race([fetchPro, timeout(TIMEOUT_SECONDS)]);
    const data = await result.json();

    if (!result.ok) throw new Error(`${data.message} (${result.status})`);
    return data;
  } catch (err) {
    throw err;
  }
};
*/
