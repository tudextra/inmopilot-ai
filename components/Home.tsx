
import React from 'react';
import { View } from '../types';
import { Icon } from './common/Icon';

interface HomeProps {
    onNavigate: (view: View) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
    return (
        <div className="text-center flex flex-col items-center justify-center py-16 sm:py-24">
            <div className="bg-indigo-200 rounded-full p-4 mb-6 shadow-inner">
                 <Icon icon="sparkles" className="w-12 h-12 text-indigo-700"/>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight">
                InmoPilot AI
            </h1>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
                El copiloto inteligente para el agente inmobiliario. Genera anuncios profesionales, obtén sugerencias de precios y potencia tu marketing en segundos.
            </p>
            <div className="mt-10">
                <button
                    onClick={() => onNavigate('generator')}
                    className="flex items-center justify-center gap-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 px-8 rounded-lg text-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                    <Icon icon="new" className="w-7 h-7"/>
                    <span>Crear Anuncio Flash</span>
                </button>
            </div>
             <p className="mt-8 text-sm text-slate-500">
                O explora nuestra <button onClick={() => onNavigate('academy')} className="font-semibold text-emerald-600 hover:underline">Academia Jedi</button> para obtener ideas y prompts.
            </p>
        </div>
    );
};

export default Home;
