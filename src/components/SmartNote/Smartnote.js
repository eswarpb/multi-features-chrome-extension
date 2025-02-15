import { useState, useEffect } from "react";
import './SmartNote.css';

const Notes = () => {
  const [localNotes, setLocalNotes] = useState([]); // Store multiple local notes per page
  const [newLocalNote, setNewLocalNote] = useState(""); // Input for new local notes
  const [globalNotes, setGlobalNotes] = useState([]);
  const [newGlobalNote, setNewGlobalNote] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    if (typeof chrome !== "undefined" && chrome.storage) {
      // Load global notes
      chrome.storage.local.get(["globalNotes"], (data) => {
        setGlobalNotes(data.globalNotes ?? []);
      });

      // Load local notes for the specific page
      chrome.storage.local.get([window.location.href], (data) => {
        setLocalNotes(data[window.location.href] ?? []);
      });
    }
  }, []);

  const saveLocalNote = () => {
    if (newLocalNote.trim() !== "") {
      const updatedLocalNotes = [...localNotes, newLocalNote.trim()];
      setLocalNotes(updatedLocalNotes);
      if (typeof chrome !== "undefined" && chrome.storage) {
        chrome.storage.local.set({ [window.location.href]: updatedLocalNotes });
      }
      setNewLocalNote("");
    }
  };

  const saveGlobalNote = () => {
    if (newGlobalNote.trim() !== "") {
      const updatedGlobalNotes = [...globalNotes, newGlobalNote.trim()];
      setGlobalNotes(updatedGlobalNotes);
      if (typeof chrome !== "undefined" && chrome.storage) {
        chrome.storage.local.set({ globalNotes: updatedGlobalNotes });
      }
      setNewGlobalNote("");
    }
  };

  const deleteNote = (index, type) => {
    if (type === "local") {
      const updatedNotes = localNotes.filter((_, i) => i !== index);
      setLocalNotes(updatedNotes);
      if (typeof chrome !== "undefined" && chrome.storage) {
        chrome.storage.local.set({ [window.location.href]: updatedNotes });
      }
    } else {
      const updatedNotes = globalNotes.filter((_, i) => i !== index);
      setGlobalNotes(updatedNotes);
      if (typeof chrome !== "undefined" && chrome.storage) {
        chrome.storage.local.set({ globalNotes: updatedNotes });
      }
    }
  };

  const startEditing = (index, type) => {
    setEditingIndex({ index, type });
    setEditText(type === "local" ? localNotes[index] : globalNotes[index]);
  };

  const saveEditedNote = () => {
    if (editingIndex !== null) {
      if (editingIndex.type === "local") {
        const updatedNotes = [...localNotes];
        updatedNotes[editingIndex.index] = editText;
        setLocalNotes(updatedNotes);
        if (typeof chrome !== "undefined" && chrome.storage) {
          chrome.storage.local.set({ [window.location.href]: updatedNotes });
        }
      } else {
        const updatedNotes = [...globalNotes];
        updatedNotes[editingIndex.index] = editText;
        setGlobalNotes(updatedNotes);
        if (typeof chrome !== "undefined" && chrome.storage) {
          chrome.storage.local.set({ globalNotes: updatedNotes });
        }
      }
      setEditingIndex(null);
    }
  };

  return (
    <div className="notes-container">
      <h2 className="notes-header">📝 Smart Notes</h2>

      {/* Local Note Input */}
      <textarea
        className="note-input"
        placeholder="Take a note for this page..."
        value={newLocalNote}
        onChange={(e) => setNewLocalNote(e.target.value)}
      />
      <button className="save-button" onClick={saveLocalNote}>
        Save Local Note
      </button>

      {/* Global Note Input */}
      <textarea
        className="note-input"
        placeholder="Take a global note..."
        value={newGlobalNote}
        onChange={(e) => setNewGlobalNote(e.target.value)}
      />
      <button className="save-button" onClick={saveGlobalNote}>
        Save Global Note
      </button>

      {/* Local Notes List */}
      <div className="notes-list">
        <h3>📍 Local Notes (Page-Specific)</h3>
        <ul>
          {localNotes.length > 0 ? (
            localNotes.map((note, index) => (
              <li key={index} className="note-item">
                {editingIndex?.index === index && editingIndex?.type === "local" ? (
                  <input
                    type="text"
                    className="edit-input"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                ) : (
                  <span>{note}</span>
                )}
                <div className="note-actions">
                  {editingIndex?.index === index && editingIndex?.type === "local" ? (
                    <button className="save-edit-button" onClick={saveEditedNote}>💾</button>
                  ) : (
                    <button className="edit-button" onClick={() => startEditing(index, "local")}>✏️</button>
                  )}
                  <button className="delete-button" onClick={() => deleteNote(index, "local")}>❌</button>
                </div>
              </li>
            ))
          ) : (
            <p>No local notes yet.</p>
          )}
        </ul>
      </div>

      {/* Global Notes List */}
      <div className="notes-list">
        <h3>🌎 Global Notes</h3>
        <ul>
          {globalNotes.length > 0 ? (
            globalNotes.map((note, index) => (
              <li key={index} className="note-item">
                {editingIndex?.index === index && editingIndex?.type === "global" ? (
                  <input
                    type="text"
                    className="edit-input"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                ) : (
                  <span>{note}</span>
                )}
                <div className="note-actions">
                  {editingIndex?.index === index && editingIndex?.type === "global" ? (
                    <button className="save-edit-button" onClick={saveEditedNote}>💾</button>
                  ) : (
                    <button className="edit-button" onClick={() => startEditing(index, "global")}>✏️</button>
                  )}
                  <button className="delete-button" onClick={() => deleteNote(index, "global")}>❌</button>
                </div>
              </li>
            ))
          ) : (
            <p>No global notes yet.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Notes;
