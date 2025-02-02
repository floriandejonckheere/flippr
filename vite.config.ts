import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import mkcert from 'vite-plugin-mkcert';

export default defineConfig({
  plugins: [sveltekit(), mkcert()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    allowedHosts: ['localhost', '127.0.0.1', 'azathoth.local'],
    fs: {
      allow: ['./static/uploads']
    }
  }
});
