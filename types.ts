
export interface UserProfile {
  name: string;
  avatar: string;
  isCertified: boolean;
  tags: string[];
}

export interface BusinessCard {
  id: string;
  name: string;
  organization: string;
  position: string;
  phone: string;
  email: string;
  region: string;
  address?: string;
  avatar: string;
  background: string;
  wechatId?: string;
}

export enum Page {
  PROFILE = 'profile',
  CERTIFICATION = 'certification',
  CARD_CREATE = 'card_create',
  CARD_PREVIEW = 'card_preview',
  CARD_DETAIL = 'card_detail',
  DIGITAL_TWIN = 'digital_twin',
  CONTACTS = 'contacts',
  SETTINGS = 'settings'
}
