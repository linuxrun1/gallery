const Firebase = require('./firebase');

class Storage {
  async create(key, contents) {
    await new Firebase().upload(key, contents);
  }

  async get(key) {
    return new Firebase().read(key);
  }

  getStream(key) {
    return new Firebase().getStream(key);
  }

  async exists(key) {
    return new Firebase().exists(key);
  }

  async delete(key) {
    return new Firebase().delete(key);
  }
}

module.exports = Storage;