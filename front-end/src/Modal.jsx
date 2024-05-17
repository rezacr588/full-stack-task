const Modal = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50">
      <div className="relative w-full max-w-lg p-4 mx-2 bg-white rounded shadow-lg md:mx-auto flex flex-col gap-5">
        <p style={{
          fontWeight: 300,
          lineHeight: '24px',
          color: "rgba(51, 51, 51, 1)",
          fontSize: '16px'
        }}>
          {title}
        </p>
        <button 
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" 
          onClick={onClose}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.375 5.625L5.625 14.375M14.375 14.375L5.625 5.625L14.375 14.375Z" stroke="#828282" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
