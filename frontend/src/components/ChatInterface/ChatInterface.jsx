import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import InputArea from '../InputArea/InputArea';
import ResultCard from '../ResultCard/ResultCard';
import styles from './ChatInterface.module.scss';

const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (url) => {
    // Add user message
    setMessages((prev) => [...prev, { type: 'user', content: url }]);
    setIsLoading(true);

    try {
      // Change port if backend runs on different port
      const response = await axios.post('http://localhost:5000/api/generate', { youtubeUrl: url });
      
      // Add ai response
      setMessages((prev) => [...prev, { type: 'ai', content: response.data }]);
      toast.success('Ssenari uğurla yaradıldı!');
    } catch (error) {
      const errorData = error.response?.data;
      const errorMessage = errorData?.details || errorData?.error || 'Xəta baş verdi. Zəhmət olmasa təkrar cəhd edin.';
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.chatContainer}>
      <div className={styles.messagesArea}>
        {messages.length === 0 ? (
          <div className={styles.emptyState}>
            <h2>Xoş gəlmisiniz!</h2>
            <p>Başlamaq üçün aşağıdan bir YouTube linki daxil edin.</p>
          </div>
        ) : (
          messages.map((msg, index) => (
            <div key={index} className={`${styles.messageWrapper} ${msg.type === 'user' ? styles.userWrapper : styles.aiWrapper}`}>
              {msg.type === 'user' ? (
                <div className={styles.userBubble}>{msg.content}</div>
              ) : (
                <ResultCard data={msg.content} />
              )}
            </div>
          ))
        )}
        {isLoading && (
          <div className={`${styles.messageWrapper} ${styles.aiWrapper}`}>
            <div className={styles.loadingBubble}>
              <span></span><span></span><span></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <div className={styles.inputAreaWrapper}>
        <InputArea onSubmit={handleSubmit} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default ChatInterface;
