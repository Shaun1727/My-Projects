let inputArr= process.argv.slice(2);
let fs=require("fs");
let path=require("path");
// console.log(inputArr);
//node main.js "Directory path"
//node main.js organize "driectory path"
// node main.js help "directory path"
let command=inputArr[0];
let types={
    media:["mp4","mkv"],
    archives:['zip','7z','rar','gz'],
    documents:['docx','doc','pdf','xlsx','xls','txt','cpp','bin','java'],
    app:['exe','dmg','pkg','deb']
}
switch(command){
    case "tree":
        treeFn(inputArr[1]);
        break;
    case "organize":
        organizeFn(inputArr[1]);
        break;
    case "help":
        HelpFn();
        break;
    default:
        console.log("Please Input a Valid Command");
        break;        
}
function treeFn(dirPath){
    if(dirPath==undefined){
        console.log("Please enter a valid Path");
        return;
    }
    else{
      let doesExists=fs.existsSync(dirPath);
      if(doesExists){
        TreeHelper(dirPath," ");
      } 
      else{  
         console.log("Enter a valid path");
         return;
      }
    }
}
function organizeFn(dirPath){
    let destPath;
    if(dirPath==undefined){
        console.log("Please enter a valid Path");
        return;
    }
    else{
      let doesExists=fs.existsSync(dirPath);
      if(doesExists){
          // create a organised directory
           destPath=path.join(dirPath,"organized_files");
          if(fs.existsSync(destPath)==false)
          fs.mkdirSync(destPath);  
      }
      else{  
          console.log("Enter the correct path");
      }
    }
    // console.log("Organize command implemented for",dirPath);
    organizeHelper(dirPath,destPath);
}
function TreeHelper(dirPath,indent){
  let isFile=fs.lstatSync(dirPath).isFile();
   if(isFile==true){
       let fileName=path.basename(dirPath);
       console.log(indent+"├─"+fileName);
   }
   else{
    let dirName=path.basename(dirPath);
    console.log(indent+"└─"+dirName);
    let children=fs.readdirSync(dirPath);
    for(let i=0;i<children.length;i++){
        let childrenPath=path.join(dirPath,children[i]);
        TreeHelper(childrenPath,indent+" "+"\t");
    }
   }
;}
function HelpFn(){
    console.log(`
        node main.js "Directory path"
        node main.js organize "driectory path"
        node main.js help "directory path"
    `);
}
function organizeHelper(src,dest){
    let childNames=fs.readdirSync(src); 
    // console.log(childNames);
    for(let i=0;i<childNames.length;i++){
    let childAdress=path.join(src,childNames[i]);
    let isFile=fs.lstatSync(childAdress).isFile();
    if(isFile){
        // console.log(childNames[i]);
        let category=getCategory(childNames[i]);
        console.log(childNames[i],"belongs to --> ",category);
        // cut copy/paste
        sendFiles(childAdress,dest,category);
    }
}
}
function getCategory(name){
let ext= path.extname(name);
ext=ext.slice(1);
for(let type in types)
{
let cTypesArray=types[type];
for(let i=0;i<cTypesArray.length;i++){
    if(ext==cTypesArray[i])
    return type;
}
}
return "others";
}
function sendFiles(srcFilePath,dest,category){
    let categoryPath=path.join(dest,category);
    if(fs.existsSync(categoryPath)==false){
        fs.mkdirSync(categoryPath);
    }
    let fileName= path.basename(srcFilePath);
    let destFilePath= path.join(categoryPath,fileName);
    fs.copyFileSync(srcFilePath,destFilePath);  
}