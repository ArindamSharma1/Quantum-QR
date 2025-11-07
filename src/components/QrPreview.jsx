// src/components/QrPreview.jsx
import React from 'react';

export default function QrPreview({ qrUrl, onDownload }) {
  if (!qrUrl) {
    return (
      <div className="card preview">
        <div className="small">No QR generated yet</div>
      </div>
    );
  }

  return (
    <div className="card preview" role="region" aria-label="Preview">
      <img src={qrUrl} alt="QR code preview" className="qr-img" />
      <div style={{display:'flex', gap:10}}>
        <a className="btn btn-ghost" href={qrUrl} target="_blank" rel="noopener noreferrer">Open in new tab</a>
        <button className="btn btn-primary" onClick={() => onDownload(qrUrl)}>Download</button>
      </div>
      <div className="small">Right click the image to save or click Download.</div>
    </div>
  );
}
