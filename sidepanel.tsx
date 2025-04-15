import "./style.css"
import React, { useState } from 'react';
import { componentStyles as styles } from './styles/components';
import Toast from './components/Toast';
import TextField from './components/TextField';
import { GenerateButton, CopyButton } from './components/Button';
import { useToast } from './hooks/useToast';
import { useCopyToClipboard } from './hooks/useCopyToClipboard';
import { useGenerateFeedback } from './hooks/useGenerateFeedback';

const FeedbackGenerator = () => {
  const {
    showToast,
    toastMessage,
    showToastNotification,
    hideToast
  } = useToast();

  const {
    generatedText,
    isGenerating,
    generateFeedback
  } = useGenerateFeedback(() => {
    showToastNotification('Отклик сгенерирован!');
  });

  const {
    isCopied,
    copyToClipboard
  } = useCopyToClipboard(
    () => showToastNotification('Скопировано в буфер обмена!'),
    () => showToastNotification('Ошибка при копировании')
  );

  const [isHovering, setIsHovering] = useState({
    generate: false,
    copy: false
  });

  const handleCopy = () => {
    copyToClipboard(generatedText);
  };

  return (
    <div style={styles.container}>
      <div style={styles.wrapper}>
        <h1 style={styles.heading}>Генератор откликов</h1>

        <Toast
          message={toastMessage}
          visible={showToast}
          onHide={hideToast}
        />

        <GenerateButton
          onClick={generateFeedback}
          isGenerating={isGenerating}
          isHovering={isHovering.generate}
          onMouseEnter={() => setIsHovering({ ...isHovering, generate: true })}
          onMouseLeave={() => setIsHovering({ ...isHovering, generate: false })}
        />

        <TextField
          isGenerating={isGenerating}
          text={generatedText}
        />

        <CopyButton
          onClick={handleCopy}
          disabled={!generatedText || isGenerating}
          isCopied={isCopied}
          isHovering={isHovering.copy}
          onMouseEnter={() => setIsHovering({ ...isHovering, copy: true })}
          onMouseLeave={() => setIsHovering({ ...isHovering, copy: false })}
        />
      </div>
    </div>
  );
};

export default FeedbackGenerator;