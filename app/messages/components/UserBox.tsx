"use client";

import LoadingModal from "@/app/components/LoadingModal";
import Profile from "@/app/components/Profile";
import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

interface UserBoxProps {
  data: User;
  onStartConversation: (conversationId: string) => void; // Callback for conversation creation
  autoStartConversation?: boolean; // Prop to control auto-start
}

const UserBox: React.FC<UserBoxProps> = ({
  data,
  onStartConversation,
  autoStartConversation,
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = useCallback(() => {
    setIsLoading(true);

    axios
      .post("/api/conversations", {
        userId: data.id,
      })
      .then((response) => {
        onStartConversation(response.data.id); // Pass the conversation ID to the parent
        router.push(`/conversations/${response.data.id}`);
      })
      .finally(() => setIsLoading(false));
  }, [data.id, router, onStartConversation]);

  // Automatically start conversation if autoStartConversation prop is true
  useEffect(() => {
    if (autoStartConversation) {
      handleClick();
    }
  }, [autoStartConversation, handleClick]);

  return (
    <>
      {isLoading && <LoadingModal />}

      <div
        onClick={handleClick}
        className="w-full relative flex items-center space-x-3 bg-white p-3 hover:bg-neutral-100 rounded-lg transition cursor-pointer"
      >
        <Profile user={data} />
        <div className="min-w-0 flex-1">
          <div className="focus:outline-none">
            <div className="flex justify-between items-center mb-1">
              <p className="text-sm font-medium text-gray-900">{data.name}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserBox;
