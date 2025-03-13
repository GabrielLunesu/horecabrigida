'use client';

import { useState, useEffect, useRef } from 'react';
import Image from "next/image";
import Link from "next/link";
import { getAllProducts, getCategories } from "@/lib/products";

export default function Home() {
  const featuredProducts = getAllProducts().slice(0, 3);
  const categories = getCategories();
  const [isLoaded, setIsLoaded] = useState(false);
  const heroRef = useRef(null);

  useEffect(() => {
    setIsLoaded(true);

    // Parallax effect for hero section
    const handleScroll = () => {
      if (heroRef.current) {
        const scrollPosition = window.scrollY;
        heroRef.current.style.transform = `translateY(${scrollPosition * 0.4}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/50 z-10"></div>
        <div className="absolute inset-0" ref={heroRef}>
          <Image
            src="/products/safeline/safeline.jpg"
            alt="Horeca Brigida"
            fill
            className="object-cover scale-110"
            priority
          />
        </div>
        <div className={`container relative z-20 text-white transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="block">Tweedehands</span>
              <span className="block gradient-text-secondary">Horeca Apparatuur</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl">
              Kwaliteit voor een betaalbare prijs. Bekijk ons assortiment aan professionele horeca apparatuur.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/catalog" className="btn-primary text-center py-3 px-8 text-lg hover:scale-105 transition-transform flex items-center justify-center group">
                <span>Bekijk Producten</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
              <Link href="/contact" className="glassmorphism text-white border-white text-center py-3 px-8 text-lg hover:bg-white/20 hover:scale-105 transition-all rounded-lg flex items-center justify-center">
                <span>Neem Contact Op</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </Link>
            </div>
          </div>
          
          {/* Floating elements for visual interest */}
          <div className="absolute top-20 right-20 w-24 h-24 rounded-full bg-blue-500 opacity-20 float"></div>
          <div className="absolute bottom-20 right-40 w-16 h-16 rounded-full bg-orange-500 opacity-20 float" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-40 right-60 w-12 h-12 rounded-full bg-white opacity-10 float" style={{ animationDelay: '2s' }}></div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 text-white text-center">
          <p className="text-sm mb-2 opacity-80">Scroll naar beneden</p>
          <div className="w-6 h-10 border-2 border-white rounded-full mx-auto flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container">
          <div className="text-center mb-16 slide-up">
            <span className="inline-block px-4 py-1 bg-blue-50 text-[var(--primary)] rounded-full text-sm font-medium mb-4">Onze Selectie</span>
            <h2 className="text-4xl font-bold mb-4 gradient-text">Uitgelichte Producten</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Ontdek onze selectie van hoogwaardige tweedehands horeca apparatuur, klaar voor direct gebruik.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product, index) => (
              <Link 
                key={product.id} 
                href={`/products/${product.id}`}
                className={`card card-hover-effect gradient-border transition-all duration-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} group`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="relative overflow-hidden aspect-video">
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-4 text-white">
                      <span className="text-sm font-medium">Bekijk Details</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 group-hover:bg-[var(--primary)] group-hover:text-white transition-all duration-300">
                  <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                  <div className="flex items-center justify-between mb-3">
                    <span className="gradient-text-secondary text-xl font-bold group-hover:text-white transition-all duration-300">€{product.price}</span>
                    {product.condition && (
                      <span className="text-xs px-3 py-1 bg-[var(--gray-light)] rounded-full group-hover:bg-white/20 transition-all duration-300">
                        {product.condition}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 line-clamp-2 mb-4 group-hover:text-white/90 transition-all duration-300">
                    {product.description}
                  </p>
                  <div className="text-[var(--primary)] font-medium group-hover:text-white flex items-center transition-all duration-300">
                    <span>Bekijk Details</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-12 slide-up" style={{ animationDelay: '0.3s' }}>
            <Link href="/catalog" className="btn-primary inline-flex items-center py-3 px-8 hover:scale-105 transition-transform">
              <span>Bekijk Alle Producten</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-50 rounded-full opacity-50 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-orange-50 rounded-full opacity-50 translate-x-1/3 translate-y-1/3"></div>
        
        <div className="container relative">
          <div className="text-center mb-16 slide-up">
            <span className="inline-block px-4 py-1 bg-orange-50 text-[var(--secondary)] rounded-full text-sm font-medium mb-4">Ons Assortiment</span>
            <h2 className="text-4xl font-bold mb-4 gradient-text-secondary">Onze Categorieën</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Wij bieden een breed assortiment aan tweedehands horeca apparatuur in verschillende categorieën.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <Link 
                key={category} 
                href={`/catalog?category=${category}`}
                className={`glassmorphism p-8 text-center rounded-xl transition-all duration-500 hover:scale-[1.03] hover:shadow-lg ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">{category}</h3>
                <p className="text-gray-600 mb-4">
                  Bekijk onze {category.toLowerCase()} collectie
                </p>
                <span className="text-[var(--primary)] font-medium flex items-center justify-center group">
                  <span>Bekijk Producten</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 gradient-primary opacity-95"></div>
        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="slide-in-left text-white">
              <span className="inline-block px-4 py-1 bg-white/20 text-white rounded-full text-sm font-medium mb-4">Over Ons</span>
              <h2 className="text-4xl font-bold mb-6">Over Horeca Brigida</h2>
              <p className="text-lg mb-4 opacity-90">
                Horeca Brigida is gespecialiseerd in de verkoop van kwalitatieve tweedehands horeca apparatuur in Brunssum.
              </p>
              <p className="text-lg mb-6 opacity-90">
                Wij bieden een breed assortiment aan professionele apparatuur voor restaurants, cafés, hotels en andere horecagelegenheden tegen betaalbare prijzen.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <span>Uitgebreide kennis en ervaring</span>
                </li>
                <li className="flex items-center">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <span>Kwaliteitscontrole op alle apparatuur</span>
                </li>
                <li className="flex items-center">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <span>Persoonlijk advies en service</span>
                </li>
              </ul>
              <Link href="/contact" className="btn-secondary inline-flex items-center py-3 px-8 hover:scale-105 transition-transform">
                <span>Neem Contact Op</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </Link>
            </div>
            <div className="relative slide-in-right">
              <div className="absolute inset-0 bg-white/10 rounded-2xl transform rotate-3"></div>
              <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/products/safeline/safeline.jpg"
                  alt="Horeca Brigida Showroom"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[var(--secondary)] rounded-2xl opacity-20 rotate"></div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-12 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 gradient-primary"></div>
            <div className="relative z-10 slide-up">
              <h2 className="text-3xl font-bold mb-4 gradient-text">Interesse in onze producten?</h2>
              <p className="text-gray-600 max-w-2xl mx-auto mb-8">
                Neem contact met ons op voor meer informatie over onze producten of om een afspraak te maken voor bezichtiging.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/catalog" className="btn-primary py-3 px-8 hover:scale-105 transition-transform flex items-center justify-center">
                  <span>Bekijk Producten</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
                <Link href="/contact" className="btn-outline py-3 px-8 hover:scale-105 transition-transform flex items-center justify-center">
                  <span>Neem Contact Op</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </Link>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-50 rounded-full opacity-50"></div>
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-orange-50 rounded-full opacity-50"></div>
          </div>
        </div>
      </section>
    </div>
  );
}
