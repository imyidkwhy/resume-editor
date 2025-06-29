import React, { useState } from 'react';
import SectionForm from './SectionForm';

const Editor = ({ sections, setSections, theme, setTheme }) => {
  const [showAddMenu, setShowAddMenu] = useState(false);

  const sectionTypes = [
    { id: 'personal', name: 'Личная информация' },
    { id: 'experience', name: 'Опыт работы' },
    { id: 'education', name: 'Образование' },
    { id: 'skills', name: 'Навыки' },
    { id: 'about', name: 'О себе' }
  ];

  const themes = [
    { id: 'blue', name: 'Синий', color: '#2563eb' },
    { id: 'green', name: 'Зеленый', color: '#16a34a' },
    { id: 'purple', name: 'Фиолетовый', color: '#9333ea' }
  ];

  const addSection = (type) => {
    const newSection = {
      id: Date.now().toString(),
      type: type,
      data: {}
    };
    setSections([...sections, newSection]);
    setShowAddMenu(false);
  };

  const deleteSection = (id) => {
    setSections(sections.filter(section => section.id !== id));
  };

  const updateSection = (id, newData) => {
    setSections(sections.map(section =>
      section.id === id ? { ...section, data: newData } : section
    ));
  };

  const moveSection = (fromIndex, toIndex) => {
    const newSections = [...sections];
    const item = newSections.splice(fromIndex, 1)[0];
    newSections.splice(toIndex, 0, item);
    setSections(newSections);
  };

  const downloadPDF = () => {
    // Простая имитация скачивания
    alert('Идет скачиваение...');
  };

  return (
    <div className="editor">
      <div className="editor-header">
        <div className="add-section">
          <button
            className="btn btn-primary"
            onClick={() => setShowAddMenu(!showAddMenu)}
          >
            + Добавить секцию
          </button>
          {showAddMenu && (
            <div className="dropdown">
              {sectionTypes.map(type => (
                <button
                  key={type.id}
                  className="dropdown-item"
                  onClick={() => addSection(type.id)}
                >
                  {type.name}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="theme-selector">
          <label>Тема:</label>
          <select value={theme} onChange={(e) => setTheme(e.target.value)}>
            {themes.map(t => (
              <option key={t.id} value={t.id}>{t.name}</option>
            ))}
          </select>
        </div>

        <button className="btn btn-secondary" onClick={downloadPDF}>
          Скачать PDF
        </button>
      </div>

      <div className="sections-list">
        {sections.map((section, index) => (
          <SectionForm
            key={section.id}
            section={section}
            onUpdate={updateSection}
            onDelete={deleteSection}
            onMove={moveSection}
            index={index}
          />
        ))}

        {sections.length === 0 && (
          <div className="empty-state">
            <p>Добавьте первую секцию для начала работы</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Editor;