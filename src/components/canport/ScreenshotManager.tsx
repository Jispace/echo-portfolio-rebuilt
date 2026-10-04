import React, { useState, useRef, useEffect } from 'react';
import { UploadCloud, CheckCircle2, AlertCircle, RefreshCw, Eye, X, Image as ImageIcon } from 'lucide-react';
import { saveScreenshot, getAllStoredScreenshots } from '../../utils/imageStorage';

export const REQUIRED_SCREENSHOTS = [
  { id: 'sc-1', fileName: 'Suivi client vue 1.png', label: 'Suivi clients — Vue 1 (Pipeline HubSpot)', project: 'Suivi des clients' },
  { id: 'sc-2', fileName: 'Suivi Client vue 2.png', label: 'Suivi clients — Vue 2 (Fiche contact Lucie Dupont)', project: 'Suivi des clients' },
  { id: 'sc-3', fileName: 'Suivi client vue 3.png', label: 'Suivi clients — Vue 3 (Tâches & Relances)', project: 'Suivi des clients' },
  { id: 'st-1', fileName: 'Suivi tâches vue 1.png', label: 'Suivi tâches — Vue 1 (Notion Table Priorités)', project: 'Suivi des tâches' },
  { id: 'st-2', fileName: 'Suivi tâches vue 2.png', label: 'Suivi tâches — Vue 2 (Notion Kanban Statuts)', project: 'Suivi des tâches' },
  { id: 'st-3', fileName: 'Suivi tâches vue 3.png', label: 'Suivi tâches — Vue 3 (Liste Espace & Livrables)', project: 'Suivi des tâches' },
  { id: 'es-1', fileName: 'Boite mail vue 1.jpg', label: 'Email SAV — Vue 1 (Organisation Gmail)', project: 'Email type & SAV' },
  { id: 'es-2', fileName: 'Exemple email vue 2.png', label: 'Email SAV — Vue 2 (Remboursement Lucia)', project: 'Email type & SAV' },
  { id: 'es-3', fileName: 'Exemple email vue 3.png', label: 'Email SAV — Vue 3 (Accès formation Kamel)', project: 'Email type & SAV' },
  { id: 'sp-1', fileName: 'Suivi paiement vue 1.png', label: 'Suivi paiements — Vue 1 (Google Sheets)', project: 'Suivi des paiements' },
  { id: 'sp-2', fileName: 'Suivi paiement vue 2.png', label: 'Suivi paiements — Vue 2 (Base Notion mensuelle)', project: 'Suivi des paiements' },
];

function normalize(str: string): string {
  return str.toLowerCase().replace(/[^a-z0-9]/g, '');
}

export function matchScreenshotFileName(incomingName: string): string | null {
  const normIncoming = normalize(incomingName);
  for (const item of REQUIRED_SCREENSHOTS) {
    if (normalize(item.fileName) === normIncoming) {
      return item.fileName;
    }
  }
  // Try partial match without extension
  const nameOnly = normalize(incomingName.replace(/\.[^/.]+$/, ''));
  for (const item of REQUIRED_SCREENSHOTS) {
    const itemNormOnly = normalize(item.fileName.replace(/\.[^/.]+$/, ''));
    if (nameOnly === itemNormOnly) {
      return item.fileName;
    }
  }
  return null;
}

interface ScreenshotManagerProps {
  onImagesUpdated?: () => void;
}

