'use client';

import React, { useState, useCallback } from 'react';
import { BiDotsHorizontal } from 'react-icons/bi';
import axios from 'axios';

interface SubscriptionActionsProps {
  itemId: string;
  actions: { label: string; onClick: (id: string) => void }[];
}

const SubscriptionActions: React.FC<SubscriptionActionsProps> = ({ itemId, actions }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <div className="relative">
      <div
        onClick={toggleOpen}
        className="border border-neutral-300 rounded-full cursor-pointer hover:shadow-md transition bg-gray-100 flex items-center justify-center"
      >
        <BiDotsHorizontal className="size-6" />
      </div>

      {isOpen && (
        <div
          className="absolute rounded-lg shadow-xl bg-gray-100 overflow-hidden left-1/2 transform -translate-x-1/2 mt-2 w-45 text-sm z-10 whitespace-nowrap"
        >
          <div className="flex flex-col cursor-pointer">
            {actions.map((action, index) => (
              <button
                key={index}
                onClick={() => action.onClick(itemId)}
                className={`block px-6 py-4 text-center hover:bg-gray-200 transition 
                  ${
                    action.label === 'View'
                      ? 'bg-sky-900 hover:bg-sky-950 text-white'
                      : 'bg-red-600 hover:bg-red-700 text-white'
                  }`}
              >
                {action.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SubscriptionActions;
