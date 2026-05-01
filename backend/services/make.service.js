import axios from 'axios';
import { YoutubeTranscript } from 'youtube-transcript';

// URL-i .env faylından və ya birbaşa bura yerləşdirərək istifadə et
const MAKE_WEBHOOK_URL = process.env.MAKE_WEBHOOK_URL || "SENİN_WEBHOOK_URL_BURA";

export const generateFromMake = async (youtubeUrl) => {
  try {
    // 1. YouTube ID-sini ayırırıq (daha güclü regex ilə)
    const match = youtubeUrl.match(/(?:youtu\.be\/|youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i);
    const videoId = match ? match[1] : null;

    if (!videoId) throw new Error("Düzgün YouTube linki daxil edilməyib.");

    console.log(`RapidAPI vasitəsilə ${videoId} ID-li video üçün transcript çəkilir...`);
    
    // 2. RapidAPI ilə mətni çəkirik
    const rapidApiOptions = {
      method: 'GET',
      url: 'https://youtube-transcript3.p.rapidapi.com/api/transcript',
      params: { videoId: videoId },
      headers: {
        'x-rapidapi-host': 'youtube-transcript3.p.rapidapi.com',
        'x-rapidapi-key': process.env.RAPIDAPI_KEY || '6c68fe0ff0mshdefc3be1c3a2443p1ce0c1jsnb9f8d8ea6b9b'
      }
    };

    const transcriptResponse = await axios.request(rapidApiOptions);
    
    if (transcriptResponse.data.success === false) {
        throw new Error(transcriptResponse.data.error || transcriptResponse.data.message || "Bu videonun alt yazısı yoxdur.");
    }

    if (!transcriptResponse.data.transcript) {
        throw new Error("RapidAPI cavab qaytarmadı.");
    }

    // 3. Gələn massiv şəklindəki məlumatları təmiz mətnə çeviririk
    const fullTranscript = transcriptResponse.data.transcript.map(item => item.text).join(' ');
    console.log("Transcript çəkildi, Make-ə göndərilir...");

    // 4. Make.com Webhook-una YouTube linki əvəzinə birbaşa mətni (transcript) göndəririk
    if (MAKE_WEBHOOK_URL) {
      const response = await axios.post(MAKE_WEBHOOK_URL, {
        transcript: fullTranscript
      });

      console.log("Make.com-dan gələn cavab:", response.data); 
      
      if (typeof response.data === 'string' && response.data.trim() === 'Accepted') {
         throw new Error("Make.com qəbul etdi, lakin JSON qaytarmadı (Ssenari işə düşmür və ya yarımçıq qırılır. Webhook Response modulunu və digər modulları Make.com-da yoxlayın)");
      }

      return response.data;
    }

    throw new Error('Make.com webhook URL tapılmadı');

  } catch (error) {
    console.error("Backend Xətası:", error.message);
    throw new Error(error.message || 'Video emal edilə bilmədi və ya bu videoda alt yazı yoxdur.');
  }
};