'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function ProductCard({ product, index = 0 }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Add a small delay based on the index to create a staggered animation effect
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 100);
    
    return () => clearTimeout(timer);
  }, [index]);
  
  return (
    <div 
      className={`card group transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden aspect-square">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={`object-cover transition-transform duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`}
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2 truncate">{product.name}</h3>
        
        <div className="flex items-center justify-between mb-3">
          <span className="text-[var(--secondary)] font-bold">€{product.price}</span>
          {product.condition && (
            <span className="text-xs px-2 py-1 bg-[var(--gray-light)] rounded-full">
              {product.condition}
            </span>
          )}
        </div>
        
        <p className="text-sm text-gray-600 line-clamp-2 mb-4">
          {product.description}
        </p>
        
        <div className="flex space-x-2">
          <Link 
            href={`/products/${product.id}`} 
            className="btn-primary flex-1 text-center text-sm py-2 transition-transform hover:scale-105"
          >
            Bekijk Details
          </Link>
          <Link 
            href={`/contact?product=${product.id}`} 
            className="btn-outline flex-1 text-center text-sm py-2 transition-transform hover:scale-105"
          >
            Vraag Info
          </Link>
        </div>
      </div>
    </div>
  );
} 