import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Email, FolderType } from '../types/email';
import { mockApi } from '../utils/mockApi';

interface EmailContextType {
  emails: Email[];
  currentEmail: Email | null;
  currentFolder: FolderType;
  totalEmails: number;
  currentPage: number;
  isLoading: boolean;
  searchQuery: string;
  setCurrentFolder: (folder: FolderType) => void;
  setCurrentEmail: (email: Email | null) => void;
  loadEmails: (folder: FolderType, page?: number) => Promise<void>;
  sendEmail: (emailData: Partial<Email>) => Promise<void>;
  saveDraft: (emailData: Partial<Email>) => Promise<void>;
  markAsRead: (id: string, isRead: boolean) => Promise<void>;
  markAsStarred: (id: string, isStarred: boolean) => Promise<void>;
  moveToTrash: (id: string) => Promise<void>;
  deleteEmail: (id: string) => Promise<void>;
  restoreFromTrash: (id: string, targetFolder: FolderType) => Promise<void>;
  searchEmails: (query: string) => Promise<void>;
  setSearchQuery: (query: string) => void;
  refreshEmails: () => Promise<void>;
}

const EmailContext = createContext<EmailContextType | undefined>(undefined);

export const EmailProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [emails, setEmails] = useState<Email[]>([]);
  const [currentEmail, setCurrentEmail] = useState<Email | null>(null);
  const [currentFolder, setCurrentFolder] = useState<FolderType>('inbox');
  const [totalEmails, setTotalEmails] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const loadEmails = async (folder: FolderType, page: number = 1) => {
    setIsLoading(true);
    try {
      const { emails: fetchedEmails, total } = await mockApi.getEmails(folder, page, 20);
      setEmails(fetchedEmails);
      setTotalEmails(total);
      setCurrentPage(page);
      setCurrentFolder(folder);
      setSearchQuery('');
    } catch (error) {
      console.error('Error loading emails:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshEmails = async () => {
    if (searchQuery) {
      await searchEmails(searchQuery);
    } else {
      await loadEmails(currentFolder, currentPage);
    }
  };

  const sendEmail = async (emailData: Partial<Email>) => {
    setIsLoading(true);
    try {
      await mockApi.sendEmail(emailData);
      if (currentFolder === 'sent' || currentFolder === 'drafts') {
        await loadEmails(currentFolder, currentPage);
      }
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const saveDraft = async (emailData: Partial<Email>) => {
    try {
      await mockApi.saveDraft(emailData);
      if (currentFolder === 'drafts') {
        await loadEmails(currentFolder, currentPage);
      }
    } catch (error) {
      console.error('Error saving draft:', error);
      throw error;
    }
  };

  const markAsRead = async (id: string, isRead: boolean) => {
    try {
      await mockApi.markAsRead(id, isRead);
      setEmails(prevEmails =>
        prevEmails.map(email =>
          email.id === id ? { ...email, isRead } : email
        )
      );
      if (currentEmail && currentEmail.id === id) {
        setCurrentEmail({ ...currentEmail, isRead });
      }
    } catch (error) {
      console.error('Error marking email as read:', error);
    }
  };

  const markAsStarred = async (id: string, isStarred: boolean) => {
    try {
      await mockApi.markAsStarred(id, isStarred);
      setEmails(prevEmails =>
        prevEmails.map(email =>
          email.id === id ? { ...email, isStarred } : email
        )
      );
      if (currentEmail && currentEmail.id === id) {
        setCurrentEmail({ ...currentEmail, isStarred });
      }
    } catch (error) {
      console.error('Error marking email as starred:', error);
    }
  };

  const moveToTrash = async (id: string) => {
    try {
      await mockApi.moveToTrash(id);
      await refreshEmails();
    } catch (error) {
      console.error('Error moving email to trash:', error);
    }
  };

  const deleteEmail = async (id: string) => {
    try {
      await mockApi.deleteEmail(id);
      await refreshEmails();
      if (currentEmail && currentEmail.id === id) {
        setCurrentEmail(null);
      }
    } catch (error) {
      console.error('Error deleting email:', error);
    }
  };

  const restoreFromTrash = async (id: string, targetFolder: FolderType) => {
    try {
      await mockApi.restoreFromTrash(id, targetFolder);
      await refreshEmails();
    } catch (error) {
      console.error('Error restoring email:', error);
    }
  };

  const searchEmails = async (query: string) => {
    setIsLoading(true);
    setSearchQuery(query);
    try {
      if (!query.trim()) {
        await loadEmails(currentFolder, 1);
        return;
      }
      const results = await mockApi.searchEmails(query, currentFolder);
      setEmails(results);
      setTotalEmails(results.length);
      setCurrentPage(1);
    } catch (error) {
      console.error('Error searching emails:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <EmailContext.Provider
      value={{
        emails,
        currentEmail,
        currentFolder,
        totalEmails,
        currentPage,
        isLoading,
        searchQuery,
        setCurrentFolder,
        setCurrentEmail,
        loadEmails,
        sendEmail,
        saveDraft,
        markAsRead,
        markAsStarred,
        moveToTrash,
        deleteEmail,
        restoreFromTrash,
        searchEmails,
        setSearchQuery,
        refreshEmails
      }}
    >
      {children}
    </EmailContext.Provider>
  );
};

export const useEmail = () => {
  const context = useContext(EmailContext);
  if (context === undefined) {
    throw new Error('useEmail must be used within an EmailProvider');
  }
  return context;
};