export const ScreenshotManager: React.FC<ScreenshotManagerProps> = ({ onImagesUpdated }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loadedFiles, setLoadedFiles] = useState<Record<string, string>>({});
  const [isDragging, setIsDragging] = useState(false);
  const [uploadMessage, setUploadMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const refreshLoadedFiles = async () => {
    const stored = await getAllStoredScreenshots();
    // Also test which files exist in /public
    const result: Record<string, string> = { ...stored };
    for (const item of REQUIRED_SCREENSHOTS) {
      if (!result[item.fileName]) {
        try {
          const res = await fetch(`/${encodeURIComponent(item.fileName)}`, { method: 'HEAD' });
          if (res.ok) {
            result[item.fileName] = `/${encodeURIComponent(item.fileName)}`;
          }
        } catch {
          // not found
        }
      }
    }
    setLoadedFiles(result);
  };

  useEffect(() => {
    refreshLoadedFiles();

    const handleSaved = () => {
      refreshLoadedFiles();
      if (onImagesUpdated) onImagesUpdated();
    };

    window.addEventListener('screenshot-saved', handleSaved);
    return () => window.removeEventListener('screenshot-saved', handleSaved);
  }, []);

  const handleFiles = async (files: FileList | File[]) => {
    const count = files.length;
    let matched = 0;

    for (let i = 0; i < count; i++) {
      const file = files[i];
      if (!file) continue;
      const targetFileName = matchScreenshotFileName(file.name);
      if (targetFileName) {
        await saveScreenshot(targetFileName, file);
        matched++;
      } else {
        // Fallback: save under original name as well
        await saveScreenshot(file.name, file);
      }
    }

    await refreshLoadedFiles();
    if (onImagesUpdated) onImagesUpdated();

    setUploadMessage(`${matched} capture(s) d'écran importée(s) avec succès !`);
    setTimeout(() => setUploadMessage(null), 4500);
  };

  const loadedCount = REQUIRED_SCREENSHOTS.filter((s) => !!loadedFiles[s.fileName]).length;
  const isComplete = loadedCount === REQUIRED_SCREENSHOTS.length;

  return (
    <>
      {/* Top Banner inside Projects Section */}
      <div className="mb-8 rounded-2xl border border-[#E4DACD] bg-white p-4 sm:p-5 shadow-xs transition-all">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3.5">
            <div className={`p-2.5 rounded-xl shrink-0 ${isComplete ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-[#FAF4EB] text-[#8C6D4C] border border-[#EBDCCB]'}`}>
              {isComplete ? <CheckCircle2 className="w-5 h-5" /> : <UploadCloud className="w-5 h-5" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-bold text-[#2D241E]">
                  Visuels du portfolio ({loadedCount} / {REQUIRED_SCREENSHOTS.length} captures actives)
                </h4>
                {isComplete && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                    Complet
                  </span>
                )}
              </div>
              <p className="text-xs text-[#6E5D4F] mt-0.5">
                {isComplete
                  ? 'Toutes les 11 captures officielles sont chargées et affichées en haute résolution.'
                  : 'Glissez-déposez ici les 11 captures d\'écran transmises pour les afficher directement sans attente.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 shrink-0 self-end sm:self-center">
            <input
              type="file"
              ref={fileInputRef}
              multiple
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  handleFiles(e.target.files);
                }
              }}
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#2D241E] text-white hover:bg-[#43352A] transition-colors inline-flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <UploadCloud className="w-3.5 h-3.5" />
              <span>Charger les 11 captures</span>
            </button>
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="px-3 py-2 rounded-xl text-xs font-medium bg-[#FAF7F2] text-[#5C4D3E] border border-[#E8DFD3] hover:bg-[#F2ECE4] transition-colors inline-flex items-center gap-1 cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Liste des fichiers ({loadedCount}/11)</span>
            </button>
          </div>
        </div>

        {uploadMessage && (
          <div className="mt-3 p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{uploadMessage}</span>
          </div>
        )}

        {/* Inline Quick Dropzone */}
        {!isComplete && (
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setIsDragging(false);
              if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                handleFiles(e.dataTransfer.files);
              }
            }}
            onClick={() => fileInputRef.current?.click()}
            className={`mt-4 border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-colors ${
              isDragging ? 'border-[#8C6D4C] bg-[#F7EFE4]' : 'border-[#E2D6C7] bg-[#FAF7F2]/60 hover:bg-[#FAF7F2]'
            }`}
          >
            <p className="text-xs text-[#5C4D3E] font-medium">
              Déposez vos fichiers <span className="font-bold text-[#2D241E]">Suivi client, Suivi tâches, Boite mail, Suivi paiement...</span> directement ici
            </p>
            <p className="text-[11px] text-[#8C7B6D] mt-0.5">
              Glissez les 11 fichiers en une seule fois depuis votre ordinateur pour les afficher instantanément.
            </p>
          </div>
        )}
      </div>

      {/* Modal Checklist Dialog */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-2xl border border-[#E0D7CC] shadow-2xl max-w-xl w-full max-h-[85vh] flex flex-col overflow-hidden">
            <div className="px-5 py-4 border-b border-[#EAE3D8] flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-[#2D241E]">Contrôle des 11 captures fournies</h3>
                <p className="text-xs text-[#7A6B5D]">{loadedCount} sur 11 visuels actifs et associés aux cas concrets</p>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-[#7A6B5D] hover:bg-[#F2ECE4] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 overflow-y-auto space-y-2.5 flex-1">
              {REQUIRED_SCREENSHOTS.map((item, idx) => {
                const isLoaded = !!loadedFiles[item.fileName];
                return (
                  <div
                    key={item.id}
                    className="p-3 rounded-xl border border-[#EAE3D8] bg-[#FAF8F5] flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                          isLoaded ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                        }`}
                      >
                        {isLoaded ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertCircle className="w-3.5 h-3.5" />}
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-[#2D241E] truncate">{item.label}</p>
                        <p className="text-[11px] text-[#8C7C6D] truncate">Nom requis : <code className="font-mono bg-white px-1 py-0.5 rounded border border-[#E2D8CC]">{item.fileName}</code></p>
                      </div>
                    </div>
                    <label className="shrink-0">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            saveScreenshot(item.fileName, e.target.files[0]).then(() => {
                              refreshLoadedFiles();
                              if (onImagesUpdated) onImagesUpdated();
                            });
                          }
                        }}
                      />
                      <span className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border cursor-pointer inline-block transition-colors ${
                        isLoaded
                          ? 'bg-white border-emerald-300 text-emerald-800 hover:bg-emerald-50'
                          : 'bg-[#2D241E] border-[#2D241E] text-white hover:bg-[#43352A]'
                      }`}>
                        {isLoaded ? 'Remplacer' : 'Charger'}
                      </span>
                    </label>
                  </div>
                );
              })}
            </div>

            <div className="p-4 bg-[#FAF7F2] border-t border-[#EAE3D8] flex items-center justify-between">
              <button
                type="button"
                onClick={refreshLoadedFiles}
                className="text-xs text-[#7A6B5D] hover:text-[#2D241E] inline-flex items-center gap-1 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Actualiser la détection</span>
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#2D241E] text-white hover:bg-[#43352A] cursor-pointer"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
