export type CreateProductType = {
  name: string;
  description: string;
  price: number;
  images: FileList;
  category: string;
  stock: number;
  weight: number;
  wagePerGram: number;
};
