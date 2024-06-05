import environment from "@utils/environment";
import jwt from "jsonwebtoken";

const generateWebToken = (
  payload,
  {
    secret = environment.NEXTAUTH_SECRET,
    expires = environment.JWT_EXPIRES_IN,
  } = {}
) => {
  const token = jwt.sign({ ...payload, expire: Date.now() + expires }, secret, {
    expiresIn: expires,
  });

  return token;
};

export default generateWebToken;
