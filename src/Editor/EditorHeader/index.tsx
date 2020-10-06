import React,{useState} from 'react';

export default () => {
    const [tabs,setTabs] = useState([
        {value:'Index.js'},
        {value:'server.js'},
        {value:'Index.js'},
        {value:'server.js'},
        {value:'server.js'},
        {value:'server.js'},
        {value:'server.js'},
        {value:'server.js'},
        {value:'server.js'},
    ])

    return(
        <div className="editor-header" >
                    {tabs?.map( (v,i) =>
                     ( 
                    <div key={i} className="editor-tab">
                      <p className="tab-left" >
                       <img className="tab-icon"  src={require('../../Assets/js-logo.png')} /> 
                       {v.value}
                      </p>
                      <strong className="cancel-icon" >x</strong>
                     </div>
                   ) 
                     )}
                   
        </div>
    )
}