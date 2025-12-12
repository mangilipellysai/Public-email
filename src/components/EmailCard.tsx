import React from 'react';
import { Star, Paperclip } from 'lucide-react';
import { Email } from '../types/email';
import { useEmail } from '../contexts/EmailContext';

interface EmailCardProps {
  email: Email;
  isSelected: boolean;
  onClick: () => void;
}

const EmailCard: React.FC<EmailCardProps> = ({ email, isSelected, onClick }) => {
  const { markAsStarred } = useEmail();

  const handleStarClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    markAsStarred(email.id, !email.isStarred);
  };

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) {
      return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    } else if (days === 1) {
      return 'Yesterday';
    } else if (days < 7) {
      return date.toLocaleDateString('en-US', { weekday: 'short' });
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  const getPreviewText = (body: string) => {
    const maxLength = 100;
    const preview = body.replace(/\n/g, ' ').trim();
    return preview.length > maxLength ? preview.substring(0, maxLength) + '...' : preview;
  };

  return (
    <div
      onClick={onClick}
      className={`border-b border-gray-200 px-4 py-3 cursor-pointer hover:bg-gray-50 transition-colors ${
        isSelected ? 'bg-blue-50' : ''
      } ${!email.isRead ? 'bg-blue-50/30' : ''}`}
    >
      <div className="flex items-start gap-3">
        <button
          onClick={handleStarClick}
          className="mt-1 flex-shrink-0 hover:scale-110 transition-transform"
        >
          <Star
            className={`w-5 h-5 ${
              email.isStarred ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'
            }`}
          />
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-baseline justify-between gap-2 mb-1">
            <span className={`truncate ${!email.isRead ? '' : 'text-gray-600'}`}>
              {email.folder === 'sent' ? `To: ${email.to[0]?.name}` : email.from.name}
            </span>
            <span className="text-xs text-gray-500 flex-shrink-0">
              {formatTimestamp(email.timestamp)}
            </span>
          </div>

          <div className="flex items-center gap-2 mb-1">
            <p className={`truncate text-sm ${!email.isRead ? '' : 'text-gray-700'}`}>
              {email.subject || '(No Subject)'}
            </p>
            {email.attachments && email.attachments.length > 0 && (
              <Paperclip className="w-4 h-4 text-gray-400 flex-shrink-0" />
            )}
          </div>

          <p className="text-xs text-gray-500 truncate">
            {getPreviewText(email.body)}
          </p>
        </div>

        {!email.isRead && (
          <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0 mt-2" />
        )}
      </div>
    </div>
  );
};

export default EmailCard;
