import { useState } from 'react';
import "./style.css"

function IndexPopup() {
  const [isHovering, setIsHovering] = useState({
    sidePanel: false,
    options: false
  });

  const openSidePanel = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]?.id) {
        chrome.sidePanel.open({
          tabId: tabs[0].id
        }).catch(console.error)
      }
    })
  }

  const openOptionsPage = () => {
    chrome.runtime.openOptionsPage();
  }

  const containerStyle = {
    display: "flex",
    flexDirection: "column" as const,
    gap: '2px',
    padding: '4px',
    backgroundColor: '#111827',
    width: '200px'
  }

  const buttonStyle = (isHoveringButton: boolean) => ({
    background: isHoveringButton 
      ? 'linear-gradient(135deg, rgba(5, 150, 105, 0.2) 0%, rgba(4, 120, 87, 0.2) 100%)'
      : 'transparent',
    color: isHoveringButton ? '#10B981' : '#E5E7EB',
    padding: '8px 12px',
    borderRadius: '4px',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    display: "flex",
    alignItems: "center",
    gap: '12px',
    border: 'none',
    cursor: 'pointer',
    width: '100%',
    textAlign: 'left' as const,
    position: 'relative' as const,
    backdropFilter: isHoveringButton ? 'blur(8px)' : 'none',
    boxShadow: isHoveringButton 
      ? '0 0 0 1px rgba(16, 185, 129, 0.2)' 
      : 'none'
  })

  const iconStyle = (isHoveringButton: boolean) => ({
    fontSize: '16px',
    opacity: isHoveringButton ? 1 : 0.7,
    width: '16px',
    display: 'inline-block',
    textAlign: 'center' as const,
    transform: isHoveringButton ? 'scale(1.1)' : 'scale(1)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    color: isHoveringButton ? '#10B981' : '#E5E7EB'
  })

  return (
    <div style={containerStyle}>
      <button
        onClick={openSidePanel}
        style={buttonStyle(isHovering.sidePanel)}
        onMouseEnter={() => setIsHovering({ ...isHovering, sidePanel: true })}
        onMouseLeave={() => setIsHovering({ ...isHovering, sidePanel: false })}
      >
        <span style={iconStyle(isHovering.sidePanel)}>⊞</span>
        Открыть панель
      </button>
      <button
        onClick={openOptionsPage}
        style={buttonStyle(isHovering.options)}
        onMouseEnter={() => setIsHovering({ ...isHovering, options: true })}
        onMouseLeave={() => setIsHovering({ ...isHovering, options: false })}
      >
        <span style={iconStyle(isHovering.options)}>⚙</span>
        Настройки
      </button>
    </div>
  )
}

export default IndexPopup
