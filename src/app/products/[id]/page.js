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
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

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

  const handlePrint = () => {
    setShowPrintModal(true);
    setTimeout(() => {
      window.print();
      setShowPrintModal(false);
    }, 300);
  };

  const handleCopyLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    });
  };

  const handleShare = (platform) => {
    const url = window.location.href;
    const text = `Bekijk dit product: ${product.name}`;
    
    let shareUrl;
    
    switch (platform) {
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`;
        break;
      case 'email':
        shareUrl = `mailto:?subject=${encodeURIComponent(text)}&body=${encodeURIComponent(text + '\n\n' + url)}`;
        break;
      default:
        return;
    }
    
    window.open(shareUrl, '_blank');
    setShowShareOptions(false);
  };

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
    <>
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
              <div className="flex justify-between items-start mb-2">
                <h1 className="text-3xl font-bold">{product.name}</h1>
                <div className="flex space-x-2 print:hidden">
                  <button 
                    onClick={handlePrint}
                    className="text-gray-500 hover:text-[var(--primary)] transition-colors p-2"
                    aria-label="Print productinformatie"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                    </svg>
                  </button>
                  <div className="relative">
                    <button 
                      onClick={() => setShowShareOptions(!showShareOptions)}
                      className="text-gray-500 hover:text-[var(--primary)] transition-colors p-2"
                      aria-label="Deel productinformatie"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                      </svg>
                    </button>
                    
                    {/* Share options dropdown */}
                    {showShareOptions && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 fade-in">
                        <div className="py-1">
                          <button 
                            onClick={() => handleShare('whatsapp')}
                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-4 h-4 mr-3 text-green-500">
                              <path fill="currentColor" d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
                            </svg>
                            Deel via WhatsApp
                          </button>
                          <button 
                            onClick={() => handleShare('email')}
                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-3 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            Deel via E-mail
                          </button>
                          <button 
                            onClick={handleCopyLink}
                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                            </svg>
                            {linkCopied ? 'Link gekopieerd!' : 'Kopieer link'}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
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
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 print:hidden">
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
              
              <div className="bg-[var(--gray-light)] rounded-lg p-4 text-sm pulse print:hidden">
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
          <div className={`mb-16 transition-all duration-500 print:hidden ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '200ms' }}>
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
          <div className={`mb-16 transition-all duration-500 print:hidden ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '300ms' }}>
            <h2 className="text-2xl font-bold mb-6 text-center">Interesse in dit product?</h2>
            <ContactForm productName={product.name} />
          </div>
        </div>
      </div>

      {/* Print-only content */}
      <div className="hidden print:block p-8">
        <div className="flex items-center justify-between mb-8 border-b pb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-gray-600">Product ID: {product.id}</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-[var(--secondary)]">€{product.price}</p>
            <p className="text-gray-600">{product.condition}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">Productbeschrijving</h2>
            <p className="text-gray-600 mb-6">{product.description}</p>
            
            <h3 className="text-lg font-semibold mb-2">Kenmerken</h3>
            <ul className="list-disc pl-5 mb-6 space-y-1">
              {product.features.map((feature, index) => (
                <li key={index} className="text-gray-600">{feature}</li>
              ))}
            </ul>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">Specificaties</h2>
            <table className="w-full mb-6">
              <tbody>
                {Object.entries(product.specifications).map(([key, value], index) => (
                  <tr key={key} className="border-b">
                    <td className="py-2 font-medium text-gray-900 capitalize">{key}</td>
                    <td className="py-2 text-gray-600">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="border-t pt-6">
          <h2 className="text-xl font-semibold mb-4">Contact Informatie</h2>
          <div className="flex justify-between">
            <div>
              <p className="font-medium">Horeca Brigida</p>
              <p>Hoofdstraat 123</p>
              <p>6445 AB Brunssum</p>
              <p>Nederland</p>
            </div>
            <div>
              <p>Tel: +31 6 12345678</p>
              <p>Email: info@horecabrigida.nl</p>
              <p>Website: www.horecabrigida.nl</p>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-6 text-center">
            Dit document is afgedrukt op {new Date().toLocaleDateString('nl-NL')} en is alleen bedoeld voor informatieve doeleinden.
            Prijzen en beschikbaarheid kunnen veranderen. Neem contact op voor de meest actuele informatie.
          </p>
        </div>
      </div>
    </>
  );
} 