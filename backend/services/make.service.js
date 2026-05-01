import axios from 'axios';
import { YoutubeTranscript } from 'youtube-transcript';

// URL-i .env faylından və ya birbaşa bura yerləşdirərək istifadə et
const MAKE_WEBHOOK_URL = process.env.MAKE_WEBHOOK_URL || "SENİN_WEBHOOK_URL_BURA";

export const generateFromMake = async (youtubeUrl) => {
  try {
    // 1. Pulsuz npm paketi ilə mətni (transcript) çəkirik
    console.log("Transcript çəkilir...");
    const transcriptList = await YoutubeTranscript.fetchTranscript(youtubeUrl);

    // 3. Gələn massiv şəklindəki məlumatları təmiz mətnə çeviririk
    const fullTranscript = transcriptList.map(item => item.text).join(' ');
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