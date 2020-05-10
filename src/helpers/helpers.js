import Axios from 'axios';

const url = `http://192.168.0.22:5000/`;
const xToken =
  '43fd8cdd2e2f83cca4b7c3b62023ddb8d64e7c4c5c93529ee3436a4984372eeb5408b6a34a9ed59d401ccac83e475170a1ddf01280d0fafcf79edb1dc31e25d9';
function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
async function requestApi(endpoint) {
  try {
    const response = await Axios.get(`${url}api/${endpoint}`, {
      headers: {
        'x-token': xToken,
      },
    });
    return response;
  } catch (error) {
    return error;
  }
}

async function registerPushNotificationToken(expoToken) {
  try {
    const response = await Axios.post(
      `${url}user/updatePushToken`,
      {
        token: {
          value: expoToken,
        },
      },
      {
        headers: {
          'x-token': xToken,
        },
      }
    );
    return response;
  } catch (error) {
    return error;
  }
}
async function removePushNotificationToken(expoToken) {
  console.log(expoToken);
  try {
    const response = await Axios.post(
      `${url}user/removePushToken`,
      {
        token: {
          value: expoToken,
        },
      },
      {
        headers: {
          'x-token': xToken,
        },
      }
    );
    return response;
  } catch (error) {
    return error;
  }
}

export {
  requestApi,
  registerPushNotificationToken,
  removePushNotificationToken,
  capitalize,
};
