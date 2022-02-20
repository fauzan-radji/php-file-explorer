const ajax = ({ reqMethod, url, toObject = false, body = {} }) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        const { response } = xhr;
        if (toObject) {
          if (isJSON(response)) {
            resolve(JSON.parse(response));
          } else {
            resolve({
              error: response,
              textContent: response,
            });
          }
        } else {
          resolve(response);
        }
      }
    };

    xhr.open(reqMethod, url, true);
    xhr.send(body);
  });
};

function isJSON(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}
