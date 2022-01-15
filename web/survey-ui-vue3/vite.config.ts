import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

function pathResolve(dir: string) {
  return resolve(process.cwd(), ".", dir);
}

const root = process.cwd();
// https://vitejs.dev/config/
export default defineConfig({
  // root,
  plugins: [vue()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },

  // resolve: {
  //   alias: {
  //     "@": resolve(__dirname, "./src"),
  //     "/@/": resolve(__dirname, "./src/"),
  //   },
  //   // [
  //   //   // {
  //   //   //   find: "vue-i18n",
  //   //   //   replacement: "vue-i18n/dist/vue-i18n.cjs.js",
  //   //   // },
  //   //   // /@/xxxx => src/xxxx
  //   //   {
  //   //     find: /\/@\//,
  //   //     replacement: pathResolve("src") + "/",
  //   //   },
  //   //   // /#/xxxx => types/xxxx
  //   //   {
  //   //     find: /\/#\//,
  //   //     replacement: pathResolve("types") + "/",
  //   //   },
  //   // ],
  // },
});
