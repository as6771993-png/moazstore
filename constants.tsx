
import { Category, Product, ContactInfo } from './types';

export const APP_CONTACTS: ContactInfo = {
  phone: '01000805600',
  whatsapp: '01273859070'
};

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'مقوي شبكة Triple Band',
    description: 'أفضل حل لتقوية شبكات الموبايل والإنترنت في الأماكن المغلقة، يدعم جميع الشبكات.',
    price: 4500,
    category: Category.NETWORK,
    imageUrl: 'https://picsum.photos/seed/net1/600/400'
  },
  {
    id: '2',
    name: 'Smart Lock X-Pro',
    description: 'قفل ذكي يعمل بالبصمة والكارت والرقم السري، أمان فائق لمنزلك.',
    price: 3200,
    category: Category.SMART_LOCK,
    imageUrl: 'https://picsum.photos/seed/lock1/600/400'
  }
];
