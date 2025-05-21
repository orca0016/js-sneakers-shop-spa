export const isPasswordValid = (value) => {
  const hasSpecial = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(value);
  const hasNumber = /[0-9]/.test(value);
  const hasUpper = /[A-Z]/.test(value);
  const hasLower = /[a-z]/.test(value);
  return hasSpecial && hasNumber && hasUpper && hasLower && value.length >= 8;
};