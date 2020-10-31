import React,{useState,useEffect} from 'react';

const uniKey = () => {
    return Math.random().toString(36).substring(2);
}

export default () => { 
    const [inpVal,setInpVal] = useState("")
    const [createDir,setCreateDir] = useState("")
    const [currentDirectory,setCurrentDirectory] = useState("")
    const [directories,setDirectories] = useState([
        {type:'folder',name:'my-app',
        childs:[
            {type:'folder',name:'demo-app1',childs:[
                {type:'folder',name:'test-app',childs:[
                   {type:'folder',name:'my-app',childs:[],focusStyle:false,activeStyle:false,key:uniKey()},
                   ], focusStyle:false,activeStyle:false,key:uniKey(),
                },
                {type:'file',name:'my-app.js',focusStyle:false,activeStyle:false,key:uniKey()},
                {type:'folder',name:'my-app',childs:[],focusStyle:false,activeStyle:false,key:uniKey()},
            ],
            focusStyle:false,activeStyle:false,key:uniKey()},
            {type:'folder',name:'test-app2',childs:[],focusStyle:false,activeStyle:false,key:uniKey(),},
            {type:'folder',name:'my-app3',childs:[],focusStyle:false,activeStyle:false,key:uniKey()},
            {type:'folder',name:'my-app4',childs:[],focusStyle:false,activeStyle:false,key:uniKey()},
        ],
        focusStyle:false,activeStyle:false,key:uniKey()
        },
        {type:'folder',name:'demo-app',childs:[],focusStyle:false,activeStyle:false,key:uniKey()},
        {type:'file',name:'test-app.js',focusStyle:false,activeStyle:false,key:uniKey()},
        {type:'folder',name:'my-app',childs:[],focusStyle:false,activeStyle:false,key:uniKey()},
        {type:'folder',name:'my-app',childs:[],focusStyle:false,activeStyle:false,key:uniKey()},
    ])

    const seeChilds = (openedKey:string,seeDirectories:any,inpVal?:string) => { 
         seeDirectories?.map( (v:any) => {
            if(inpVal){
                // for addition    
                // console.log('Running')
                if(createDir === "folder" && openedKey === v.key ){
                    var newFolder = {
                     type:'folder',name:inpVal,childs:[],focusStyle:false,activeStyle:false,key:uniKey()
                    }
                    if(v.type === "folder"){
                        v.childs.push(newFolder)
                    }
                    else{
                      seeDirectories.push(newFolder)
                    }
                    setCreateDir("")
                   console.log('ADDFOLDER===>',inpVal);
                   return true 
                }
                else if(createDir === "file" && openedKey === v.key ){
                    var newFile = {
                        type:'file',name:inpVal,focusStyle:false,activeStyle:false,key:uniKey()
                       }
                        if(v.type === "folder"){
                            v.childs.push(newFile)
                        }
                        else{
                         seeDirectories.push(newFile)
                        }
                       setCreateDir("")
                    console.log('ADDFILE===>',inpVal); 
                    return true
                }
                seeChilds(openedKey,v?.childs,inpVal)

            }else{
                // for updation    
                v.focusStyle = false
                if(openedKey === v.key){
                    v.activeStyle = v.activeStyle ? false : true;
                    v.focusStyle = true;
                    setCurrentDirectory(openedKey)
                    setCreateDir("")
                }
                if(v?.childs?.length){
                   seeChilds(openedKey,v.childs)
                }
            } 
        })
    }

    const clickFolderOrFile = (openedKey:string) => {
        seeChilds(openedKey,directories)
        setDirectories([...directories])
    }
    

    const addInDirectory = (e:any,openedKey:string) => {
     e.preventDefault();
     var inpVal = (document.getElementById(openedKey) as HTMLInputElement).value;
     seeChilds(openedKey,directories,inpVal)
     setDirectories([...directories])
    }

    const createNewFile = () => {
        setCreateDir("file")
    }

    const createNewFolder = () => {
        setCreateDir("folder")
    }
   


    const renderDirectories = (childs:any) => {
        return(
            childs.map( (v:any,index:number) => {
                if(v.type === "folder"){
                     return(
                        <div key={index}>
                            <div
                            // id={v.key}
                            onClick={() => clickFolderOrFile(v.key) }
                            className={`editor-folder-div ${v.focusStyle ? 'act-sty' : 'fold-hov'}`}
                            >
                            <img className={`fold-togg ${v.activeStyle && "rota"}`}
                                src={require('../../Assets/light-arrow.png')}/> {v.name}
                            </div>
                            <div style={{paddingLeft:'10px',display:v.activeStyle?'block':'none'}} > 
                             {/* active style display issue */}
                                {
                                v.focusStyle && currentDirectory && createDir   && 
                                <form style={{paddingLeft:'6px'}}>
                                    {createDir === "file" ? 
                                        <img height="17px" src={require('../../Assets/left-align.png')}/>
                                        :
                                        <img height="14px" src={require('../../Assets/light-arrow.png')}/>
                                    } 
                                    <input id={v.key}   autoFocus />  
                                    <button style={{visibility:'hidden'}} onClick={(e) => addInDirectory(e,v.key)}>add</button>
                                </form>
                                }
                                {v.childs && renderDirectories(v.childs)}
                            </div>
                        </div>
                    )
                }else{
                    return(
                        <div key={index}>
                            <div
                            //  id={v.key}
                            onClick={() => clickFolderOrFile(v.key) }
                            className={`editor-folder-div ${v.focusStyle ? 'act-sty' : 'fold-hov'}`}
                            >
                                <img className="tab-icon"  src={require('../../Assets/js-logo.png')} />  {v.name}
                            </div>
                            {
                            v.focusStyle && currentDirectory && createDir   && 
                            <form style={{paddingLeft:'6px'}}>
                                {createDir === "file" ? 
                                    <img height="17px" src={require('../../Assets/left-align.png')}/>
                                    :
                                    <img height="14px" src={require('../../Assets/light-arrow.png')}/>
                                } 
                                <input id={v.key} autoFocus />  
                                <button style={{visibility:'hidden'}} onClick={(e) => addInDirectory(e,v.key)}>add</button>
                            </form>
                            }
                        </div>
                    )
                }
            })
      
        )
    }

    






    return(
        <div className="editor-left">
            <h6 style={{color:'lightgray',marginLeft:'5px'}} >
                OPEN EDITORS
            </h6>
            <div>
                <h6 className="file-generate-bar">
                    <div>
                        <img width="11px" height="11px" style={{margin:'0 2px 3px 0'}}  src={require('../../Assets/right-arrow.png')}/>
                        TEST
                    </div>
                    <div className="generate-bar-right">
                        <img width="19px" height="19px" onClick={() => createNewFile()} src={require('../../Assets/add-file2.png')} />  
                        <img width="19px" height="20px" onClick={() => createNewFolder()} src={require('../../Assets/folder.png')} />  
                        <img width="19px" height="19px" src={require('../../Assets/loading.png')} />  
                        <img width="19px" height="19px" src={require('../../Assets/close-directory.png')} />  
                    </div>
                </h6>  
                <div className="direct-div">
                    {renderDirectories(directories)}
                </div>
            </div>
        </div>
    )
}