import resolve from '@rollup/plugin-node-resolve'
import filesize from 'rollup-plugin-filesize'
import { ngcPlugin } from 'rollup-plugin-ngc'
import { terser } from 'rollup-plugin-terser'

export default {
  input: './src/chat-bob.ts',
  manualChunks(id) {
    if (id.includes('node_modules')) return 'vendor'
  },
  plugins: [
    ngcPlugin({
      rootDir: './src'
    }),
    resolve(),
    terser({
      safari10: true,
      output: {
        ascii_only: true,
        comments: false,
        webkit: true,
      },
      compress: {
        pure_getters: true,
        passes: 3,
        global_defs: {
          ngDevMode: false,
        },
      }
    }),
    filesize()
  ],
  output: {
    format: 'es',
    dir: './dist',
    sourcemap: true
  }
}
