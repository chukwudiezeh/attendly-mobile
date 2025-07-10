export const validateEmail = (email: string): { isValid: boolean, message: string } => {
  const trimmed = email.trim();

  if (!trimmed) return { isValid: false, message: 'Email is required' };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(trimmed)) return { isValid: false, message: 'Invalid email address' };

  return { isValid: true, message: '' };
}

export const validatePassword = (password: string): { isValid: boolean, message: string } => {
  const trimmed = password.trim();

  if (!trimmed) return { isValid: false, message: 'Password is required' };

  if (trimmed.length < 8) {
    return {
      isValid: false,
      message: 'Password must be at least 8 characters long',
    };
  }

  return { isValid: true, message: '' };
}

export const validateName = (name: string, field: string): { isValid: boolean, message: string } => {
  const trimmed = name.trim();

  if (!trimmed) return { isValid: false, message: `${field} is required` };

  if (trimmed.length < 2) {
    return {
      isValid: false,
      message: `${field} must be at least 2 characters long`,
    };
  }

  return { isValid: true, message: '' };
}
export const validateMatricNumber = (matricNumber: string): { isValid: boolean, message: string } => {
  const trimmed = matricNumber.trim();

  if (!trimmed) return { isValid: false, message: 'Matric Number is required' };

  if (trimmed.length < 8) {
    return {
      isValid: false,
      message: 'Matric Number must be at least 8 characters long',
    };
  }

  return { isValid: true, message: '' };
}
export const validateRole = (role: string): { isValid: boolean, message: string } => {
  const trimmed = role.trim();
  if (!trimmed) return { isValid: false, message: 'Role is required' };   
  return { isValid: true, message: '' };
}
export const validateDepartment = (department: string): { isValid: boolean, message: string } => {
  const trimmed = department.trim();
  if (!trimmed) return { isValid: false, message: 'Department is required' };   
  return { isValid: true, message: '' };
}

export const validatePasswordsMatch = (password: string, confirmPassword: string): { isValid: boolean, message: string } => {
  if (password !== confirmPassword) {
    return { isValid: false, message: 'Passwords do not match' };
  }
  return { isValid: true, message: '' };
}