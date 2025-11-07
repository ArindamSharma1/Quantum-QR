// src/utils/qrUtils.js
export function googleQrUrl(text){
  const encoded = encodeURIComponent(text);
  return `https://chart.googleapis.com/chart?cht=qr&chs=300x300&chl=${encoded}`;
}
