## Features
<ul>
 <li>⚡️  auto export module and function </li>  
 <li>✨ Execute in the specified directory</li>  
</ul>

## demo
![image](https://github.com/MrCat33/oss/blob/master/uPic/autoExportExample.gif)

## Installation
```
npm install ts-auto-export -D  
//or
npm install --save-dev ts-auto-export
```

## Usage

- `vite.confit.ts`  

```ts
import { defineConfig } from 'vite'
import autoExport from 'ts-auto-export'

export default defineConfig({
  plugins: [autoExport()]
  // default watch `src` directory then generate index.ts file
  // for example : autoExport({fileName:"type",filePath:"package/core"}
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
