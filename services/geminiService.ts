import { GoogleGenAI, Part, GenerateContentResponse } from "@google/genai";
import type { ListingData } from '../types';

// Esto lee la clave API de forma segura desde Netlify o tu archivo .env local
const apiKey = import.meta.env.VITE_API_KEY as string;

if (!apiKey) {
    console.error("VITE_API_KEY environment variable not set. The app will not work.");
    // Opcional: podrías mostrar un error en la UI aquí
}

const ai = new GoogleGenAI({ apiKey });

const fileToGenerativePart = async (file: File): Promise<Part> => {
    const base64EncodedData = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
        reader.onerror = (error) => reject(new Error(`Error reading file: ${error}`));
        reader.readAsDataURL(file);
    });

    return {
        inlineData: {
            data: base64EncodedData,
            mimeType: file.type,
        },
    };
};

export const generateListingContent = async (
    images: File[],
    data: ListingData
): Promise<{ description: string; priceSuggestion: string; sources: GenerateContentResponse['candidates'][0]['groundingMetadata']['groundingChunks'] }> => {
    
    if (!apiKey) {
        throw new Error("La instancia de la IA de Gemini no está inicializada. Asegúrate de que la variable de entorno VITE_API_KEY esté configurada en Netlify.");
    }
    
    const imageParts = await Promise.all(images.map(fileToGenerativePart));

    const descriptionPrompt = `
      Actúa como un copywriter inmobiliario experto en el mercado español.
      A partir de las siguientes imágenes y datos, genera una descripción atractiva y vendedora para un anuncio inmobiliario.
      El tono debe ser: "${data.tone}".
      
      Datos de la propiedad:
      - Dirección/Zona: ${data.address}
      - Tipo de inmueble: ${data.propertyType}
      - Número de habitaciones: ${data.rooms}
      - Precio de venta deseado por el propietario: ${data.price}
      
      Extrae características clave de las imágenes (luminosidad, estado de reforma, tipo de suelo, vistas, etc.) y úsalas para enriquecer el texto.
      Estructura el texto en párrafos cortos y fáciles de leer. Finaliza con una llamada a la acción invitando a una visita.
      No inventes características que no se puedan deducir de los datos o las imágenes.
      La descripción debe tener entre 150 y 250 palabras. El idioma de salida debe ser español.
    `;

    const descriptionResponsePromise = ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: { parts: [...imageParts, { text: descriptionPrompt }] },
    });

    const pricePrompt = `
      Actúa como un tasador inmobiliario experto en el mercado de España.
      Basándote en datos de mercado actuales, proporciona una estimación de precio de venta para la siguiente propiedad.
      Devuelve ÚNICAMENTE un rango de precio en euros (por ejemplo, "Entre 250.000€ y 275.000€"). No añadas ninguna otra palabra o explicación.
      
      Datos de la propiedad:
      - Dirección/Zona: ${data.address}
      - Tipo de inmueble: ${data.propertyType}
      - Número de habitaciones: ${data.rooms}
    `;

    const priceResponsePromise = ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: { parts: [{text: pricePrompt }] },
        config: {
            tools: [{ googleSearch: {} }],
        },
    });

    const [descriptionResponse, priceResponse] = await Promise.all([descriptionResponsePromise, priceResponsePromise]);

    const description = descriptionResponse.text;
    const priceSuggestion = priceResponse.text;
    const sources = priceResponse.candidates?.[0]?.groundingMetadata?.groundingChunks;

    return { description, priceSuggestion, sources };
};