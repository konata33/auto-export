## Features
<ul>
 <li>🔧 &nbsp auto export module and function </li>  
 <li>✨ &nbsp Execute in the specified directory</li>  
 <li>⚡️  &nbsp only support in vite</li>
</ul>

## 演示
![image](https://github.com/MrCat33/oss/blob/master/uPic/autoExportExample.gif)

## Installation

```ts
pnpm add ts-auto-export -D  

//or
npm install --save-dev ts-auto-export
```

## Usage

- `vite.confit.ts`  

```ts
import { defineConfig } from 'vite'
import autoExport from 'ts-auto-export'

export default defineConfig({
  ...
  plugins:[autoExport()] //default watch `src` directory then generate index.ts file
})
```

## Config

| field    | Description | Type | Default |
| :-------:| :---------: | :----: | :------: |
| filePath | site declared file name | string | src |
| fileName | site watch specified directory  | string | index |

## Future

### Framework Support 
- [x] vite
- [ ] webpack
- [ ] with out vite/webpack
