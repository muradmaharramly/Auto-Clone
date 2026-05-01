import React from 'react';
import ChatInterface from './components/ChatInterface/ChatInterface';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles/global.scss';
import styles from './App.module.scss';

function App() {
  return (
    <div className={styles.appContainer}>
      <header className={styles.header}>
        <h1>Auto Clone</h1>
        <p>AI Video Script Generator</p>
      </header>
      
      <main className={styles.main}>
        <ChatInterface />
      </main>

      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;
