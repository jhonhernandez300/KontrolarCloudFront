import * as CryptoJS from 'crypto-js';

export class CryptoHelper {
  private static readonly Key = CryptoJS.enc.Utf8.parse('1234567890123456'); // 16 bytes
  private static readonly Iv = CryptoJS.enc.Utf8.parse('1234567890123456'); // 16 bytes

  static encrypt(data: any): string {
    const jsonData = JSON.stringify(data);
    const encryptedData = CryptoJS.AES.encrypt(jsonData, CryptoHelper.Key, { iv: CryptoHelper.Iv }).toString();
    return encryptedData;
  }

  static decrypt(encryptedData: string): any {
    const bytes = CryptoJS.AES.decrypt(encryptedData, CryptoHelper.Key, { iv: CryptoHelper.Iv });
    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decryptedData;
  }
}
