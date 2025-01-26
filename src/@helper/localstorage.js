import jwt_decode from "jwt-decode";

const TOKEN_NAME = "TOKEN";

const __deocde_token = (token) => {
  return jwt_decode(token);
};

const get_token = () => {
  return localStorage.getItem(TOKEN_NAME);
};

const get_user_name = () => {
  const token = get_token();
  if (token) {
    const decoded_token = __deocde_token(token);

    return decoded_token.username;
  }
  return null;
};

const set_token = (token) => {
  if (!token) return;
  localStorage.setItem(TOKEN_NAME, token);
};

const remove_token = () => {
  localStorage.removeItem(TOKEN_NAME);
};

export { remove_token, set_token, get_token, get_user_name };
