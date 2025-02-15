import { useEffect, useState } from "react";
import { FaGlobe, FaTimes, FaSave, FaUndo } from "react-icons/fa";
import './Tabmanager.css';

const categorizeTabs = (tabs) => {
  const categories = {
    "Social Media": ["facebook.com", "twitter.com", "instagram.com", "linkedin.com"],
    "Work": ["gmail.com", "outlook.com", "notion.so", "slack.com"],
    "Entertainment": ["youtube.com", "netflix.com", "spotify.com"],
    "News": ["cnn.com", "bbc.com", "nytimes.com"],
    "Others": [],
  };

  const categorizedTabs = {};
  tabs.forEach((tab) => {
    let category = "Others";
    Object.keys(categories).forEach((key) => {
      if (categories[key].some((domain) => tab.url.includes(domain))) {
        category = key;
      }
    });
    if (!categorizedTabs[category]) categorizedTabs[category] = [];
    categorizedTabs[category].push(tab);
  });

  return categorizedTabs;
};

const TabManager = () => {
  const [tabs, setTabs] = useState([]);
  const [categorizedTabs, setCategorizedTabs] = useState({});
  const [savedSessions, setSavedSessions] = useState([]);

  useEffect(() => {
    if (typeof chrome !== "undefined" && chrome.tabs) {
      chrome.tabs.query({}, (tabList) => {
        setTabs(tabList);
        setCategorizedTabs(categorizeTabs(tabList));
      });
    }
  }, []);

  const closeTab = (tabId) => {
    if (typeof chrome !== "undefined" && chrome.tabs) {
      chrome.tabs.remove(tabId);
    }
    setTabs(tabs.filter((tab) => tab.id !== tabId));
  };

  const saveSession = () => {
    if (tabs.length > 0) {
      const session = tabs.map((tab) => ({ url: tab.url, title: tab.title }));
      setSavedSessions([...savedSessions, session]);
      if (typeof chrome !== "undefined" && chrome.storage) {
        chrome.storage.local.set({ savedSessions: [...savedSessions, session] });
      }
    }
  };

  const restoreSession = () => {
    if (savedSessions.length > 0) {
      const session = savedSessions[savedSessions.length - 1];
      session.forEach((tab) => {
        if (typeof chrome !== "undefined" && chrome.tabs) {
          chrome.tabs.create({ url: tab.url });
        }
      });
    }
  };

  return (
    <div className="tab-manager-container">
      <h2 className="tab-header">🗂 Tab Manager</h2>

      {/* Categorized Tabs */}
      {Object.keys(categorizedTabs).map((category) => (
        <div key={category} className="tab-category">
          <h3>{category}</h3>
          <ul className="tab-list">
            {categorizedTabs[category].map((tab) => (
              <li key={tab.id} className="tab-item">
                <div className="flex items-center">
                  {tab.favIconUrl ? (
                    <img src={tab.favIconUrl} alt="Favicon" className="tab-icon" />
                  ) : (
                    <FaGlobe className="tab-icon text-gray-400" />
                  )}
                  <span className="text-sm truncate w-48">{tab.title}</span>
                </div>
                <button onClick={() => closeTab(tab.id)} className="close-button">
                  <FaTimes className="tab-icon" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}

      {/* Save & Restore Session */}
      <div className="session-buttons">
        <button className="save-session" onClick={saveSession}>
          <FaSave className="tab-icon" /> Save Session
        </button>
        <button className="restore-session" onClick={restoreSession}>
          <FaUndo className="tab-icon" /> Restore Session
        </button>
      </div>
    </div>
  );
};

export default TabManager;
