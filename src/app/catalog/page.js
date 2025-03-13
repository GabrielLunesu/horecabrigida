'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import { getAllProducts, getCategories } from '@/lib/products';

// Client component that uses useSearchParams
function CatalogContent() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortOption, setSortOption] = useState('default');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const allProducts = getAllProducts();
    const allCategories = getCategories();
    
    if (allProducts && allCategories) {
      setProducts(allProducts);
      setFilteredProducts(allProducts);
      setCategories(allCategories);
      
      // Check if there's a category in the URL
      const categoryParam = searchParams.get('category');
      if (categoryParam) {
        setSelectedCategory(categoryParam);
      }

      // Animation effect
      setTimeout(() => {
        setIsLoaded(true);
      }, 100);
    }
  }, [searchParams]);

  useEffect(() => {
    let result = [...products];
    
    // Apply category filter
    if (selectedCategory) {
      result = result.filter(product => product.category === selectedCategory);
    }
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(product => 
        product.name.toLowerCase().includes(query) || 
        product.description.toLowerCase().includes(query)
      );
    }
    
    // Apply sorting
    switch (sortOption) {
      case 'price-asc':
        result.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        break;
      case 'price-desc':
        result.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        break;
      case 'name-asc':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        // Default sorting (by ID)
        result.sort((a, b) => a.id - b.id);
    }
    
    setFilteredProducts(result);
  }, [products, selectedCategory, sortOption, searchQuery]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category === selectedCategory ? '' : category);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Search is already applied via useEffect
  };

  // Add loading state
  if (!products.length) {
    return (
      <div className="container py-12 flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[var(--primary)]"></div>
      </div>
    );
  }

  return (
    <div className="py-12 bg-white">
      <div className="container">
        <div className={`mb-12 text-center transition-all duration-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h1 className="text-4xl font-bold mb-4">Onze Producten</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Bekijk ons assortiment aan tweedehands horeca apparatuur. Filter op categorie of zoek naar specifieke producten.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar with filters */}
          <div className="lg:col-span-1">
            <div className={`bg-white rounded-xl shadow-md p-6 sticky top-24 transition-all duration-500 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <h2 className="text-xl font-semibold mb-4">Filters</h2>
              
              {/* Search */}
              <div className="mb-6">
                <h3 className="text-sm font-medium mb-2">Zoeken</h3>
                <form onSubmit={handleSearchSubmit}>
                  <div className="relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={handleSearchChange}
                      placeholder="Zoek producten..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all duration-300 hover:border-[var(--primary)]"
                    />
                    <button 
                      type="submit"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </button>
                  </div>
                </form>
              </div>
              
              {/* Categories */}
              <div className="mb-6">
                <h3 className="text-sm font-medium mb-2">Categorieën</h3>
                <div className="space-y-2">
                  {categories.map((category, index) => (
                    <div 
                      key={category} 
                      className="flex items-center"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <button
                        onClick={() => handleCategoryChange(category)}
                        className={`flex items-center w-full text-left px-2 py-1.5 rounded-md transition-colors ${
                          selectedCategory === category 
                            ? 'bg-[var(--primary)] text-white' 
                            : 'hover:bg-gray-100'
                        }`}
                      >
                        <span className="ml-2">{category}</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Sort */}
              <div>
                <h3 className="text-sm font-medium mb-2">Sorteren</h3>
                <select
                  value={sortOption}
                  onChange={handleSortChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all duration-300 hover:border-[var(--primary)]"
                >
                  <option value="default">Standaard</option>
                  <option value="price-asc">Prijs: Laag naar Hoog</option>
                  <option value="price-desc">Prijs: Hoog naar Laag</option>
                  <option value="name-asc">Naam: A-Z</option>
                  <option value="name-desc">Naam: Z-A</option>
                </select>
              </div>
              
              {/* Reset Filters */}
              {(selectedCategory || searchQuery || sortOption !== 'default') && (
                <button
                  onClick={() => {
                    setSelectedCategory('');
                    setSearchQuery('');
                    setSortOption('default');
                  }}
                  className="mt-6 text-[var(--primary)] hover:underline text-sm font-medium w-full text-center"
                >
                  Reset Filters
                </button>
              )}
            </div>
          </div>
          
          {/* Product Grid */}
          <div className={`lg:col-span-3 transition-all duration-500 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            {/* Active filters */}
            {(selectedCategory || searchQuery) && (
              <div className="mb-6 flex flex-wrap gap-2 items-center slide-in-right">
                <span className="text-sm text-gray-600">Actieve filters:</span>
                
                {selectedCategory && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-[var(--primary)] text-white">
                    {selectedCategory}
                    <button 
                      onClick={() => setSelectedCategory('')}
                      className="ml-2 focus:outline-none"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </span>
                )}
                
                {searchQuery && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-[var(--primary)] text-white">
                    Zoekterm: {searchQuery}
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="ml-2 focus:outline-none"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </span>
                )}
              </div>
            )}
            
            {/* Results count */}
            <div className="mb-6">
              <p className="text-sm text-gray-600">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'producten'} gevonden
              </p>
            </div>
            
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-xl shadow-md fade-in">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-12 h-12 mx-auto text-gray-400 mb-4">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-xl font-semibold mb-2">Geen producten gevonden</h3>
                <p className="text-gray-600 mb-4">
                  Probeer andere zoektermen of filters.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('');
                    setSearchQuery('');
                    setSortOption('default');
                  }}
                  className="btn-primary hover:scale-105 transition-transform"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Main component that wraps the content in Suspense
export default function CatalogPage() {
  return (
    <Suspense fallback={
      <div className="container py-12">
        <div className="text-center mb-12 animate-pulse">
          <div className="h-10 bg-gray-200 rounded w-1/3 mx-auto mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-1/3 mb-6"></div>
              <div className="space-y-4">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
                  <div className="aspect-square bg-gray-200"></div>
                  <div className="p-4">
                    <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/4 mb-3"></div>
                    <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-2/3 mb-4"></div>
                    <div className="flex space-x-2">
                      <div className="h-8 bg-gray-200 rounded w-1/2"></div>
                      <div className="h-8 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    }>
      <CatalogContent />
    </Suspense>
  );
} 