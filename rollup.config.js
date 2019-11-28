import path from 'path';
import nodeResolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';

export default {
  input: {
    main: './src/index.tsx'
  },
  output: {
    dir: 'build',
    format: 'esm',
    entryFileNames: '[name].js',
    chunkFileNames: '[name].js',
    sourcemap: true
  },
  plugins: [
    nodeResolve(),
    typescript({
      tsconfig: 'tsconfig.json'
    }),
    terser()
  ],
  manualChunks(id) {
    if (id.includes('node_modules')) {
      const directories = id.split(path.sep);
      const name = directories[directories.lastIndexOf('node_modules') + 1];

      if (name.match(/^preact/)) {
        return 'preactBundle';
      }

      if (name.match(/^@nx-js/) || name.match(/^z-preact-easy-state/)) {
        return 'stateManagement';
      }

      return name;
    }
  }
};
