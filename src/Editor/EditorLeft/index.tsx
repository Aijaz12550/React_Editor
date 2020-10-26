import React,{useState,useEffect} from 'react';

const uniKey = () => {
    return Math.random().toString(36).substring(2);
}

export default () => { 
    const [createDir,setCreateDir] = useState(false)
    const [currentDirectory,setCurrentDirectory] = useState("")
    const [directories,setDirectories] = useState([
        {type:'folder',name:'my-app',
        childs:[
            {type:'folder',name:'demo-app',childs:[
                {type:'folder',name:'test-app',childs:[
                    {type:'folder',name:'my-app',childs:[],focusStyle:false,activeStyle:false,key:uniKey()},
                ],
                focusStyle:false,activeStyle:false,key:uniKey(),},
                {type:'file',name:'my-app.js',childs:[],focusStyle:false,activeStyle:false,key:uniKey()},
                {type:'folder',name:'my-app',childs:[],focusStyle:false,activeStyle:false,key:uniKey()},
            ],
            focusStyle:false,activeStyle:false,key:uniKey()},
            {type:'folder',name:'test-app',childs:[],focusStyle:false,activeStyle:false,key:uniKey(),},
            {type:'folder',name:'my-app',childs:[],focusStyle:false,activeStyle:false,key:uniKey()},
            {type:'folder',name:'my-app',childs:[],focusStyle:false,activeStyle:false,key:uniKey()},
        ],
        focusStyle:false,activeStyle:true,key:uniKey()
        },
        {type:'folder',name:'demo-app',childs:[],focusStyle:false,activeStyle:false,key:uniKey()},
        {type:'file',name:'test-app.js',childs:[],focusStyle:false,activeStyle:false,key:uniKey()},
        {type:'folder',name:'my-app',childs:[],focusStyle:false,activeStyle:false,key:uniKey()},
        {type:'folder',name:'my-app',childs:[],focusStyle:false,activeStyle:false,key:uniKey()},
    ])

    const seeChilds = (openedKey:string,seeDirectories:any) => {
         seeDirectories.map( (v:any) => {
            v.focusStyle = false
             if(openedKey === v.key){
                 v.activeStyle = v.activeStyle ? false : true;
                 v.focusStyle = true;
                 setCurrentDirectory(openedKey)
                 setCreateDir(false)
             }
             if(v.childs.length){
                seeChilds(openedKey,v.childs)
             }
        })
    }

    const clickFolder = (openedKey:string) => {
        seeChilds(openedKey,directories)
        setDirectories([...directories])
    }
    

    const renderDirectories = (childs:any) => {
        return(
            childs.map( (v:any,index:number) => {
                if(v.type === "folder"){
                     return(
                        <div key={index}>
                            <div
                            id={v.key}
                            onClick={() => clickFolder(v.key) }
                            className={`editor-folder-div ${v.focusStyle ? 'act-sty' : 'fold-hov'}`}
                            >
                            <img className={`fold-togg ${v.activeStyle && "rota"}`}
                                src={require('../../Assets/light-arrow.png')}/> {v.name}
                            </div>
                            <div style={{paddingLeft:'5px'}} >
                                {v.focusStyle && currentDirectory && createDir   && <input  />}
                                {v.childs && renderDirectories(v.childs)}
                            </div>
                        </div>
                    )
                }else{
                    return(
                        <div key={index}>

                        
                        <div id={v.key}
                          onClick={() => clickFolder(v.key) }
                         className={`editor-folder-div ${v.focusStyle ? 'act-sty' : 'fold-hov'}`}
                        >
                              <img className="tab-icon"  src={require('../../Assets/js-logo.png')} />  {v.name}
                        </div>
                        </div>
                    )
                }
            })
      
        )
    }

    
    const createNewFile = () => {
        console.log("BB",currentDirectory)
        setCreateDir(true)
    //   directories
    }

    const createNewFolder = () => {
        
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