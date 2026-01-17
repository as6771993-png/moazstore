
import React from 'react';
import { APP_CONTACTS } from '../constants';

const Navbar: React.FC = () => {
  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 py-3 px-6 md:px-12 flex justify-between items-center">
      <div className="flex items-center gap-3">
        <div className="relative flex items-center justify-center">
          {/* Branded Signal Icon mimicking the logo */}
          <div className="bg-gradient-to-br from-blue-500 to-blue-700 p-2 rounded-xl shadow-lg shadow-blue-500/20">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071a9.9 9.9 0 0114.142 0M2.006 8.85a15.373 15.373 0 0121.988 0" />
            </svg>
          </div>
        </div>
        <div className="flex flex-col -space-y-1">
          <h1 className="text-xl font-black text-gray-900 tracking-tighter">Moaz.store</h1>
          <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">Premium Solutions</span>
        </div>
      </div>
      
      <div className="hidden lg:flex items-center gap-8 font-bold text-sm text-gray-500 uppercase tracking-wide">
        <a href="#products" className="hover:text-blue-600 transition-colors">المنتجات</a>
        <a href="#about" className="hover:text-blue-600 transition-colors">عن الشركة</a>
        <a href="#contact" className="hover:text-blue-600 transition-colors">اتصل بنا</a>
      </div>

      <div className="flex items-center gap-3">
        <a 
          href={`tel:${APP_CONTACTS.whatsapp}`}
          className="hidden md:flex items-center gap-2 text-gray-700 font-bold hover:text-blue-600 transition-colors"
        >
          <span className="text-xs text-gray-400">تحتاج مساعدة؟</span>
          <span className="text-sm">{APP_CONTACTS.whatsapp}</span>
        </a>
        <a 
          href={`https://wa.me/${APP_CONTACTS.whatsapp}`}
          className="bg-emerald-500 text-white px-5 py-2.5 rounded-full text-sm font-bold hover:bg-emerald-600 transition-all shadow-md shadow-emerald-500/20 flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.438 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884 0 2.225.569 3.967 1.582 5.632l-.999 3.648 3.906-.879zm11.387-7.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/></svg>
          واتساب
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
