import React from 'react';
import { componentStyles as styles } from '../styles/components';
import type { LucideIcon } from 'lucide-react';
import { Sparkles, Check, Copy } from 'lucide-react';

interface ButtonProps {
  onClick: () => void;
  disabled?: boolean;
  style?: React.CSSProperties;
  icon?: LucideIcon;
  children: React.ReactNode;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  disabled = false,
  style,
  icon: Icon,
  children,
  onMouseEnter,
  onMouseLeave,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={style}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {Icon && <Icon size={18} />}
      {children}
    </button>
  );
};

export default Button;

export interface BaseButtonProps {
  disabled?: boolean;
  isHovering?: boolean;
}

export const GenerateButton: React.FC<{
  onClick: () => void;
  isGenerating: boolean;
  isHovering: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}> = ({ onClick, isGenerating, isHovering, onMouseEnter, onMouseLeave }) => (
  <Button
    onClick={onClick}
    disabled={isGenerating}
    style={{
      ...styles.generateButton,
      ...(isHovering ? styles.generateButtonHover : {}),
      ...(isGenerating ? styles.generateButtonDisabled : {})
    }}
    icon={Sparkles}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
  >
    {isGenerating ? 'Генерация...' : 'Сгенерировать отклик'}
  </Button>
);

export const CopyButton: React.FC<{
  onClick: () => void;
  disabled: boolean;
  isCopied: boolean;
  isHovering: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}> = ({ onClick, disabled, isCopied, isHovering, onMouseEnter, onMouseLeave }) => (
  <Button
    onClick={onClick}
    disabled={disabled}
    style={{
      ...styles.copyButton,
      ...(isHovering ? styles.copyButtonHover : {}),
      ...(disabled ? styles.copyButtonDisabled : {})
    }}
    icon={isCopied ? Check : Copy}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
  >
    {isCopied ? 'Скопировано!' : 'Копировать в буфер'}
  </Button>
);