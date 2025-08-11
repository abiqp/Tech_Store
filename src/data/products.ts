// src/data/products.ts

import { Product } from "../types/Products";


export const products: Product[] = [
  {
    id: 1,
    name: "Smartphone Pro Max 256GB",
    price: 999,
    originalPrice: 1199,
    category: "Tecnología",
    brand: "TechGenius",
    color: "Negro",
    image: "https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=500",
    images: [
      "https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=500",
      "https://images.pexels.com/photos/1616773/pexels-photo-1616773.jpeg?auto=compress&cs=tinysrgb&w=500",
      "https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=500"
    ],
    description: "El smartphone más avanzado con tecnología de última generación, cámara profesional y procesador de alto rendimiento.",
    features: ["Pantalla OLED 6.7'", "Cámara triple 108MP", "Procesador A17 Pro", "Batería de larga duración", "Resistente al agua"],
    inStock: true,
    stock: 25, // Stock numérico
    rating: 4.8,
    reviews: 1250,
    isNew: true
  },
  {
    id: 2,
    name: "Auriculares Wireless Premium",
    price: 299,
    category: "Audio",
    brand: "AuraSound",
    color: "Blanco",
    image: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=500",
    images: [
      "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=500",
      "https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=500"
    ],
    description: "Auriculares inalámbricos con cancelación de ruido activa y sonido de alta fidelidad para una experiencia inmersiva.",
    features: ["Cancelación de ruido", "30h de batería", "Sonido Hi-Fi", "Bluetooth 5.0", "Controles táctiles"],
    inStock: true,
    stock: 50, // Stock numérico
    rating: 4.6,
    reviews: 892
  },
  {
    id: 3,
    name: "Laptop Gaming RGB 16GB",
    price: 1599,
    originalPrice: 1799,
    category: "Tecnología",
    brand: "GamersPro",
    color: "Gris Espacial",
    image: "https://images.pexels.com/photos/2047905/pexels-photo-2047905.jpeg?auto=compress&cs=tinysrgb&w=500",
    images: [
      "https://images.pexels.com/photos/2047905/pexels-photo-2047905.jpeg?auto=compress&cs=tinysrgb&w=500",
      "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=500"
    ],
    description: "Laptop gaming de alto rendimiento con gráficos excepcionales y teclado RGB personalizable.",
    features: ["RTX 4070", "Intel i7 12th Gen", "16GB RAM DDR5", "SSD 1TB NVMe", "Pantalla 144Hz"],
    inStock: true,
    stock: 15, // Stock numérico
    rating: 4.7,
    reviews: 654,
    isNew: true
  },
  {
    id: 4,
    name: "Reloj Inteligente Sport",
    price: 249,
    category: "Wearables",
    brand: "HealthTrack",
    color: "Negro",
    image: "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=500",
    images: [
      "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=500",
      "https://images.pexels.com/photos/1034063/pexels-photo-1034063.jpeg?auto=compress&cs=tinysrgb&w=500"
    ],
    description: "Reloj inteligente con monitoreo de salud, GPS integrado y resistencia al agua para deportistas.",
    features: ["GPS integrado", "Monitor cardíaco", "Resistente al agua", "Batería 7 días", "Llamadas Bluetooth"],
    inStock: true,
    stock: 70, // Stock numérico
    rating: 4.4,
    reviews: 423
  },
  {
    id: 5,
    name: "Cámara Mirrorless 4K",
    price: 899,
    category: "Fotografía",
    brand: "PhotoX",
    color: "Negro",
    image: "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=500",
    images: [
      "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=500",
      "https://images.pexels.com/photos/51383/photo-camera-subject-photographer-51383.jpeg?auto=compress&cs=tinysrgb&w=500"
    ],
    description: "Cámara profesional sin espejo con grabación 4K y lentes intercambiables para fotografía avanzada.",
    features: ["Sensor APS-C 24MP", "Video 4K 60fps", "Estabilización 5 ejes", "WiFi integrado", "Pantalla táctil"],
    inStock: false,
    stock: 0, // Stock numérico (agotado)
    rating: 4.9,
    reviews: 312
  },
  {
    id: 6,
    name: "Tablet Pro 12.9 WiFi",
    price: 799,
    category: "Tecnología",
    brand: "TechGenius",
    color: "Plata",
    image: "https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg?auto=compress&cs=tinysrgb&w=500",
    images: [
      "https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg?auto=compress&cs=tinysrgb&w=500",
      "https://images.pexels.com/photos/1251861/pexels-photo-1251861.jpeg?auto=compress&cs=tinysrgb&w=500"
    ],
    description: "Tablet profesional con pantalla de alta resolución, ideal para creativos y profesionales.",
    features: ["Pantalla Liquid Retina", "Chip M2", "Compatibilidad Apple Pencil", "128GB almacenamiento", "Cámaras duales"],
    inStock: true,
    stock: 30, // Stock numérico
    rating: 4.7,
    reviews: 789,
    isNew: true
  },
  {
    id: 7,
    name: "Consola Gaming Next-Gen",
    price: 499,
    category: "Gaming",
    brand: "GamersPro",
    color: "Negro",
    image: "https://images.pexels.com/photos/3945313/pexels-photo-3945313.jpeg?auto=compress&cs=tinysrgb&w=500",
    images: [
      "https://images.pexels.com/photos/3945313/pexels-photo-3945313.jpeg?auto=compress&cs=tinysrgb&w=500",
      "https://images.pexels.com/photos/2886934/pexels-photo-2886934.jpeg?auto=compress&cs=tinysrgb&w=500"
    ],
    description: "Consola de videojuegos de nueva generación con gráficos 4K y ray tracing en tiempo real.",
    features: ["Gráficos 4K", "Ray tracing", "SSD ultra-rápido", "Retrocompatibilidad", "HDR10"],
    inStock: true,
    stock: 20, // Stock numérico
    rating: 4.8,
    reviews: 1456
  },
  {
    id: 8,
    name: "Monitor Ultrawide 34' Curvo",
    price: 649,
    originalPrice: 749,
    category: "Tecnología",
    brand: "VisionTech",
    color: "Negro",
    image: "https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg?auto=compress&cs=tinysrgb&w=500",
    images: [
      "https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg?auto=compress&cs=tinysrgb&w=500",
      "https://images.pexels.com/photos/276517/pexels-photo-276517.jpeg?auto=compress&cs=tinysrgb&w=500"
    ],
    description: "Monitor ultrawide curvo para gaming y productividad con colores vibrantes y alta frecuencia de actualización.",
    features: ["Pantalla 34' UWQHD", "144Hz refresh rate", "HDR400", "Tiempo respuesta 1ms", "USB-C"],
    inStock: true,
    stock: 10, // Stock numérico
    rating: 4.5,
    reviews: 567,
    isNew: true
  },
  // --- Nuevos productos añadidos ---
  {
    id: 9,
    name: "Smart TV 55 Pulgadas 4K HDR",
    price: 799,
    category: "Entretenimiento",
    brand: "VisionTech",
    color: "Negro",
    image: "https://images.pexels.com/photos/3354452/pexels-photo-3354452.jpeg?auto=compress&cs=tinysrgb&w=500",
    images: [
      "https://images.pexels.com/photos/3354452/pexels-photo-3354452.jpeg?auto=compress&cs=tinysrgb&w=500",
      "https://images.pexels.com/photos/3354452/pexels-photo-3354452.jpeg?auto=compress&cs=tinysrgb&w=500"
    ],
    description: "Televisor inteligente con resolución 4K y alto rango dinámico para una experiencia visual inmersiva.",
    features: ["Pantalla 4K UHD", "HDR10+", "Smart TV OS", "Control por voz", "Múltiples puertos HDMI"],
    inStock: true,
    stock: 8, // Stock numérico
    rating: 4.7,
    reviews: 980,
    isNew: true
  },
  {
    id: 10,
    name: "Drone Plegable 1080p",
    price: 349,
    category: "Drones",
    brand: "AeroFly",
    color: "Blanco",
    image: "https://images.pexels.com/photos/1004603/pexels-photo-1004603.jpeg?auto=compress&cs=tinysrgb&w=500",
    images: [
      "https://images.pexels.com/photos/1004603/pexels-photo-1004603.jpeg?auto=compress&cs=tinysrgb&w=500",
      "https://images.pexels.com/photos/1004603/pexels-photo-1004603.jpeg?auto=compress&cs=tinysrgb&w=500"
    ],
    description: "Drone compacto y plegable con cámara Full HD para capturar tus aventuras desde el aire.",
    features: ["Cámara 1080p", "Plegable y portátil", "Control remoto intuitivo", "30 min de vuelo", "Modos de vuelo inteligentes"],
    inStock: true,
    stock: 40, // Stock numérico
    rating: 4.2,
    reviews: 210
  },
  {
    id: 11,
    name: "Impresora Multifuncional WiFi",
    price: 189,
    category: "Oficina",
    brand: "PrintFast",
    color: "Negro",
    image: "https://images.pexels.com/photos/305827/pexels-photo-305827.jpeg?auto=compress&cs=tinysrgb&w=500",
    images: [
      "https://images.pexels.com/photos/305827/pexels-photo-305827.jpeg?auto=compress&cs=tinysrgb&w=500",
      "https://images.pexels.com/photos/305827/pexels-photo-305827.jpeg?auto=compress&cs=tinysrgb&w=500"
    ],
    description: "Impresora todo en uno con conectividad WiFi para imprimir, escanear y copiar desde cualquier dispositivo.",
    features: ["Imprime, escanea, copia", "Conexión WiFi", "Impresión a doble cara", "Alimentador automático"],
    inStock: true,
    stock: 60, // Stock numérico
    rating: 4.0,
    reviews: 350,
    isNew: true
  },
  {
    id: 12,
    name: "Sistema de Sonido Home Cinema 5.1",
    price: 599,
    category: "Audio",
    brand: "AuraSound",
    color: "Negro",
    image: "https://images.pexels.com/photos/1389429/pexels-photo-1389429.jpeg?auto=compress&cs=tinysrgb&w=500",
    images: [
      "https://images.pexels.com/photos/1389429/pexels-photo-1389429.jpeg?auto=compress&cs=tinysrgb&w=500",
      "https://images.pexels.com/photos/1389429/pexels-photo-1389429.jpeg?auto=compress&cs=tinysrgb&w=500"
    ],
    description: "Sistema de altavoces 5.1 para una experiencia de cine en casa inmersiva con sonido envolvente.",
    features: ["Sonido envolvente 5.1", "Potencia 1000W", "Conectividad Bluetooth", "Múltiples entradas"],
    inStock: true,
    stock: 20, // Stock numérico
    rating: 4.5,
    reviews: 480
  },
  {
    id: 13,
    name: "Proyector Portátil Full HD",
    price: 450,
    category: "Entretenimiento",
    brand: "CineView",
    color: "Blanco",
    image: "https://images.pexels.com/photos/3374204/pexels-photo-3374204.jpeg?auto=compress&cs=tinysrgb&w=500",
    images: [
      "https://images.pexels.com/photos/3374204/pexels-photo-3374204.jpeg?auto=compress&cs=tinysrgb&w=500",
      "https://images.pexels.com/photos/3374204/pexels-photo-3374204.jpeg?auto=compress&cs=tinysrgb&w=500"
    ],
    description: "Proyector compacto con resolución Full HD, ideal para noches de cine o presentaciones.",
    features: ["Resolución 1080p", "Portátil", "Conectividad HDMI/USB", "Altavoces integrados"],
    inStock: true,
    stock: 35, // Stock numérico
    rating: 4.3,
    reviews: 190,
    isNew: true
  }
];

export const categories = ["Todos", "Tecnología", "Audio", "Wearables", "Fotografía", "Gaming", "Entretenimiento", "Drones", "Oficina"];