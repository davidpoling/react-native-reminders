export default class Endpoint {
  constructor(url) {
    this.url = url;
    this.request = null;
    return this;
  }

  get() {
    this.request = new Request(this.url);
    return fetch(this.request, {
      method: 'GET',
    }).then(response => {
      return response.json();
    });
  }

  post(entity) {
    this.request = new Request(this.url);
    return fetch(this.request, {
      method: 'POST',
      body: JSON.stringify(entity),
    }).then(response => {
      return response.json();
    });
  }

  put(entity) {
    this.request = new Request(this.url);
    return fetch(this.request, {
      method: 'POST',
      body: JSON.stringify(entity),
    }).then(response => {
      return response.json();
    });
  }

  delete(entityId) {
    this.request = new Request(this.url + '/' + entityId);
    return fetch(this.request, {
      method: 'DELETE',
    }).then(response => {
      return response;
    });
  }
}
