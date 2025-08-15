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
      className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-80"
      style={{ backdropFilter: 'blur(8px)' }}
      onClick={handleOverlayClick}
    >
      {/* Close Button - positioned in top-right of white background */}
      <button
        onClick={onClose}
        className="absolute top-8 right-8 z-10 w-12 h-12 bg-transparent rounded-full flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
        aria-label="Close video"
      >
        <X className="h-8 w-8 text-black" />
      </button>
      
      {/* Video container - no close button overlap */}
      <div className="relative w-full max-w-4xl mx-4 aspect-video">
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
