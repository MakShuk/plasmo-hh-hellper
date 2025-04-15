export { }

console.log('Content script loading...');

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

// Хелперы для получения данных
function getText(selector: string): string {
  const element = document.querySelector(selector);
  return element ? element.textContent?.trim() || 'Не найдено' : 'Не найдено';
}

function getTextWithoutPrefix(selector: string, prefixRegex: RegExp): string {
  const element = document.querySelector(selector);
  return element
    ? element.textContent?.replace(prefixRegex, '').replace(/<!-- -->/g, '').replace(/\s+/g, ' ').trim() || 'Не найдено'
    : 'Не найдено';
}

function getAttribute(selector: string, attribute: string): string {
  const element = document.querySelector(selector);
  return element?.getAttribute(attribute) || 'Не найдено';
}

function getAllText(selector: string, joinSeparator = ', '): string {
  const elements = document.querySelectorAll(selector);
  return elements.length > 0
    ? Array.from(elements).map(el => el.textContent?.trim() || '').join(joinSeparator)
    : 'Не найдено';
}

// Функция получения данных о вакансии
function getVacancyData(): VacancyData {
  const vacancyData: VacancyData = {
    title: getText('h1[data-qa="vacancy-title"] span'),
    salary: (() => {
      const element = document.querySelector('div[data-qa="vacancy-salary"] span[data-qa="vacancy-salary-compensation-type-gross"]');
      return element
        ? element.textContent?.replace(/<!-- -->/g, '').replace(/\s+/g, ' ').trim() || 'Не найдено'
        : 'Не найдено';
    })(),
    experience: getText('p[data-qa="work-experience-text"] span[data-qa="vacancy-experience"]'),
    employmentType: (() => {
      let employment = getAllText('div[data-qa="common-employment-text"] span.text--xmNTy6IsSzcA0FG8');
      const tempEmployment = document.querySelector('.field-tip--vL1l66zWVxw49sc5');
      if (tempEmployment?.textContent?.includes('Возможно временное оформление')) {
        employment = employment !== 'Не найдено'
          ? `${employment}, Возможно временное оформление`
          : 'Возможно временное оформление';
      }
      return employment;
    })(),
    schedule: getTextWithoutPrefix('p[data-qa="work-schedule-by-days-text"]', /График:\s*/i),
    workHours: getTextWithoutPrefix('div[data-qa="working-hours-text"] span.text--xmNTy6IsSzcA0FG8', /Рабочие часы:\s*/i),
    workFormat: getTextWithoutPrefix('p[data-qa="work-formats-text"]', /Формат работы:\s*/i),
    companyName: getText('span.vacancy-company-name span > span'),
    companyLogo: (() => {
      let logo = getAttribute('img.magritte-avatar-image___05p9Z_5-1-7', 'src');
      if (logo && !logo.startsWith('http')) {
        logo = window.location.origin + logo;
      }
      return logo;
    })(),
    companyLink: getAttribute('a[data-qa="vacancy-company-name"]', 'href'),
    description: getText('div[data-qa="vacancy-description"]'),
    skills: getAllText('li[data-qa="skills-element"] div.magritte-tag__label___YHV-o_3-1-11'),
    publicationDate: 'Не найдено',
    location: 'Не найдено'
  };

  // Обработка даты публикации и локации
  const timeElement = document.querySelector('p.vacancy-creation-time-redesigned');
  if (timeElement) {
    const timeText = timeElement.textContent?.trim() || '';
    const dateMatch = timeText.match(/(\d+\s+[а-яА-Я]+\s+\d+)/);
    vacancyData.publicationDate = dateMatch ? dateMatch[1] : 'Не найдено';

    const locationNode = timeElement.childNodes[timeElement.childNodes.length - 1];
    if (locationNode && locationNode.nodeType === Node.TEXT_NODE && locationNode.textContent?.trim()) {
      vacancyData.location = locationNode.textContent.trim();
    } else {
      const locationMatch = timeText.match(/в\s+([а-яА-ЯёЁ\s-]+)$/i);
      vacancyData.location = locationMatch ? locationMatch[1].trim() : 'Не найдено';
    }
  }

  return vacancyData;
}

