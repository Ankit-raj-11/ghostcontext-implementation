import { useState, useEffect } from 'react';
import WalletConnect from './components/WalletConnect';
import FileUpload from './components/FileUpload';
import ChatInterface from './components/ChatInterface';
import BlobManager from './components/BlobManager';
import './App.css';

interface Blob {
  id: string;
  name: string;
  uploadedAt: string;
  size: number;
  encrypted: boolean;
}

function App() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [blobs, setBlobs] = useState<Blob[]>([]);
  const [selectedBlobId, setSelectedBlobId] = useState<string | null>(null);
  const [chatMessages, setChatMessages] = useState<{ role: string; content: string }[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('ghostcontext_blobs');
    if (saved) {
      setBlobs(JSON.parse(saved));
    }
  }, []);

  const handleFileUpload = async (file: File, encryptionKey: string) => {
    setLoading(true);
    try {
      // TODO: Encrypt file with Seal
      // TODO: Upload to Walrus
      const newBlob: Blob = {
        id: `blob_${Date.now()}`,
        name: file.name,
        uploadedAt: new Date().toISOString(),
        size: file.size,
        encrypted: true,
      };
      const updated = [...blobs, newBlob];
      setBlobs(updated);
      localStorage.setItem('ghostcontext_blobs', JSON.stringify(updated));
    } finally {
      setLoading(false);
    }
  };

  const handleChat = async (message: string) => {
    if (!selectedBlobId) return;
    setLoading(true);
    try {
      // TODO: Retrieve blob from Walrus
      // TODO: Decrypt locally
      // TODO: Pass to local LLM
      // TODO: Stream response
      setChatMessages([...chatMessages, { role: 'user', content: message }, { role: 'assistant', content: 'Response coming soon...' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-content">
          <h1>👻 GhostContext</h1>
          <p>Privacy-First RAG Vault</p>
        </div>
        <WalletConnect connected={walletConnected} onConnect={() => setWalletConnected(true)} />
      </header>

      <main className="app-main">
        {walletConnected ? (
          <div className="content-grid">
            <section className="section upload-section">
              <FileUpload onUpload={handleFileUpload} disabled={loading} />
            </section>
            <section className="section blobs-section">
              <BlobManager blobs={blobs} selected={selectedBlobId} onSelect={setSelectedBlobId} />
            </section>
            <section className="section chat-section">
              <ChatInterface messages={chatMessages} onSend={handleChat} disabled={loading || !selectedBlobId} />
            </section>
          </div>
        ) : (
          <div className="connect-prompt">
            <div className="prompt-card">
              <h2>Connect Your Wallet</h2>
              <p>Connect your Sui wallet to get started with GhostContext</p>
              <p className="info-text">Your files are encrypted locally and never leave your device</p>
            </div>
          </div>
        )}
      </main>

      <footer className="app-footer">
        <p>✨ Built with React + Vite | 🔐 Encrypted with Seal | 💾 Stored on Walrus | 🤖 Powered by WebLLM</p>
      </footer>
    </div>
  );
}

export default App;
