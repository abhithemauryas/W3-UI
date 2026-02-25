/**
 * Helper function that Copies the text to clipboard
 * @param {string} text
 */
export const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text);
};
