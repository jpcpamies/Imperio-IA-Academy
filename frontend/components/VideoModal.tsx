import { useEffect } from "react";
import { X } from "lucide-react";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoId: string;
}

export function VideoModal({ isOpen, onClose, videoId }: VideoModalProps) {
  useEffect(() => {
    if (isOpen) {
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
      
      // Handle ESC key
      const handleEsc = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          onClose();
        }
      };
      
      document.addEventListener('keydown', handleEsc);
      
      return () => {
        document.removeEventListener('keydown', handleEsc);
      };
    } else {
      // Restore body scroll when modal is closed
      document.body.style.overflow = 'unset';
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
      style={{ backdropFilter: 'blur(8px)' }}
      onClick={handleOverlayClick}
    >
      <div className="relative w-full max-w-4xl mx-4 aspect-video">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#635BFF] focus:ring-offset-2"
          aria-label="Close video"
        >
          <X className="h-6 w-6 text-gray-700" />
        </button>
        
        {/* Video iframe */}
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
          title="Sistema Demo Video"
          className="w-full h-full rounded-lg shadow-2xl"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
}
