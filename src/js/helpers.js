import { async } from 'regenerator-runtime';
import { TIMEOUT_SECONDS } from '../js/config';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

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
