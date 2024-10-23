/**
 * Validates an Ethereum address.
 * @param {string} address - The Ethereum address to validate.
 * @returns {boolean} - True if valid, false otherwise.
 */
export const isValidEthereumAddress = (address) => {
    return /^0x[a-fA-F0-9]{40}$/.test(address);
};

/**
 * Validates an email address.
 * @param {string} email - The email address to validate.
 * @returns {boolean} - True if valid, false otherwise.
 */
export const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

/**
 * Validates a token amount.
 * @param {number} amount - The amount to validate.
 * @returns {boolean} - True if valid, false otherwise.
 */
export const isValidTokenAmount = (amount) => {
    return typeof amount === 'number' && amount > 0;
};
