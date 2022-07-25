import { store } from '../../store/configureStore';
import { cognitoRefreshSession } from '../../store/reducers/cognitoUser'

// DEV
const base_url = 'https://developers.honely.com/';
// PROD
const failureMsg = 'Something went wrong. Please try again.';
const expiredTokenMsgs = ['Token expired', 'Unauthorized']

export const doPost = (url, data, apiKey, onSuccess, onFail, isPut) => {
  const state = store.getState();
  const { jwtToken } = state.cognitoUser
  let xApiKey = apiKey || ""

  return fetch(base_url + url, {
      method: isPut ? 'PUT' : 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Origin': '',
        'Authorization': `Bearer ${jwtToken}`,
        'X-API-KEY': xApiKey
      },
      body: JSON.stringify(data),
    })
    .then((response) => response.json())
    .then(async (response) => {
      if (!response) {
        throw failureMsg;
      }
      if (expiredTokenMsgs.includes(response?.error?.message)) {
        try {
          await store.dispatch(cognitoRefreshSession())
          response = await doPost(url, data, apiKey, onSuccess, onFail, isPut)
          !onSuccess || onSuccess(response);
        } catch (error) {
          throw error
        }
      }
      !onSuccess || onSuccess(response);
      return response;
    })
    .catch((error) => {
      !onFail || onFail(error);
      return {
        error: 1,
        msg: failureMsg
      }
    });
}

export const doPatch = (url, data, onSuccess, onFail) => {
  const state = store.getState();
  const { jwtToken } = state.cognitoUser
  return fetch(base_url + url, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Origin': '',
        'Authorization': `Bearer ${jwtToken}`,
      },
      body: JSON.stringify(data),
    })
    .then((response) => response.json())
    .then(async (response) => {
      if (!response) {
        throw failureMsg;
      }
      if (expiredTokenMsgs.includes(response?.error?.message)) {
        try {
          await store.dispatch(cognitoRefreshSession())
          response = await doPatch(url, data, onSuccess, onFail)
          !onSuccess || onSuccess(response);
        } catch (error) {
          throw error
        }
      }
      !onSuccess || onSuccess(response);
      return response;
    })
    .catch((error) => {
      !onFail || onFail(error);
      return {
        error: 1,
        msg: failureMsg
      }
    });
}

export const doDelete = (url, data, onSuccess, onFail) => {
  const state = store.getState();
  const { jwtToken } = state.cognitoUser
  return fetch(base_url + url, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Origin': '',
        'Authorization': `Bearer ${jwtToken}`,
      },
      body: JSON.stringify(data),
    })
    .then((response) => response.json())
    .then(async (response) => {
      if (!response) {
        throw failureMsg;
      }
      if (expiredTokenMsgs.includes(response?.error?.message)) {
        try {
          await store.dispatch(cognitoRefreshSession())
          response = await doDelete(url, data, onSuccess, onFail)
          !onSuccess || onSuccess(response);
        } catch (error) {
          throw error
        }
      }
      !onSuccess || onSuccess(response);
      return response;
    })
    .catch((error) => {
      !onFail || onFail(error);
      return {
        error: 1,
        msg: failureMsg
      }
    });
}

export const doGet = (url, data, apiKey, onSuccess, onFail) => {
  const state = store.getState();
  const { jwtToken } = state.cognitoUser
  let xApiKey = apiKey || ""
  let param = "";
  for (var key in data) {
    if (param == "") {
      param += "?";
    } else {
      param += "&";
    }

    param += key + "=" + data[key];
  }

  return fetch(base_url + url + param, {
      method: 'GET',
      headers: {
        'Origin': '',
        'Authorization': `Bearer ${jwtToken}`,
        'X-API-KEY': xApiKey
      },
    })
    .then((response) => response.json())
    .then(async (response) => {
      if (!response) {
        throw failureMsg;
      }
      if (expiredTokenMsgs.includes(response?.error?.message)) {
        try {
          await store.dispatch(cognitoRefreshSession())
          response = await doGet(url, data, apiKey, onSuccess, onFail)
          !onSuccess || onSuccess(response);
        } catch (error) {
          throw error
        }
      }
      !onSuccess || onSuccess(response);
      return response;
    })
    .catch((error) => {
      !onFail || onFail(error);
      return {
        error: 1,
        msg: failureMsg
      }
    });
};