import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { ProductProps } from "../home";
import { api } from "../../services/api";
import { BsCartPlus } from "react-icons/bs";
import { CartContext } from "../../contexts/CartContext";
import toast from "react-hot-toast";

export function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState<ProductProps>();
    const { addItemCart } = useContext(CartContext);
    const navigate = useNavigate();

    useEffect(() => {
        async function getProduct() {
            const response = await api.get(`/products/${id}`);
            setProduct(response.data);
        }

        getProduct();
    }, [id])

    function handleAddItemCart(product: ProductProps) {
        toast.success("Produto adicionado no carrinho", {
            style: {
                borderRadius: 10,
                backgroundColor: "#121212",
                color: "#FFF"
            }
        })
        addItemCart(product);

        navigate("/cart");
    }

    return (
        <div>
            <main className="w-full max-w-7xl px-4 my-6">
                {product && (
                    <section className="w-full">
                        <div className="flex flex-col lg:flex-row">
                            <img 
                                className="flex-1 w-full max-h-72 object-contain"
                                src={product?.cover} 
                                alt={product?.title} 
                            />

                            <div className="flex-1">
                                <p className="font-bold text-2xl mt-4 mb-2">{product?.title}</p>
                                <p className="my-4">{product?.description}</p>
                                <strong className="text-zinc-700/90 text-xl">
                                    {product.price.toLocaleString("pt-BR", {
                                        style: "currency",
                                        currency: "BRL"
                                    })}
                                </strong>
                                <button onClick={() => handleAddItemCart(product)} className="bg-zinc-900 p-1 rounded ml-3">
                                    <BsCartPlus size={20} color="#FFF" />
                                </button>
                            </div>
                        </div>
                    </section>
                )}
            </main>
        </div>
    )
}