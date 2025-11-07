import React, { useState } from "react";

export default function QrForm({ onGenerate }) {
  const [text, setText] = useState("");
  const [size, setSize] = useState(300);
  const [ecc, setEcc] = useState("L");

  function handleSubmit(e){
    e.preventDefault();
    if(!text.trim()) return;
    
    onGenerate({
      data: text,
      size: Number(size),
      ecc
    });
  }

  return(
    <form onSubmit={handleSubmit} className="qr-form">
      <input
        placeholder="Enter link or text..."
        value={text}
        onChange={(e)=>setText(e.target.value)}
      />
  
      <select value={size} onChange={(e)=>setSize(e.target.value)}>
        <option value="200" style={{ color: "black"}}>200px</option>
        <option value="300">300px</option>
        <option value="400">400px</option>
      </select>

      <select value={ecc} onChange={(e)=>setEcc(e.target.value)}>
        <option value="L">L (low)</option>
        <option value="M">M (medium)</option>
        <option value="Q">Q (quality)</option>
        <option value="H">H (high)</option>
      </select>

      <button type="submit">Generate QR</button>
    </form>
  )
}
