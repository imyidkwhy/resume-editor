import React, { useState } from 'react';
import Editor from './components/Editor';
import Preview from './components/Preview';
import './App.css';

function App() {
  const [sections, setSections] = useState([]);
  const [selectedTheme, setSelectedTheme] = useState('blue');

  return (
    <div className="app">
      <h1 className="app-title">Редактор резюме</h1>
      <div className="app-container">
        <div className="editor-panel">
          <Editor
            sections={sections}
            setSections={setSections}
            theme={selectedTheme}
            setTheme={setSelectedTheme}
          />
        </div>
        <div className="preview-panel">
          <Preview
            sections={sections}
            theme={selectedTheme}
          />
        </div>
      </div>
    </div>
  );
}

export default App;