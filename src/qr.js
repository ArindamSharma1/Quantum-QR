// src/utils/qr.js
export function googleQrUrl({ data, size = 300, ecc = 'L' }) {
  // Google Chart QR endpoint
  // chs = size (WIDTHxHEIGHT), cht = qr, chl = data, choe = encoding
  const text = encodeURIComponent(data || '');
  return `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=Example `;
}
