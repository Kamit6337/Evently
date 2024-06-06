import decrypt from "@utils/enncryption/decrypt";
import { cookies } from "next/headers";

const getCookieUser = () => {
  const { value } = cookies().get("tok");

  if (!value) {
    throw new Error("User session out");
  }

  const getToken = decrypt(value);
  return getToken;
};

export default getCookieUser;
