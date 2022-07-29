import fs from 'fs'
import fg from 'fast-glob'
import path from 'path'
import chokidar from 'chokidar'
import {Plugin} from 'vite'

type fileOptions = {
  fileName:string
  filePath:string
}

const userOptions:fileOptions = {fileName:'index',filePath:'src'}

async function autoExport(){
  const entries = await fg.sync('*/**/*.ts',{onlyFiles:false,cwd:`${userOptions.filePath}`})
  const arr = await fg.sync(`*/${userOptions.fileName}.ts`,{onlyFiles:true,cwd:`${userOptions.filePath}`})

  for(let key in arr){
    fs.unlinkSync(`./${userOptions.filePath}/${arr[key]}`)
  }
  for(let key in entries){
    const fileName = entries[key].split('/')[0]
    const fileSplit = entries[key].split('.')[0].split('/').slice(1).join('/')
    fs.writeFile(`./${userOptions.filePath}/${fileName}/${userOptions.fileName}.ts`,`export * from './${fileSplit}';\n`,{'flag':'a'},function(err){
      if(err) throw err
    })
  }
}

/** watch file add/edit then autoExport  */
async function watchExport(){
  const dirPath = path.resolve(__dirname, "../", `./${userOptions.filePath}`);
  chokidar.watch(dirPath,{ignored:`${userOptions.fileName}.ts`})
  .on('add',()=>{
    autoExport()
  })
  .on('unlinkDir',()=>{
    autoExport()
  })
}

export default function(opt?:fileOptions):Plugin{
  return {
    name:"auto-export",
    apply:'serve',
    config(){
      Object.assign(userOptions,opt)
    },
    buildStart(){
      autoExport();
      watchExport();
    }
  }
}
