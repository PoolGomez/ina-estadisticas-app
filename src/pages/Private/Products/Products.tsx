// import { useProducts } from "@/hooks/useProducts";

export default function Products() {

    // const { products, isLoading, addProduct, updateProduct, deleteProduct } = useProducts();

    // if (isLoading) return <p>Cargando productos...</p>;

  return (
    <div>
      <h1>Productos</h1>
      {/* <ul>
        {products?.map((product) => (
          <li key={product.id}>
            {product.name}
            <button onClick={() => updateProduct(product.id!, { name: "Producto Actualizado" })}>Actualizar</button>
            <button onClick={() => deleteProduct(product.id!)}>Eliminar</button>
          </li>
        ))}
      </ul>
      <button onClick={() => addProduct({ name:"Nuevo Producto", price: 0, category: "General" })}>
        Agregar Producto
      </button> */}
    </div>
  )
}
