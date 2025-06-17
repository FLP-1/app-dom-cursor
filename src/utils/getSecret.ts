import fs from 'fs';
import path from 'path';

let secrets: Record<string, string> | null = null;

export function getSecret(key: string): string | undefined {
  if (!secrets) {
    const filePath = path.resolve(process.cwd(), 'secrets.dev.json');
    if (fs.existsSync(filePath)) {
      secrets = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    } else {
      secrets = {};
    }
  }
  return secrets[key] || process.env[key];
} 
