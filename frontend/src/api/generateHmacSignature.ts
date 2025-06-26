// generateHmacSignature.ts
import HmacSHA256 from 'crypto-js/hmac-sha256';
import Hex from 'crypto-js/enc-hex';

export function generateHmacSignature(secret: string): { timestamp: string; signature: string } {
  const timestamp = Date.now().toString();
  const signature = HmacSHA256(timestamp, secret).toString(Hex);
  return { timestamp, signature };
}
