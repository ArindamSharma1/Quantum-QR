import React, { useState } from 'react';

export default function QrGenerator({ qrUrl, onGenerate, onDownload, onReset }) {
  const [mode, setMode] = useState("text");
  const [data, setData] = useState("");
  const [color, setColor] = useState("#000000");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsGenerating(true);
    // Simulate a brief loading state for "premium" feel
    setTimeout(() => {
      onGenerate({ data, mode, color });
      setIsGenerating(false);
    }, 400); 
  };

  const getPlaceholder = () => {
    if (mode === 'wifi') return 'SSID|PASSWORD|WPA';
    if (mode === 'contact') return 'Name|Phone|Email';
    return 'https://example.com or plain text';
  };

  const getHelperText = () => {
    if (mode === 'wifi') return 'Format: NetworkName|Password|Security';
    if (mode === 'contact') return 'Format: Name|Phone|Email';
    return 'Enter your link or text to convert to QR';
  };

  return (
    <div className="generator-container">
      {/* Left Column: Input */}
      <div className="input-group">
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Tabs */}
          <div>
            <label className="input-label">Content Type</label>
            <div style={{ display: 'flex', gap: '10px', background: 'rgba(255,255,255,0.05)', padding: '5px', borderRadius: '12px' }}>
              {['text', 'wifi', 'contact'].map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMode(m)}
                  style={{
                    flex: 1,
                    padding: '10px',
                    borderRadius: '8px',
                    border: 'none',
                    background: mode === m ? 'var(--accent)' : 'transparent',
                    color: mode === m ? 'white' : 'var(--text-muted)',
                    cursor: 'pointer',
                    fontWeight: 600,
                    transition: 'all 0.2s',
                    textTransform: 'capitalize'
                  }}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          {/* Data Input */}
          <div>
            <label className="input-label">Content</label>
            <input
              type="text"
              className="styled-input"
              value={data}
              onChange={(e) => setData(e.target.value)}
              placeholder={getPlaceholder()}
              required
            />
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '8px', display: 'block' }}>
              {getHelperText()}
            </span>
          </div>

          {/* Color Picker */}
          <div>
            <label className="input-label">QR Color</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                style={{
                  width: '50px',
                  height: '50px',
                  padding: '2px',
                  background: 'none',
                  border: '1px solid var(--border-card)',
                  borderRadius: '12px',
                  cursor: 'pointer'
                }}
              />
              <span style={{ color: 'var(--text-muted)' }}>{color}</span>
            </div>
          </div>

          {/* Generate Button */}
          <button type="submit" className="btn-primary" disabled={isGenerating}>
            {isGenerating ? 'Generating...' : 'Generate QR Code'}
          </button>
        </form>
      </div>

      {/* Right Column: Preview */}
      <div className="preview-group">
        {qrUrl ? (
          <>
            <div className="qr-frame">
              <img src={qrUrl} alt="QR Code" />
            </div>
            
            <div className="download-actions">
              <button 
                className="btn-secondary" 
                onClick={() => onDownload(qrUrl)}
                title="Download PNG"
              >
                 Download PNG
              </button>
              <button 
                className="btn-secondary" 
                onClick={onReset}
                title="Clear"
                style={{ padding: '12px' }}
              >
                ✕
              </button>
            </div>
          </>
        ) : (
          <div style={{ textAlign: 'center', opacity: 0.5 }}>
            <div style={{ 
              width: '200px', 
              height: '200px', 
              border: '2px dashed var(--border-card)', 
              borderRadius: '16px',
              margin: '0 auto 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <span style={{ fontSize: '3rem', color: 'var(--border-card)' }}>Auto</span>
            </div>
            <p>Enter content to preview</p>
          </div>
        )}
      </div>
    </div>
  );
}
