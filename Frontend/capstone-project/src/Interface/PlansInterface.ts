export interface Plans {
  productId: string;
  name: string;
  description: null | string;
  metadati: Metadati;
  prices: Price[];
}

export interface Metadati {
  Ads?: string;
  Devices_same_time?: string;
  Download_devices?: string;
  Monthly_price?: string;
  Resolution?: string;
  Spatial_audio?: string;
  Supported_devices?: string;
  Video_and_sound_quality?: string;
}

export interface Price {
  amount: number;
  currency: string;
  priceId: string;
}
