import React, { useState } from 'react';
import { FileText, Music, Image as ImageIcon, ChevronDown, ChevronUp, Copy } from 'lucide-react';
import { toast } from 'react-toastify';
import styles from './ResultCard.module.scss';


const ResultCard = ({ data }) => {

  const [openSection, setOpenSection] = useState('script'); // 'script', 'music', 'visuals'

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} kopyalandı!`);
  };





  return (
    <div className={styles.cardContainer}>
      <div className={styles.header}>
        <div className={styles.aiAvatar}>AI</div>
        <span className={styles.headerText}>Auto Clone Nəticəsi</span>
      </div>

      <div className={styles.content}>
        {/* Script Section */}
        <div className={styles.accordionItem}>
          <button className={styles.accordionHeader} onClick={() => toggleSection('script')}>
            <div className={styles.headerTitle}>
              <FileText size={18} />
              <span>Alternativ Ssenari</span>
            </div>
            {openSection === 'script' ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>

          {openSection === 'script' && (
            <div className={styles.accordionBody}>
              <p>{data.script || data.scenario}</p>
              <button
                className={styles.copyBtn}
                onClick={() => copyToClipboard(data.script || data.scenario, 'Ssenari')}
                title="Kopyala"
              >
                <Copy size={14} />
              </button>
            </div>
          )}
        </div>

        {/* Music Section */}
        <div className={styles.accordionItem}>
          <button className={styles.accordionHeader} onClick={() => toggleSection('music')}>
            <div className={styles.headerTitle}>
              <Music size={18} />
              <span>Musiqi Tövsiyəsi</span>
            </div>
            {openSection === 'music' ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>

          {openSection === 'music' && (
            <div className={styles.accordionBody}>
              <p>{data.music || data.music_suggestion}</p>
              <button
                className={styles.copyBtn}
                onClick={() => copyToClipboard(data.music || data.music_suggestion, 'Musiqi')}
                title="Kopyala"
              >
                <Copy size={14} />
              </button>
            </div>
          )}
        </div>

        {/* Visuals Section */}
        <div className={styles.accordionItem}>
          <button className={styles.accordionHeader} onClick={() => toggleSection('visuals')}>
            <div className={styles.headerTitle}>
              <ImageIcon size={18} />
              <span>Vizual Promptlar</span>
            </div>
            {openSection === 'visuals' ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>

          {openSection === 'visuals' && (
            <div className={styles.accordionBody}>
              {(data.visualPrompts || data.visual_prompts) && Array.isArray(data.visualPrompts || data.visual_prompts) ? (
                <ul className={styles.promptList}>
                  {(data.visualPrompts || data.visual_prompts).map((prompt, idx) => (
                    <li key={idx}>
                      <span className={styles.promptText}>{prompt}</span>
                      <button
                        className={styles.copyBtn}
                        onClick={() => copyToClipboard(prompt, 'Prompt')}
                        title="Kopyala"
                      >
                        <Copy size={14} />
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Vizual prompt tapılmadı.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultCard;
