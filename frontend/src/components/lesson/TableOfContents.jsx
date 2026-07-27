import React, { useState, useEffect } from 'react';
export const TableOfContents = ({ items }) => {
    const [activeId, setActiveId] = useState(items[0]?.id || '');
    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + 120;
            for (const item of items) {
                const el = document.getElementById(item.id);
                if (el) {
                    const top = el.offsetTop;
                    const height = el.offsetHeight;
                    if (scrollPosition >= top && scrollPosition < top + height + 200) {
                        setActiveId(item.id);
                    }
                }
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [items]);
    const scrollToSection = (id) => {
        const el = document.getElementById(id);
        if (el) {
            const top = el.getBoundingClientRect().top + window.scrollY - 90;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    };
    return (<div className="w-64 shrink-0 hidden xl:block sticky top-20 space-y-3 self-start">
      <div className="text-[11px] font-black uppercase tracking-wider text-zinc-500 px-2">
        Table of Contents
      </div>

      <nav className="space-y-1 border-l border-zinc-800/80 pl-3">
        {items.map((item) => {
            const isActive = activeId === item.id;
            return (<button key={item.id} onClick={() => scrollToSection(item.id)} className={`block w-full text-left text-xs font-semibold transition-all py-1.5 px-2 rounded-lg ${isActive
                    ? 'text-blue-400 font-extrabold bg-blue-500/10 border-l-2 border-blue-400 -ml-3 pl-3'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50'}`}>
              {item.title}
            </button>);
        })}
      </nav>
    </div>);
};
