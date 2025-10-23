# Transaction Failure Fix - InsufficientPayment Error

## Issue Summary

**Transaction Hash**: `0x7dea79aa6b7b0916ca174411584e7a6d94ac2d049a229e10346b637f96e820d4`  
**Network**: Base Sepolia (Chain ID: 84532)  
**Error**: `InsufficientPayment()`

### Root Cause

The frontend was sending **0.001 ETH** but the contract requires **3.2 ETH** for all box types.

| Box Type  | Frontend (Before) | Contract (Actual) |
| --------- | ----------------- | ----------------- |
| Rare      | 0.001 ETH         | 3.2 ETH           |
| Epic      | 0.002 ETH         | 3.2 ETH           |
| Legendary | 0.005 ETH         | 3.2 ETH           |

## Changes Made

### 1. Updated Box Prices (`src/lib/contracts.ts`)

- Changed hardcoded prices to match on-chain contract values
- All box types now correctly show 3.2 ETH

### 2. Improved `useOpenBox` Hook (`src/hooks/useOpenBox.ts`)

**Before**: Used hardcoded `BOX_PRICES` constant

```typescript
const openBox = (boxType: BoxType) => {
  const price = BOX_PRICES[boxType];
  writeContract({ value: parseEther(price) });
};
```

**After**: Uses actual on-chain price from contract config

```typescript
const openBox = (boxType: BoxType, price: bigint) => {
  writeContract({ value: price });
};
```

### 3. Updated Component (`src/components/mystery-boxes-grid-integrated.tsx`)

- Modified `handleOpenBox` to accept price parameter
- Updated `BoxCard` to fetch price from `useBoxConfig` hook
- Button now passes the actual on-chain price when opening boxes
- Added loading state when price is being fetched

## Benefits of This Approach

1. **Always Accurate**: Uses real-time on-chain prices instead of hardcoded values
2. **Prevents Failures**: No more `InsufficientPayment` errors due to price mismatches
3. **Future-Proof**: If contract owner updates prices, frontend automatically reflects changes
4. **Type-Safe**: Uses `bigint` directly from contract, no conversion errors

## Testing

To test the fix:

1. Connect your wallet to Base Sepolia
2. Ensure you have at least 3.2 ETH (testnet)
3. Click "Open Box" on any box type
4. Transaction should succeed with correct payment

## Contract Price Update (Optional)

If 3.2 ETH is too high for testnet, the contract owner can update prices using:

```solidity
// Call updateBoxConfig as contract owner
updateBoxConfig(BoxType.Rare, 0.001 ether, true);
updateBoxConfig(BoxType.Epic, 0.002 ether, true);
updateBoxConfig(BoxType.Legendary, 0.005 ether, true);
```

After updating contract prices, the frontend will automatically reflect the new values.
