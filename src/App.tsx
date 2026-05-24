import { useEffect, useState } from 'react';
import { DATA, slug, COUNTRY_ORDER } from './data';

const STORAGE_KEY = 'paniniFaltantes2026Marcadas';

function loadSet(): Set<string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Set();
    const arr = JSON.parse(raw);
    return new Set(Array.isArray(arr) ? arr : []);
  } catch {
    return new Set();
  }
}

export default function App() {
  const [owned, setOwned] = useState<Set<string>>(loadSet());

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...owned]));
  }, [owned]);

  const toggle = (id: string) => {
    setOwned((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  let totalMissing = 0;
  let totalItems = 0;
  DATA.forEach((block) => {
    block.items.forEach((item) => {
      totalItems++;
      if (!owned.has(item.id)) {
        totalMissing++;
      }
    });
  });

  const sortedData = [...DATA].sort((a, b) => {
    let indexA = COUNTRY_ORDER.indexOf(a.countryName);
    let indexB = COUNTRY_ORDER.indexOf(b.countryName);
    if (indexA === -1) indexA = 999;
    if (indexB === -1) indexB = 999;
    if (indexA !== indexB) return indexA - indexB;
    return a.countryName.localeCompare(b.countryName, 'es');
  });

  return (
    <div className="font-sans text-[#e8eef5] min-h-screen bg-[#0f1419] flex flex-col">
      <header className="border-b border-[#2d3a4d] bg-gradient-to-b from-[#152028] to-[#0f1419] px-4 md:px-8 pb-4 pt-[max(1rem,env(safe-area-inset-top,0px))]">
        <div className="flex flex-col sm:flex-row sm:items-center md:items-start justify-between gap-4">
          <div className="flex-1">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold leading-tight mb-2">
              Faltantes revisados en tus fotos del álbum
            </h1>
            <p className="text-[#8b9cb3] text-sm sm:text-base max-w-3xl m-0">
              Lista generada a partir de las imágenes de tu carpeta (solo espacios vacíos visibles).
              <strong className="text-[#e8eef5] font-semibold"> Toca o haz clic en una lámina</strong> para marcarla como conseguida; se guarda en este navegador.
            </p>
          </div>
          <div className="bg-[#1a2332] border border-[#2d3a4d] rounded-xl py-3 px-4 sm:px-6 text-center shrink-0 flex flex-row sm:flex-col items-center sm:items-stretch justify-between sm:justify-center gap-3 sm:gap-1">
            <div className="text-xs sm:text-sm text-[#8b9cb3] font-medium uppercase tracking-wider">Faltantes</div>
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#e8eef5]">
              <span className="text-[#00a86b]">{totalMissing}</span> <span className="text-[#8b9cb3] text-lg sm:text-xl md:text-2xl font-medium">/ {totalItems}</span>
            </div>
          </div>
        </div>
      </header>

      <nav className="sticky top-0 z-20 bg-[#0f1419]/95 backdrop-blur-md border-b border-[#2d3a4d] px-4 md:px-8 py-2 md:py-3 flex flex-nowrap md:flex-wrap gap-2 overflow-x-auto md:overflow-x-visible overflow-y-hidden md:max-h-[40vh] md:overflow-y-auto nav-scrollbar snap-x snap-proximity shrink-0">
        {sortedData.map((block) => (
          <a
            key={block.countryCode}
            href={`#${slug(block.countryName)}`}
            className="text-xs sm:text-sm px-3 md:px-4 py-2 inline-flex items-center rounded-md bg-[#1a2332] text-[#8b9cb3] no-underline border border-transparent whitespace-nowrap shrink-0 snap-start hover:text-[#e8eef5] hover:border-[#2d3a4d] hover:bg-[#202b3d] focus-visible:text-[#e8eef5] focus-visible:border-[#00a86b] focus-visible:ring-2 focus-visible:ring-[#00a86b] focus-visible:outline-none transition-colors"
          >
            {block.countryName} - {block.countryCode} ({block.items.length})
          </a>
        ))}
      </nav>

      <main className="flex-1 w-full max-w-[1200px] mx-auto px-4 md:px-8 pt-6 lg:pt-8 pb-12 lg:pb-24">
        {sortedData.map((block) => {
          const id = slug(block.countryName);
          return (
             <section key={block.countryCode} id={id} className="mb-10 sm:mb-14 scroll-mt-24 md:scroll-mt-32">
              <div className="mb-4">
                <h2 className="text-lg sm:text-xl md:text-2xl m-0 flex items-baseline gap-2 font-bold text-[#e8eef5]">
                  {block.countryName}
                </h2>
                <div className="text-xs sm:text-sm text-[#8b9cb3] mt-1 break-words">
                  Código: <span className="font-medium">{block.countryCode}</span> · {block.items.length} faltante(s)
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
                {block.items.map((it) => {
                  const isOwned = owned.has(it.id);
                  return (
                    <div
                      key={it.id}
                      role="button"
                      tabIndex={0}
                      onClick={() => toggle(it.id)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          toggle(it.id);
                        }
                      }}
                      className={`group flex flex-col bg-[#1a2332] border rounded-xl overflow-hidden cursor-pointer select-none transition-all duration-200 active:scale-[0.98]
                        ${isOwned
                          ? 'bg-[#00a86b]/10 border-[#00a86b]/40 hover:border-[#00a86b]/60'
                          : 'border-[#2d3a4d] hover:border-[#4a6078] hover:bg-[#1e293b]'
                        }`}
                    >
                       <div className="p-3 sm:p-4 md:p-5 flex-1 flex flex-col">
                        <div className={`font-bold text-sm sm:text-base tracking-wide flex justify-between items-start gap-2 ${isOwned ? 'text-[#00a86b]' : 'text-[#e8eef5]'}`}>
                          <span className={isOwned ? 'line-through opacity-70' : ''}>{it.code}</span>
                          {isOwned && (
                            <span className="shrink-0 flex items-center justify-center w-5 h-5 rounded-full bg-[#00a86b]/20 text-[#00a86b]">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                                <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                              </svg>
                            </span>
                          )}
                        </div>
                        <div className={`text-sm md:text-base mt-1 mb-auto break-words font-medium ${isOwned ? 'line-through text-[#8b9cb3]/70' : 'text-[#8b9cb3] group-hover:text-[#a1b2c9]'}`}>
                          {it.player}
                        </div>
                        {it.note && (
                          <div className={`text-xs mt-3 p-2 rounded-md ${isOwned ? 'bg-[#152028]/50 text-[#c9a227]/50 line-through' : 'bg-[#c9a227]/10 text-[#c9a227]'}`}>
                             {it.note}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}
      </main>

      <footer className="w-full text-center py-6 px-4 text-[#8b9cb3]/70 text-xs sm:text-sm border-t border-[#2d3a4d] mt-auto">
        <p className="max-w-2xl mx-auto m-0 pb-[env(safe-area-inset-bottom,0px)]">
          FIFA World Cup 2026™ — álbum Panini.<br className="sm:hidden" /> Los nombres con nota «según foto / lista» reflejan dudas por brillo o texto del álbum.
        </p>
      </footer>
    </div>
  );
}
