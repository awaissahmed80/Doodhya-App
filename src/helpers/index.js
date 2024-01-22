export const getInitials = (name) => {
    const initials = name
    .match(/\b\w/g) // Match word boundary followed by a single word character
    .join('') // Join the matched characters
    .toUpperCase(); // Convert to uppercase

  return initials.substring(0, 2); // Take the first two characters as initials
}


export * from './showToast'
export * from './getAuthToken'
export * from './setAuthToken'