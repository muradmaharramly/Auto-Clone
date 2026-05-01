import React, { useState } from 'react';
import { Send } from 'lucide-react';
import styles from './InputArea.module.scss';

const InputArea = ({ onSubmit, isLoading }) => {
  const [url, setUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (url.trim() && !isLoading) {
      onSubmit(url.trim());
      setUrl('');
    }
  };

  return (
    <form className={styles.inputForm} onSubmit={handleSubmit}>
      <input
        type="url"
        className={styles.inputField}
        placeholder="Bura YouTube linkini daxil edin..."
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        disabled={isLoading}
        required
      />
      <button 
        type="submit" 
        className={`${styles.submitButton} ${isLoading || !url.trim() ? styles.disabled : ''}`}
        disabled={isLoading || !url.trim()}
      >
        <Send size={20} />
      </button>
    </form>
  );
};

export default InputArea;
