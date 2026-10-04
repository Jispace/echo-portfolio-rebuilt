// Utility to manage local persistence and server sync of the 11 provided portfolio screenshots

const DB_NAME = 'candya_portfolio_screenshots';
const DB_VERSION = 1;
const STORE_NAME = 'screenshots';

let dbPromise: Promise<IDBDatabase> | null = null;
const memoryCache: Record<string, string> = {};

function getDB(): Promise<IDBDatabase> {
  if (!dbPromise) {
    dbPromise = new Promise((resolve, reject) => {
      if (typeof window === 'undefined' || !window.indexedDB) {
        reject(new Error('IndexedDB not available'));
        return;
      }
      const request = indexedDB.open(DB_NAME, DB_VERSION);
      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME);
        }
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }
  return dbPromise;
}

export async function saveScreenshot(filename: string, file: Blob | File): Promise<string> {
  const cleanName = filename.trim();
  const objectUrl = URL.createObjectURL(file);
  memoryCache[cleanName] = objectUrl;

  // 1. Save to IndexedDB for persistent in-browser viewing
  try {
    const db = await getDB();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.put(file, cleanName);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.warn('Failed to save to IndexedDB:', err);
  }

  // 2. Sync to server /public folder via API if available
  try {
    fetch(`/api/upload-screenshot?filename=${encodeURIComponent(cleanName)}`, {
      method: 'POST',
      body: file,
    }).catch(() => {
      // Silent fail if server endpoint not active
    });
  } catch (err) {
    // Ignore server sync error
  }

  // 3. Dispatch window event for live React update
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('screenshot-saved', {
        detail: { filename: cleanName, url: objectUrl },
      })
    );
  }

  return objectUrl;
}

export async function getAllStoredScreenshots(): Promise<Record<string, string>> {
  const result: Record<string, string> = { ...memoryCache };
  try {
    const db = await getDB();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const cursorReq = store.openCursor();
      cursorReq.onsuccess = (e) => {
        const cursor = (e.target as IDBRequest<IDBCursorWithValue>).result;
        if (cursor) {
          const name = cursor.key as string;
          const blob = cursor.value as Blob;
          if (!result[name]) {
            result[name] = URL.createObjectURL(blob);
          }
          cursor.continue();
        } else {
          resolve();
        }
      };
      cursorReq.onerror = () => reject(cursorReq.error);
    });
  } catch (err) {
    console.warn('Error reading from IndexedDB:', err);
  }
  Object.assign(memoryCache, result);
  return result;
}
