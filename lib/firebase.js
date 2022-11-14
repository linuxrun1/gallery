const admin = require("firebase-admin");
const initFirebaseStorage = () => {
  if (admin.apps.length === 0) {
    const serviceAccount = require("../.firebase/cert.json");

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
  }

  const bucket = 'my-galery-byvhs';
  return admin.app().storage().bucket(`${bucket}.appspot.com`);
};

class Firebase {

  constructor() {
    this.storage = initFirebaseStorage();
  }

  exists(key) {
    return new Promise((resolve, reject) => {
      this.storage.file(key).exists()
        .then(res => resolve(res[0]))
        .catch(reject);
    });
  }

  upload(key, contents) {
    const file = this.storage.file(key);

    return new Promise((resolve, reject) => {
      file.put(contents, err => {
        if (err) {
          return reject(err);
        }

        return resolve(true);
      });
    });
  }

  getStream(key) {
    const file = this.storage.file(key);
    return file.createReadStream();
  }

  read(key) {
    const file = this.storage.file(key);

    return new Promise((resolve, reject) => {
      file.download()
        .then(contents => resolve(contents.toString()))
        .catch(reject);
    });
  }

  delete(key) {
    const file = this.storage.file(key);

    return new Promise((resolve, reject) => {
      file.delete()
        .then(resolve)
        .catch(reject);
    });
  }
}

module.exports = Firebase;