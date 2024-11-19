import { useQuery, useMutation, 
    // useQueryClient 
} from "@tanstack/react-query";
import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "@/services/firestoreService";
import { Product } from "@/models";

export const useProducts = () => {
//   const queryClient = useQueryClient();

  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const addProductMutation = useMutation({
        mutationFn: (product: Product) => addProduct(product),
  });
  //   const addProductMutation = useMutation(addProduct, {
  //     onSuccess: () => {
  //       queryClient.invalidateQueries(["products"]);
  //     },
  //   });

  const updateProductMutation = useMutation({
    mutationFn:({id,product}:{id: string,product:  Partial<Product>}) => updateProduct(id,product)
  });

//   const updateProductMutation = useMutation(updateProduct, {
//     onSuccess: () => {
//       queryClient.invalidateQueries(["products"]);
//     },
//   });

  const deleteProductMutation = useMutation({
    mutationFn:(id: string) => deleteProduct(id)
  });

  //   const deleteProductMutation = useMutation(mutationFn, {
//     onSuccess: () => {
//       queryClient.invalidateQueries(["products"]);
//     },
//   });

  return {
    products,
    isLoading,
    addProduct: addProductMutation.mutate,
    updateProduct: updateProductMutation.mutate,
    deleteProduct: deleteProductMutation.mutate,
  };
};
