
import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  isAdmin: boolean;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, isAdmin, onEdit, onDelete }) => {
  const handleShare = async () => {
    const shareData = {
      title: product.name,
      text: `شاهد هذا المنتج الرائع من MoazStore: ${product.name}\n${product.description}`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(`${shareData.text} \n ${shareData.url}`);
        alert('تم نسخ الرابط لمشاركته مع أصدقائك!');
      }
    } catch (err) {
      console.error('Error sharing', err);
    }
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group">
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3">
          <span className="bg-blue-600/90 backdrop-blur text-white px-3 py-1 rounded-full text-xs font-bold">
            {product.category === 'NETWORK' ? 'تقوية شبكات' : 'أقفال ذكية'}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 text-gray-900">{product.name}</h3>
        <p className="text-gray-500 text-sm mb-4 leading-relaxed line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between mb-6">
          <span className="text-2xl font-black text-blue-600">
            {product.price} <small className="text-sm font-normal text-gray-400">ج.م</small>
          </span>
          <button 
            onClick={handleShare}
            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
          </button>
        </div>

        {isAdmin ? (
          <div className="flex gap-2">
            <button 
              onClick={() => onEdit(product)}
              className="flex-1 bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 rounded-xl transition-colors text-sm"
            >
              تعديل
            </button>
            <button 
              onClick={() => onDelete(product.id)}
              className="px-4 bg-red-100 text-red-600 hover:bg-red-200 font-bold py-2 rounded-xl transition-colors text-sm"
            >
              حذف
            </button>
          </div>
        ) : (
          <a 
            href={`https://wa.me/${product.id === '1' ? '01273859070' : '01273859070'}?text=أريد الاستفسار عن ${product.name}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-emerald-500/30 flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.438 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884 0 2.225.569 3.967 1.582 5.632l-.999 3.648 3.906-.879zm11.387-7.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/></svg>
            اطلب عبر واتساب
          </a>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
