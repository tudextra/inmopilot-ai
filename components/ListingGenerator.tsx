
import React, { useState, useCallback, ChangeEvent, DragEvent } from 'react';
import { ListingData, GenerationResult } from '../types';
import { generateListingContent } from '../services/geminiService';
import { PROPERTY_TYPES, TONES } from '../constants';
import { Icon } from './common/Icon';
import { Card } from './common/Card';
import { Spinner } from './common/Spinner';

interface ListingGeneratorProps {
    onBack: () => void;
}

const CopyButton: React.FC<{ textToCopy: string }> = ({ textToCopy }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(textToCopy);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <button
            onClick={handleCopy}
            className={`absolute top-2 right-2 p-2 rounded-lg transition-colors ${copied ? 'bg-emerald-500 text-white' : 'bg-slate-200 hover:bg-slate-300 text-slate-600'}`}
        >
            {copied ? <Icon icon="check" className="w-5 h-5" /> : <Icon icon="copy" className="w-5 h-5" />}
        </button>
    );
};


const ListingGenerator: React.FC<ListingGeneratorProps> = ({ onBack }) => {
    const [formData, setFormData] = useState<ListingData>({
        address: '',
        propertyType: PROPERTY_TYPES[0],
        rooms: 3,
        price: '250.000€',
        tone: TONES[0],
    });
    const [images, setImages] = useState<File[]>([]);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [result, setResult] = useState<GenerationResult | null>(null);
    const [isDragging, setIsDragging] = useState(false);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: name === 'rooms' ? parseInt(value) : value }));
    };

    const handleFileChange = (files: FileList | null) => {
        if (files) {
            const newFiles = Array.from(files);
            setImages(prev => [...prev, ...newFiles]);
            const newPreviews = newFiles.map(file => URL.createObjectURL(file));
            setImagePreviews(prev => [...prev, ...newPreviews]);
        }
    };
    
    const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };
    
    const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleFileChange(e.dataTransfer.files);
            e.dataTransfer.clearData();
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (images.length === 0) {
            setError('Por favor, sube al menos una imagen de la propiedad.');
            return;
        }
        setError(null);
        setIsLoading(true);
        setResult(null);

        try {
            const apiResult = await generateListingContent(images, formData);
            setResult(apiResult);
        } catch (err) {
            console.error(err);
            setError(err instanceof Error ? err.message : 'Ocurrió un error inesperado al contactar con la IA.');
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleReset = () => {
        setFormData({ address: '', propertyType: PROPERTY_TYPES[0], rooms: 3, price: '250.000€', tone: TONES[0] });
        setImages([]);
        setImagePreviews([]);
        setError(null);
        setResult(null);
        setIsLoading(false);
    };
    
    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center text-center p-10 bg-white rounded-lg shadow-lg">
                <Spinner />
                <h2 className="text-2xl font-bold text-indigo-800 mt-6">Analizando y creando...</h2>
                <p className="text-slate-600 mt-2">Tu copiloto de IA está trabajando. Esto puede tardar unos segundos.</p>
            </div>
        );
    }
    
    if (result) {
        return (
            <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-6">¡Anuncio Generado!</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card className="relative">
                        <h3 className="text-xl font-bold text-indigo-800 mb-2">Descripción del Anuncio</h3>
                        <div className="relative">
                           <textarea value={result.description} readOnly className="w-full h-96 p-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 leading-relaxed" />
                           <CopyButton textToCopy={result.description} />
                        </div>
                    </Card>
                    <div className="space-y-6">
                         <Card>
                            <h3 className="text-xl font-bold text-indigo-800 mb-2">Precio de Mercado Sugerido</h3>
                            <p className="text-3xl font-bold text-emerald-600">{result.priceSuggestion}</p>
                            {result.sources && result.sources.length > 0 && (
                                <div className="mt-4">
                                    <h4 className="text-sm font-semibold text-slate-500">Fuentes de Google Search:</h4>
                                    <ul className="text-xs list-disc list-inside mt-1 space-y-1">
                                        {result.sources.map((source, index) => (
                                           <li key={index} className="truncate">
                                             <a href={source.web?.uri} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">
                                               {source.web?.title || source.web?.uri}
                                             </a>
                                           </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </Card>
                        <Card>
                             <h3 className="text-xl font-bold text-indigo-800 mb-3">Imágenes Subidas</h3>
                             <div className="grid grid-cols-3 gap-3">
                                 {imagePreviews.map((src, i) => <img key={i} src={src} alt={`Preview ${i}`} className="w-full h-24 object-cover rounded-md" />)}
                             </div>
                        </Card>
                    </div>
                </div>
                <button onClick={handleReset} className="mt-8 flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition-transform hover:scale-105">
                     <Icon icon="back" className="w-5 h-5"/>
                     Crear otro anuncio
                </button>
            </div>
        )
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            <h2 className="text-3xl font-bold text-slate-900">Nueva Captación "Flash"</h2>
            {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg" role="alert">{error}</div>}
            
            <Card>
                <h3 className="text-xl font-bold text-indigo-800 mb-4">1. Sube las Fotos</h3>
                 <div onDragEnter={handleDragEnter} onDragOver={handleDragEnter} onDragLeave={handleDragLeave} onDrop={handleDrop} className={`border-2 border-dashed rounded-lg p-10 text-center transition-colors ${isDragging ? 'border-emerald-500 bg-emerald-50' : 'border-slate-300 bg-white'}`}>
                     <Icon icon="upload" className="w-12 h-12 mx-auto text-slate-400" />
                     <p className="mt-2 text-slate-600">Arrastra y suelta las imágenes aquí, o</p>
                     <label htmlFor="file-upload" className="mt-2 cursor-pointer inline-block bg-indigo-100 text-indigo-700 font-semibold px-4 py-2 rounded-md hover:bg-indigo-200">
                         Selecciona archivos
                     </label>
                     <input id="file-upload" type="file" multiple accept="image/*" onChange={e => handleFileChange(e.target.files)} className="hidden" />
                     <p className="text-xs text-slate-400 mt-2">Sube al menos una imagen. JPG, PNG, WEBP.</p>
                 </div>
                 {imagePreviews.length > 0 && (
                     <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
                         {imagePreviews.map((src, i) => <img key={i} src={src} alt={`Preview ${i}`} className="w-full h-24 object-cover rounded-md shadow-md" />)}
                     </div>
                 )}
            </Card>

            <Card>
                <h3 className="text-xl font-bold text-indigo-800 mb-4">2. Introduce los Datos Básicos</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="address" className="block text-sm font-medium text-slate-700">Dirección o Zona</label>
                        <input type="text" name="address" id="address" value={formData.address} onChange={handleInputChange} required className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="Ej: Calle Goya, Madrid" />
                    </div>
                    <div>
                        <label htmlFor="propertyType" className="block text-sm font-medium text-slate-700">Tipo de Inmueble</label>
                        <select name="propertyType" id="propertyType" value={formData.propertyType} onChange={handleInputChange} className="mt-1 block w-full pl-3 pr-10 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                            {PROPERTY_TYPES.map(type => <option key={type}>{type}</option>)}
                        </select>
                    </div>
                     <div>
                        <label htmlFor="rooms" className="block text-sm font-medium text-slate-700">Nº de Habitaciones</label>
                        <input type="number" name="rooms" id="rooms" value={formData.rooms} onChange={handleInputChange} required min="0" className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                    </div>
                     <div>
                        <label htmlFor="price" className="block text-sm font-medium text-slate-700">Precio deseado</label>
                        <input type="text" name="price" id="price" value={formData.price} onChange={handleInputChange} required className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="Ej: 300.000€" />
                    </div>
                     <div className="md:col-span-2">
                        <label htmlFor="tone" className="block text-sm font-medium text-slate-700">Tono del Anuncio</label>
                         <select name="tone" id="tone" value={formData.tone} onChange={handleInputChange} className="mt-1 block w-full pl-3 pr-10 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                            {TONES.map(type => <option key={type}>{type}</option>)}
                        </select>
                    </div>
                </div>
            </Card>
            
            <div className="flex justify-end">
                <button type="submit" className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-6 rounded-lg text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5" disabled={isLoading}>
                    <Icon icon="sparkles" className="w-6 h-6" />
                    {isLoading ? 'Generando...' : 'Generar Anuncio'}
                </button>
            </div>
        </form>
    );
};

export default ListingGenerator;
