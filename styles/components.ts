import type { CSSProperties } from 'react';

interface Styles {
  container: CSSProperties;
  wrapper: CSSProperties;
  heading: CSSProperties;
  generateButton: CSSProperties;
  generateButtonHover: CSSProperties;
  generateButtonDisabled: CSSProperties;
  textFieldContainer: CSSProperties;
  textFieldContainerHover: CSSProperties;
  textField: CSSProperties;
  textContent: CSSProperties;
  placeholderContainer: CSSProperties;
  placeholderIcon: CSSProperties;
  copyButton: CSSProperties;
  copyButtonHover: CSSProperties;
  copyButtonDisabled: CSSProperties;
  toast: CSSProperties;
  spinnerContainer: CSSProperties;
  spinner: CSSProperties;
  saveButton: CSSProperties;
  saveButtonDisabled: CSSProperties;
  section: CSSProperties;
  sectionTitle: CSSProperties;
}

export const componentStyles: Styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: '100vh',
    backgroundColor: '#111827',
    padding: '24px'
  },
  wrapper: {
    width: '100%',
    maxWidth: '600px',
    display: "flex",
    flexDirection: "column",
    gap: '32px',
    position: "relative"
  },
  heading: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: 'white',
    textAlign: "center",
    marginBottom: '16px'
  },
  generateButton: {
    background: 'linear-gradient(to right, #10B981, #059669)',
    color: 'white',
    padding: '12px 16px',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '500',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s',
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: '8px',
    border: 'none',
    cursor: 'pointer',
    margin: '2px'
  },
  generateButtonHover: {
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.2)',
    background: 'linear-gradient(to right, #059669, #047857)'
  },
  generateButtonDisabled: {
    opacity: '0.7',
    cursor: 'not-allowed'
  },
  textFieldContainer: {
    borderRadius: '8px',
    padding: '12px',
    backgroundColor: '#1F2937',
    transition: 'all 0.3s'
  },
  textFieldContainerHover: {
    backgroundColor: '#2D3748'
  },
  textField: {
    background: 'transparent',
    borderRadius: '8px',
    padding: '12px',
    fontSize: '16px',
    minHeight: '128px',
    position: "relative"
  },
  textContent: {
    background: 'transparent',
    border: 'none',
    borderRadius: '8px',
    resize: 'none',
    boxSizing: 'border-box',
    color: '#E5E7EB',
    fontWeight: '500',
    padding: '12px',
    width: '100%',
    outline: 'none',
    fontSize: '16px',
    lineHeight: '1.5'
  },
  placeholderContainer: {
    fontSize: '14px',
    textAlign: "center",
    color: '#1F2937',
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: '100%',
    opacity: '0.8'
  },
  placeholderIcon: {
    marginBottom: '8px',
    opacity: '0.6'
  },
  copyButton: {
    background: 'linear-gradient(to right, #3B82F6, #4F46E5)',
    color: 'white',
    padding: '12px 16px',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '500',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s',
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: '8px',
    border: 'none',
    cursor: 'pointer',
    margin: '2px'
  },
  copyButtonHover: {
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.2)',
    background: 'linear-gradient(to right, #2563EB, #4338CA)'
  },
  copyButtonDisabled: {
    opacity: '0.5',
    cursor: 'not-allowed'
  },
  toast: {
    position: "absolute",
    top: '0',
    left: '50%',
    transform: 'translate(-50%, -48px)',
    backgroundColor: '#1F2937',
    color: 'white',
    padding: '4px 12px',
    borderRadius: '6px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    zIndex: '50',
    transition: 'all 0.3s ease-in-out',
    display: "flex",
    alignItems: "center",
    gap: '4px',
    fontSize: '12px'
  },
  spinnerContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: '100%'
  },
  spinner: {
    width: '32px',
    height: '32px',
    border: '4px solid #1F2937',
    borderTop: '4px solid #10B981',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite'
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '12px 0',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '500',
    border: 'none',
    width: '100%',
    marginTop: '10px',
    cursor: 'pointer',
    transition: 'background 0.3s, cursor 0.3s'
  },
  saveButtonDisabled: {
    backgroundColor: '#A5D6A7',
    cursor: 'not-allowed'
  },
  section: {
    marginBottom: '32px',
    width: '100%'
  },
  sectionTitle: {
    fontSize: '20px',
    color: '#E5E7EB',
    marginBottom: '16px'
  }};