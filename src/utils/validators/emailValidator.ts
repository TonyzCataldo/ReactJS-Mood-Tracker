export function emailValidation(email: string): string | null {
  if (!email || !/^\S+@\S+\.\S+$/.test(email))
    return "Please enter a valid email address.";
  return null;
}
