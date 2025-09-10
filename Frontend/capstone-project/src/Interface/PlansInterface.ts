export interface Plans {
  productId: string;
  name: string;
  description: null;
  metadati: Metadati;
  prices: Price[];
}

export interface Metadati {
  Audio_spaziale?: string;
  Dispositivi_connessi_contemporaneamente: string;
  Dispositivi_per_i_download: string;
  Dispositivi_supportati: string;
  Pubblicità: string;
  Qualità_audio_e_video: string;
  Quota_mensile: string;
  Risoluzione: string;
}

export interface Price {
  amount: number;
  currency: string;
  priceId: string;
}
