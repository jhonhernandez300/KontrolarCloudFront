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
      const base64Data = this.ensureBase64(data);

      const decryptedDataBytes = CryptoJS.AES.decrypt(base64Data, CryptoHelper.Key, { iv: CryptoHelper.Iv });
      const decryptedDataStr = decryptedDataBytes.toString(CryptoJS.enc.Utf8);
      
      if (!this.isValidJson(decryptedDataStr)) {
        throw new Error("El dato desencriptado no es un JSON válido");
      }

      return JSON.parse(decryptedDataStr);
    } catch (error) {
      console.error("Error al desencriptar los datos: ", error);
      throw error;
    }
  }
  
  private static ensureBase64(data: string): string {
    if (!this.isBase64(data)) {      
      try {
        // Convertir a base64 si es necesario
        return btoa(unescape(encodeURIComponent(data)));
      } catch (e) {
        console.error("Error al convertir la cadena a base64:", e);
        throw new Error("La cadena no se pudo convertir a base64");
      }
    }
    return data;
  }
  
  private static isBase64(str: string): boolean {
    try {
      return btoa(atob(str)) === str;
    } catch (e) {
      return false;
    }
  }
  
  private static isValidJson(str: string): boolean {
    try {
      JSON.parse(str);
      return true;
    } catch (e) {
      return false;
    }
  }
}

//   static encrypt(data: any): string {
//     const jsonData = JSON.stringify(data);    
//     const encryptedData = CryptoJS.AES.encrypt(jsonData, CryptoHelper.Key, { iv: CryptoHelper.Iv }).toString();    
//     return encryptedData;
//   }

//   static decrypt(data: string): any {
//     try {
//         //console.log("data ", data);
//         const decryptedDataBytes = CryptoJS.AES.decrypt(data, CryptoHelper.Key, { iv: CryptoHelper.Iv });        
//         const decryptedDataStr = decryptedDataBytes.toString(CryptoJS.enc.Utf8);        
//         //console.log("decryptedDataStr ", decryptedDataStr);
//         //console.log("JSON.parse ", JSON.parse(decryptedDataStr));
//         return JSON.parse(decryptedDataStr);
//     } catch (error) {
//         //console.error("Error al desencriptar los datos: ", error);
//         throw error;
//     }
//   }
// }
