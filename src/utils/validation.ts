const regex = {
    fullName: {
        pattern: /^[a-zA-Z\s]{3,}$/,
        message: 'Full name must be at least 3 characters long and contain only letters and spaces.',
        emptyMessage: 'Full name is required.',
    },
    email: {
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: 'Please enter a valid email address.',
        emptyMessage: 'Email address is required.',
    }, 
    password: {
        pattern: /^.{6,}$/,
        message: 'Password must be at least 6 characters.',
        emptyMessage: 'Password is required.',
    },
}

export const validateField = (fieldName: string, value: string): string | null => {
    const fieldRegex = (regex as any)[fieldName];
    if (!fieldRegex) return null;

    if (!value) {
        return fieldRegex.emptyMessage;
    }

    if (!fieldRegex.pattern.test(value)) {
        return fieldRegex.message;
    }

    return null;
}