'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { getProductById } from '@/lib/products';
import ContactForm from '@/components/ContactForm';

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState('description');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (id) {
      const productData = getProductById(id);
      setProduct(productData);
      setLoading(false);
      
      // Animation effect
      setTimeout(() => {
        setIsLoaded(true);
      }, 100);
    }
  }, [id]);

  if (loading) {
    return (
      <div className="container py-12 flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[var(--primary)]"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Product niet gevonden</h1>
        <p className="text-gray-600 mb-8">
          Het product dat u zoekt bestaat niet of is niet meer beschikbaar.
        </p>
        <Link href="/catalog" className="btn-primary hover:scale-105 transition-transform">
          Terug naar Catalogus
        </Link>
      </div>
    );
  }

  return (
    <div className="py-12 bg-white">
      <div className="container">
        {/* Breadcrumbs */}
        <nav className={`mb-8 transition-all duration-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <ol className="flex flex-wrap items-center text-sm text-gray-600">
            <li className="flex items-center">
              <Link href="/" className="hover:text-[var(--primary)] transition-colors">
                Home
              </Link>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 mx-2">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </li>
            <li className="flex items-center">
              <Link href="/catalog" className="hover:text-[var(--primary)] transition-colors">
                Catalogus
              </Link>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 mx-2">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </li>
            <li className="text-[var(--primary)] font-medium truncate">
              {product.name}
            </li>
          </ol>
        </nav>

        {/* Product Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div className={`transition-all duration-500 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="relative aspect-square rounded-xl overflow-hidden mb-4 bg-white shadow-md">
              <Image
                src={product.images[activeImage]}
                alt={product.name}
                fill
                className="object-contain"
              />
            </div>
            
            {product.images.length > 1 && (
              <div className="grid grid-cols-5 gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`relative aspect-square rounded-md overflow-hidden border-2 transition-all duration-300 ${
                      activeImage === index 
                        ? 'border-[var(--primary)]' 
                        : 'border-transparent hover:border-gray-300'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} - Afbeelding ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Product Info */}
          <div className={`transition-all duration-500 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            
            <div className="flex items-center mb-4">
              <span className="text-2xl font-bold text-[var(--secondary)]">€{product.price}</span>
              {product.condition && (
                <span className="ml-4 px-3 py-1 bg-[var(--gray-light)] rounded-full text-sm">
                  {product.condition}
                </span>
              )}
            </div>
            
            <div className="mb-6">
              <p className="text-gray-600">
                {product.description}
              </p>
            </div>
            
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-2">Kenmerken</h2>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start slide-in-right" style={{ animationDelay: `${index * 100}ms` }}>
                    <svg className="w-5 h-5 text-[var(--primary)] mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <Link 
                href={`/contact?product=${product.id}`} 
                className="btn-primary text-center py-3 hover:scale-105 transition-transform"
              >
                Vraag Informatie Aan
              </Link>
              <a 
                href="tel:+31612345678" 
                className="btn-outline text-center py-3 hover:scale-105 transition-transform"
              >
                Bel Voor Bezichtiging
              </a>
            </div>
            
            <div className="bg-[var(--gray-light)] rounded-lg p-4 text-sm pulse">
              <p className="flex items-center text-gray-600">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                Dit product is alleen beschikbaar voor bezichtiging op afspraak.
              </p>
            </div>
          </div>
        </div>
        
        {/* Product Details Tabs */}
        <div className={`mb-16 transition-all duration-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '200ms' }}>
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              <button
                onClick={() => setActiveTab('description')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'description'
                    ? 'border-[var(--primary)] text-[var(--primary)]'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Beschrijving
              </button>
              <button
                onClick={() => setActiveTab('specifications')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'specifications'
                    ? 'border-[var(--primary)] text-[var(--primary)]'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Specificaties
              </button>
            </nav>
          </div>
          
          <div className="py-8">
            {activeTab === 'description' && (
              <div className="fade-in">
                <p className="text-gray-600 mb-4">
                  {product.description}
                </p>
                <h3 className="text-lg font-semibold mb-4">Kenmerken</h3>
                <ul className="space-y-2 mb-6">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="w-5 h-5 text-[var(--primary)] mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <p className="text-gray-600">
                  Voor meer informatie over dit product kunt u contact met ons opnemen via het contactformulier of telefonisch.
                </p>
              </div>
            )}
            
            {activeTab === 'specifications' && (
              <div className="fade-in">
                <h3 className="text-lg font-semibold mb-4">Technische Specificaties</h3>
                <div className="bg-white rounded-xl overflow-hidden shadow-md">
                  <table className="min-w-full divide-y divide-gray-200">
                    <tbody className="divide-y divide-gray-200">
                      {Object.entries(product.specifications).map(([key, value], index) => (
                        <tr key={key} className={`transition-all duration-300 hover:bg-gray-50`} style={{ animationDelay: `${index * 50}ms` }}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 capitalize">
                            {key}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            {value}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Contact Form */}
        <div className={`mb-16 transition-all duration-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '300ms' }}>
          <h2 className="text-2xl font-bold mb-6 text-center">Interesse in dit product?</h2>
          <ContactForm productName={product.name} />
        </div>
      </div>
    </div>
  );
} 