import { BcvRateInfo } from '../types/lab';

export async function fetchLiveBcvRate(): Promise<BcvRateInfo> {
  const apis = [
    {
      url: 'https://ve.dolarapi.com/v1/dolares/oficial',
      parse: (data: any) => ({
        rate: Number(data.promedio || data.precio || 0),
        lastUpdated: data.fechaActualizacion || new Date().toISOString(),
        source: 'BCV Oficial (DolarApi)'
      })
    },
    {
      url: 'https://pydolarvenezuela-api.vercel.app/api/v1/dollar?page=bcv',
      parse: (data: any) => ({
        rate: Number(data.monitors?.usd?.price || 0),
        lastUpdated: data.monitors?.usd?.last_update || new Date().toISOString(),
        source: 'Banco Central de Venezuela (PyDolar)'
      })
    }
  ];

  for (const api of apis) {
    try {
      const res = await fetch(api.url, { headers: { 'Accept': 'application/json' } });
      if (res.ok) {
        const json = await res.json();
        const parsed = api.parse(json);
        if (parsed.rate && parsed.rate > 0) {
          return {
            rate: parsed.rate,
            lastUpdated: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' (' + new Date().toLocaleDateString() + ')',
            source: parsed.source,
            isAutoSynced: true
          };
        }
      }
    } catch (err) {
      console.warn('Fallo al consultar endpoint BCV:', api.url, err);
    }
  }

  // Fallback si no hay conexión a internet externa
  return {
    rate: 61.20,
    lastUpdated: 'Tasa Referencial de Respaldo',
    source: 'BCV Oficial (Offline / Respaldo)',
    isAutoSynced: false
  };
}