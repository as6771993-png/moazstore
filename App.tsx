
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
import { Product, Category } from './types';
import { INITIAL_PRODUCTS, APP_CONTACTS } from './constants';
import { generateDescription } from './services/geminiService';

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('moazstore_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });
  
  const [isAdmin, setIsAdmin] = useState(false);
  const [isEditing, setIsEditing] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem('moazstore_products', JSON.stringify(products));
  }, [products]);

  const handleAddOrUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    
    const name = formData.get('name') as string;
    const price = Number(formData.get('price'));
    const category = formData.get('category') as Category;
    const imageUrl = formData.get('imageUrl') as string;

    const description = await generateDescription(name);

    const newProduct: Product = {
      id: isEditing ? isEditing.id : Math.random().toString(36).substr(2, 9),
      name,
      description,
      price,
      category,
      imageUrl: imageUrl || 'https://picsum.photos/seed/default/600/400'
    };

    if (isEditing) {
      setProducts(prev => prev.map(p => p.id === isEditing.id ? newProduct : p));
    } else {
      setProducts(prev => [newProduct, ...prev]);
    }

    setIsEditing(null);
    setIsLoading(false);
    e.currentTarget.reset();
  };

  const deleteProduct = (id: string) => {
    if (confirm('هل أنت متأكد من حذف هذا المنتج؟')) {
      setProducts(prev => prev.filter(p => p.id !== id));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const input = document.getElementById('imageUrlInput') as HTMLInputElement;
        if (input) input.value = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-cairo">
      <Navbar />

      {/* Hero Section - Designed to match the provided Logo Image Aesthetic */}
      <header className="relative min-h-[600px] flex items-center justify-center bg-gray-900 text-white overflow-hidden py-24 px-6">
        {/* Background Image: Night City Skyline mimicking the logo background */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
            className="w-full h-full object-cover opacity-40 grayscale" 
            alt="City Background"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 via-gray-900/40 to-gray-50"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          {/* Large Center Logo mimicking the prompt image */}
          <div className="mb-12 inline-block relative">
            <div className="absolute -inset-10 bg-blue-500/20 blur-3xl rounded-full"></div>
            <div className="relative">
               {/* Branded Icon */}
               <div className="flex justify-center mb-6">
                 <div className="bg-gradient-to-b from-blue-400 to-blue-600 p-6 rounded-[2.5rem] shadow-2xl shadow-blue-500/50">
                    <svg className="w-20 h-20 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071a9.9 9.9 0 0114.142 0M2.006 8.85a15.373 15.373 0 0121.988 0" />
                    </svg>
                 </div>
               </div>
               <h2 className="text-5xl md:text-7xl font-black mb-2 tracking-tighter italic">
                 Moaz<span className="text-blue-500">.</span>store
               </h2>
               <div className="h-1 w-24 bg-blue-500 mx-auto rounded-full mb-6"></div>
               <p className="text-2xl md:text-3xl font-bold text-gray-100 tracking-widest mb-4">
                 {APP_CONTACTS.whatsapp}
               </p>
            </div>
          </div>

          <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto font-medium leading-relaxed">
            الريادة في حلول تقوية شبكات الهاتف المحمول <br className="hidden md:block"/> 
            وأحدث أنظمة الأقفال الذكية Smart Locks في مصر.
          </p>

          <div className="flex flex-wrap justify-center gap-6">
            <a href="#products" className="bg-blue-600 hover:bg-blue-500 text-white px-10 py-4 rounded-2xl font-black text-lg transition-all shadow-xl shadow-blue-600/40 hover:-translate-y-1">
              اكتشف منتجاتنا
            </a>
            <button 
              onClick={() => setIsAdmin(!isAdmin)}
              className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 px-10 py-4 rounded-2xl font-bold text-lg transition-all"
            >
              {isAdmin ? 'إغلاق الإدارة' : 'لوحة التحكم'}
            </button>
          </div>
        </div>

        {/* Floating Abstract Elements */}
        <div className="absolute bottom-10 left-10 hidden xl:block animate-pulse">
           <div className="text-gray-500 text-[120px] font-black opacity-10 select-none">SIGNAL</div>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-6 md:px-12 py-20">
        
        {/* Admin Form */}
        {isAdmin && (
          <section className="mb-20 bg-white p-10 rounded-[2rem] border border-blue-50 shadow-2xl max-w-4xl mx-auto -mt-32 relative z-20">
            <div className="flex items-center gap-4 mb-8">
               <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/></svg>
               </div>
               <h3 className="text-3xl font-black text-gray-900">
                 {isEditing ? 'تعديل تفاصيل المنتج' : 'إضافة منتج جديد للمخزون'}
               </h3>
            </div>

            <form onSubmit={handleAddOrUpdate} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-sm font-black text-gray-400 uppercase tracking-widest">اسم المنتج</label>
                  <input 
                    name="name" 
                    defaultValue={isEditing?.name}
                    required 
                    className="w-full px-5 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-blue-500 transition-all font-bold text-gray-900"
                    placeholder="مثال: مقوي شبكة 4G الجيل الرابع"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-black text-gray-400 uppercase tracking-widest">السعر النهائي (ج.م)</label>
                  <input 
                    name="price" 
                    type="number"
                    defaultValue={isEditing?.price}
                    required 
                    className="w-full px-5 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-blue-500 transition-all font-bold text-gray-900"
                    placeholder="2500"
                  />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-sm font-black text-gray-400 uppercase tracking-widest">التصنيف</label>
                  <select 
                    name="category"
                    defaultValue={isEditing?.category}
                    className="w-full px-5 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-blue-500 transition-all font-bold text-gray-900 appearance-none"
                  >
                    <option value={Category.NETWORK}>تقوية شبكات الموبايل</option>
                    <option value={Category.SMART_LOCK}>أقفال الأبواب الذكية</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-black text-gray-400 uppercase tracking-widest">صورة المنتج</label>
                  <div className="relative">
                    <input 
                      type="file" 
                      onChange={handleFileChange}
                      accept="image/*"
                      className="w-full px-5 py-3 rounded-2xl bg-gray-50 border-none text-sm text-gray-500 file:hidden"
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-500 pointer-events-none font-bold">تغيير الصورة</div>
                  </div>
                  <input type="hidden" name="imageUrl" id="imageUrlInput" defaultValue={isEditing?.imageUrl} />
                </div>
              </div>

              <div className="flex gap-4 pt-6">
                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="flex-1 bg-gray-900 hover:bg-black text-white font-black py-5 rounded-2xl transition-all disabled:opacity-50 text-xl shadow-lg"
                >
                  {isLoading ? 'جاري التحليل بالذكاء الاصطناعي...' : (isEditing ? 'حفظ التعديلات' : 'نشر المنتج في المتجر')}
                </button>
                {isEditing && (
                  <button 
                    type="button"
                    onClick={() => setIsEditing(null)}
                    className="px-10 bg-gray-100 text-gray-600 font-bold py-5 rounded-2xl hover:bg-gray-200 transition-all text-xl"
                  >
                    إلغاء
                  </button>
                )}
              </div>
            </form>
          </section>
        )}

        {/* Products Grid */}
        <section id="products" className="py-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
            <div>
               <h3 className="text-4xl md:text-5xl font-black text-gray-900 mb-2">المنتجات الأكثر مبيعاً</h3>
               <p className="text-gray-400 font-bold text-lg">اختر أفضل الحلول التقنية لمنزلك أو شركتك</p>
            </div>
            <div className="flex gap-2">
               <span className="w-12 h-1 bg-blue-600 rounded-full"></span>
               <span className="w-4 h-1 bg-blue-200 rounded-full"></span>
               <span className="w-4 h-1 bg-blue-100 rounded-full"></span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {products.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                isAdmin={isAdmin}
                onEdit={setIsEditing}
                onDelete={deleteProduct}
              />
            ))}
          </div>
        </section>

        {/* Brand Story Section */}
        <section id="about" className="mt-32 grid lg:grid-cols-2 gap-16 items-center">
           <div className="relative">
              <div className="absolute -inset-4 bg-blue-600 rounded-[3rem] rotate-3 -z-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                className="rounded-[3rem] shadow-2xl w-full aspect-square object-cover" 
                alt="MoazStore Tech"
              />
              <div className="absolute bottom-10 -right-10 bg-white p-8 rounded-3xl shadow-2xl hidden md:block">
                 <div className="text-4xl font-black text-blue-600 mb-1">10+</div>
                 <div className="text-gray-500 font-bold">سنوات خبرة</div>
              </div>
           </div>
           <div className="space-y-8">
              <h3 className="text-4xl font-black text-gray-900 leading-tight">MoazStore <br/><span className="text-blue-600">الجودة هي المعيار</span></h3>
              <p className="text-xl text-gray-500 leading-relaxed font-medium">
                في معاذ ستور، نؤمن بأن التكنولوجيا يجب أن تسهل حياتك. لهذا السبب نوفر لك أحدث أجهزة تقوية الشبكات لضمان عدم انقطاع اتصالك أبداً، وأقفالاً ذكية تجعل من منزلك حصناً آمناً وسهل الوصول.
              </p>
              <div className="grid grid-cols-2 gap-6">
                 <div className="p-6 bg-white rounded-3xl border border-gray-100 shadow-sm">
                    <div className="text-blue-600 mb-3">
                       <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                    </div>
                    <h5 className="font-bold text-gray-900 mb-1">سرعة التنفيذ</h5>
                    <p className="text-sm text-gray-400 font-bold">تركيب في أقل من 24 ساعة</p>
                 </div>
                 <div className="p-6 bg-white rounded-3xl border border-gray-100 shadow-sm">
                    <div className="text-blue-600 mb-3">
                       <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
                    </div>
                    <h5 className="font-bold text-gray-900 mb-1">دعم فني</h5>
                    <p className="text-sm text-gray-400 font-bold">متواجدون دائماً لمساعدتك</p>
                 </div>
              </div>
           </div>
        </section>
      </main>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white pt-24 pb-12 px-6 md:px-12 mt-32">
        <div className="container mx-auto grid lg:grid-cols-4 gap-12">
          <div className="lg:col-span-2">
            <h4 className="text-3xl font-black mb-8 italic">Moaz<span className="text-blue-500">.</span>store</h4>
            <p className="text-gray-400 text-xl leading-relaxed max-w-lg font-medium">
              الوجهة الأولى في مصر لحلول تقوية الإشارة والتحكم الذكي في المداخل. خبرة تمتد لسنوات في خدمة كبرى الشركات والمنازل.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-black text-white/40 uppercase tracking-widest mb-8">التواصل</h4>
            <ul className="space-y-6 text-xl font-bold">
              <li>
                <a href={`tel:${APP_CONTACTS.phone}`} className="hover:text-blue-500 transition-colors flex items-center gap-3">
                  <span className="opacity-40">T.</span> {APP_CONTACTS.phone}
                </a>
              </li>
              <li>
                <a href={`https://wa.me/${APP_CONTACTS.whatsapp}`} className="hover:text-emerald-500 transition-colors flex items-center gap-3">
                  <span className="opacity-40">W.</span> {APP_CONTACTS.whatsapp}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-black text-white/40 uppercase tracking-widest mb-8">ساعات العمل</h4>
            <p className="text-xl font-bold mb-2">يومياً من 10 ص - 10 م</p>
            <p className="text-gray-500 font-bold">نسعد بخدمتكم في جميع محافظات مصر</p>
          </div>
        </div>
        <div className="mt-24 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-500 font-bold text-sm tracking-widest uppercase">
            &copy; {new Date().getFullYear()} MoazStore Brand. Powered by Innovation.
          </p>
          <div className="flex gap-8 text-gray-500 font-bold text-sm tracking-widest uppercase">
             <a href="#" className="hover:text-white transition-colors">Facebook</a>
             <a href="#" className="hover:text-white transition-colors">Instagram</a>
             <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
