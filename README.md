# 🎁 CryptoBox - Open Mystery Crypto Boxes

<div align="center">
  <img src="public/logo.svg" alt="CryptoBox Logo" width="120" />
  
  **The most secure and exciting platform for LP NFT mystery boxes**
  
  [![Next.js](https://img.shields.io/badge/Next.js-15.5-black?style=flat&logo=next.js)](https://nextjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
  [![RainbowKit](https://img.shields.io/badge/RainbowKit-2.2-purple?style=flat)](https://www.rainbowkit.com/)
  [![Wagmi](https://img.shields.io/badge/Wagmi-2.18-green?style=flat)](https://wagmi.sh/)
</div>

---

## 🌟 Overview

CryptoBox is a decentralized platform where users can discover rare LP NFT tokens through mystery boxes. Each box contains unique NFT tokens with different rarities - the higher the rarity, the better the rewards!

### ✨ Key Features

- 🎲 **Mystery Box System** - Open boxes to reveal rare LP NFT tokens
- 💎 **Rarity-Based Rewards** - Higher rarity means better rewards
- 🔐 **100% Secure & Fair** - Blockchain-verified randomness
- 💰 **10K+ Boxes Opened** - Join thousands of satisfied users
- 🌐 **Multi-Chain Support** - Built on Base Sepolia testnet
- 🎨 **Beautiful UI** - Modern, responsive design with smooth animations

### 📊 Platform Stats

- **10K+** Boxes Opened
- **$2.5M+** Total Value Distributed
- **100%** Secure & Fair

---

## 🚀 Getting Started

### Prerequisites

- Node.js 20+ and npm
- A Web3 wallet (MetaMask, Coinbase Wallet, etc.)
- WalletConnect Project ID ([Get one here](https://cloud.walletconnect.com))

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/cryptobox-fe.git
   cd cryptobox-fe
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory:

   ```env
   NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id_here
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 🛠️ Tech Stack

### Frontend

- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe development
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first styling
- **[Radix UI](https://www.radix-ui.com/)** - Accessible component primitives
- **[Lucide React](https://lucide.dev/)** - Beautiful icons

### Web3 Integration

- **[RainbowKit](https://www.rainbowkit.com/)** - Wallet connection UI
- **[Wagmi](https://wagmi.sh/)** - React hooks for Ethereum
- **[Viem](https://viem.sh/)** - TypeScript Ethereum library
- **[TanStack Query](https://tanstack.com/query)** - Data fetching & caching

### Developer Tools

- **[Husky](https://typicode.github.io/husky/)** - Git hooks
- **[Lint-staged](https://github.com/okonet/lint-staged)** - Pre-commit linting
- **[Prettier](https://prettier.io/)** - Code formatting
- **[ESLint](https://eslint.org/)** - Code linting

---

## 📁 Project Structure

```
cryptobox-fe/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with providers
│   │   ├── page.tsx            # Home page
│   │   ├── providers.tsx       # Web3 providers setup
│   │   └── globals.css         # Global styles
│   └── wagmi.ts                # Wagmi configuration
├── public/                     # Static assets
├── .husky/                     # Git hooks
│   ├── pre-commit             # Runs lint-staged
│   └── pre-push               # Runs type-check, lint, build
├── .env.local                 # Environment variables (create this)
├── package.json               # Dependencies & scripts
└── README.md                  # This file
```

---

## 🎮 How It Works

### 1. Connect Wallet

Link your Web3 wallet to get started. We support MetaMask, Coinbase Wallet, WalletConnect, and more.

### 2. Choose Box

Select from our variety of mystery boxes. Each box contains unique LP NFT tokens with different rarities.

### 3. Claim Reward

Reveal your NFT instantly! The higher the rarity, the better the rewards you can earn.

---

## 🔧 Available Scripts

| Command                | Description                             |
| ---------------------- | --------------------------------------- |
| `npm run dev`          | Start development server with Turbopack |
| `npm run build`        | Build production bundle                 |
| `npm start`            | Start production server                 |
| `npm run lint`         | Run ESLint                              |
| `npm run type-check`   | Run TypeScript type checking            |
| `npm run format`       | Format code with Prettier               |
| `npm run format:check` | Check code formatting                   |

---

## 🔐 Git Hooks & Code Quality

This project uses automated checks to ensure code quality:

### Pre-commit

- Runs **lint-staged** on staged files
- Automatically fixes ESLint issues
- Formats code with Prettier

### Pre-push

- **Step 1/3**: TypeScript type checking
- **Step 2/3**: ESLint on entire codebase
- **Step 3/3**: Production build test

See [SETUP_HOOKS.md](./SETUP_HOOKS.md) for detailed information.

---

## 🌐 Deployment

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/cryptobox-fe)

1. Push your code to GitHub
2. Import project to Vercel
3. Add environment variables:
   - `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`
4. Deploy!

### Other Platforms

This Next.js app can be deployed to any platform supporting Node.js:

- [Netlify](https://www.netlify.com/)
- [Railway](https://railway.app/)
- [Render](https://render.com/)

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - New features
- `fix:` - Bug fixes
- `chore:` - Maintenance tasks
- `docs:` - Documentation updates
- `style:` - Code style changes
- `refactor:` - Code refactoring

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🔗 Links

- **Website**: [Coming Soon]
- **Documentation**: [Coming Soon]
- **Twitter**: [Coming Soon]
- **Discord**: [Coming Soon]

---

## 💡 Support

If you have any questions or need help:

1. Check the [SETUP_HOOKS.md](./SETUP_HOOKS.md) guide
2. Open an issue on GitHub
3. Join our Discord community

---
