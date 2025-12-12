import React, { useState } from 'react';
import { Mail } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import EmailList from '../components/EmailList';
import EmailViewer from '../components/EmailViewer';
import ComposeModal from '../components/ComposeModal';
import { Email } from '../types/email';

const EmailClientPage: React.FC = () => {
  const [selectedEmailId, setSelectedEmailId] = useState<string | null>(null);
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [replyEmail, setReplyEmail] = useState<Email | undefined>();
  const [replyAll, setReplyAll] = useState(false);
  const [forwardEmail, setForwardEmail] = useState<Email | undefined>();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleEmailSelect = (emailId: string) => {
    setSelectedEmailId(emailId);
  };

  const handleBackToList = () => {
    setSelectedEmailId(null);
  };

  const handleComposeClick = () => {
    setReplyEmail(undefined);
    setReplyAll(false);
    setForwardEmail(undefined);
    setIsComposeOpen(true);
  };

  const handleReply = (email: Email, replyAllMode: boolean = false) => {
    setReplyEmail(email);
    setReplyAll(replyAllMode);
    setForwardEmail(undefined);
    setIsComposeOpen(true);
  };

  const handleForward = (email: Email) => {
    setForwardEmail(email);
    setReplyEmail(undefined);
    setReplyAll(false);
    setIsComposeOpen(true);
  };

  const handleComposeClose = () => {
    setIsComposeOpen(false);
    setReplyEmail(undefined);
    setReplyAll(false);
    setForwardEmail(undefined);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <Navbar 
        onComposeClick={handleComposeClick}
        onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar - hidden on mobile by default */}
        <div className={`${isSidebarOpen ? 'block' : 'hidden'} lg:block fixed lg:relative inset-0 z-40 lg:z-0`}>
          <div 
            className="absolute inset-0 bg-black bg-opacity-50 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
          <div className="relative">
            <Sidebar />
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex overflow-hidden">
          {/* Email List */}
          <div className={`${selectedEmailId ? 'hidden md:block' : 'block'} w-full md:w-96 border-r border-gray-200 overflow-hidden`}>
            <EmailList onEmailSelect={handleEmailSelect} />
          </div>

          {/* Email Viewer */}
          <div className={`${selectedEmailId ? 'block' : 'hidden md:block'} flex-1 overflow-hidden`}>
            {selectedEmailId ? (
              <EmailViewer
                emailId={selectedEmailId}
                onBack={handleBackToList}
                onReply={handleReply}
                onForward={handleForward}
              />
            ) : (
              <div className="h-full flex items-center justify-center bg-gray-50">
                <div className="text-center text-gray-500">
                  <Mail className="w-24 h-24 mx-auto mb-4 text-gray-300" />
                  <p className="text-lg">Select an email to read</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <ComposeModal
        isOpen={isComposeOpen}
        onClose={handleComposeClose}
        replyTo={replyEmail}
        replyAll={replyAll}
        forward={forwardEmail}
      />
    </div>
  );
};

export default EmailClientPage;