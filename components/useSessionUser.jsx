"use client";

import { useUser } from "@clerk/nextjs";

const useSessionUser = () => {
  const data = useUser();

  const userId = data?.user?.publicMetadata.userId;

  return { userId };
};

export default useSessionUser;
