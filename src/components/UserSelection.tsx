import React from 'react';
import { User } from '../types';
import { mockUsers } from '../data/mockData';

interface UserSelectionProps {
  selectedUser: User | null;
  onUserSelect: (user: User) => void;
}

export const UserSelection: React.FC<UserSelectionProps> = ({
  selectedUser,
  onUserSelect
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-yellow-400 rounded-lg flex items-center justify-center">
          <span className="text-xl">👤</span>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Kullanıcı Seçimi</h3>
          <p className="text-sm text-gray-600">Roaming planı yapılacak hattı seçin</p>
        </div>
      </div>

      <div className="space-y-3">
        {mockUsers.map((user) => (
          <div
            key={user.id}
            onClick={() => onUserSelect(user)}
            className={`
              p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:shadow-md
              ${selectedUser?.id === user.id
                ? 'border-yellow-400 bg-yellow-50 ring-2 ring-yellow-400/20'
                : 'border-gray-200 hover:border-yellow-300'
              }
            `}
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">{user.name}</h4>
                <p className="text-sm text-gray-600">{user.phone}</p>
                <p className="text-xs text-gray-500 mt-1">{user.currentPlan}</p>
              </div>
              
              {selectedUser?.id === user.id && (
                <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {selectedUser && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-sm font-medium text-green-800">
              {selectedUser.name} seçildi
            </span>
          </div>
        </div>
      )}
    </div>
  );
};