// Слушатель сообщений от расширения
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('Content script received message:', message);

  if (message.action === 'getPageElement') {
    try {
      const vacancyData = getVacancyData();
      sendResponse({
        success: true,
        data: vacancyData
      });
    } catch (error) {
      console.log('Error getting vacancy data:', error);
      sendResponse({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
    return true;
  }
});

// Промисифицированная версия chrome.runtime.sendMessage
function sendMessage(message: any): Promise<any> {
  return new Promise((resolve, reject) => {
    try {
      chrome.runtime.sendMessage(message, (response) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve(response);
        }
      });
    } catch (error) {
      reject(error);
    }
  });
}

// Объявления глобальных переменных
let connection: chrome.runtime.Port | null = null;
let observerInstance: MutationObserver | null = null;

function handleContextInvalidation() {
  console.log('Handling extension context invalidation...');
  
  // Очищаем все подключения и слушатели
  if (connection) {
    connection.disconnect();
    connection = null;
  }
  
  if (observerInstance) {
    observerInstance.disconnect();
    observerInstance = null;
  }
  
  // Удаляем кнопку
  const button = document.getElementById('open-sidepanel-button');
  button?.remove();
  
  // Удаляем все слушатели событий
  window.removeEventListener('popstate', () => {});
  window.removeEventListener('unhandledrejection', () => {});
  
  // Перезагружаем страницу с задержкой
  setTimeout(() => {
    window.location.reload();
  }, 1000);
}

// Функция для открытия боковой панели
async function openSidePanel() {
  console.log('Attempting to open side panel...');
  
  try {
    await sendMessage({
      action: "openSidePanel",
      timestamp: Date.now()
    });
    console.log('Side panel open request sent successfully');
  } catch (error) {
    console.log('Failed to open side panel:', error);
    // Обработка недействительного контекста расширения
    if (error.message?.includes('Extension context invalidated')) {
      handleContextInvalidation();
      return;
    }
    console.log('Failed to open side panel:', error);
  }
}

// Инициализация расширения
(async () => {
  try {
    console.log('Setting up click listener...');
    
    // Проверка домена hh.ru
    const isHHru = /^https:\/\/hh\.ru\//.test(window.location.href);
    if (!isHHru) return;

    // Создание кнопки для открытия боковой панели
    const button = document.createElement('button');
    button.id = 'open-sidepanel-button';
    button.textContent = 'Открыть Side Panel';
    button.style.position = 'fixed';
    button.style.left = '50%';
    button.style.bottom = '20px';
    button.style.transform = 'translateX(-50%)';
    button.style.zIndex = '1000';
    button.style.padding = '12px 24px';
    button.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
    button.style.backdropFilter = 'blur(12px)';
    button.style.background = 'linear-gradient(45deg, #ff0000, #ff6b6b)';
    button.style.webkitBackgroundClip = 'text';
    button.style.backgroundClip = 'text';
    button.style.webkitTextFillColor = 'transparent';
    button.style.border = '1px solid rgba(255, 255, 255, 0.2)';
    button.style.borderRadius = '12px';
    button.style.boxShadow = `0 8px 32px rgba(0, 0, 0, 0.1),
      inset 0 2px 4px rgba(255, 255, 255, 0.1)`;
    button.style.minWidth = '240px';
    button.style.fontWeight = '500';
    button.style.letterSpacing = '0.5px';
    button.style.transition = 'all 0.3s ease';
    button.style.textAlign = 'center';
    button.style.cursor = 'pointer';
    document.body.prepend(button);

    button.addEventListener('click', () => {
      console.log('Button clicked!');
      openSidePanel().catch(console.error);
    });

    // Мониторинг изменений DOM для обнаружения навигации
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList' && !document.contains(button)) {
          document.body.prepend(button);
        }
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: false,
      characterData: false
    });

    // Удаление кнопки при переходе вне hh.ru
    window.addEventListener('popstate', () => {
      if (!/^https:\/\/hh\.ru\//.test(window.location.href)) {
        button.remove();
      }
    });

    // Проверяем доступность chrome API
    await sendMessage({ action: "ping" });
    console.log('Extension initialized successfully');
  } catch (error) {
    console.log('Error initializing extension:', error);
  }
})();