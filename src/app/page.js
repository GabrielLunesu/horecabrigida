'use client';

import { useState, useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";
import { getAllProducts, getCategories } from "@/lib/products";

export default function Home() {
  const featuredProducts = getAllProducts().slice(0, 3);
  const categories = getCategories();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40 z-10"></div>
        <div className="absolute inset-0">
          <Image
            src="/products/safeline/safeline.jpg"
            alt="Horeca Brigida"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className={`container relative z-20 text-white transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Tweedehands Horeca Apparatuur
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl">
            Kwaliteit voor een betaalbare prijs. Bekijk ons assortiment aan professionele horeca apparatuur.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/catalog" className="btn-primary text-center py-3 px-8 text-lg hover:scale-105 transition-transform">
              Bekijk Producten
            </Link>
            <Link href="/contact" className="btn-outline bg-white/10 text-white border-white text-center py-3 px-8 text-lg hover:bg-white hover:text-black hover:scale-105 transition-transform">
              Neem Contact Op
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-[var(--gray-light)]">
        <div className="container">
          <div className="text-center mb-12 slide-up">
            <h2 className="text-3xl font-bold mb-4">Uitgelichte Producten</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Ontdek onze selectie van hoogwaardige tweedehands horeca apparatuur, klaar voor direct gebruik.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product, index) => (
              <Link 
                key={product.id} 
                href={`/products/${product.id}`}
                className={`card group transition-all duration-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="relative overflow-hidden aspect-video">
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[var(--secondary)] font-bold">€{product.price}</span>
                    {product.condition && (
                      <span className="text-xs px-2 py-1 bg-[var(--gray)] rounded-full">
                        {product.condition}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 line-clamp-2 mb-4">
                    {product.description}
                  </p>
                  <div className="text-[var(--primary)] font-medium group-hover:underline">
                    Bekijk Details →
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-12 slide-up" style={{ animationDelay: '0.3s' }}>
            <Link href="/catalog" className="btn-primary inline-block py-3 px-8 hover:scale-105 transition-transform">
              Bekijk Alle Producten
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-12 slide-up">
            <h2 className="text-3xl font-bold mb-4">Onze Categorieën</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Wij bieden een breed assortiment aan tweedehands horeca apparatuur in verschillende categorieën.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <Link 
                key={category} 
                href={`/catalog?category=${category}`}
                className={`bg-white rounded-xl shadow-md overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-lg p-6 text-center ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <h3 className="text-xl font-semibold mb-2">{category}</h3>
                <p className="text-gray-600 mb-4">
                  Bekijk onze {category.toLowerCase()} collectie
                </p>
                <span className="text-[var(--primary)] font-medium hover:underline">
                  Bekijk Producten →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-[var(--primary)] text-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="slide-in-left">
              <h2 className="text-3xl font-bold mb-6">Over Horeca Brigida</h2>
              <p className="text-lg mb-4">
                Horeca Brigida is gespecialiseerd in de verkoop van kwalitatieve tweedehands horeca apparatuur in Brunssum.
              </p>
              <p className="text-lg mb-6">
                Wij bieden een breed assortiment aan professionele apparatuur voor restaurants, cafés, hotels en andere horecagelegenheden tegen betaalbare prijzen.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  Uitgebreide kennis en ervaring
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  Kwaliteitscontrole op alle apparatuur
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  Persoonlijk advies en service
                </li>
              </ul>
              <Link href="/contact" className="btn-secondary inline-block py-3 px-8 hover:scale-105 transition-transform">
                Neem Contact Op
              </Link>
            </div>
            <div className="relative h-[400px] rounded-xl overflow-hidden shadow-xl slide-in-right">
              <Image
                src="/products/safeline/safeline.jpg"
                alt="Horeca Brigida Showroom"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[var(--gray-light)]">
        <div className="container text-center">
          <div className="slide-up">
            <h2 className="text-3xl font-bold mb-4">Interesse in onze producten?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8">
              Neem contact met ons op voor meer informatie over onze producten of om een afspraak te maken voor bezichtiging.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/catalog" className="btn-primary py-3 px-8 hover:scale-105 transition-transform">
                Bekijk Producten
              </Link>
              <Link href="/contact" className="btn-outline py-3 px-8 hover:scale-105 transition-transform">
                Neem Contact Op
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
