import { useState, useEffect } from "react";
import { FaPlusCircle, FaTrash, FaShieldAlt } from "react-icons/fa";
import "./Addblocker.css";

const AAdBlocker = () => {
  const [enabled, setEnabled] = useState(false);
  const [customRules, setCustomRules] = useState([]);
  const [blockedCount, setBlockedCount] = useState(0);
  const [newRule, setNewRule] = useState("");

  useEffect(() => {
    if (typeof chrome !== "undefined" && chrome.storage) {
      chrome.storage.local.get(["enabled", "customRules", "blockedCount"], (data) => {
        setEnabled(data.enabled ?? false);
        setCustomRules(data.customRules ?? []);
        setBlockedCount(data.blockedCount ?? 0);
      });
    }
  }, []);

  useEffect(() => {
    if (typeof chrome !== "undefined" && chrome.runtime) {
      chrome.runtime.sendMessage({ action: "updateBlocking", enabled, customRules });
    }
  }, [enabled, customRules]);

  const toggleAdBlocker = () => {
    const newStatus = !enabled;
    setEnabled(newStatus);
    if (typeof chrome !== "undefined" && chrome.storage) {
      chrome.storage.local.set({ enabled: newStatus });
    }
  };

  const addRule = () => {
    if (newRule.trim() !== "") {
      const updatedRules = [...customRules, newRule.trim()];
      setCustomRules(updatedRules);
      if (typeof chrome !== "undefined" && chrome.storage) {
        chrome.storage.local.set({ customRules: updatedRules });
      }
      setNewRule("");
    }
  };

  const removeRule = (index) => {
    const updatedRules = customRules.filter((_, i) => i !== index);
    setCustomRules(updatedRules);
    if (typeof chrome !== "undefined" && chrome.storage) {
      chrome.storage.local.set({ customRules: updatedRules });
    }
  };

  return (
    <div className="ad-blocker-container">
      <h2 className="ad-blocker-header">
        <FaShieldAlt className="mr-2 text-yellow-400" /> Ad Blocker
      </h2>

      {/* Toggle Switch */}
      <div className="toggle-container">
        <span className="text-lg">Enable Ad Blocker</span>
        <label className="switch">
          <input type="checkbox" checked={enabled} onChange={toggleAdBlocker} />
          <span className="slider"></span>
        </label>
      </div>

      {/* Custom Rules Input */}
      <div className="input-container">
        <label className="block text-lg mb-2">Block Specific Domain</label>
        <input
          type="text"
          placeholder="Enter domain (e.g., ads.com)"
          value={newRule}
          onChange={(e) => setNewRule(e.target.value)}
        />
        <button className="add-button" onClick={addRule}>
          <FaPlusCircle className="mr-2" /> Add Rule
        </button>
      </div>

      {/* Custom Rules List */}
      <div className="blocked-list">
        <h3 className="text-lg font-semibold">Blocked Domains</h3>
        <ul>
          {customRules.length > 0 ? (
            customRules.map((rule, index) => (
              <li key={index}>
                <span>{rule}</span>
                <button className="remove-button" onClick={() => removeRule(index)}>
                  <FaTrash />
                </button>
              </li>
            ))
          ) : (
            <p className="text-gray-300 text-center">No custom rules added.</p>
          )}
        </ul>
      </div>

      {/* Blocked Ads Count */}
      <p className="blocked-counter">
        🔒 Blocked Ads: <span className="font-bold text-yellow-400">{blockedCount}</span>
      </p>
    </div>
  );
};

export default AAdBlocker;
