import { useState } from 'react';
import OpenAI from 'openai';
import { Storage } from "@plasmohq/storage"

interface VacancyData {
  title: string;
  salary: string;
  experience: string;
  employmentType: string;
  schedule: string;
  workHours: string;
  workFormat: string;
  companyName: string;
  companyLogo: string;
  companyLink: string;
  description: string;
  skills: string;
  publicationDate: string;
  location: string;
}

interface UseGenerateFeedbackReturn {
  generatedText: string;
  isGenerating: boolean;
  generateFeedback: () => void;
  vacancyData: VacancyData | null;
}

export const useGenerateFeedback = (onSuccess?: () => void): UseGenerateFeedbackReturn => {
  const [generatedText, setGeneratedText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [vacancyData, setVacancyData] = useState<VacancyData | null>(null);
  const storage = new Storage();

  const generateFeedback = async () => {
    setIsGenerating(true);
    try {
      const apiKey = await storage.get('apiKey');
      
      if (!apiKey) {
        setGeneratedText('Пожалуйста, добавьте API ключ в настройках');
        setIsGenerating(false);
        return;
      }

      const prompt = await storage.get(`prompt`)

      if (!prompt) {
        setGeneratedText('Пожалуйста, добавьте инструкции в настройках');
        setIsGenerating(false);
        return;
      }

      const resume = await storage.get(`resume`)

      if (!resume) {
        setGeneratedText('Пожалуйста, добавьте резюме в настройках');
        setIsGenerating(false);
        return;
      }


      const response = await chrome.runtime.sendMessage({
        action: "getPageElement"
      });
      console.log('Received vacancy data:', response);

      const client = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY || apiKey,
        dangerouslyAllowBrowser: true
      });

  
      console.log(response.output_text);

      if (response.success && response.data) {
        setVacancyData(response.data);
        // Формируем текст на основе полученных данных
        const aiData = await client.responses.create({
          model: 'gpt-4.1-mini',
          instructions: prompt,
          input: `Вакансия: ${JSON.stringify(response.data)}\n\nРезюме: ${resume}`,
        });
 
     
        setGeneratedText(aiData.output_text || 'Не удалось сгенерировать текст');
        onSuccess?.();
      } else {
        console.error('Failed to get vacancy data:', response.error);
        setGeneratedText('Не удалось получить данные о вакансии');
      }
    } catch (error) {
      console.error('Error getting vacancy data:', error);
      setGeneratedText('Произошла ошибка при получении данных');
    }
    setIsGenerating(false);
  };

  return {
    generatedText,
    isGenerating,
    generateFeedback,
    vacancyData
  };
};