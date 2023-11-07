const crypto = require('crypto');
const msgpack = require('msgpack-lite');

appcert = "f3624f447e774cddabac93d776451494" // Your App certificate from Agora console
channel = "64ea016f4da6a500115e0be2"; // A Video SDK channel name
uid = "64ea016f4da6a500115e0be2"; // The uid of the anchor in the channel (?)
expiresAfter = 840000; // Valid duration of stream key (seconds)

const expiresAt = Math.floor(Date. now() / 1000) + expiresAfter;

const rtcInfo = {
   C: channel,
   U: uid,
   E: expiresAt,
};

// Serialize using msgpack
const data = msgpack.encode(rtcInfo);

// Randomly generate an initialization vector
const iv = crypto.randomBytes(16);

// Use App certificate as encryption key
const key = Buffer.from(appcert, 'hex');

// Create an AES-128 CTR encryptor
const encrypter = crypto.createCipheriv('aes-128-ctr', key, iv);

// Encrypt the data
const encrypted = Buffer.concat([iv, encrypter.update(data), encrypter.final()]);

// Base64 conversion
const streamkey = encrypted.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/\=+$/, '');

console.log(`streamkey is ${streamkey}`);
