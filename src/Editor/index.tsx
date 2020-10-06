import React from "react";
import { Button, FormControl, Col, Row, Container} from "react-bootstrap";
import AceEditor from 'react-ace';
import EditorHeader from './EditorHeader';
import EditorLeft from './EditorLeft';

export default () => {
   
  return (
      <div className="editor-container" >
        <EditorLeft/>
        <div className="editor-body">
            <EditorHeader/>
            <AceEditor
              mode="javascript"
              theme="monokai" 
              width="100%"
              height="93vh"
             // splits={2}
            />
        </div>
      </div>
  );
}; 
