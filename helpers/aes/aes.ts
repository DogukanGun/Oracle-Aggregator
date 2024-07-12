import * as CryptoJS from 'crypto-js';

export default class Crypter{

    public static encrypt(key:string, value:string){
      const parsedKey = CryptoJS.enc.Utf8.parse(key);
      let ciphertext = CryptoJS.AES.encrypt(value, parsedKey, {iv: parsedKey}).toString();
      return ciphertext;
    }
  
    public static decrypt(key:string, value:string){
        const parsedKey = CryptoJS.enc.Utf8.parse(key);
        let decryptedData = CryptoJS.AES.decrypt(value, key, {
            iv: CryptoJS.lib.WordArray.create(Buffer.from(key, 'utf-8'))
        });
        return decryptedData.toString( CryptoJS.enc.Utf8 );
    }
  }