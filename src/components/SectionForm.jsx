import { useState } from 'react';
const SectionForm = ({ section, onUpdate, onDelete, onMove, index }) => {
    const [isExpanded, setIsExpanded] = useState(true);
    const [draggedOver, setDraggedOver] = useState(false);

    const handleInputChange = (field, value) => {
        const newData = { ...section.data, [field]: value };
        onUpdate(section.id, newData);
    };

    const handleDragStart = (e) => {
        e.dataTransfer.setData('text/plain', index);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setDraggedOver(true);
    };

    const handleDragLeave = () => {
        setDraggedOver(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const fromIndex = parseInt(e.dataTransfer.getData('text/plain'));
        if (fromIndex !== index) {
            onMove(fromIndex, index);
        }
        setDraggedOver(false);
    };

    const renderFields = () => {
        switch (section.type) {
            case 'personal':
                return (
                    <div className="form-fields">
                        <input
                            type="text"
                            placeholder="ФИО"
                            value={section.data.name || ''}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Должность"
                            value={section.data.position || ''}
                            onChange={(e) => handleInputChange('position', e.target.value)}
                        />
                        <input
                            type="email"
                            placeholder="Почта"
                            value={section.data.email || ''}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                        />
                        <input
                            type="tel"
                            placeholder="Телефон"
                            value={section.data.phone || ''}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                        />
                    </div>
                );

            case 'experience':
                return (
                    <div className="form-fields">
                        <input
                            type="text"
                            placeholder="Должность"
                            value={section.data.job || ''}
                            onChange={(e) => handleInputChange('job', e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Компания"
                            value={section.data.company || ''}
                            onChange={(e) => handleInputChange('company', e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Период Работы"
                            value={section.data.period || ''}
                            onChange={(e) => handleInputChange('period', e.target.value)}
                        />
                        <textarea
                            placeholder="Описание обязанностей"
                            value={section.data.description || ''}
                            onChange={(e) => handleInputChange('description', e.target.value)}
                            rows="3"
                        />
                    </div>
                );

            case 'education':
                return (
                    <div className="form-fields">
                        <input
                            type="text"
                            placeholder="Учебное заведение"
                            value={section.data.school || ''}
                            onChange={(e) => handleInputChange('school', e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Специальность"
                            value={section.data.degree || ''}
                            onChange={(e) => handleInputChange('degree', e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Год окончания"
                            value={section.data.year || ''}
                            onChange={(e) => handleInputChange('year', e.target.value)}
                        />
                    </div>
                );

            case 'skills':
                return (
                    <div className="form-fields">
                        <textarea
                            placeholder="Навыки через запятую (например: играю на губной гармошке, дую в рог и так далее)"
                            value={section.data.list || ''}
                            onChange={(e) => handleInputChange('list', e.target.value)}
                            rows="3"
                        />
                    </div>
                );

            case 'about':
                return (
                    <div className="form-fields">
                        <textarea
                            placeholder="Расскажите о себе"
                            value={section.data.text || ''}
                            onChange={(e) => handleInputChange('text', e.target.value)}
                            rows="4"
                        />
                    </div>
                );
        }
    };

    const getSectionTitle = () => {
        const titles = {
            personal: 'Личная информация',
            experience: 'Опыт работы',
            education: 'Образование',
            skills: 'Навыки',
            about: 'О себе'
        };
        return titles[section.type] || 'Секция';
    };

    return (
        <div
            className={`section-form ${draggedOver ? 'drag-over' : ''}`}
            draggable
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            <div className="section-header">
                <div className="section-title">
                    <span className="drag-handle">⋮⋮</span>
                    <h3>{getSectionTitle()}</h3>
                    - </div>
                <div className="section-controls">
                    <button
                        className="btn-icon"
                        onClick={() => setIsExpanded(!isExpanded)}
                    >
                        {isExpanded ? '−' : '+'}
                    </button>
                    <button
                        className="btn-icon delete"
                        onClick={() => onDelete(section.id)}
                    >
                        ×
                    </button>
                </div>
            </div>

            {isExpanded && (
                <div className="section-content">
                    {renderFields()}
                </div>
            )}
        </div>
    );
};

export default SectionForm;