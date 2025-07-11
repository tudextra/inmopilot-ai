
import { GroundingChunk } from "@google/genai";

export type View = 'home' | 'generator' | 'academy';

export interface ListingData {
    address: string;
    propertyType: string;
    rooms: number;
    price: string;
    tone: string;
}

export interface GenerationResult {
    description: string;
    priceSuggestion: string;
    sources: GroundingChunk[] | undefined;
}

export interface JediPrompt {
    title: string;
    prompt: string;
}
