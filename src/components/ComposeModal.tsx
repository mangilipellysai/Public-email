import React, { useState, useEffect } from 'react';
import { X, Paperclip, Send, Minimize2, Maximize2, Save } from 'lucide-react';
import { useEmail } from '../contexts/EmailContext';
import { Email, User } from '../types/email';
import { toast } from 'sonner@2.0.3';

interface ComposeModalProps {
  isOpen: boolean;
  onClose: () => void;
  replyTo?: Email;
  replyAll?: boolean;
  forward?: Email;
  draftEmail?: Email;
}

const ComposeModal: React.FC<ComposeModalProps> = ({
  isOpen,
  onClose,
  replyTo,
  replyAll,
  forward,
  draftEmail
}) => {
  const { sendEmail, saveDraft } = useEmail();
  const [to, setTo] = useState('');
  const [cc, setCc] = useState('');
  const [bcc, setBcc] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [showCc, setShowCc] = useState(false);
  const [showBcc, setShowBcc] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (draftEmail) {
        // Load draft
        setTo(draftEmail.to.map(u => u.email).join(', '));
        setCc(draftEmail.cc?.map(u => u.email).join(', ') || '');
        setBcc(draftEmail.bcc?.map(u => u.email).join(', ') || '');
        setSubject(draftEmail.subject);
        setBody(draftEmail.body);
        if (draftEmail.cc && draftEmail.cc.length > 0) setShowCc(true);
        if (draftEmail.bcc && draftEmail.bcc.length > 0) setShowBcc(true);
      } else if (replyTo) {
        // Reply or Reply All
        setTo(replyAll ? [replyTo.from, ...replyTo.to].map(u => u.email).join(', ') : replyTo.from.email);
        if (replyAll && replyTo.cc) {
          setCc(replyTo.cc.map(u => u.email).join(', '));
          setShowCc(true);
        }
        setSubject(replyTo.subject.startsWith('Re:') ? replyTo.subject : `Re: ${replyTo.subject}`);
        setBody(`\n\n--- On ${replyTo.timestamp.toLocaleString()}, ${replyTo.from.name} wrote:\n${replyTo.body}`);
      } else if (forward) {
        // Forward
        setSubject(forward.subject.startsWith('Fwd:') ? forward.subject : `Fwd: ${forward.subject}`);
        setBody(`\n\n--- Forwarded message ---\nFrom: ${forward.from.name} <${forward.from.email}>\nDate: ${forward.timestamp.toLocaleString()}\nSubject: ${forward.subject}\n\n${forward.body}`);
      } else {
        // New email
        resetForm();
      }
    }
  }, [isOpen, replyTo, replyAll, forward, draftEmail]);

  const resetForm = () => {
    setTo('');
    setCc('');
    setBcc('');
    setSubject('');
    setBody('');
    setShowCc(false);
    setShowBcc(false);
  };

  const parseEmailAddresses = (emailString: string): User[] => {
    if (!emailString.trim()) return [];
    
    return emailString.split(',').map((email, index) => {
      const trimmedEmail = email.trim();
      return {
        id: `user-${index}`,
        name: trimmedEmail.split('@')[0],
        email: trimmedEmail
      };
    });
  };

  const handleSend = async () => {
    if (!to.trim()) {
      toast.error('Please enter at least one recipient');
      return;
    }

    setIsSending(true);
    try {
      const emailData: Partial<Email> = {
        to: parseEmailAddresses(to),
        cc: showCc ? parseEmailAddresses(cc) : undefined,
        bcc: showBcc ? parseEmailAddresses(bcc) : undefined,
        subject,
        body,
        threadId: replyTo?.threadId || forward?.threadId,
        replyTo: replyTo?.id
      };

      await sendEmail(emailData);
      toast.success('Email sent successfully!');
      onClose();
      resetForm();
    } catch (error) {
      toast.error('Failed to send email');
      console.error(error);
    } finally {
      setIsSending(false);
    }
  };

  const handleSaveDraft = async () => {
    try {
      const emailData: Partial<Email> = {
        id: draftEmail?.id,
        to: parseEmailAddresses(to),
        cc: showCc ? parseEmailAddresses(cc) : undefined,
        bcc: showBcc ? parseEmailAddresses(bcc) : undefined,
        subject,
        body
      };

      await saveDraft(emailData);
      toast.success('Draft saved successfully!');
      onClose();
      resetForm();
    } catch (error) {
      toast.error('Failed to save draft');
      console.error(error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-end z-50 p-4">
      <div
        className={`bg-white rounded-t-lg shadow-2xl flex flex-col transition-all ${
          isMinimized ? 'w-80 h-14' : 'w-full max-w-2xl h-[600px]'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-gray-50 rounded-t-lg">
          <h3 className="">
            {draftEmail ? 'Edit Draft' : replyTo ? (replyAll ? 'Reply All' : 'Reply') : forward ? 'Forward' : 'New Message'}
          </h3>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-1 hover:bg-gray-200 rounded"
            >
              {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
            </button>
            <button onClick={onClose} className="p-1 hover:bg-gray-200 rounded">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Form */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              <div className="flex items-center gap-2">
                <label className="w-16 text-sm text-gray-600">To:</label>
                <input
                  type="text"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  placeholder="recipient@example.com"
                  className="flex-1 px-2 py-1 border-b border-gray-300 focus:border-blue-500 focus:outline-none"
                />
                {!showCc && (
                  <button
                    onClick={() => setShowCc(true)}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    Cc
                  </button>
                )}
                {!showBcc && (
                  <button
                    onClick={() => setShowBcc(true)}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    Bcc
                  </button>
                )}
              </div>

              {showCc && (
                <div className="flex items-center gap-2">
                  <label className="w-16 text-sm text-gray-600">Cc:</label>
                  <input
                    type="text"
                    value={cc}
                    onChange={(e) => setCc(e.target.value)}
                    placeholder="cc@example.com"
                    className="flex-1 px-2 py-1 border-b border-gray-300 focus:border-blue-500 focus:outline-none"
                  />
                </div>
              )}

              {showBcc && (
                <div className="flex items-center gap-2">
                  <label className="w-16 text-sm text-gray-600">Bcc:</label>
                  <input
                    type="text"
                    value={bcc}
                    onChange={(e) => setBcc(e.target.value)}
                    placeholder="bcc@example.com"
                    className="flex-1 px-2 py-1 border-b border-gray-300 focus:border-blue-500 focus:outline-none"
                  />
                </div>
              )}

              <div className="flex items-center gap-2">
                <label className="w-16 text-sm text-gray-600">Subject:</label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Email subject"
                  className="flex-1 px-2 py-1 border-b border-gray-300 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="pt-2">
                <textarea
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder="Compose your message..."
                  className="w-full h-80 p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none resize-none"
                />
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 px-4 py-3 flex items-center justify-between bg-gray-50">
              <button className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:bg-gray-200 rounded">
                <Paperclip className="w-4 h-4" />
                <span className="text-sm">Attach</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleSaveDraft}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Draft</span>
                </button>
                <button
                  onClick={handleSend}
                  disabled={isSending}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSending ? 'Sending...' : 'Send'}</span>
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ComposeModal;
