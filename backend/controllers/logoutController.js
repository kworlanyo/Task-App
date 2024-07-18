export default function logoutUser(req, res) {
  res.clearCookie("accessCookie", { path: "/", secure: true, sameSite: "Strict" });
  res.clearCookie("refreshCookie", { path: "/", secure: true, sameSite: "Strict" });
  res.status(200).json({ message: "Logged out successfully" });
}
