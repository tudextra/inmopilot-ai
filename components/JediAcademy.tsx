
import React, { useState } from 'react';
import { JEDI_PROMPTS } from '../constants';
import { Card } from './common/Card';
import { Icon } from './common/Icon';

const PromptCard: React.FC<{ title: string; prompt: string }> = ({ title, prompt }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(prompt);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <Card className="flex flex-col h-full">
            <h3 className="font-bold text-indigo-800">{title}</h3>
            <p className="text-slate-600 text-sm mt-2 flex-grow">"{prompt.substring(0, 150)}..."</p>
            <button
                onClick={handleCopy}
                className={`mt-4 w-full flex items-center justify-center gap-2 text-sm font-semibold py-2 px-4 rounded-md transition-colors duration-200 ${
                    copied ? 'bg-emerald-500 text-white' : 'bg-slate-200 hover:bg-slate-300 text-slate-700'
                }`}
            >
                <Icon icon={copied ? 'check' : 'copy'} className="w-4 h-4" />
                <span>{copied ? '¡Copiado!' : 'Copiar Prompt'}</span>
            </button>
        </Card>
    );
};


const JediAcademy: React.FC = () => {
    return (
        <div>
            <div className="text-center mb-12">
                <Icon icon="academy" className="w-12 h-12 mx-auto text-indigo-600"/>
                <h1 className="text-4xl font-bold text-slate-900 mt-4">Academia "Maestro Jedi"</h1>
                <p className="mt-2 text-lg text-slate-600 max-w-2xl mx-auto">
                    Una colección de prompts probados para que copies, pegues y potencies tu marketing con IA.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {JEDI_PROMPTS.map((item, index) => (
                    <PromptCard key={index} title={item.title} prompt={item.prompt} />
                ))}
            </div>
        </div>
    );
};

export default JediAcademy;
