import React, { useState, useEffect } from "react";

interface FileObjLayout {
  type: string;
  fileData: string;
  name: string;
  focusStyle: boolean;
  activeStyle: boolean;
  key: string;
}

const Header: React.FC<{
  addFileTabInHeader: Function;
  openSelectedFile: Function;
}> = ({ addFileTabInHeader, openSelectedFile }, FileObjLayout) => {
  const [tabs, setTabs] = useState<FileObjLayout[]>([]);
  const [activeKey, setActiveKey] = useState("");

  const updateTabs = (fileObj: FileObjLayout) => {
    const index = tabs.findIndex((v: FileObjLayout) => v.key === fileObj.key);
    !(index >= 0) && tabs.push(fileObj);
    setTabs(tabs);
    setActiveKey(fileObj.key)
  };

  useEffect(() => {
    addFileTabInHeader(updateTabs);
  }, []);

  const remove_Tab = (key: string) => {
    const index = tabs.findIndex((v: FileObjLayout) => v.key === key);
    tabs.splice(index, 1);
    setTabs([...tabs]);
  };

  const activateTab = (v: FileObjLayout) => {
    openSelectedFile(v);
    setActiveKey(v.key)
    console.log("Active....", tabs);
  };

  return (
    <div className="editor-header">
      {tabs?.map((v, i) => (
        <div key={v.key} className={`editor-tab ${(activeKey === v.key) ? 'editor-tab-active' : ''}`} >
          <div onClick={() => activateTab(v)} className="name">
            <p className="tab-left">
              <img
                className="tab-icon"
                src={require("../../Assets/js-logo.png")}
              />
              {v.name}
            </p>
          </div>
          <div className="cancel">
            <strong className="cancel-icon" onClick={() => remove_Tab(v.key)}>
              x
            </strong>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Header;
