import React, { useEffect } from 'react';
import { FaTimes, FaExclamationTriangle, FaCheckCircle, FaInfoCircle } from 'react-icons/fa';

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'medium',
  type = 'default',
  showCloseButton = true,
  closeOnOverlayClick = true,
  showHeader = true,
  footer,
  className = ''
}) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeClasses = {
    small: 'max-w-md',
    medium: 'max-w-lg',
    large: 'max-w-2xl',
    xlarge: 'max-w-4xl',
    full: 'max-w-full mx-4'
  };

  const typeClasses = {
    default: '',
    success: 'border-l-4 border-l-green-500',
    warning: 'border-l-4 border-l-yellow-500',
    danger: 'border-l-4 border-l-red-500',
    info: 'border-l-4 border-l-blue-500'
  };

  const typeIcons = {
    success: <FaCheckCircle className="w-6 h-6 text-green-500" />,
    warning: <FaExclamationTriangle className="w-6 h-6 text-yellow-500" />,
    danger: <FaExclamationTriangle className="w-6 h-6 text-red-500" />,
    info: <FaInfoCircle className="w-6 h-6 text-blue-500" />
  };

  const handleOverlayClick = (e) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={handleOverlayClick}
      >
        <div className="flex min-h-full items-center justify-center p-4">
          {/* Modal */}
          <div
            className={`${sizeClasses[size]} w-full bg-white rounded-2xl shadow-2xl transform transition-all ${className}`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            {/* Header */}
            {showHeader && (
              <div className={`px-6 py-4 border-b border-gray-200 flex items-center justify-between ${typeClasses[type]}`}>
                <div className="flex items-center space-x-3">
                  {type !== 'default' && typeIcons[type]}
                  <h3 id="modal-title" className="text-lg font-bold text-gray-900">
                    {title}
                  </h3>
                </div>
                {showCloseButton && (
                  <button
                    onClick={onClose}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-500 hover:text-gray-700"
                    aria-label="Close modal"
                  >
                    <FaTimes className="w-5 h-5" />
                  </button>
                )}
              </div>
            )}

            {/* Content */}
            <div className="px-6 py-4 max-h-[60vh] overflow-y-auto">
              {children}
            </div>

            {/* Footer */}
            {footer && (
              <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
                {footer}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Pre-built Modal Components
export const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirm Action',
  message = 'Are you sure you want to perform this action?',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  type = 'warning',
  isLoading = false
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      type={type}
      size="small"
    >
      <div className="space-y-4">
        <p className="text-gray-700">{message}</p>
        <div className="flex space-x-3 pt-4">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium disabled:opacity-50"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className={`flex-1 px-4 py-2 rounded-lg font-medium text-white transition-colors disabled:opacity-50 ${
              type === 'danger' 
                ? 'bg-red-600 hover:bg-red-700' 
                : type === 'success'
                ? 'bg-green-600 hover:bg-green-700'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isLoading ? 'Processing...' : confirmText}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export const AlertModal = ({
  isOpen,
  onClose,
  title = 'Alert',
  message,
  type = 'info',
  buttonText = 'OK'
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      type={type}
      size="small"
    >
      <div className="space-y-4">
        <p className="text-gray-700">{message}</p>
        <div className="flex justify-end pt-4">
          <button
            onClick={onClose}
            className={`px-6 py-2 rounded-lg font-medium text-white transition-colors ${
              type === 'danger' 
                ? 'bg-red-600 hover:bg-red-700' 
                : type === 'success'
                ? 'bg-green-600 hover:bg-green-700'
                : type === 'warning'
                ? 'bg-yellow-600 hover:bg-yellow-700'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export const FormModal = ({
  isOpen,
  onClose,
  title,
  onSubmit,
  children,
  submitText = 'Submit',
  cancelText = 'Cancel',
  isLoading = false,
  size = 'medium'
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size={size}
      showHeader={true}
      footer={
        <div className="flex space-x-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium disabled:opacity-50"
          >
            {cancelText}
          </button>
          <button
            type="submit"
            form="modal-form"
            disabled={isLoading}
            className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all font-medium disabled:opacity-50"
          >
            {isLoading ? 'Submitting...' : submitText}
          </button>
        </div>
      }
    >
      <form id="modal-form" onSubmit={handleSubmit}>
        <div className="space-y-4">
          {children}
        </div>
      </form>
    </Modal>
  );
};

export const FullScreenModal = ({ isOpen, onClose, children, className = '' }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-white overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Close"
          >
            <FaTimes className="w-5 h-5" />
          </button>
          <span className="text-lg font-bold text-gray-900">Back</span>
        </div>
      </div>

      {/* Content */}
      <div className={`p-6 ${className}`}>
        {children}
      </div>
    </div>
  );
};

export default Modal;