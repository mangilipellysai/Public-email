import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import EmailCard from './EmailCard';
import { useEmail } from '../contexts/EmailContext';
import { mockApi } from '../utils/mockApi';

interface EmailListProps {
  onEmailSelect: (emailId: string) => void;
}

const EmailList: React.FC<EmailListProps> = ({ onEmailSelect }) => {
  const {
    emails,
    currentEmail,
    currentFolder,
    totalEmails,
    currentPage,
    isLoading,
    loadEmails,
    searchQuery
  } = useEmail();

  const emailsPerPage = 20;
  const totalPages = Math.ceil(totalEmails / emailsPerPage);

  useEffect(() => {
    loadEmails(currentFolder, 1);
  }, []);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      loadEmails(currentFolder, page);
    }
  };

  const handleEmailClick = async (emailId: string) => {
    onEmailSelect(emailId);
    // Mark as read when opened
    const email = emails.find(e => e.id === emailId);
    if (email && !email.isRead) {
      await mockApi.markAsRead(emailId, true);
    }
  };

  const getFolderTitle = () => {
    if (searchQuery) {
      return `Search results for "${searchQuery}"`;
    }
    return currentFolder.charAt(0).toUpperCase() + currentFolder.slice(1);
  };

  if (isLoading && emails.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg">{getFolderTitle()}</h2>
          {!searchQuery && totalPages > 1 && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">
                {(currentPage - 1) * emailsPerPage + 1}-
                {Math.min(currentPage * emailsPerPage, totalEmails)} of {totalEmails}
              </span>
              <div className="flex gap-1">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-1 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-1 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {emails.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <p className="text-lg">No emails found</p>
            {searchQuery && (
              <p className="text-sm mt-2">Try a different search term</p>
            )}
          </div>
        ) : (
          emails.map((email) => (
            <EmailCard
              key={email.id}
              email={email}
              isSelected={currentEmail?.id === email.id}
              onClick={() => handleEmailClick(email.id)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default EmailList;
