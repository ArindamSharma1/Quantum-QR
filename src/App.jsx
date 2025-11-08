// src/App.jsx
import React, { useState } from 'react';
import QrForm from './components/QrForm';
import DarkVeil from './components/DarkVeil.jsx';
import QrPreview from './components/QrPreview';
import { goQrUrl } from './qr.js';
import './styles/index.css';
import GooeyNav from './components/GooeyNav.jsx';

export default function App(){
  const [qrUrl, setQrUrl] = useState(null);

function handleGenerate(params){
  if(!params) return setQrUrl(null);
  setQrUrl( goQrUrl(params) );
  
}

  async function handleDownload(url){
    try {
      const res = await fetch(url);
      const blob = await res.blob();
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = 'qr-code.png';
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error('download failed', err);
    }
  }
  function handleReset(){
  setQrUrl(null);
}


  const items = [
    { label: "Github", href: "https://github.com/ArindamSharma1", target: "_blank" },
    { label: "About", href: "https://www.linkedin.com/in/arindam-sharma-ab4712251/" },
    { label: "Contact", href: "https://linktr.ee/arindam_sharma" },
  ];

  return (
    
    <>


      <div style={{
        width:"100%",
        height:"100%",
        position:"fixed",
        top:0,
        left:0,
        zIndex:-1
      }}>
        <DarkVeil />
      </div>

      {/* Add your GooeyNav here */}
      <div style={{ height: '100px', position: 'relative', padding: '20px' }}>
        <GooeyNav
          items={items}
          particleCount={15}
          particleDistances={[90, 10]}
          particleR={100}
          initialActiveIndex={0}
          animationTime={600}
          timeVariance={300}
          colors={[1, 2, 3, 1, 2, 3, 1, 4]}
        />
      </div>

      {/*HASSLE FREE QR - GENERATOR*/}
      <div>
      <p style={{ textAlign: 'center', color: 'white' }} className='heading-text'>Generate QR Code <span className='hassle-free'>Hassle Free</span></p>
      <a href="#qr-generator" class="scroll-down-arrow" aria-label="Scroll down"></a>
      </div>
      <div className="app">
        <div>
          <h1 style={{marginBottom:6}}>QR Code Generator</h1>
          <p style={{color:'var(--muted)', marginTop:0}}  id="qr-generator">Generate QR for links or text for free.</p>
          <QrForm onGenerate={handleGenerate} />
        </div>

        <div>
          <QrPreview qrUrl={qrUrl} onDownload={handleDownload} onReset={handleReset} />

        </div>
      </div>
      
    </>
  );
}