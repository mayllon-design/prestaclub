// El servidor de build de Hostinger tiene una GLIBC anterior a la 2.30 que exige el
// binario nativo de SWC desde Next 16.3, así que Next cae a su compilador WASM.
// Next lo busca en node_modules/next/wasm y, si no está, intenta descargarlo durante
// el build. Lo copiamos ahí tras `npm install` para que no dependa de esa descarga.
import { cpSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);

try {
  const source = dirname(require.resolve("@next/swc-wasm-nodejs/package.json"));
  const target = join(dirname(require.resolve("next/package.json")), "wasm", "@next", "swc-wasm-nodejs");
  if (!existsSync(join(target, "wasm.js"))) {
    cpSync(source, target, { recursive: true });
    console.log("SWC WASM copiado a node_modules/next/wasm");
  }
} catch (error) {
  console.warn("No se pudo copiar el SWC WASM:", error.message);
}
