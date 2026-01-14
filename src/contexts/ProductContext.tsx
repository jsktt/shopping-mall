import { createContext, useState, type ReactNode } from "react";
import type { Category, FilterState, Product } from "../types";
import { PRODUCTS } from "../data/products";

interface ProductContextType {
    products: Product[];
    getProduct: (id: number) => Product | undefined;
    getBestProducts: () => Product[];
    getNewProducts: () => Product[];
    getProductsByCategory: (category: Category | 'all') => Product[];
    filterProducts: (filter: FilterState) => Product[];
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

interface ProductProviderProps {
    children: ReactNode;
}

const ProductProvider = ({ children }: ProductProviderProps) => {
    const [products] = useState<Product[]>(PRODUCTS);

    const getProduct = (id: number): Product | undefined => {
        return products.find(product => product.id === id);
    };

    const getBestProducts = (): Product[] => {
        return products.filter(product => product.isBest);
    };

    const getNewProducts = (): Product[] => {
        return products.filter(product => product.isNew);
    };

    const getProductsByCategory = (category: Category | 'all'): Product[] => {
        if (category === 'all') return products;
        return products.filter(product => product.category === category);
    }

    const filterProducts = (filter: FilterState): Product[] => {
        return products
            .filter(it => {
                if (filter.category === 'all') return true;
                return filter.minPrice <= it.price && it.price <= filter.maxPrice;
            })
            .sort((a, b) => {
                switch (filter.sortBy) {
                    case 'price-low': return a.price - b.price;
                    case 'price-high': return b.price - a.price;
                    case 'popular': return b.rating - a.rating;
                    case 'newest': return b.id - a.id;
                }
            })
    };

    const value: ProductContextType = {
        products,
        getProduct,
        getBestProducts,
        getNewProducts,
        getProductsByCategory,
        filterProducts
    };

    return (
        <ProductContext.Provider value={value}>
            {children}
        </ProductContext.Provider>
    );
};