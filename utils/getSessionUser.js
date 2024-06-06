import { auth } from "@clerk/nextjs/server";

const getSessionUser = () => {
  const { sessionClaims } = auth();

  const userId = sessionClaims?.userId;

  return { userId };
};

export default getSessionUser;
