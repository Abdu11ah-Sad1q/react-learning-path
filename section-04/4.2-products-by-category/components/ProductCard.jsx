const ProductCard = (props) => {
  const { product } = props;
  return (
    <div className="border rounded p-3 text-center">
      <img
        src={product.thumbnail}
        alt={product.title}
        className="w-full h-32 object-contain"
      />
      <h3 className="font-bold mt-2">{product.title}</h3>
      <p className="text-gray-600">${product.price}</p>
    </div>
  );
};

export default ProductCard;
