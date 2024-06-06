import encrypt from "@utils/enncryption/encrypt";
import { cookies } from "next/headers";

const setCookies = (obj) => {
  const createToken = encrypt(obj);

  console.log("createToken", createToken);

  cookies().set("tok", createToken, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

export default setCookies;
