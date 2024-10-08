import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  outDir: 'dist',
  clean: true,
  dts: true,
  minify: true,
  sourcemap: true,
  splitting: false,
  treeshake: true,
  platform: 'browser'
});
