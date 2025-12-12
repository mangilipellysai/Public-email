import React from 'react';
import { Inbox, Send, FileText, Trash2, Star, Mail } from 'lucide-react';
import { useEmail } from '../contexts/EmailContext';
import { FolderType } from '../types/email';

const Sidebar: React.FC = () => {
  const { currentFolder, loadEmails } = useEmail();

  const menuItems = [
    { id: 'inbox' as FolderType, label: 'Inbox', icon: Inbox, color: 'text-blue-600' },
    { id: 'sent' as FolderType, label: 'Sent', icon: Send, color: 'text-green-600' },
    { id: 'drafts' as FolderType, label: 'Drafts', icon: FileText, color: 'text-yellow-600' },
    { id: 'trash' as FolderType, label: 'Trash', icon: Trash2, color: 'text-red-600' }
  ];

  const handleFolderClick = (folder: FolderType) => {
    loadEmails(folder, 1);
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-full flex flex-col">
      <div className="p-4">
        <div className="flex items-center gap-2 mb-6">
          <Mail className="w-8 h-8 text-blue-600" />
          <span className="text-xl">Mail</span>
        </div>
      </div>

      <nav className="flex-1 px-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentFolder === item.id;

          return (
            <button
              key={item.id}
              onClick={() => handleFolderClick(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-colors ${
                isActive
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? item.color : 'text-gray-500'}`} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-200">
        <div className="text-xs text-gray-500">
          <p>Storage: 2.5 GB of 15 GB used</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
