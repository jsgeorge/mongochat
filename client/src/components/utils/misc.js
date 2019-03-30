//Server routs
export const CHAT_SERVER = "/api/chats";
export const BRAND_SERVER = "/api/product/brands";
export const CATEGORY_SERVER = "/api/product/categories";
export const USER_SERVER = "/api/users";

export const validate = element => {
  let error = [true, ""];

  if (element.validation.email) {
    const valid = /\S+@\S+\.\S+/.test(element.value);
    const message = `${!valid ? "This field must be valid email" : ""}`;
    error = !valid ? [valid, message] : error;
  }

  if (element.validation.required) {
    const valid = element.value.trim() !== "";
    const message = `${!valid ? "This field is required" : ""}`;
    error = !valid ? [valid, message] : error;
  }
  return error;
};
