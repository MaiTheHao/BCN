import CryptoJS from 'crypto-js';

function hashData(data) {
    return CryptoJS.SHA256(data).toString(CryptoJS.enc.Hex);
}

function verifyData(inputData, storedHashedData) {
    const inputHashed = hashData(inputData);
    return inputHashed === storedHashedData;
}

export default { hashData, verifyData };