// "use client"; // Marking this as a client component

// import { User } from "@prisma/client";
// import UserBox from "./UserBox";
// import React, { useState } from "react";

// interface UserListProps {
//   items: User[];
//   onStartConversation: (userId: string) => void; // Prop to handle conversation start
// }

// const UserList: React.FC<UserListProps> = ({ items, onStartConversation }) => {
//   const [searchQuery, setSearchQuery] = useState("");

//   // Function to handle search input changes
//   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchQuery(e.target.value);
//   };

//   // Filter items based on the search query
//   const filteredItems = items.filter(
//     (item) => item.name?.toLowerCase().includes(searchQuery.toLowerCase()) // Use optional chaining
//   );

//   return (
//     <aside className="fixed inset-y-0 pb-20 pt-28 lg:pb-0 lg:left-20 lg:w-80 lg:block overflow-y-auto border-r border-gray-200 block w-full left-0">
//       <div className="px-5">
//         <div className="flex-col">
//           <div className="text-2xl font-bold text-neutral-800 py-4">People</div>
//           <input
//             type="text"
//             placeholder="Search..."
//             value={searchQuery}
//             onChange={handleSearchChange}
//             className="border p-2 rounded w-full mb-4"
//           />
//         </div>

//         {filteredItems.length > 0 ? (
//           filteredItems.map((item) => (
//             <UserBox
//               key={item.id}
//               data={item}
//               onStartConversation={() => onStartConversation?.(item.id)} // Pass the callback prop ito yung binago ko
//             />
//           ))
//         ) : (
//           <p className="text-gray-500">No users found.</p> // Feedback when no results are found
//         )}
//       </div>
//     </aside>
//   );
// };

// export default UserList;

// app/messages/components/UserList.tsx
"use client"; // Mark this as a client component

import React, { useState } from "react";
import { User } from "@prisma/client";
import UserBox from "./UserBox";

interface UserListProps {
  items: User[];
}

const UserList: React.FC<UserListProps> = ({ items }) => {
  const [searchQuery, setSearchQuery] = useState("");

  // Define onStartConversation function here for handling the event
  const handleStartConversation = (userId: string) => {
    console.log("Starting conversation with user:", userId);
    // Add logic to start the conversation here
  };

  // Function to handle search input changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Filter items based on the search query
  const filteredItems = items.filter(
    (item) => item.name?.toLowerCase().includes(searchQuery.toLowerCase()) // Use optional chaining
  );

  return (
    <aside className="fixed inset-y-0 pb-20 pt-28 lg:pb-0 lg:left-20 lg:w-80 lg:block overflow-y-auto border-r border-gray-200 block w-full left-0">
      <div className="px-5">
        <div className="flex-col">
          <div className="text-2xl font-bold text-neutral-800 py-4">People</div>
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="border p-2 rounded w-full mb-4"
          />
        </div>

        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <UserBox
              key={item.id}
              data={item}
              onStartConversation={() => handleStartConversation(item.id)}
            />
          ))
        ) : (
          <p className="text-gray-500">No users found.</p>
        )}
      </div>
    </aside>
  );
};

export default UserList;

