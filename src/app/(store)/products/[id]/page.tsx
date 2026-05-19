import SingleProduct from "@/components/store/single-products/components/single-product";
import { getProductsById } from "@/components/store/single-products/services/get-products-by-id.service";


export default async function SingleProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const result = await getProductsById(id);

  return (
    <div>
      <SingleProduct item={result.data} />
    </div>
  );
}
