/**
 * Compresses an image file to reduce its size
 * @param {File} file - The image file to compress
 * @param {number} maxWidth - Maximum width for the compressed image (default: 1920)
 * @param {number} maxHeight - Maximum height for the compressed image (default: 1080)
 * @param {number} quality - Compression quality 0-1 (default: 0.8)
 * @returns {Promise<File>} - Compressed image file
 */
export const compressImage = (file, maxWidth = 1920, maxHeight = 1080, quality = 0.8) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const img = new Image();
      
      img.onload = () => {
        // Calculate new dimensions
        let { width, height } = img;
        
        if (width > maxWidth || height > maxHeight) {
          if (width > height) {
            height = (height * maxWidth) / width;
            width = maxWidth;
          } else {
            width = (width * maxHeight) / height;
            height = maxHeight;
          }
        }
        
        // Create canvas and compress
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        
        // Convert to blob
        canvas.toBlob(
          (blob) => {
            if (blob) {
              // Create a new File object with the compressed blob
              const compressedFile = new File([blob], file.name, {
                type: file.type,
                lastModified: Date.now(),
              });
              resolve(compressedFile);
            } else {
              reject(new Error('Failed to compress image'));
            }
          },
          file.type,
          quality
        );
      };
      
      img.onerror = () => {
        reject(new Error('Failed to load image'));
      };
      
      img.src = e.target.result;
    };
    
    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };
    
    reader.readAsDataURL(file);
  });
};

/**
 * Converts a base64 data URL to a File object
 * @param {string} dataUrl - Base64 data URL
 * @param {string} filename - Name for the file
 * @returns {Promise<File>} - File object
 */
export const dataURLtoFile = (dataUrl, filename) => {
  return new Promise((resolve, reject) => {
    fetch(dataUrl)
      .then((res) => res.blob())
      .then((blob) => {
        const file = new File([blob], filename, { type: blob.type });
        resolve(file);
      })
      .catch(reject);
  });
};

