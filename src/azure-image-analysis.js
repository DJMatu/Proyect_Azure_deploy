// azure-image-analysis.js
const analyzeImage = async (imageUrl) => {
    const endpoint = 'https://matu.cognitiveservices.azure.com/vision/v3.0/analyze';
    const apiKey = 'de567fc51d554becac36a426ff21962f';
  
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Ocp-Apim-Subscription-Key': apiKey,
        },
        body: JSON.stringify({
          url: imageUrl,
          visualFeatures: 'Categories,Description,Color',
        }),
      });
  
      if (!response.ok) {
        throw new Error(`Error HTTP! Estado: ${response.status}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error al analizar la imagen:', error);
      throw error;
    }
  };
  
  export default analyzeImage;
  