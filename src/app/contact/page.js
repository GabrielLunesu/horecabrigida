'use client';

import { useState, useEffect, Suspense } from 'react';
import Image from 'next/image';
import ContactForm from '@/components/ContactForm';

// Client component for the form
function ContactFormWrapper() {
  return <ContactForm />;
}

// Server component for the page
export default function ContactPage() {
  const [mapLoaded, setMapLoaded] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    // Animation effect
    setTimeout(() => {
      setIsLoaded(true);
    }, 100);
  }, []);
  
  return (
    <div className="py-12 bg-white">
      <div className="container">
        <div className={`text-center mb-12 transition-all duration-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h1 className="text-4xl font-bold mb-4">Neem Contact Op</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Heeft u vragen over onze producten of wilt u een afspraak maken voor bezichtiging? Neem dan contact met ons op.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Contact Info */}
          <div className={`transition-all duration-500 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="bg-white rounded-xl shadow-md p-8 mb-8">
              <h2 className="text-2xl font-bold mb-6">Contactgegevens</h2>
              
              <div className="space-y-6">
                <div className="flex items-start slide-in-right" style={{ animationDelay: '0.1s' }}>
                  <div className="flex-shrink-0 bg-[var(--primary)] rounded-full p-2 mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Adres</h3>
                    <p className="text-gray-600">
                      Hoofdstraat 123<br />
                      6445 AB Brunssum<br />
                      Nederland
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start slide-in-right" style={{ animationDelay: '0.2s' }}>
                  <div className="flex-shrink-0 bg-[var(--primary)] rounded-full p-2 mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Telefoon</h3>
                    <p className="text-gray-600">
                      <a href="tel:+31612345678" className="hover:text-[var(--primary)] transition-colors">
                        +31 6 12345678
                      </a>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start slide-in-right" style={{ animationDelay: '0.3s' }}>
                  <div className="flex-shrink-0 bg-[var(--primary)] rounded-full p-2 mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">E-mail</h3>
                    <p className="text-gray-600">
                      <a href="mailto:info@horecabrigida.nl" className="hover:text-[var(--primary)] transition-colors">
                        info@horecabrigida.nl
                      </a>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start slide-in-right" style={{ animationDelay: '0.4s' }}>
                  <div className="flex-shrink-0 bg-[var(--primary)] rounded-full p-2 mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Openingstijden</h3>
                    <p className="text-gray-600">
                      Maandag - Vrijdag: 9:00 - 17:00<br />
                      Zaterdag: 10:00 - 15:00<br />
                      Zondag: Gesloten
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-md overflow-hidden slide-up" style={{ animationDelay: '0.5s' }}>
              <div className="relative h-[300px] w-full">
                {/* Google Maps embed */}
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2518.232469805203!2d5.9679723!3d50.9349675!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c0bdb1e83b5de7%3A0x2a5b9b3f5c391c3d!2sBrunssum%2C%20Netherlands!5e0!3m2!1sen!2sus!4v1647532200000!5m2!1sen!2sus" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0"
                  onLoad={() => setMapLoaded(true)}
                ></iframe>
                
                {/* Loading overlay */}
                {!mapLoaded && (
                  <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--primary)]"></div>
                  </div>
                )}
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent to-black/10"></div>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className={`transition-all duration-500 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`} style={{ transitionDelay: '200ms' }}>
            <Suspense fallback={
              <div className="bg-white rounded-xl shadow-md p-6 animate-pulse">
                <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
                <div className="space-y-4">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            }>
              <ContactFormWrapper />
            </Suspense>
          </div>
        </div>
        
        {/* FAQ Section */}
        <div className={`mb-16 transition-all duration-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '300ms' }}>
          <h2 className="text-2xl font-bold mb-8 text-center">Veelgestelde Vragen</h2>
          
          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-md p-6 slide-up" style={{ animationDelay: '0.4s' }}>
              <h3 className="text-lg font-semibold mb-2">Kan ik de producten online bestellen?</h3>
              <p className="text-gray-600">
                Nee, onze producten zijn alleen beschikbaar voor bezichtiging en aankoop op locatie. U kunt wel via de website informatie aanvragen over specifieke producten.
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-6 slide-up" style={{ animationDelay: '0.5s' }}>
              <h3 className="text-lg font-semibold mb-2">Bieden jullie garantie op de producten?</h3>
              <p className="text-gray-600">
                Ja, op al onze producten zit een garantie van 3 maanden. Voor specifieke garantievoorwaarden kunt u contact met ons opnemen.
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-6 slide-up" style={{ animationDelay: '0.6s' }}>
              <h3 className="text-lg font-semibold mb-2">Kan ik een product reserveren?</h3>
              <p className="text-gray-600">
                Ja, u kunt een product reserveren door contact met ons op te nemen. We houden het product dan maximaal 7 dagen voor u vast.
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-6 slide-up" style={{ animationDelay: '0.7s' }}>
              <h3 className="text-lg font-semibold mb-2">Bieden jullie bezorgservice?</h3>
              <p className="text-gray-600">
                Ja, we kunnen producten tegen een meerprijs bezorgen. De exacte kosten zijn afhankelijk van de afstand en het gewicht van het product.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 