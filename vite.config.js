import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    // Bind to loopback only. Prevents the dev server being reachable from
    // other machines on a shared network (café / campus / co-working wifi)
    // while a contributor is working.
    host: '127.0.0.1',
    // Reject requests whose Host header isn't one of these. Blocks DNS
    // rebinding, where a malicious page resolves a domain to 127.0.0.1 and
    // then reads your dev server's responses.
    allowedHosts: ['localhost', '127.0.0.1'],
    // Never let the dev server serve files from outside the project root.
    fs: { strict: true, allow: ['.'] },
    cors: false,
  },
})
