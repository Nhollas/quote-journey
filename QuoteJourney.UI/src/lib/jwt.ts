import jwt from "jsonwebtoken";

export function generateAccessToken() {
  return jwt.sign({ anonymous: true }, process.env.SECRET_TOKEN!, {
    expiresIn: 30,
  });
}

export function generateRefreshToken() {
  return jwt.sign({ anonymous: true }, process.env.SECRET_REFRESH_TOKEN!, {
    expiresIn: 60 * 60 * 24 * 7,
  });
}

export async function verifyToken(token: string, res: any) {
  try {
    const decoded = jwt.verify(token, process.env.SECRET_TOKEN!);
    return decoded;
  } catch (err) {
    return res.status(405).send("Token is invalid");
  }
}
