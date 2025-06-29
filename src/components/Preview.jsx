const Preview = ({ sections, theme }) => {
    const themeColors = {
        blue: { primary: '#2563eb', light: '#eff6ff' },
        green: { primary: '#16a34a', light: '#f0fdf4' },
        purple: { primary: '#9333ea', light: '#faf5ff' }
    };

    const currentTheme = themeColors[theme] || themeColors.blue;

    const renderSection = (section) => {
        switch (section.type) {
            case 'personal':
                return (
                    <div className="preview-section personal" key={section.id}>
                        {section.data.name && (
                            <h1 className="name" style={{ color: currentTheme.primary }}>
                                {section.data.name}
                            </h1>
                        )}
                        {section.data.position && (
                            <h2 className="position">{section.data.position}</h2>
                        )}
                        <div className="contact-info">
                            {section.data.email && <span>{section.data.email}</span>}
                            {section.data.phone && <span>{section.data.phone}</span>}
                        </div>
                    </div>
                );

            case 'about':
                if (!section.data.text) return null;
                return (
                    <div className="preview-section" key={section.id}>
                        <h3 style={{ color: currentTheme.primary }}>О себе</h3>
                        <p>{section.data.text}</p>
                    </div>
                );

            case 'experience':
                if (!section.data.job && !section.data.company) return null;
                return (
                    <div className="preview-section" key={section.id}>
                        <h3 style={{ color: currentTheme.primary }}>Опыт работы</h3>
                        <div className="experience-item">
                            <div className="job-header">
                                {section.data.job && <h4>{section.data.job}</h4>}
                                {section.data.company && <span className="company">{section.data.company}</span>}
                            </div>
                            {section.data.period && <div className="period">{section.data.period}</div>}
                            {section.data.description && <p className="description">{section.data.description}</p>}
                        </div>
                    </div>
                );

            case 'education':
                if (!section.data.school && !section.data.degree) return null;
                return (
                    <div className="preview-section" key={section.id}>
                        <h3 style={{ color: currentTheme.primary }}>Образование</h3>
                        <div className="education-item">
                            {section.data.school && <h4>{section.data.school}</h4>}
                            {section.data.degree && <span className="degree">{section.data.degree}</span>}
                            {section.data.year && <span className="year">{section.data.year}</span>}
                        </div>
                    </div>
                );

            case 'skills':
                if (!section.data.list) return null;
                const skillsArray = section.data.list.split(',').map(skill => skill.trim()).filter(skill => skill);
                if (skillsArray.length === 0) return null;

                return (
                    <div className="preview-section" key={section.id}>
                        <h3 style={{ color: currentTheme.primary }}>Навыки</h3>
                        <div className="skills-list">
                            {skillsArray.map((skill, index) => (
                                <span
                                    key={index}
                                    className="skill-tag"
                                    style={{ backgroundColor: currentTheme.light }}
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="preview">
            <div className="preview-header">
                <h2>Предварительный просмотр</h2>
            </div>
            <div className="resume-preview" style={{ borderColor: currentTheme.primary }}>
                {sections.length === 0 ? (
                    <div className="empty-preview">
                        <p>Добавьте секции, чтобы увидеть превью резюме</p>
                    </div>
                ) : (
                    sections.map(section => renderSection(section))
                )}
            </div>
        </div>
    );
};

export default Preview;