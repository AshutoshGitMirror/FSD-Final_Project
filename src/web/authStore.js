const tokenKey = "taapsetu.token";
const userKey = "taapsetu.user";

export const authStore = {
  read() {
    const token = localStorage.getItem(tokenKey);
    const userRaw = localStorage.getItem(userKey);
    const user = userRaw ? JSON.parse(userRaw) : null;
    return { token, user };
  },
  write({ token, user }) {
    localStorage.setItem(tokenKey, token);
    localStorage.setItem(userKey, JSON.stringify(user));
  },
  clear() {
    localStorage.removeItem(tokenKey);
    localStorage.removeItem(userKey);
  }
};
