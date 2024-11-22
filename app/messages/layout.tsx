// app/messages/layout.tsx
import Sidebar from "@/app/components/sidebar/Sidebar";
import getUsers from "../actions/getUsers";
import UserList from "./components/UserList";


export default async function MessagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const users = await getUsers();

  return (
    <Sidebar>
      <div className="h-full">
        <UserList items={users} />
        {children}
      </div>
    </Sidebar>
  );
}


// not sure it this is solution - dars
// app/messages/layout.tsx
// import Sidebar from "@/app/components/sidebar/Sidebar";
// import getUsers from "../actions/getUsers";
// import UserList from "./components/UserList";

// export default async function MessagesLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const users = await getUsers();

//   // Define the onStartConversation function
//   const handleStartConversation = (userId: string) => {
//     // Logic to start a conversation, e.g., navigate to a conversation screen or initiate chat
//     console.log("Starting conversation with user:", userId);
//   };

//   return (
//     <Sidebar>
//       <div className="h-full">
//         <UserList items={users} onStartConversation={handleStartConversation} />
//         {children}
//       </div>
//     </Sidebar>
//   );
// }


