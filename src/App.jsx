import React, { useState } from 'react';
import DarkVeil from './components/DarkVeil.jsx';
import QrGenerator from './components/QrGenerator.jsx';
import { goQrUrl } from './qr.js';
import './styles/index.css';

export default function App() {
  const [qrUrl, setQrUrl] = useState(null);

  function handleGenerate(params) {
    if (!params) return setQrUrl(null);
    setQrUrl(goQrUrl(params));
  }

  function handleDownload(url) {
    if (!url) return;
    const a = document.createElement('a');
    a.href = url;
    a.download = 'qr-code.png';
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  function handleReset() {
    setQrUrl(null);
  }

  return (
    <>
      <div style={{
        width: "100%",
        height: "100%",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: -1
      }}>
        <DarkVeil />
      </div>

      <div className="app">
        <header className="hero-section">
          <h1 className="hero-title">Quantum QR</h1>
          <p className="hero-subtitle">
            Generate high-quality, instant QR codes for Links, Wi-Fi, and Contacts.
            Free, secure, and powered by advanced logic.
          </p>
        </header>

        <main className="container">
          <QrGenerator
            qrUrl={qrUrl}
            onGenerate={handleGenerate}
            onDownload={handleDownload}
            onReset={handleReset}
          />
        </main>

        <footer className="minimal-footer">
          <p>
            &copy; {new Date().getFullYear()} Quantum QR.
            <a href="https://github.com/ArindamSharma1" className="footer-link" target="_blank" rel="noreferrer">GitHub</a>
            <a href="https://linktr.ee/arindam_sharma" className="footer-link" target="_blank" rel="noreferrer">Contact</a>
          </p>
        </footer>
      </div>
    </>
  );
}