  interface ValidationResult {
    isValid: boolean;
    message: string;
  }
  
  export function validateLoginForm(email: string, password: string): ValidationResult {
    if (!email.trim() || !password.trim()) {
      return {
        isValid: false,
        message: "All fields are required.",
      };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        isValid: false,
        message: "Please enter a valid email address.",
      };
    }
  
    if (password.length < 8) {
      return {
        isValid: false,
        message: "Password must be at least 8 characters long.",
      };
    }
  
    return {
      isValid: true,
      message: "Form is valid.",
    };
  }
  