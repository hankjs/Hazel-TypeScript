import { defineConfig } from "vite";
import glsl from "vite-plugin-glsl";
import path from 'path'

function _resolve(dir: string) {
  return path.resolve(__dirname, dir);
}

// https://vitejs.dev/config/
export default defineConfig({
    // build: {
    //     rollupOptions: {
    //         input: 'index.html',
    //     }
    // },
    plugins: [glsl()],
    resolve: {
        alias: {
          'src': _resolve('src'),
          'share': _resolve('src/share'),
          'Hazel': _resolve('src/Hazel'),
          'Sandbox': _resolve('src/Sandbox'),
        },
    },
});
