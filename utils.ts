interface IBase64 {
    _keyStr: string,
    encode(input: string): string,
    decode(input: string): string,
    _utf8_encode(input: string): string,
    _utf8_decode(input: string): string
}

type CustomError = Error & {
    status: number
}

type ResStatus = 500 | 502 | 503 | 404 | 403 | 401 | 400 | 301 | 302

/**
 * parse one url query, return a object
 * @param {String} query url query str
 */
export const parseUrlQuery = (query: string): object => {
    const paramsArr: string[] = query.split('&')
    const reg: RegExp = /^.*\=.*$/
    const obj: Record<string, string> = {}
    paramsArr.forEach(current => {
        if (reg.test(current)) {
            const [key, val] = current.split('=')
            obj[key] = val
        }
    })

    return obj
}

export var Base64: IBase64 = {
    // private property
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    // public method for encoding
    encode: function(input: string) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;
  
        input = Base64._utf8_encode(input);
  
        while (i < input.length) {
  
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
  
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
  
            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }
  
            output = output + this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) + this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
  
        }
  
        return output;
    },
    // public method for decoding
    decode: function(input: string) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;
  
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
  
        while (i < input.length) {
  
            enc1 = this._keyStr.indexOf(input.charAt(i++));
            enc2 = this._keyStr.indexOf(input.charAt(i++));
            enc3 = this._keyStr.indexOf(input.charAt(i++));
            enc4 = this._keyStr.indexOf(input.charAt(i++));
  
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
  
            output = output + String.fromCharCode(chr1);
  
            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }
  
        }
  
        output = Base64._utf8_decode(output);
  
        return output;
  
    },
    // private method for UTF-8 encoding
    _utf8_encode: function(string: string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";
  
        for (var n = 0; n < string.length; n++) {
  
            var c = string.charCodeAt(n);
  
            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
  
        }
  
        return utftext;
    },
  
    // private method for UTF-8 decoding
    _utf8_decode: function(utftext: string) {
        var string = "";
        var i = 0;
        var c = 0;
        var c2 = 0;
        var c3 = 0;
  
        while (i < utftext.length) {
  
            c = utftext.charCodeAt(i);
  
            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            } else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            } else {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
  
        }
  
        return string;
    }
  }

// generate response for client when catch one error.
export function genErrRes({
    status,
    message
}: {
    status: number,
    message: string
}) {
    return {
        status,
        message
    }
}

export function genErrObj({
    status,
    message
}: {
    status: ResStatus,
    message: string
}) {
    const err = new Error(message);
    (<CustomError>err).status = status

    return err
}