import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import styled from 'styled-components';

interface Module {
  id: number;
  title: string;
  path: string;
  icon: string;
  position: number;
  isRight: boolean;
  yOffset?: number;
}



interface ModuleCardProps {
  module: Module;
  isLocked: boolean;
  isActive?: boolean;
  onClick?: () => void;
}

interface StyledModuleCardProps {
  isLocked?: boolean;
  isActive?: boolean;
}

const ModuleCardWrapper = styled(motion.div)<StyledModuleCardProps>`
  position: absolute;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: ${props => {
    if (props.isActive && !props.isLocked) return 'rgba(79, 172, 254, 0.25)';
    return props.isLocked ? 'rgba(255, 255, 255, 0.03)' : 'rgba(255, 255, 255, 0.12)';
  }};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: ${props => props.isLocked ? 'not-allowed' : 'pointer'};
  transform: translate(-50%, -50%);
  border: 2px solid ${props => {
    if (props.isActive && !props.isLocked) return 'rgba(79, 172, 254, 0.8)';
    return props.isLocked ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.3)';
  }};
  transition: all 0.3s ease;
  box-shadow: ${props => {
    if (props.isActive && !props.isLocked) return '0 0 20px rgba(79, 172, 254, 0.4)';
    return `0 0 15px rgba(255, 255, 255, ${props.isLocked ? '0.05' : '0.1'})`;
  }};
  z-index: 5;
  
  &:hover {
    background: ${props => {
      if (props.isActive && !props.isLocked) return 'rgba(79, 172, 254, 0.3)';
      return props.isLocked ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.15)';
    }};
    border-color: ${props => {
      if (props.isActive && !props.isLocked) return 'rgba(79, 172, 254, 0.9)';
      return props.isLocked ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.4)';
    }};
    box-shadow: ${props => {
      if (props.isActive && !props.isLocked) return '0 0 25px rgba(79, 172, 254, 0.5)';
      return `0 0 20px rgba(255, 255, 255, ${props.isLocked ? '0.08' : '0.15'})`;
    }};
  }
`;

const ModuleTitle = styled(motion.h3)<{ isLocked?: boolean; isRight?: boolean; isActive?: boolean }>`
  position: absolute;
  top: 50%;
  ${props => props.isRight ? 'left: calc(100% + 15px);' : 'right: calc(100% + 15px);'}
  transform: translateY(-50%);
  font-size: 14px;
  color: ${props => {
    if (props.isActive && !props.isLocked) return 'rgba(79, 172, 254, 1)';
    return props.isLocked ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.8)';
  }};
  white-space: nowrap;
  text-align: ${props => props.isRight ? 'left' : 'right'};
  pointer-events: none;
  margin: 0;
  text-shadow: ${props => props.isActive && !props.isLocked ? '0 0 10px rgba(79, 172, 254, 0.5)' : 'none'};
`;

const ModuleIcon = styled.span<{ isLocked?: boolean }>`
  font-size: 28px;
  opacity: ${props => props.isLocked ? '0.5' : '0.9'};
`;

const LockIcon = styled.span`
  position: absolute;
  bottom: -20px;
  font-size: 12px;
  opacity: 0.5;
`;

export const ModuleCard: FC<ModuleCardProps> = ({ module, isLocked, isActive = false, onClick }) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    if (!isLocked) {
      // Call the onClick handler if provided (for interactivity)
      if (onClick) {
        onClick();
      }
      // Navigate to the module path
      navigate(module.path);
    }
  };

  // Calculate the vertical position based on yOffset if provided
  const verticalPosition = module.yOffset || (module.isRight ? 320 : 120);

  return (
    <ModuleCardWrapper
      style={{ 
        left: module.position * 100,
        top: verticalPosition
      }}
      isLocked={isLocked}
      isActive={isActive}
      onClick={handleClick}
      whileHover={{ scale: isLocked ? 1 : 1.05 }}
      whileTap={{ scale: isLocked ? 1 : 0.95 }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ 
        opacity: 1, 
        scale: isActive && !isLocked ? 1.1 : 1,
        transition: { 
          type: 'spring',
          stiffness: 300,
          damping: 20,
          delay: module.id * 0.2
        }
      }}
    >
      <ModuleTitle isLocked={isLocked} isRight={module.isRight} isActive={isActive}>
        {module.title}
      </ModuleTitle>
      <ModuleIcon isLocked={isLocked}>{module.icon}</ModuleIcon>
      {isLocked && <LockIcon>🔒</LockIcon>}
    </ModuleCardWrapper>
  );
};

export type { Module, ModuleCardProps };
