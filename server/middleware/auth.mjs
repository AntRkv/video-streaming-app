import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  // Получение токена из заголовка Authorization
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) {
    return res.status(403).json({ errors: [{ msg: "No Token, Auth Denied" }] });
  }

  try {
    // Валидация токена
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user; // Данные пользователя из токена
    next();
  } catch (err) {
    res.status(401).json({ errors: [{ msg: "Invalid Token" }] });
  }
};

export default auth;
