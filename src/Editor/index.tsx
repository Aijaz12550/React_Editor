import React,{useEffect, useState } from "react";
import AceEditor from 'react-ace';
import EditorHeader from './EditorHeader';
import EditorLeft from './EditorLeft';
import themeFunc from './themeFunction'

interface FileObjLayout {
  type:string,
  fileData:string,
  name:string,
  focusStyle:boolean,
  activeStyle:boolean,
  key:string
}
var updateFileData : Function
var addNewTabInHeader : Function

const Editor: React.FC<{theme?:string}> = ({theme}) => {
  const [fileCode,setFileCode] = useState('');
  const [openFileObject,setOpenFileObject] = useState(Object)
 
  useEffect( () => {
    themeFunc(theme)
  },[])

  const writingCode = (fileUpdatedCode:string) => {
    if(openFileObject){
      updateFileData(fileUpdatedCode,openFileObject.key)
    }
  } 

  const openFile = (openFileObj:FileObjLayout,codeUpdateFunc:Function) => {
     setFileCode(openFileObj.fileData)
     setOpenFileObject(openFileObj)
     updateFileData = codeUpdateFunc
     addNewTabInHeader(openFileObj)
  } 

  const addFileTabInHeader = (updateTabsFunc:Function) => {
    addNewTabInHeader = updateTabsFunc
  }  

  const openSelectedFile = (openFileObj:FileObjLayout) => {
    setFileCode(openFileObj.fileData)
    setOpenFileObject(openFileObj)
  }  

  

  return (
      <div className="editor-container">
        <EditorLeft
          fileUpdatedData={fileCode}
          openFile={openFile}
        />
        <div className="editor-body">
            <EditorHeader
            addFileTabInHeader={addFileTabInHeader}
            openSelectedFile={openSelectedFile}
            />
            <AceEditor
              mode="javascript"
              theme="monokai" 
              name="blah2"
              width="100%"
              height="93vh"
              value={fileCode}
              onChange={(fileCode) => writingCode(fileCode)}
             // splits={2}
            />
        </div>
      </div>
  );
}; 

export default Editor