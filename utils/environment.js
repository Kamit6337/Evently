const environment = {
  MONGODB_URI: process.env.MONGODB_URI,
  WEBHOOK_SECRET: process.env.WEBHOOK_SECRET,
  ECNRYPTION_METHOD: process.env.ECNRYPTION_METHOD,
  ENCRYPTION_SECRET_IV: process.env.ENCRYPTION_SECRET_IV,
  ENCRYPTION_SECRET_KEY: process.env.ENCRYPTION_SECRET_KEY,
};

export default environment;
