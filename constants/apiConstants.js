const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: true,
  sameSite: "none",
  methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS"],
};

const CORS_OPTIONS = {
  origin: [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
  ],
  credentials: true,
};

export { COOKIE_OPTIONS, CORS_OPTIONS };
