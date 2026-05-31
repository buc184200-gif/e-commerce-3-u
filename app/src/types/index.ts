export interface Product {
  id: string;
  name: string;
  brand: string;
  category: 'sneakers' | 'streetwear' | 'accessories';
  price: number;
  salePrice?: number;
  condition: 'new' | 'pre-owned' | 'limited';
  badges: ('new' | 'sale' | 'bestseller' | 'sold-out')[];
  images: string[];
  sizes: { size: string; stock: number }[];
  description: string;
  sku: string;
  rating: number;
  reviewCount: number;
  createdAt: string;
}

export interface CartItem {
  productId: string;
  name: string;
  brand: string;
  price: number;
  size: string;
  quantity: number;
  image: string;
}

export interface WishlistItem {
  productId: string;
  savedAt: string;
}

export interface Review {
  id: string;
  productId: string;
  author: string;
  rating: number;
  text: string;
  date: string;
  verified: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  date: string;
  readTime: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  shipping: ShippingAddress;
  total: number;
  status: 'placed' | 'confirmed' | 'packed' | 'shipped' | 'out-for-delivery' | 'delivered';
  paymentMethod: 'cod';
  createdAt: string;
  updatedAt: string;
}

export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  altPhone?: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  pincode: string;
  landmark?: string;
  type: 'home' | 'office';
}

export interface Coupon {
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  minPurchase: number;
  expiryDate: string;
}

export type SortOption = 'featured' | 'newest' | 'price-low' | 'price-high' | 'popular';
