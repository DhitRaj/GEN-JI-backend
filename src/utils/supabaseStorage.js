const supabase = require('../config/supabase');

/**
 * Upload a file to Supabase Storage
 * @param {string} bucket - Storage bucket name
 * @param {string} path - File path in bucket
 * @param {Buffer} file - File data
 * @returns {Promise}
 */
const uploadFile = async (bucket, path, file) => {
  try {
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(path, file, {
        cacheControl: '3600',
        upsert: false,
      });
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Upload file error:', error);
    throw error;
  }
};

/**
 * Delete a file from Supabase Storage
 * @param {string} bucket - Storage bucket name
 * @param {string} path - File path in bucket
 * @returns {Promise}
 */
const deleteFile = async (bucket, path) => {
  try {
    const { error } = await supabase.storage
      .from(bucket)
      .remove([path]);
    if (error) throw error;
  } catch (error) {
    console.error('Delete file error:', error);
    throw error;
  }
};

/**
 * Get public URL for a file
 * @param {string} bucket - Storage bucket name
 * @param {string} path - File path in bucket
 * @returns {string} Public URL
 */
const getPublicUrl = (bucket, path) => {
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
};

module.exports = {
  uploadFile,
  deleteFile,
  getPublicUrl,
};
