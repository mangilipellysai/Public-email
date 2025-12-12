import { Email, User, FolderType } from '../types/email';
import { 
  mockEmails, 
  mockUsers, 
  getEmailsByFolder, 
  getEmailById, 
  getEmailThread,
  searchEmails as searchEmailsUtil 
} from './mockData';

// Simulate network delay
const delay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms));

// Local storage keys
const STORAGE_KEYS = {
  EMAILS: 'email_client_emails',
  CURRENT_USER: 'email_client_current_user',
  USERS: 'email_client_users'
};

// Initialize local storage with mock data
const initializeStorage = () => {
  if (!localStorage.getItem(STORAGE_KEYS.EMAILS)) {
    localStorage.setItem(STORAGE_KEYS.EMAILS, JSON.stringify(mockEmails));
  }
  if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(mockUsers));
  }
};

// Get all emails from storage
const getStoredEmails = (): Email[] => {
  const stored = localStorage.getItem(STORAGE_KEYS.EMAILS);
  if (!stored) return mockEmails;
  const emails = JSON.parse(stored);
  // Convert timestamp strings back to Date objects
  return emails.map((email: any) => ({
    ...email,
    timestamp: new Date(email.timestamp)
  }));
};

// Save emails to storage
const saveEmails = (emails: Email[]) => {
  localStorage.setItem(STORAGE_KEYS.EMAILS, JSON.stringify(emails));
};

// Get current user from storage
const getCurrentUser = (): User | null => {
  const stored = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
  return stored ? JSON.parse(stored) : null;
};

// Mock API functions
export const mockApi = {
  // Authentication
  login: async (email: string, password: string): Promise<User> => {
    await delay();
    initializeStorage();
    const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
    const user = users.find((u: User) => u.email === email && u.password === password);
    
    if (!user) {
      throw new Error('Invalid email or password');
    }
    
    const { password: _, ...userWithoutPassword } = user;
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(userWithoutPassword));
    return userWithoutPassword;
  },

  signup: async (name: string, email: string, password: string): Promise<User> => {
    await delay();
    initializeStorage();
    const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
    
    if (users.find((u: User) => u.email === email)) {
      throw new Error('Email already exists');
    }
    
    const newUser: User = {
      id: `user-${Date.now()}`,
      name,
      email,
      password
    };
    
    users.push(newUser);
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    
    const { password: _, ...userWithoutPassword } = newUser;
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(userWithoutPassword));
    return userWithoutPassword;
  },

  logout: async (): Promise<void> => {
    await delay(200);
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  },

  getCurrentUser: (): User | null => {
    return getCurrentUser();
  },

  // Email operations
  getEmails: async (folder: FolderType, page: number = 1, limit: number = 20): Promise<{ emails: Email[], total: number }> => {
    await delay();
    const allEmails = getStoredEmails();
    const folderEmails = allEmails
      .filter(email => email.folder === folder)
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
    
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginatedEmails = folderEmails.slice(start, end);
    
    return {
      emails: paginatedEmails,
      total: folderEmails.length
    };
  },

  getEmailById: async (id: string): Promise<Email | null> => {
    await delay();
    const emails = getStoredEmails();
    return emails.find(email => email.id === id) || null;
  },

  getEmailThread: async (threadId: string): Promise<Email[]> => {
    await delay();
    const emails = getStoredEmails();
    return emails
      .filter(email => email.threadId === threadId)
      .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
  },

  searchEmails: async (query: string, folder?: FolderType): Promise<Email[]> => {
    await delay();
    const emails = getStoredEmails();
    const lowercaseQuery = query.toLowerCase();
    
    return emails.filter(email => {
      const matchesFolder = folder ? email.folder === folder : email.folder !== 'trash';
      const matchesQuery = 
        email.subject.toLowerCase().includes(lowercaseQuery) ||
        email.body.toLowerCase().includes(lowercaseQuery) ||
        email.from.name.toLowerCase().includes(lowercaseQuery) ||
        email.from.email.toLowerCase().includes(lowercaseQuery);
      return matchesFolder && matchesQuery;
    }).sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  },

  sendEmail: async (emailData: Partial<Email>): Promise<Email> => {
    await delay(800);
    const currentUser = getCurrentUser();
    if (!currentUser) {
      throw new Error('User not authenticated');
    }

    const emails = getStoredEmails();
    const newEmail: Email = {
      id: `email-${Date.now()}`,
      from: currentUser,
      to: emailData.to || [],
      cc: emailData.cc,
      bcc: emailData.bcc,
      subject: emailData.subject || '(No Subject)',
      body: emailData.body || '',
      timestamp: new Date(),
      isRead: true,
      isStarred: false,
      folder: 'sent',
      attachments: emailData.attachments,
      threadId: emailData.threadId || `thread-${Date.now()}`,
      replyTo: emailData.replyTo
    };

    emails.push(newEmail);
    saveEmails(emails);
    return newEmail;
  },

  saveDraft: async (emailData: Partial<Email>): Promise<Email> => {
    await delay();
    const currentUser = getCurrentUser();
    if (!currentUser) {
      throw new Error('User not authenticated');
    }

    const emails = getStoredEmails();
    const draftEmail: Email = {
      id: emailData.id || `draft-${Date.now()}`,
      from: currentUser,
      to: emailData.to || [],
      cc: emailData.cc,
      bcc: emailData.bcc,
      subject: emailData.subject || '(No Subject)',
      body: emailData.body || '',
      timestamp: new Date(),
      isRead: true,
      isStarred: false,
      folder: 'drafts',
      attachments: emailData.attachments,
      threadId: emailData.threadId || `thread-${Date.now()}`
    };

    // Check if draft already exists
    const existingIndex = emails.findIndex(e => e.id === draftEmail.id);
    if (existingIndex !== -1) {
      emails[existingIndex] = draftEmail;
    } else {
      emails.push(draftEmail);
    }

    saveEmails(emails);
    return draftEmail;
  },

  markAsRead: async (id: string, isRead: boolean): Promise<void> => {
    await delay(200);
    const emails = getStoredEmails();
    const email = emails.find(e => e.id === id);
    if (email) {
      email.isRead = isRead;
      saveEmails(emails);
    }
  },

  markAsStarred: async (id: string, isStarred: boolean): Promise<void> => {
    await delay(200);
    const emails = getStoredEmails();
    const email = emails.find(e => e.id === id);
    if (email) {
      email.isStarred = isStarred;
      saveEmails(emails);
    }
  },

  moveToTrash: async (id: string): Promise<void> => {
    await delay();
    const emails = getStoredEmails();
    const email = emails.find(e => e.id === id);
    if (email) {
      email.folder = 'trash';
      saveEmails(emails);
    }
  },

  deleteEmail: async (id: string): Promise<void> => {
    await delay();
    const emails = getStoredEmails();
    const filteredEmails = emails.filter(e => e.id !== id);
    saveEmails(filteredEmails);
  },

  restoreFromTrash: async (id: string, targetFolder: FolderType): Promise<void> => {
    await delay();
    const emails = getStoredEmails();
    const email = emails.find(e => e.id === id);
    if (email) {
      email.folder = targetFolder;
      saveEmails(emails);
    }
  }
};

// Initialize storage on module load
initializeStorage();
