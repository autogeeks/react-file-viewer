export function dataURItoText(dataurl) {
    var arr = dataurl.split(',');
    return atob(arr[1]);
}

const BASE64_MARKER = ';base64,';

export function dataURItoBinary(dataURI) {
    const base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
    const base64 = dataURI.substring(base64Index);
    const raw = window.atob(base64);
    const rawLength = raw.length;
    const array = new Uint8Array(new ArrayBuffer(rawLength));

    for (let i = 0; i < rawLength; i += 1) {
        array[i] = raw.charCodeAt(i);
    }
    return array;
}

export function dataURInoType(dataURI) {
    return dataURI.split(',')[1];
}