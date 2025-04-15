import "./style.css"
import React, { useState } from 'react';
import { Storage } from "@plasmohq/storage"
import { componentStyles as styles } from './styles/components';
import Toast from './components/Toast';
import TextField from './components/TextField';
import { useToast } from './hooks/useToast';
import Button from './components/Button';

interface SaveButtonProps {
  onClick: () => void;
  isSaving: boolean;
}

interface StorageData {
  prompt?: string;
  resume?: string;
  apiKey?: string;
}

const storage = new Storage();

const SaveButton: React.FC<SaveButtonProps> = ({ onClick, isSaving }) => (
  <Button
    onClick={onClick}
    disabled={isSaving}
    style={
      isSaving
        ? { ...styles.saveButton, ...styles.saveButtonDisabled }
        : styles.saveButton
    }
  >
    {isSaving ? 'Сохранение...' : 'Сохранить'}
  </Button>
);

const Options = () => {
  const [prompt, setPrompt] = useState('');
  const [resume, setResume] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const {
    showToast,
    toastMessage,
    showToastNotification,
    hideToast
  } = useToast();

  const handleSave = async (field: string, value: string) => {
    try {
      setIsSaving(true);
      await storage.set(field, value);
      showToastNotification('Настройки сохранены!');
    } catch (error) {
      showToastNotification('Ошибка при сохранении настроек!');
      console.log('Error saving settings:', error);
    } finally {
      setIsSaving(false);
    }
  };

  React.useEffect(() => {
    const loadSettings = async () => {
      try {
        setIsLoading(true);
        const [promptValue, resumeValue, apiKeyValue] = await Promise.all([
          storage.get('prompt'),
          storage.get('resume'),
          storage.get('apiKey')
        ]);
        setPrompt(promptValue || '');
        setResume(resumeValue || '');
        setApiKey(apiKeyValue || '');
      } catch (error) {
        console.log('Error loading settings:', error);
        showToastNotification('Ошибка при загрузке настроек!');
      } finally {
        setIsLoading(false);
      }
    };
    loadSettings();
  }, []);

  const renderSection = (title: string, value: string, setter: (value: string) => void, field: string) => (
    <div style={styles.section}>
      <h3 style={styles.sectionTitle}>{title}</h3>
      <TextField
        isGenerating={false}
        text={value}
        onChange={(e) => setter(e.target.value)}
      />
      <SaveButton onClick={() => handleSave(field, value)} isSaving={isSaving} />
    </div>
  );

  return (
    <div style={styles.container}>
      <div style={styles.wrapper}>
        <h1 style={styles.heading}>Настройки</h1>

        <Toast
          message={toastMessage}
          visible={showToast}
          onHide={hideToast}
        />

        {renderSection('Инструкции', prompt, setPrompt, 'prompt')}
        {renderSection('Резюме', resume, setResume, 'resume')}
        {renderSection('API Ключ', apiKey, setApiKey, 'apiKey')}
      </div>
    </div>
  );
};

export default Options;