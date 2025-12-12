import React, { useEffect, useState } from 'react';
import {
  ArrowLeft,
  Star,
  Trash2,
  Reply,
  ReplyAll,
  Forward,
  MoreVertical,
  Paperclip,
  Download,
  RotateCcw,
  Archive,
  FileText,
  Code,
  Globe
} from 'lucide-react';
import { Email } from '../types/email';
import { useEmail } from '../contexts/EmailContext';
import { mockApi } from '../utils/mockApi';

type ViewMode = 'text' | 'json' | 'html';

interface EmailViewerProps {
  emailId: string;
  onBack: () => void;
  onReply: (email: Email, replyAll?: boolean) => void;
  onForward: (email: Email) => void;
}

const EmailViewer: React.FC<EmailViewerProps> = ({ emailId, onBack, onReply, onForward }) => {
  const [email, setEmail] = useState<Email | null>(null);
  const [threadEmails, setThreadEmails] = useState<Email[]>([]);
  const [showActions, setShowActions] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('text');
  const { markAsStarred, moveToTrash, deleteEmail, restoreFromTrash, currentFolder, refreshEmails } = useEmail();

  useEffect(() => {
    loadEmail();
  }, [emailId]);

  const loadEmail = async () => {
    const fetchedEmail = await mockApi.getEmailById(emailId);
    if (fetchedEmail) {
      setEmail(fetchedEmail);
      // Load thread if exists
      if (fetchedEmail.threadId) {
        const thread = await mockApi.getEmailThread(fetchedEmail.threadId);
        setThreadEmails(thread);
      }
    }
  };

  if (!email) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">Loading email...</p>
      </div>
    );
  }

  const handleStarClick = () => {
    markAsStarred(email.id, !email.isStarred);
    setEmail({ ...email, isStarred: !email.isStarred });
  };

  const handleTrash = async () => {
    await moveToTrash(email.id);
    onBack();
  };

  const handleDelete = async () => {
    if (confirm('Are you sure you want to permanently delete this email?')) {
      await deleteEmail(email.id);
      onBack();
    }
  };

  const handleRestore = async () => {
    await restoreFromTrash(email.id, 'inbox');
    onBack();
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const convertToHTML = (text: string) => {
    // Convert plain text to HTML with basic formatting
    const paragraphs = text.split('\n\n');
    return paragraphs
      .map(paragraph => {
        const withBreaks = paragraph.replace(/\n/g, '<br>');
        return `<p style="margin-bottom: 1rem;">${withBreaks}</p>`;
      })
      .join('');
  };

  const renderEmailBody = (emailData: Email) => {
    switch (viewMode) {
      case 'text':
        return (
          <div className="whitespace-pre-wrap text-gray-800 mb-4">
            {emailData.body}
          </div>
        );
      
      case 'json':
        return (
          <div className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto mb-4">
            <pre className="text-xs">
              {JSON.stringify(emailData, null, 2)}
            </pre>
          </div>
        );
      
      case 'html':
        return (
          <div 
            className="text-gray-800 mb-4"
            dangerouslySetInnerHTML={{ __html: convertToHTML(emailData.body) }}
          />
        );
      
      default:
        return <div className="whitespace-pre-wrap text-gray-800 mb-4">{emailData.body}</div>;
    }
  };

  const renderEmailContent = (emailData: Email, isThreaded: boolean = false) => (
    <div className={`${isThreaded ? 'border-l-2 border-gray-200 pl-4 ml-4 mb-4' : ''}`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-3 flex-1">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white flex-shrink-0">
            {emailData.from.name.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1">
            <div className="flex items-baseline gap-2">
              <span>{emailData.from.name}</span>
              <span className="text-sm text-gray-500">&lt;{emailData.from.email}&gt;</span>
            </div>
            <div className="text-sm text-gray-500 mt-1">
              to {emailData.to.map(u => u.email).join(', ')}
              {emailData.cc && emailData.cc.length > 0 && (
                <span> cc {emailData.cc.map(u => u.email).join(', ')}</span>
              )}
            </div>
            <div className="text-xs text-gray-400 mt-1">{formatDate(emailData.timestamp)}</div>
          </div>
        </div>
      </div>

      {/* View Mode Toggle - Only show for main email, not threaded ones */}
      {!isThreaded && (
        <div className="flex items-center gap-2 mb-4 border-b border-gray-200 pb-3">
          <span className="text-sm text-gray-600 mr-2">View as:</span>
          <button
            onClick={() => setViewMode('text')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors ${
              viewMode === 'text'
                ? 'bg-blue-100 text-blue-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span className="text-sm">Text</span>
          </button>
          <button
            onClick={() => setViewMode('json')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors ${
              viewMode === 'json'
                ? 'bg-blue-100 text-blue-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Code className="w-4 h-4" />
            <span className="text-sm">JSON</span>
          </button>
          <button
            onClick={() => setViewMode('html')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors ${
              viewMode === 'html'
                ? 'bg-blue-100 text-blue-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Globe className="w-4 h-4" />
            <span className="text-sm">HTML</span>
          </button>
        </div>
      )}

      {renderEmailBody(emailData)}

      {emailData.attachments && emailData.attachments.length > 0 && (
        <div className="mt-4 border-t pt-4">
          <div className="flex items-center gap-2 mb-2">
            <Paperclip className="w-4 h-4 text-gray-500" />
            <span className="text-sm">{emailData.attachments.length} attachment(s)</span>
          </div>
          <div className="space-y-2">
            {emailData.attachments.map((attachment) => (
              <div
                key={attachment.id}
                className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center">
                    <Paperclip className="w-5 h-5 text-gray-500" />
                  </div>
                  <div>
                    <p className="text-sm">{attachment.name}</p>
                    <p className="text-xs text-gray-500">{formatFileSize(attachment.size)}</p>
                  </div>
                </div>
                <button className="p-2 hover:bg-gray-200 rounded">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleStarClick}
              className="p-2 hover:bg-gray-100 rounded transition-colors"
            >
              <Star
                className={`w-5 h-5 ${
                  email.isStarred ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'
                }`}
              />
            </button>

            {currentFolder === 'trash' ? (
              <>
                <button
                  onClick={handleRestore}
                  className="p-2 hover:bg-gray-100 rounded transition-colors"
                  title="Restore"
                >
                  <RotateCcw className="w-5 h-5 text-gray-600" />
                </button>
                <button
                  onClick={handleDelete}
                  className="p-2 hover:bg-gray-100 rounded transition-colors"
                  title="Delete permanently"
                >
                  <Trash2 className="w-5 h-5 text-red-600" />
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => onReply(email)}
                  className="p-2 hover:bg-gray-100 rounded transition-colors"
                  title="Reply"
                >
                  <Reply className="w-5 h-5 text-gray-600" />
                </button>
                <button
                  onClick={() => onReply(email, true)}
                  className="p-2 hover:bg-gray-100 rounded transition-colors"
                  title="Reply all"
                >
                  <ReplyAll className="w-5 h-5 text-gray-600" />
                </button>
                <button
                  onClick={() => onForward(email)}
                  className="p-2 hover:bg-gray-100 rounded transition-colors"
                  title="Forward"
                >
                  <Forward className="w-5 h-5 text-gray-600" />
                </button>
                <button
                  onClick={handleTrash}
                  className="p-2 hover:bg-gray-100 rounded transition-colors"
                  title="Move to trash"
                >
                  <Trash2 className="w-5 h-5 text-gray-600" />
                </button>
              </>
            )}
          </div>
        </div>

        <h1 className="text-2xl mb-2">{email.subject || '(No Subject)'}</h1>
      </div>

      {/* Email Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {threadEmails.length > 1 ? (
          <div>
            <h3 className="text-sm text-gray-500 mb-4">
              {threadEmails.length} messages in this thread
            </h3>
            {threadEmails.map((threadEmail, index) => (
              <div key={threadEmail.id} className="mb-6">
                {renderEmailContent(threadEmail, index > 0)}
              </div>
            ))}
          </div>
        ) : (
          renderEmailContent(email)
        )}
      </div>
    </div>
  );
};

export default EmailViewer;