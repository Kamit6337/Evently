const environment = {
  MONGODB_URI: process.env.MONGODB_URI,
  WEBHOOK_SECRET: process.env.WEBHOOK_SECRET,
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY:
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
};

export default environment;
