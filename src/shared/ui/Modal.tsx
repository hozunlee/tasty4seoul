import React from 'react';
import { cn } from '@/shared/lib/utils';

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose?: () => void; // 모달 닫기 함수 (선택 사항)
  className?: string;
}

export function Modal({ children, isOpen, onClose, className }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className={cn(
      "fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm",
      className
    )}>
      <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 max-w-sm w-full mx-4">
        {onClose && (
          <button
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            onClick={onClose}
          >
            &times;
          </button>
        )}
        {children}
      </div>
    </div>
  );
}
