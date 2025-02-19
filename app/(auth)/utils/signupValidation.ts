interface ValidationResult {
    isValid: boolean;
    message: string;
  }

interface UserCredentialObject {
    email: string;
    name: string;
    password: string;
    confirmPassword: string;
    size: string;
  }
  
  export function validateSignupForm(userCredentials: UserCredentialObject): ValidationResult {
    const {email, name, password, confirmPassword, size} = userCredentials;
    
    if (!email.trim() || !password.trim() || !confirmPassword.trim() || !size.trim() || !name.trim()) {
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
  
    if (password.length < 8 || confirmPassword.length < 8) {
      return {
        isValid: false,
        message: "Password must be at least 8 characters long.",
      };
    }

    if (password !== confirmPassword) {
      return {
        isValid: false,
        message: "Passwords do not match.",
      };
    }
  
    return {
      isValid: true,
      message: "Form is valid.",
    };
  }
  