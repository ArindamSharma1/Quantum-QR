import React, { useState } from "react";

export default function QrForm({ onGenerate }) {
  const [mode, setMode] = useState("text");
  const [data, setData] = useState("");

  function handleSubmit(e){
    e.preventDefault();
    onGenerate({ data, mode });
  }

  return (
    <form onSubmit={handleSubmit} className="qr-form">

      <select value={mode} onChange={e=>setMode(e.target.value)}>
        <option value="text">Text / Link</option>
        <option value="wifi">Wi-Fi</option>
        <option value="contact">Contact</option>
      </select>

      <input
        type="text"
        placeholder={
          mode === "text" 
          ? "Enter text or URL" 
          : mode === "wifi"
          ? "WiFi SSID|PASSWORD|WEP/WPA"
          : "Name|Phone|Email"
        }
        value={data}
        onChange={(e)=>setData(e.target.value)}
      />

      <button type="submit">Generate QR</button>
    </form>
  );
}
