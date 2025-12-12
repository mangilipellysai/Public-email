export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
}

export interface Email {
  id: string;
  from: User;
  to: User[];
  cc?: User[];
  bcc?: User[];
  subject: string;
  body: string;
  timestamp: Date;
  isRead: boolean;
  isStarred: boolean;
  folder: 'inbox' | 'sent' | 'drafts' | 'trash';
  attachments?: Attachment[];
  threadId?: string;
  replyTo?: string;
}

export interface Attachment {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
}

export interface Draft {
  id: string;
  to: string;
  cc?: string;
  bcc?: string;
  subject: string;
  body: string;
  timestamp: Date;
}

export type FolderType = 'inbox' | 'sent' | 'drafts' | 'trash';
