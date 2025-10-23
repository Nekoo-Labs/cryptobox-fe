# Environment Variables

## Required Variables

### `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`

**Required**: Yes  
**Description**: WalletConnect Cloud project ID for wallet connection functionality  
**Get yours at**: https://cloud.walletconnect.com/  
**Example**: `a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6`

---

## Optional Variables (for Production)

### `NEXT_PUBLIC_SITE_URL`

**Required**: No (Optional for custom domains)  
**Description**: Your custom domain URL. Used for generating absolute URLs for NFT images and metadata.  
**When to use**: When you have a custom domain (not using Vercel's default `.vercel.app` domain)  
**Format**: Can include `https://` or just the domain  
**Examples**:

- `https://cryptobox.io`
- `cryptobox.io`

**Note**: If not provided, the app will automatically use `NEXT_PUBLIC_VERCEL_URL` (Vercel's automatic deployment URL).

---

### `NEXT_PUBLIC_VERCEL_URL`

**Required**: No (Automatically set by Vercel)  
**Description**: Vercel's automatically generated deployment URL  
**Set by**: Vercel (system environment variable)  
**Format**: Domain without `https://` protocol  
**Example**: `cryptobox-fe-abc123.vercel.app`

**Note**: This is automatically provided by Vercel on all deployments. You don't need to set this manually.

---

## URL Priority

The application uses the following priority for generating absolute URLs:

1. **`NEXT_PUBLIC_SITE_URL`** - Custom domain (if set)
2. **`NEXT_PUBLIC_VERCEL_URL`** - Vercel deployment URL (automatic)
3. **`window.location.origin`** - Browser origin (client-side fallback)
4. **`http://localhost:3000`** - Development fallback

---

## Why Absolute URLs?

Absolute URLs are required for:

- ✅ **MetaMask wallet** - NFT previews in wallet
- ✅ **OpenSea** - NFT marketplace listings
- ✅ **External apps** - Any app displaying your NFTs
- ✅ **Social sharing** - OG images and previews

Relative paths like `/assets/image.png` won't work in these contexts.

---

## Setup Instructions

### Local Development

1. Copy this template to `.env.local`:

```bash
# .env.local
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id_here
```

2. Get your WalletConnect Project ID:
   - Visit https://cloud.walletconnect.com/
   - Create a new project
   - Copy the Project ID

3. Start the dev server:

```bash
npm run dev
```

---

### Vercel Deployment

1. **Add WalletConnect Project ID**:
   - Go to your Vercel project settings
   - Navigate to "Environment Variables"
   - Add: `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`
   - Value: Your WalletConnect Project ID

2. **Optional: Add Custom Domain**:
   - If using a custom domain, add:
   - Variable: `NEXT_PUBLIC_SITE_URL`
   - Value: `https://your-custom-domain.com`

3. **Vercel URL (Automatic)**:
   - `NEXT_PUBLIC_VERCEL_URL` is automatically set by Vercel
   - No manual configuration needed
   - Used as fallback if `NEXT_PUBLIC_SITE_URL` is not set

---

## Vercel System Environment Variables

Vercel provides several automatic environment variables:

| Variable                | Description                          | Example                                      |
| ----------------------- | ------------------------------------ | -------------------------------------------- |
| `VERCEL`                | Always `"1"` when deployed on Vercel | `"1"`                                        |
| `VERCEL_ENV`            | Environment type                     | `"production"`, `"preview"`, `"development"` |
| `VERCEL_URL`            | Deployment URL (without protocol)    | `cryptobox-abc123.vercel.app`                |
| `VERCEL_GIT_COMMIT_SHA` | Git commit SHA                       | `abc123...`                                  |
| `VERCEL_GIT_COMMIT_REF` | Git branch name                      | `main`                                       |

**Note**: Only `VERCEL_URL` needs the `NEXT_PUBLIC_` prefix to be accessible in the browser.

Learn more: https://vercel.com/docs/environment-variables/system-environment-variables

---

## Testing Absolute URLs

### Check in Development:

```bash
npm run dev
```

Open browser console and run:

```javascript
// Should show your local URL
console.log(window.location.origin);
```

### Check in Production:

After deploying to Vercel, NFT images should use:

- `https://your-site.vercel.app/assets/...` (if no custom domain)
- `https://your-custom-domain.com/assets/...` (if custom domain set)

---

## Troubleshooting

### Issue: NFTs not showing in MetaMask

**Solution**: Ensure `NEXT_PUBLIC_VERCEL_URL` or `NEXT_PUBLIC_SITE_URL` is set correctly

### Issue: Images show as relative paths

**Solution**: Check that `getAbsoluteUrl()` is being used in `useNFTMetadata` hook

### Issue: Different URLs in dev vs production

**Expected**: This is normal

- Dev: `http://localhost:3000/assets/...`
- Prod: `https://your-site.vercel.app/assets/...`

---

## Security Notes

- ✅ **Safe to expose**: All `NEXT_PUBLIC_*` variables are exposed to the browser
- ✅ **No secrets**: Never put API keys or secrets in `NEXT_PUBLIC_*` variables
- ✅ **WalletConnect Project ID**: Safe to expose (it's meant to be public)

---

## Example `.env.local`

```bash
# Required
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6

# Optional (only if using custom domain in development)
# NEXT_PUBLIC_SITE_URL=https://cryptobox.io
```

---

## References

- [Vercel Environment Variables](https://vercel.com/docs/environment-variables)
- [Vercel System Variables](https://vercel.com/docs/environment-variables/system-environment-variables)
- [Next.js Environment Variables](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables)
- [WalletConnect Cloud](https://cloud.walletconnect.com/)
