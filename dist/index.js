"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  default: () => src_default
});
module.exports = __toCommonJS(src_exports);

// src/plugin/autoExport.ts
var import_fs = __toESM(require("fs"));
var import_fast_glob = __toESM(require("fast-glob"));
async function autoExport() {
  const entries = await import_fast_glob.default.sync("*/**/*.ts", { onlyFiles: false, cwd: "src" });
  const arr = await import_fast_glob.default.sync("*/index.ts", { onlyFiles: true, cwd: "src" });
  for (let key in arr) {
    import_fs.default.unlinkSync(`./src/${arr[key]}`);
  }
  for (let key in entries) {
    const fileName = entries[key].split("/")[0];
    const fileSplit = entries[key].split(".")[0].split("/").slice(1).join("/");
    import_fs.default.writeFile(`./src/${fileName}/index.ts`, `export * from './${fileSplit}';
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
