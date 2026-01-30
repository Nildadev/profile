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

    // Language display name mapping
    const languageNames: Record<string, string> = {
        javascript: 'JavaScript',
        typescript: 'TypeScript',
        python: 'Python',
        jsx: 'React JSX',
        tsx: 'React TSX',
        css: 'CSS',
        html: 'HTML',
        json: 'JSON',
        bash: 'Bash',
        shell: 'Shell',
        sql: 'SQL',
        java: 'Java',
        cpp: 'C++',
        c: 'C',
        go: 'Go',
        rust: 'Rust',
        php: 'PHP',
        ruby: 'Ruby',
        swift: 'Swift',
        kotlin: 'Kotlin',
    };

    const displayLanguage = languageNames[language?.toLowerCase()] || language?.toUpperCase() || 'CODE';

    return (
        <div className="relative my-10 group rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-gradient-to-br from-slate-900 to-slate-950 hover:border-brand-primary/30 transition-all duration-500">
            {/* Header Bar */}
            <div className="flex items-center justify-between px-6 py-3 bg-black/20 border-b border-white/5">
                {/* Language Badge */}
                <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-gradient-to-r from-red-500 to-red-600 shadow-lg shadow-red-500/20"></div>
                    <div className="w-3 h-3 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-600 shadow-lg shadow-yellow-500/20"></div>
                    <div className="w-3 h-3 rounded-full bg-gradient-to-r from-green-500 to-green-600 shadow-lg shadow-green-500/20"></div>
                    <span className="ml-3 text-[11px] font-black uppercase tracking-[0.15em] text-brand-primary/80">
                        {displayLanguage}
                    </span>
                </div>

                {/* Copy Button */}
                <button
                    onClick={handleCopy}
                    className="flex items-center gap-2 px-4 py-2 bg-brand-primary/10 border border-brand-primary/20 text-brand-primary rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-brand-primary hover:text-white transition-all shadow-lg hover:shadow-brand-primary/20 active:scale-95"
                >
                    {copied ? (
                        <>
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                            Copied!
                        </>
                    ) : (
                        <>
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                            Copy
                        </>
                    )}
                </button>
            </div>

            {/* Code Content */}
            <div className="relative overflow-x-auto">
                <SyntaxHighlighter
                    language={language || 'typescript'}
                    style={vscDarkPlus}
                    showLineNumbers={true}
                    customStyle={{
                        margin: 0,
                        padding: '1.5rem',
                        fontSize: '0.875rem',
                        lineHeight: '1.7',
                        backgroundColor: 'transparent',
                        borderRadius: 0,
                    }}
                    lineNumberStyle={{
                        minWidth: '3em',
                        paddingRight: '1.5em',
                        color: '#475569',
                        userSelect: 'none',
                        fontSize: '0.75rem',
                    }}
                    codeTagProps={{
                        style: {
                            fontFamily: "'JetBrains Mono', 'Fira Code', 'Consolas', monospace",
                            fontWeight: 500,
                        }
                    }}
                >
                    {value}
                </SyntaxHighlighter>
            </div>

            {/* Bottom Gradient Fade */}
            <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none opacity-50"></div>
        </div>
    );
};

export default CodeBlock;
