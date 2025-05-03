import React from 'react';
import { Heart, CloudSun } from 'lucide-react';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
}

const Logo: React.FC<LogoProps> = ({ size = 'medium' }) => {
  const sizeClasses = {
    small: 'w-8 h-8',
    medium: 'w-10 h-10',
    large: 'w-12 h-12'
  };

  return (
    <div className={`relative ${sizeClasses[size]}`}>
      <div className="absolute inset-0 bg-primary-100 rounded-full"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <CloudSun 
          className="text-primary-600" 
          size={size === 'small' ? 16 : size === 'medium' ? 20 : 24} 
        />
      </div>
      <div className="absolute -bottom-1 -right-1">
        <Heart 
          className="text-accent-400 fill-accent-400" 
          size={size === 'small' ? 12 : size === 'medium' ? 14 : 16} 
        />
      </div>
    </div>
  );
};

export default Logo;