import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'node:path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // open a browser window automatically
    open: false,
    port: 3000,
    // change the localhost url to another:
    // linux: sudo su
    // sudo code /etc/hosts
    //make the changes (127.0.0.1 myapp.com.br)
    // access myapp.com.br:3000
    // host: 'localhost'
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@app': path.resolve(__dirname, 'src', 'app'),
      '@pages': path.resolve(__dirname, 'src', 'pages'),
      '@components': path.resolve(__dirname, 'src', 'components'),
    }
  }
})
