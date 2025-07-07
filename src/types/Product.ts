export interface Product {
    _id: string;
    name: string;         // Backend returns 'name', not 'title'
    image: string;
    category: string;
    price: number;
    // Add other fields as needed
  }
  