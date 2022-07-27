import fs from 'fs'
import fg from 'fast-glob'
import {Plugin} from 'vite'

// const defaultDirPath = path.resolve(__dirname, "../", "./code");

async function autoExport(){
  const entries = await fg.sync('*/**/*.ts',{onlyFiles:false,cwd:'src'})
  const arr = await fg.sync('*/index.ts',{onlyFiles:true,cwd:'src'})

  for(let key in arr){
    fs.unlinkSync(`./src/${arr[key]}`)
  }
  for(let key in entries){
    const fileName = entries[key].split('/')[0]
    const fileSplit = entries[key].split('.')[0].split('/').slice(1).join('/')
    fs.writeFile(`./src/${fileName}/index.ts`,`export * from './${fileSplit}';\n`,{'flag':'a'},function(err){
      if(err) throw err
    })
  }
}

/** watch file add/edit then autoExport  */
// async function watchExport(dirPath){
//   fs.watch(dirPath,{encoding:'utf-8'},(eventType,filename)=>{
//     console.log(eventType);
//     console.log(filename);
//   })
// }

export default function():Plugin{
  return {
    name:"auto-Export",
    apply:'serve',
    buildStart(){
      autoExport();
      // watchExport(defaultDirPath);
    }
  }
}
