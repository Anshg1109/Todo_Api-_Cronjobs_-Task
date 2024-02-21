import userRoutes from "./user/userRoutes.js";
import authRoutes from "./user/authRoutes.js";

const routes = (app) => {
    app.use("/api/auth", authRoutes);
    app.use("/api/user", userRoutes);
};

export default routes;