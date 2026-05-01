import { generateFromMake } from '../services/make.service.js';

export const generateScript = async (req, res, next) => {
  try {
    const { youtubeUrl } = req.body;

    if (!youtubeUrl) {
      return res.status(400).json({ error: 'YouTube linki qeyd olunmalıdır' });
    }

    // A simple validation for a YouTube URL
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
    if (!youtubeRegex.test(youtubeUrl)) {
      return res.status(400).json({ error: 'Etibarlı YouTube linki daxil edin' });
    }

    // Call Make.com service
    const result = await generateFromMake(youtubeUrl);

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
