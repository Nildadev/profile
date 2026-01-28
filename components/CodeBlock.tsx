import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodeBlockProps {
    language: string;
    value: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ language, value }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(value);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="relative my-8 group rounded-2xl overflow-hidden border border-white/5 shadow-2xl">
            <div className="absolute right-4 top-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                    onClick={handleCopy}
                    className="px-3 py-1.5 bg-brand-primary text-white rounded-lg text-[10px] font-black uppercase tracking-widest shadow-lg hover:scale-105 active:scale-95 transition-all"
                >
                    {copied ? 'Copied!' : 'Copy'}
                </button>
            </div>
            {language && (
                <div className="absolute left-6 top-4 z-10">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500/50">
                        {language}
                    </span>
                </div>
            )}
            <SyntaxHighlighter
                language={language || 'typescript'}
                style={vscDarkPlus}
                customStyle={{
                    margin: 0,
                    padding: '2.5rem 1rem 1rem 1rem',
                    fontSize: '0.85rem',
                    lineHeight: '1.6',
                    backgroundColor: '#0a0514',
                }}
                codeTagProps={{
                    style: {
                        fontFamily: 'var(--font-mono)',
                        whiteSpace: 'pre-wrap',
                        wordBreak: 'break-word',
                    }
                }}
            >
                {value}
            </SyntaxHighlighter>
        </div>
    );
};

export default CodeBlock;
