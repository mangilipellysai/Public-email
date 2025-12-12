# Professional Email Client Application

A complete, feature-rich email client built with React, TypeScript, and TailwindCSS. This application provides a Gmail-like experience with authentication, email management, search, and more.

## Features

### ✨ Core Functionality
- **Authentication System**: Login and Signup with form validation
- **Email Management**: Inbox, Sent, Drafts, and Trash folders
- **Compose Email**: Rich compose interface with Cc, Bcc support
- **Email Threading**: View email conversations in thread format
- **Reply & Forward**: Reply, Reply All, and Forward functionality
- **Search**: Real-time email search across all folders
- **Pagination**: Efficient pagination for large email lists
- **Star Emails**: Mark important emails with stars
- **Read/Unread Status**: Track email read status
- **Draft Auto-save**: Save drafts for later
- **Attachments Display**: View email attachments with file information

### 🎨 UI/UX Features
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Clean Interface**: Modern, intuitive Gmail-inspired design
- **Real-time Updates**: Instant feedback for all actions
- **Toast Notifications**: User-friendly success/error messages
- **Minimizable Compose**: Minimize compose window while browsing emails
- **Loading States**: Smooth loading indicators
- **Mobile Sidebar**: Collapsible sidebar for mobile devices

### 🔒 Security & Data
- **LocalStorage Persistence**: Emails and user data persist across sessions
- **Password Protection**: Secure authentication system
- **User Context**: Global authentication state management
- **Protected Routes**: Route guards for authenticated pages

## Project Structure

```
/
├── components/
│   ├── Sidebar.tsx           # Navigation sidebar with folders
│   ├── Navbar.tsx            # Top navigation with search
│   ├── EmailCard.tsx         # Individual email preview card
│   ├── EmailList.tsx         # Email list with pagination
│   ├── EmailViewer.tsx       # Full email viewer with thread support
│   └── ComposeModal.tsx      # Email composition modal
│
├── pages/
│   ├── LoginPage.tsx         # Login page
│   ├── SignupPage.tsx        # Signup page
│   └── EmailClientPage.tsx   # Main email interface
│
├── contexts/
│   ├── AuthContext.tsx       # Authentication state management
│   └── EmailContext.tsx      # Email state management
│
├── types/
│   └── email.ts              # TypeScript interfaces
│
├── utils/
│   ├── mockData.ts           # Mock email and user data
│   └── mockApi.ts            # Simulated API functions
│
└── App.tsx                   # Main app with routing
```

## Technologies Used

### Frontend
- **React 18**: Latest React with functional components and hooks
- **TypeScript**: Type-safe development
- **React Router v6**: Client-side routing
- **Context API**: Global state management
- **TailwindCSS**: Utility-first styling
- **Lucide React**: Beautiful icon library
- **Sonner**: Toast notifications

### Data Management
- **LocalStorage**: Client-side data persistence
- **Mock API**: Simulated backend with async operations
- **Mock Data**: Realistic sample emails and users

## Getting Started

### Demo Credentials

The application comes with a demo account pre-configured:

- **Email**: `john.doe@example.com`
- **Password**: `password123`

You can also create a new account using the signup page.

### How to Use

1. **Login**: Use the demo credentials or create a new account
2. **Browse Emails**: Click on any email to view its full content
3. **Compose**: Click the "Compose" button to write a new email
4. **Reply**: Open an email and click Reply/Reply All buttons
5. **Search**: Use the search bar to find specific emails
6. **Folders**: Navigate between Inbox, Sent, Drafts, and Trash
7. **Star Emails**: Click the star icon to mark important emails
8. **Pagination**: Use arrow buttons to navigate through pages

## Key Features Explained

### Authentication Flow
- Login and Signup pages with form validation
- Protected routes redirect unauthenticated users
- User session persists in localStorage
- Automatic redirect to mail page after successful authentication

### Email Management
- **Inbox**: Receive emails (pre-populated with sample data)
- **Sent**: View emails you've sent
- **Drafts**: Save and edit incomplete emails
- **Trash**: Deleted emails with restore functionality

### Compose Email
- To, Cc, Bcc fields with multiple recipient support
- Subject and body composition
- Save as draft functionality
- Reply with quoted original message
- Forward emails with original content
- Minimize compose window to browse emails

### Email Threading
- Emails with the same threadId are grouped together
- View entire conversation in chronological order
- Visual indicators for threaded messages

### Search Functionality
- Real-time search across email content
- Search by subject, body, sender name, or email
- Filter results by current folder
- Clear search to return to folder view

### Pagination
- 20 emails per page
- Previous/Next navigation
- Shows current range and total emails
- Maintains pagination state across folder switches

## Data Persistence

All data is stored in browser's localStorage:
- **email_client_emails**: All email data
- **email_client_users**: User accounts
- **email_client_current_user**: Active session

Data persists across browser sessions and page refreshes.

## Customization

### Adding More Mock Data
Edit `/utils/mockData.ts` to add more sample emails or users.

### Styling
All components use TailwindCSS classes. Modify classes directly in components or extend the theme in your Tailwind configuration.

### Adding Features
- Extend the `Email` interface in `/types/email.ts`
- Add new API methods in `/utils/mockApi.ts`
- Create new components in `/components/`
- Update contexts for state management

## API Simulation

The mock API simulates realistic backend behavior:
- Artificial delays (500ms) to mimic network requests
- Async/await patterns for all operations
- Error handling with try/catch
- Success/failure responses

### Available Mock API Methods

```typescript
// Authentication
mockApi.login(email, password)
mockApi.signup(name, email, password)
mockApi.logout()
mockApi.getCurrentUser()

// Email Operations
mockApi.getEmails(folder, page, limit)
mockApi.getEmailById(id)
mockApi.getEmailThread(threadId)
mockApi.searchEmails(query, folder)
mockApi.sendEmail(emailData)
mockApi.saveDraft(emailData)
mockApi.markAsRead(id, isRead)
mockApi.markAsStarred(id, isStarred)
mockApi.moveToTrash(id)
mockApi.deleteEmail(id)
mockApi.restoreFromTrash(id, targetFolder)
```

## Future Enhancements

Potential features for expansion:
- File attachment upload functionality
- Email filters and labels
- Bulk actions (select multiple emails)
- Advanced search with filters
- Email templates
- Signature support
- Dark mode
- Email scheduling
- Spam folder
- Important/Priority inbox
- Keyboard shortcuts
- Email archiving
- Contact management
- Calendar integration

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

Requires JavaScript enabled and localStorage support.

## Notes

- This is a frontend-only implementation with mock data
- No real emails are sent or received
- Data is stored locally in the browser
- For production use, connect to a real backend API
- Replace mock API calls with actual HTTP requests using fetch or axios

## License

This project is created for demonstration purposes.

---

Built with ❤️ using React, TypeScript, and TailwindCSS
