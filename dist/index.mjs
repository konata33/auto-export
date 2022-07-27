// src/plugin/autoExport.ts
import fs from "fs";
import fg from "fast-glob";
async function autoExport() {
  const entries = await fg.sync("*/**/*.ts", { onlyFiles: false, cwd: "src" });
  const arr = await fg.sync("*/index.ts", { onlyFiles: true, cwd: "src" });
  for (let key in arr) {
    fs.unlinkSync(`./src/${arr[key]}`);
  }
  for (let key in entries) {
    const fileName = entries[key].split("/")[0];
    const fileSplit = entries[key].split(".")[0].split("/").slice(1).join("/");
    fs.writeFile(`./src/${fileName}/index.ts`, `export * from './${fileSplit}';
`, { "flag": "a" }, function(err) {
      if (err)
        throw err;
    });
  }
}
function autoExport_default() {
  return {
    name: "auto-Export",
    apply: "serve",
    buildStart() {
      autoExport();
    }
  };
}

// src/index.ts
var src_default = autoExport_default;
export {
  src_default as default
};
