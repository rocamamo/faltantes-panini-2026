import { useEffect, useState } from 'react';
import { DATA, slug, COUNTRY_ORDER } from './data';

const STORAGE_KEY = 'paniniFaltantes2026Marcadas';
const API_URL = 'https://api.restful-api.dev/objects/ff8081819d82fab6019e57ab35f370e1';

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
  const [owned, setOwned] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState<boolean>(true);
  const [syncStatus, setSyncStatus] = useState<'saved' | 'saving' | 'error'>('saved');
  const [lastSynced, setLastSynced] = useState<Date | null>(null);

  // Load shared data on mount
  useEffect(() => {
    let active = true;
    async function fetchSharedData() {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error('Failed to fetch from DB');
        const json = await res.json();
        const ownedList = json.data?.owned || [];
        if (active) {
          const loadedSet = new Set<string>(ownedList);
          setOwned(loadedSet);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(ownedList));
          setLastSynced(new Date());
          setSyncStatus('saved');
          setLoading(false);
        }
      } catch (err) {
        console.error('Error fetching shared database, using localStorage fallback:', err);
        if (active) {
          const localSet = loadSet();
          setOwned(localSet);
          setSyncStatus('error');
          setLoading(false);
        }
      }
    }
    fetchSharedData();
    return () => {
      active = false;
    };
  }, []);

  // Sync to local backup whenever owned state changes locally (as secondary backup)
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...owned]));
  }, [owned]);

  // Toggle owned state and update global database
  const toggle = async (id: string) => {
    const nextOwned = new Set(owned);
    if (nextOwned.has(id)) nextOwned.delete(id);
    else nextOwned.add(id);
    
    setOwned(nextOwned);

    setSyncStatus('saving');
    try {
      const res = await fetch(API_URL, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'Panini 2026 - Colombia Faltantes',
          data: {
            owned: [...nextOwned]
          }
        })
      });
      if (!res.ok) throw new Error('Failed to update DB');
      setSyncStatus('saved');
      setLastSynced(new Date());
    } catch (err) {
      console.error('Error syncing to database:', err);
      setSyncStatus('error');
    }
  };

  // Manual refresh function
  const handleRefresh = async () => {
    setSyncStatus('saving');
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error('Failed to fetch from DB');
      const json = await res.json();
      const ownedList = json.data?.owned || [];
      const loadedSet = new Set<string>(ownedList);
      setOwned(loadedSet);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ownedList));
      setLastSynced(new Date());
      setSyncStatus('saved');
    } catch (err) {
      console.error('Error refreshing from database:', err);
      setSyncStatus('error');
    }
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

  if (loading) {
    return (
      <div className="font-sans text-[#e8eef5] min-h-screen bg-[#0f1419] flex flex-col justify-center items-center p-6">
        <div className="bg-[#1a2332] border border-[#2d3a4d] rounded-2xl p-8 max-w-md w-full text-center shadow-2xl relative overflow-hidden">
          {/* Subtle glowing background orb */}
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#00a86b]/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl"></div>
          
          {/* Spinner icon */}
          <div className="relative flex justify-center mb-6">
            <div className="w-16 h-16 border-4 border-[#2d3a4d] border-t-[#00a86b] rounded-full animate-spin"></div>
            {/* Inner glowing pulse */}
            <div className="absolute inset-0 m-auto w-10 h-10 bg-[#00a86b]/20 rounded-full animate-ping"></div>
          </div>
          
          <h2 className="text-xl font-bold mb-2 tracking-wide text-[#e8eef5]">
            Conectando Base de Datos
          </h2>
          <p className="text-[#8b9cb3] text-sm leading-relaxed mb-5">
            Obteniendo el estado global de las láminas compartidas para Colombia...
          </p>
          <div className="text-xs bg-[#0f1419] border border-[#2d3a4d] text-[#8b9cb3] py-2 px-3 rounded-lg font-mono inline-block">
            api.restful-api.dev/objects/...
          </div>
        </div>
      </div>
    );
  }

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
              <strong className="text-[#e8eef5] font-semibold"> Toca o haz clic en una lámina</strong> para marcarla como conseguida. Los cambios se guardan automáticamente en la nube y son visibles para todos los usuarios.
            </p>
            
            <div className="mt-4 flex flex-wrap items-center gap-3">
              {/* Sync Status Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1a2332] border border-[#2d3a4d] text-xs font-medium select-none">
                {syncStatus === 'saved' && (
                  <>
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00a86b] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00a86b]"></span>
                    </span>
                    <span className="text-[#8b9cb3]">
                      Base de datos: <span className="text-[#00a86b] font-semibold">Conectada</span>
                      {lastSynced && ` · Sinc: ${lastSynced.toLocaleTimeString()}`}
                    </span>
                  </>
                )}
                {syncStatus === 'saving' && (
                  <>
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c9a227] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#c9a227]"></span>
                    </span>
                    <span className="text-[#c9a227] font-semibold animate-pulse">
                      Guardando cambios en la nube...
                    </span>
                  </>
                )}
                {syncStatus === 'error' && (
                  <>
                    <span className="relative flex h-2 w-2">
                      <span className="animate-bounce absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                    </span>
                    <span className="text-red-400">
                      Error de sincronización (Modo Offline)
                    </span>
                  </>
                )}
              </div>

              {/* Refresh Button */}
              <button
                onClick={handleRefresh}
                disabled={syncStatus === 'saving'}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1a2332] hover:bg-[#202b3d] active:bg-[#1a2332] border border-[#2d3a4d] hover:border-[#4a6078] text-xs font-medium text-[#8b9cb3] hover:text-[#e8eef5] transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none"
                title="Actualizar datos con la nube"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className={`w-3.5 h-3.5 ${syncStatus === 'saving' ? 'animate-spin text-[#c9a227]' : ''}`}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>
                Actualizar
              </button>
            </div>
          </div>
          
          <div className="bg-[#1a2332] border border-[#2d3a4d] rounded-xl py-3 px-4 sm:px-6 text-center shrink-0 flex flex-row sm:flex-col items-center sm:items-stretch justify-between sm:justify-center gap-3 sm:gap-1 select-none">
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
