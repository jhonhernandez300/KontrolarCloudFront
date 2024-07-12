import * as CryptoJS from 'crypto-js';

export class CryptoHelper {
  private static readonly Key = CryptoJS.enc.Utf8.parse('1234567890123456'); // 16 bytes
  private static readonly Iv = CryptoJS.enc.Utf8.parse('1234567890123456'); // 16 bytes

  static encrypt(data: any): string {
    const jsonData = JSON.stringify(data);
    const encryptedData = CryptoJS.AES.encrypt(jsonData, CryptoHelper.Key, { iv: CryptoHelper.Iv }).toString();
    return encryptedData;
  }

  static decrypt(data: string): any {
    try {
        console.log("data ", data);
        const decryptedDataBytes = CryptoJS.AES.decrypt(data, CryptoHelper.Key, { iv: CryptoHelper.Iv });        
        const decryptedDataStr = decryptedDataBytes.toString(CryptoJS.enc.Utf8);        
        console.log("decryptedDataStr ", decryptedDataStr);
        console.log("JSON.parse ", JSON.parse(decryptedDataStr));
        return JSON.parse(decryptedDataStr);
    } catch (error) {
        console.error("Error al desencriptar los datos: ", error);
        throw error;
    }
  }
}
