import { Box } from "@mui/material";
import React from "react";

const BrowserTab = ({ title, onClose }) => {
  return (
    <div style={{ display: "flex", alignItems: "center", margin: "0 10px" }}>
      <p style={{ marginRight: "10px" }}>{title}</p>
      <button onClick={onClose}>x</button>
    </div>
  );
};

const BrowserTabs = () => {
  const [tabs, setTabs] = React.useState([
    { title: "tab1", id: 1 },
    { title: "tab2", id: 2 },
  ]);

  const addTab = () => {
    setTabs([...tabs, { title: `New Tab ${tabs.length + 1}`, id: Date.now() }]);
  };

  const closeTab = (id) => {
    setTabs(tabs.filter((tab) => tab.id !== id));
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <div style={{ display: "flex" }}>
        {tabs.map((tab) => (
          <BrowserTab
            key={tab.id}
            title={tab.title}
            onClose={() => closeTab(tab.id)}
          />
        ))}
        <button onClick={addTab}>+</button>
      </div>
      <div style={{ flexGrow: 1 }}>
        <Box sx={{ height: "100%", width: "100%", backgroundColor: "red" }}>
          djfkdsjlfkdsjfldskjfdlkfsdjlfksdfsdlkfjsdlfkjdlkfjsdlf
          dlkfjsdlkfjdslfsdkfjdslfkjds fkjsdlfkjsdlfkjsdf sdfsdklfjdslkfds
          fkjsdlfkjsdlfkjsdfdsfjdsflk
        </Box>
      </div>
    </div>
  );
};

export default BrowserTabs;
