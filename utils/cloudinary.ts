export type CloudinaryUploadResult = {
    secure_url: string;
    public_id: string;
    url: string;
  }
  
  export type CloudinaryUploadResponse = {
    success: boolean;
    urls?: string[];
    error?: string;
  }
  
  /**
   * Upload multiple images to Cloudinary
   * @param files - Array of File objects to upload
   * @param folder - Optional folder name in Cloudinary (defaults to 'dating-app')
   * @returns Promise with upload results
   */
  export async function uploadImagesToCloudinary(
    files: File[],
    folder: string = 'dating-app'
  ): Promise<CloudinaryUploadResponse> {
    if (!files || files.length === 0) {
      return { success: false, error: 'No files provided' };
    }
  
    if (!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME) {
      return { success: false, error: 'Cloudinary configuration missing' };
    }
  
    try {
      const uploadPromises = files.map(async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!);
        formData.append('folder', folder);
        
  
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
          {
            method: 'POST',
            body: formData,
          }
        );
  
        if (!response.ok) {
          throw new Error(`Upload failed: ${response.statusText}`);
        }
  
        const result: CloudinaryUploadResult = await response.json();
        return result.secure_url;
      });
  
      const urls = await Promise.all(uploadPromises);
      
      return {
        success: true,
        urls: urls,
      };
    } catch (error) {
      console.error('Cloudinary upload error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Upload failed',
      };
    }
  }
  
  /**
   * Upload a single image to Cloudinary
   * @param file - File object to upload
   * @param folder - Optional folder name in Cloudinary
   * @returns Promise with upload result
   */
  export async function uploadImageToCloudinary(
    file: File,
    folder: string = 'dating-app'
  ): Promise<{ success: boolean; url?: string; error?: string }> {
    const result = await uploadImagesToCloudinary([file], folder);
    
    if (result.success && result.urls) {
      return { success: true, url: result.urls[0] };
    }
    
    return { success: false, error: result.error };
  }