# ghostcontext-implementation
# GhostContext - Private RAG Vault

## Overview
GhostContext is a privacy-first Retrieval-Augmented Generation (RAG) system that allows users to securely upload files, encrypt them using Seal protocol, store them on Walrus, and interact with them using a local LLM (WebLLM) running in the browser via WebGPU. No data ever leaves user control.

## Key Features
✨ **Privacy-First Architecture**: Data never leaves your device
🔐 **Seal Encryption**: End-to-end encryption at rest on Walrus
🧠 **Local LLM**: WebLLM running locally via WebGPU (no API calls)
💾 **Walrus Storage**: Decentralized storage for encrypted blobs
🪙 **Sui Integration**: Wallet connection for user authentication
📄 **Multi-Format Support**: PDF, TXT, DOCX, and more
🚀 **React + Vite**: Modern, fast frontend framework

## Tech Stack
- **Frontend**: React 18 + Vite
- **Encryption**: Seal SDK + libsodium.js
- **Storage**: Walrus SDK
- **Blockchain**: Sui SDK (@mysten/sui.js)
- **LLM**: WebLLM (WASM + WebGPU)
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Build**: Vite

## Project Structure
```
ghost-context/
├── public/
├── src/
│   ├── components/
│   │   ├── WalletConnect.tsx
│   │   ├── FileUpload.tsx
│   │   ├── EncryptionStatus.tsx
│   │   ├── ChatInterface.tsx
│   │   ├── BlobManager.tsx
│   │   └── LLMChat.tsx
│   ├── services/
│   │   ├── encryptionService.ts
│   │   ├── walrusService.ts
│   │   ├── llmService.ts
│   │   └── sealService.ts
│   ├── stores/
│   │   ├── walletStore.ts
│   │   ├── blobStore.ts
│   │   └── chatStore.ts
│   ├── types/
│   │   └── index.ts
│   ├── App.tsx
│   └── main.tsx
├── index.html
├── vite.config.ts
├── tailwind.config.js
├── package.json
└── tsconfig.json
```

## Installation & Setup

### Prerequisites
- Node.js 18+
- npm or yarn
- Sui wallet (Chrome extension)
- A Walrus RPC endpoint

### Quick Start
```bash
# Clone the repository
git clone https://github.com/Ankit-raj-11/ghostcontext-implementation.git
cd ghostcontext-implementation

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Configuration

Create a `.env.local` file in the root directory:
```env
VITE_WALRUS_RPC_URL=https://testnet.walrus.xyz/api
VITE_SEAL_PUBLIC_KEY=<your-seal-public-key>
VITE_WEBLLM_MODEL=Llama-2-7b-chat
```

## Usage Demo

### 1. Connect Wallet
- Click "Connect Wallet" button
- Approve Sui wallet connection in extension

### 2. Upload & Encrypt File
- Select a file (PDF, TXT, DOCX)
- File is encrypted locally using Seal
- Encrypted blob uploaded to Walrus
- Get blob ID for future retrieval

### 3. Chat with Your Data
- Enter a question about your document
- Local LLM retrieves and decrypts the blob
- LLM processes the context and generates response
- Chat happens entirely locally - no servers see your data

### Demo Example:
```
File: "treasure.txt" contains "The treasure is buried under the palm tree."

Q: "Where is the treasure?"
A: "Based on the document, the treasure is buried under the palm tree."

✅ Proof: OpenAI/Claude never saw this data!
```

## API Services

### Encryption Service
```typescript
import { encryptFile, decryptBlob } from '@/services/encryptionService';

const encrypted = await encryptFile(file, password);
const decrypted = await decryptBlob(blobId, password);
```

### Walrus Service
```typescript
import { uploadBlob, downloadBlob } from '@/services/walrusService';

const blobId = await uploadBlob(encryptedData);
const data = await downloadBlob(blobId);
```

### LLM Service
```typescript
import { initLLM, chat } from '@/services/llmService';

await initLLM('Llama-2-7b-chat');
const response = await chat(context, question);
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|-----------|
| VITE_WALRUS_RPC_URL | Walrus RPC endpoint | Yes |
| VITE_SEAL_PUBLIC_KEY | Seal encryption public key | Yes |
| VITE_WEBLLM_MODEL | LLM model to use | Yes |
| VITE_SUI_RPC_URL | Sui RPC endpoint | No (uses testnet by default) |

## Development

### Running Tests
```bash
npm run test
```

### Build Analysis
```bash
npm run build -- --analyze
```

### Type Checking
```bash
npm run type-check
```

## Security Considerations

⚠️ **Important**: This project implements privacy-preserving features, but please note:

1. **Local Execution**: All encryption/decryption happens client-side
2. **No Server Data**: Servers never receive unencrypted data
3. **Browser WebGPU**: Ensure your browser supports WebGPU for LLM execution
4. **Seal Keys**: Private keys must be managed securely
5. **Network Privacy**: Consider using VPN for additional privacy

## Performance

- File Encryption: < 2s for 50MB files
- Walrus Upload: Depends on network
- LLM Inference: ~5-10s for Llama-2-7b (WebGPU accelerated)
- Decryption: < 1s for typical documents

## Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## License

MIT License - see LICENSE file for details

## Support

- 📖 [Documentation](./docs)
- 💬 [Discussions](https://github.com/Ankit-raj-11/ghostcontext-implementation/discussions)
- 🐛 [Report Issues](https://github.com/Ankit-raj-11/ghostcontext-implementation/issues)

## Acknowledgments

- Sui Foundation
- Walrus Protocol
- Seal Team
- WebLLM Contributors
