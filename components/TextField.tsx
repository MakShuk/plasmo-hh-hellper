import React, { useState, useEffect } from 'react';
import type { ChangeEvent } from 'react';
import { componentStyles as styles } from '../styles/components';

interface TextFieldProps {
  isGenerating: boolean;
  text: string;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextField: React.FC<TextFieldProps> = ({ isGenerating, text, onChange }) => {
  // Create keyframes style for spinner
  useEffect(() => {
    const style = document.createElement('style')
    style.innerHTML = `
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const [isHovering, setIsHovering] = useState(false);

  return (
    <div
      style={{
        ...styles.textFieldContainer,
        ...(isHovering ? styles.textFieldContainerHover : {})
      }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div style={styles.textField}>
        {isGenerating ? (
          <div style={styles.spinnerContainer}>
            <div style={styles.spinner}></div>
          </div>
        ) : onChange ? (
          <textarea 
            style={{...styles.textContent, width: '100%', height: '150px'}}
            value={text} 
            onChange={onChange} 
            placeholder="Введите текст..."
          />
        ) : text ? (
          <p style={styles.textContent}>{text}</p>
        ) : (
          <div style={styles.placeholderContainer}>
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={styles.placeholderIcon}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
            </svg>
            [ Здесь появится отклик ]
          </div>
        )}
      </div>
    </div>
  );
};

export default TextField;