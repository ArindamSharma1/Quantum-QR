export function goQrUrl({ data, mode }) {

  let formatted = data;

  if(mode === "wifi"){
    // user enters SSID|PASS|TYPE (like WPA)
    const [ssid,pwd,security] = data.split("|");
    formatted = `WIFI:T:${security||"WPA"};S:${ssid};P:${pwd};;`;
  }

  if(mode === "contact"){
    // name|phone|email
    const [name,phone,email] = data.split("|");
    formatted = `MECARD:N:${name};TEL:${phone};EMAIL:${email};;`;
  }

  return `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(formatted)}`;
}
