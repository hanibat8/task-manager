export const validateEmail = (rule: any, value: string, callback: any) => {
    // Email regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value || emailRegex.test(value)) {
      callback(); 
    } else {
      callback('Invalid email format'); 
    }
  };

export const validatePassword = (rule: any, value: string, callback: any) => {
    if (!value || value.length >= 8) {
      callback(); 
    } else {
      callback('Password must be at least 8 characters long'); 
    }
};