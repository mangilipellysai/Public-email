import { Email, User } from '../types/email';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    password: 'password123'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com'
  },
  {
    id: '3',
    name: 'Bob Johnson',
    email: 'bob.johnson@example.com'
  },
  {
    id: '4',
    name: 'Alice Williams',
    email: 'alice.williams@example.com'
  },
  {
    id: '5',
    name: 'Charlie Brown',
    email: 'charlie.brown@example.com'
  }
];

export const mockEmails: Email[] = [
  {
    id: '1',
    from: mockUsers[1],
    to: [mockUsers[0]],
    subject: 'Welcome to our new email client!',
    body: 'Hi John,\n\nWelcome to our brand new email client! We\'re excited to have you here. This platform offers a clean and intuitive interface for managing all your emails.\n\nKey features:\n- Organize emails into folders\n- Search and filter functionality\n- Compose and draft emails\n- Thread view for conversations\n\nLet us know if you have any questions!\n\nBest regards,\nJane Smith',
    timestamp: new Date('2024-12-10T09:30:00'),
    isRead: false,
    isStarred: true,
    folder: 'inbox',
    threadId: 'thread-1'
  },
  {
    id: '2',
    from: mockUsers[2],
    to: [mockUsers[0]],
    subject: 'Q4 Project Updates',
    body: 'Hi John,\n\nI wanted to share the latest updates on our Q4 projects. We\'ve made significant progress on the client portal and the new dashboard features are nearly complete.\n\nCould we schedule a meeting next week to discuss the rollout plan?\n\nThanks,\nBob',
    timestamp: new Date('2024-12-10T08:15:00'),
    isRead: false,
    isStarred: false,
    folder: 'inbox',
    threadId: 'thread-2'
  },
  {
    id: '3',
    from: mockUsers[3],
    to: [mockUsers[0]],
    subject: 'Invoice #12345 - December 2024',
    body: 'Dear John,\n\nPlease find attached the invoice for December 2024. The payment is due by December 20th.\n\nTotal Amount: $2,500.00\n\nIf you have any questions, please don\'t hesitate to reach out.\n\nBest regards,\nAlice Williams\nAccounting Department',
    timestamp: new Date('2024-12-09T14:20:00'),
    isRead: true,
    isStarred: false,
    folder: 'inbox',
    attachments: [
      {
        id: 'att-1',
        name: 'invoice_12345.pdf',
        size: 245000,
        type: 'application/pdf',
        url: '#'
      }
    ],
    threadId: 'thread-3'
  },
  {
    id: '4',
    from: mockUsers[4],
    to: [mockUsers[0]],
    subject: 'Team Lunch This Friday?',
    body: 'Hey John,\n\nWe\'re planning a team lunch this Friday at 12:30 PM. Would you like to join us? We\'re thinking of trying that new Italian restaurant downtown.\n\nLet me know if you can make it!\n\nCheers,\nCharlie',
    timestamp: new Date('2024-12-09T11:45:00'),
    isRead: true,
    isStarred: false,
    folder: 'inbox',
    threadId: 'thread-4'
  },
  {
    id: '5',
    from: mockUsers[0],
    to: [mockUsers[2]],
    subject: 'Re: Q4 Project Updates',
    body: 'Hi Bob,\n\nThanks for the update! I\'m available next Tuesday or Wednesday afternoon. Let me know what works best for you.\n\nLooking forward to seeing the progress.\n\nBest,\nJohn',
    timestamp: new Date('2024-12-09T16:30:00'),
    isRead: true,
    isStarred: false,
    folder: 'sent',
    threadId: 'thread-2',
    replyTo: '2'
  },
  {
    id: '6',
    from: mockUsers[0],
    to: [mockUsers[1]],
    subject: 'Thank you!',
    body: 'Hi Jane,\n\nThank you for the warm welcome! The email client looks great and I\'m excited to start using it.\n\nBest,\nJohn',
    timestamp: new Date('2024-12-09T10:00:00'),
    isRead: true,
    isStarred: false,
    folder: 'sent',
    threadId: 'thread-1',
    replyTo: '1'
  },
  {
    id: '7',
    from: mockUsers[0],
    to: [mockUsers[3]],
    subject: 'Draft: Meeting Agenda',
    body: 'Hi Alice,\n\nI wanted to discuss the following items in our next meeting:\n\n1. Budget review\n2. Timeline updates\n3. Resource allocation\n\n',
    timestamp: new Date('2024-12-08T15:00:00'),
    isRead: true,
    isStarred: false,
    folder: 'drafts',
    threadId: 'thread-5'
  },
  {
    id: '8',
    from: mockUsers[1],
    to: [mockUsers[0]],
    subject: 'Old Newsletter - October',
    body: 'This is an old newsletter from October that you can delete.',
    timestamp: new Date('2024-10-15T09:00:00'),
    isRead: true,
    isStarred: false,
    folder: 'trash',
    threadId: 'thread-6'
  },
  {
    id: '9',
    from: mockUsers[2],
    to: [mockUsers[0]],
    subject: 'Quarterly Review Meeting',
    body: 'Hi John,\n\nLet\'s schedule our quarterly review meeting. I have some great insights to share about our performance this quarter.\n\nHow does next Friday at 2 PM sound?\n\nBest,\nBob',
    timestamp: new Date('2024-12-08T13:20:00'),
    isRead: false,
    isStarred: false,
    folder: 'inbox',
    threadId: 'thread-7'
  },
  {
    id: '10',
    from: mockUsers[3],
    to: [mockUsers[0]],
    subject: 'New Security Updates',
    body: 'Dear Team,\n\nWe\'ve implemented new security measures across all our systems. Please review the attached documentation and update your passwords accordingly.\n\nThe new policies will take effect on Monday.\n\nRegards,\nAlice Williams\nIT Security Team',
    timestamp: new Date('2024-12-08T10:00:00'),
    isRead: false,
    isStarred: true,
    folder: 'inbox',
    threadId: 'thread-8'
  }
];

// Function to get emails by folder
export const getEmailsByFolder = (folder: string): Email[] => {
  return mockEmails.filter(email => email.folder === folder);
};

// Function to get email by ID
export const getEmailById = (id: string): Email | undefined => {
  return mockEmails.find(email => email.id === id);
};

// Function to get emails in a thread
export const getEmailThread = (threadId: string): Email[] => {
  return mockEmails
    .filter(email => email.threadId === threadId)
    .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
};

// Function to search emails
export const searchEmails = (query: string, folder?: string): Email[] => {
  const lowercaseQuery = query.toLowerCase();
  return mockEmails.filter(email => {
    const matchesFolder = folder ? email.folder === folder : true;
    const matchesQuery = 
      email.subject.toLowerCase().includes(lowercaseQuery) ||
      email.body.toLowerCase().includes(lowercaseQuery) ||
      email.from.name.toLowerCase().includes(lowercaseQuery) ||
      email.from.email.toLowerCase().includes(lowercaseQuery);
    return matchesFolder && matchesQuery;
  });
};
