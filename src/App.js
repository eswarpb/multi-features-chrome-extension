import { useState } from "react";
import "./App.css";
import AAdBlocker from "./components/Addblocker/Addblocker";
import ProductivityTracker from "./components/ProductivityTracker/Productivitytracker";
import Notes from "./components/SmartNote/Smartnote";
import TabManager from "./components/TabManager/Tabmanager";

function App() {
  const [activeComponent, setActiveComponent] = useState(null);

  return (
    <div className="app-container">
      {/* Navigation Buttons */}
      <div >Multi-Features chrome extension</div>
      <div className="button-container">
        <button onClick={() => setActiveComponent("adblocker")}>🛡️ Ad Blocker</button>
        <button onClick={() => setActiveComponent("tracker")}>📊 Productivity</button>
        <button onClick={() => setActiveComponent("notes")}>📝 Notes</button>
        <button onClick={() => setActiveComponent("tabs")}>🗂 Tabs</button>
      </div>

      {/* Render Selected Component */}
      <div className="content-container">
        {activeComponent === "adblocker" && <AAdBlocker />}
        {activeComponent === "tracker" && <ProductivityTracker />}
        {activeComponent === "notes" && <Notes />}
        {activeComponent === "tabs" && <TabManager />}
      </div>
    </div>
  );
}

export default App;
