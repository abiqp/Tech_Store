import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import { useLocation } from 'react-router-dom';
import { Product } from '../types/Products';

const ProductCatalog: React.FC = () => {
  const location = useLocation();
  
  const allCategories = useMemo(() => ['Todos', ...Array.from(new Set(products.map(p => p.category)))], []);
  const allBrands = useMemo(() => ['Todos', ...Array.from(new Set(products.map(p => p.brand)))], []);
  const allColors = useMemo(() => ['Todos', ...Array.from(new Set(products.map(p => p.color).filter(Boolean) as string[]))], []);

  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 2000 });
  const [sortBy, setSortBy] = useState('name');
  const [selectedBrand, setSelectedBrand] = useState('Todos');
  const [minRating, setMinRating] = useState<number>(0);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [selectedColor, setSelectedColor] = useState<string>('Todos');

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const categoryFromUrl = queryParams.get('category');
    if (categoryFromUrl && allCategories.includes(categoryFromUrl)) {
      setSelectedCategory(categoryFromUrl);
    } else {
      setSelectedCategory('Todos'); 
    }
    setSearchTerm('');
    setSelectedBrand('Todos');
    setMinRating(0);
    setInStockOnly(false);
    setSelectedColor('Todos');
    setPriceRange({ min: 0, max: 2000 });
    setSortBy('name');
  }, [location.search, allCategories]);

  const handleFilter = useCallback(() => {
    let filtered = [...products];

    if (selectedCategory !== 'Todos') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    filtered = filtered.filter(product =>
      product.price >= priceRange.min && product.price <= priceRange.max
    );
    if (selectedBrand !== 'Todos') {
      filtered = filtered.filter(product => product.brand === selectedBrand);
    }
    if (minRating > 0) {
        filtered = filtered.filter(product => product.rating >= minRating);
    }
    if (inStockOnly) {
      filtered = filtered.filter(product => product.inStock);
    }
    if (selectedColor !== 'Todos') {
        filtered = filtered.filter(product => product.color === selectedColor);
    }
    const sorted = filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low': return a.price - b.price;
        case 'price-high': return b.price - a.price;
        case 'rating': return b.rating - a.rating;
        default: return a.name.localeCompare(b.name);
      }
    });
    setFilteredProducts(sorted);
  }, [selectedCategory, searchTerm, priceRange, sortBy, selectedBrand, minRating, inStockOnly, selectedColor]);

  useEffect(() => {
    handleFilter();
  }, [handleFilter]);

  const FiltersSidebar = () => (
    <div className="filters-content">
      <div className="card-header bg-primary text-white d-flex align-items-center">
        <h5 className="mb-0 flex-grow-1"><Filter className="me-2" size={20} /> Filtros</h5>
        <button type="button" className="btn-close btn-close-white d-lg-none" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div className="card-body">
        <div className="mb-4">
          <label className="form-label fw-semibold">Buscar</label>
          <div className="input-group"><span className="input-group-text"><Search size={16} /></span><input type="text" className="form-control" placeholder="Buscar productos..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} /></div>
        </div>
        <div className="mb-4">
          <label className="form-label fw-semibold">Categoría</label>
          <select className="form-select" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>{allCategories.map(c => <option key={c} value={c}>{c}</option>)}</select>
        </div>
        <div className="mb-4">
          <label className="form-label fw-semibold">Marca</label>
          <select className="form-select" value={selectedBrand} onChange={(e) => setSelectedBrand(e.target.value)}>{allBrands.map(b => <option key={b} value={b}>{b}</option>)}</select>
        </div>
        <div className="mb-4">
          <label className="form-label fw-semibold">Color</label>
          <select className="form-select" value={selectedColor} onChange={(e) => setSelectedColor(e.target.value)}>{allColors.map(c => <option key={c} value={c}>{c}</option>)}</select>
        </div>
        <div className="mb-4">
          <label className="form-label fw-semibold">Calificación Mínima</label>
          <div>
            {[5, 4, 3, 2, 1].map(r => <div key={r} className="form-check"><input className="form-check-input" type="radio" name="ratingFilter" id={`rating-${r}`} checked={minRating === r} onChange={() => setMinRating(r)} /><label className="form-check-label" htmlFor={`rating-${r}`}>{r} Estrellas y más</label></div>)}
            <div className="form-check"><input className="form-check-input" type="radio" name="ratingFilter" id="rating-0" checked={minRating === 0} onChange={() => setMinRating(0)} /><label className="form-check-label" htmlFor="rating-0">Cualquiera</label></div>
          </div>
        </div>
        <div className="mb-4">
          <div className="form-check"><input className="form-check-input" type="checkbox" id="inStockCheck" checked={inStockOnly} onChange={e => setInStockOnly(e.target.checked)} /><label className="form-check-label fw-semibold" htmlFor="inStockCheck">Mostrar solo en stock</label></div>
        </div>
        <div>
          <label className="form-label fw-semibold">Precio hasta: ${priceRange.max}</label>
          <input type="range" className="form-range" min="0" max="2000" step="50" value={priceRange.max} onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value)})} />
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* --- BOTÓN FLOTANTE PARA FILTROS EN MÓVIL --- */}
      <button className="btn btn-primary d-lg-none mobile-filter-button" type="button" data-bs-toggle="offcanvas" data-bs-target="#filtersOffcanvas" aria-controls="filtersOffcanvas">
        <SlidersHorizontal size={20} className="me-2" /> Filtros
      </button>

      <div className="container py-4">
        <div className="row">
          {/* --- FILTROS PARA ESCRITORIO --- */}
          <div className="col-lg-3 d-none d-lg-block">
            <div className="card shadow-sm">
              <FiltersSidebar />
            </div>
          </div>

          {/* --- FILTROS OFFCANVAS PARA MÓVIL --- */}
          <div className="offcanvas offcanvas-start" tabIndex={-1} id="filtersOffcanvas" aria-labelledby="filtersOffcanvasLabel">
            <FiltersSidebar />
          </div>

          {/* --- COLUMNA DE PRODUCTOS --- */}
          <div className="col-12 col-lg-9">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h2 className="mb-1">Productos</h2>
                <p className="text-muted mb-0">Mostrando {filteredProducts.length} de {products.length} productos</p>
              </div>
              <div className="d-flex align-items-center">
                <label className="form-label me-2 mb-0 d-none d-sm-block">Ordenar por:</label>
                <select className="form-select" style={{ width: 'auto' }} value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                  <option value="name">Nombre</option>
                  <option value="price-low">Precio (Bajo a Alto)</option>
                  <option value="price-high">Precio (Alto a Bajo)</option>
                  <option value="rating">Mejor Valorados</option>
                </select>
              </div>
            </div>
            {filteredProducts.length > 0 ? (
              <div className="row row-cols-1 row-cols-sm-2 row-cols-xl-3 g-4">
                {filteredProducts.map(product => (
                  <div key={product.id} className="col">
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-5">
                <h4 className="text-muted">No se encontraron productos</h4>
                <p className="text-muted">Intenta ajustar los filtros de búsqueda</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCatalog;
