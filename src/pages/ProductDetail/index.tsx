import { useNavigate, useLocation } from "react-router-dom";
import { useImage } from "../../context/ImageContext";
import { CartButton } from "../../components/buttons/cart-button";
import { ArrowLeft, House, Star } from "lucide-react";
import { useCart } from "../../context/CartContext"; // Import cart context to handle counts and cart actions
import { CircleCheck, Plus, Minus, Trash2, ShoppingCart } from "lucide-react"; // Import icons for buttons
import { QrCodeButton } from "../../components/buttons/QrCode";
import { useTranslation } from "react-i18next";

export function ProductDetail() {
	const navigate = useNavigate();
	const location = useLocation();
	const { getImageByTitle } = useImage();
	const {
		isScrolled,
		incrementCount,
		decrementCount,
		counts,
		toggleIcon,
		buttonColors,
		addButtonTexts,
		removeButtonTexts,
		icons,
		handleRemoveFromCart,
	} = useCart(); // Using the CartContext for cart functionality

	const { t } = useTranslation();

	 // Dados do produto passado via state
	 const product = location.state?.product;

	function menuPage() {
		navigate("/menu/123");
	}

	return (
		<div className="">
			{/* Cabeçalho */}
			<div
				className={`border-b-2 border-colorButton h-20 shadow-shape bg-buttonColor2 text-colorFundo flex flex-wrap items-center justify-around font-medium text-xl ${
					isScrolled ? "-translate-y-10" : "translate-y-0"
				}`}
			>
				<div className="flex items-center">
					<button type="button" onClick={menuPage} className="flex gap-2">
						{" "}
						{/* Clicar na seta da página menu e levar para o inicio*/}
						<ArrowLeft className="size-6" />
						<House />
					</button>
				</div>

				<div className="flex items-center">
					<CartButton />
				</div>
			</div>

			<div className="">
				{/* Detalhes do produto */}
				{product ? (
					<div className="produtDetailMobile flex items-center pt-20 justify-center gap-10">
						<div className="flex flex-col gap-5">
							<img
								src={getImageByTitle(product.title)} // Usando a função do contexto para pegar a imagem
								alt={`Imagem de ${product.title}`}
								className="w-96 h-96 mx-auto"
							/>
							
							<QrCodeButton variant="alternative" productId={""} productUrl={""} />
						</div>

						<div className="produtDetailDescMobile flex flex-col">
							<div>
								<div className="">
									<h1 className="text-buttonColor text-4xl font-light">
										{product.title}
									</h1>
								</div>
								<span className="flex starDiv1 text-zinc-200 font-normal mt-6 text-2xl gap-2 py-3">
									<small className="text-2xl text-moneyColor1">kz</small>
									<p className="text-8xl mt-1">{product.price}</p>
									<small className="text-2xl">00</small>
								</span>
								<div className="flex items-center gap-2">
									{/* Div para estrelas */}
									<div className="starDiv flex pt-2 pb-5">
									<div className="flex items-center gap-4">
										<Star className="text-yellow-400" />
										<Star className="text-yellow-400" />
										<Star className="text-yellow-400" />
										<Star className="text-yellow-400" />
									</div>
                  {Array(product.hearts || 0)
                    .fill(null)
                    .map((_, index) => (
                      <Star
                        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                        key={index}
                        className="text-yellow-400 mx-1"
                        size={24}
                      />
                    ))}
                </div>
								</div>
							</div>
							<div className="flex flex-col">
								<h2 className="text-buttonColor text-[20px] font-medium">
									{t("cardMenu.descricao")}{" "}
								</h2>
								<p className="text-1xl w-[22rem] text-buttonColor mt-2">
									{product.description || "Descrição não disponível."}
								</p>
							</div>
							<div>
								<div className="produtDetailMobileButton flex w-80 flex-col gap-3 mt-10">
									<button
										type="button"
										className="flex transition duration-400 bg-colorHover text-zinc-100 py-3 px-5 rounded-2xl justify-between"
									>
										<div>
										{t("cardMenu.colheres")}{" "}
											<span className="ml-2">{counts[product.id]}</span>
										</div>
										<div className="flex gap-5">
											<Plus onClick={() => incrementCount(product.id)} />
											<Minus onClick={() => decrementCount(product.id)} />
										</div>
									</button>
									<button
										type="button"
										onClick={() => toggleIcon(product.id)}
										className={`flex transition duration-400 hover:bg-moneyColor text-zinc-100 py-3 px-5 rounded-2xl justify-between ${
											buttonColors[product.id] === "green"
												? "bg-moneyColor"
												: "bg-buttonColor2"
										}`}
										disabled={counts[product.id] === 0}
									>
										{addButtonTexts[product.id] || t("cardMenu.adicionarCarrinho")}
										{icons[product.id] ? <CircleCheck /> : <ShoppingCart />}
									</button>
									{/* Botão de Remover do Carrinho */}
									<button
										type="button"
										onClick={() => handleRemoveFromCart(product.id)}
										className={`flex transition duration-400 hover:bg-colorRemove text-zinc-100 py-3 px-5 rounded-2xl justify-between ${
											buttonColors[product.id] === "red"
												? "bg-colorRemove"
												: "bg-buttonColor2"
										}`}
										disabled={counts[product.id] === 0}
									>
										{removeButtonTexts[product.id] ||  t("cardMenu.removerCarrinho")}
										<Trash2 />
									</button>
								</div>
							</div>
						</div>
						<div>{/* Lógica do botão de adicionar/remover */}</div>
					</div>
				) : (
					<p>Produto não encontrado!</p>
				)}
			</div>

			{/* Rodapé */}
			<footer
				className={`footerMenu font-medium text-xl flex flex-wrap h-20 items-center justify-around fixed bottom-0 left-0 w-full transition-transform duration-500 ease-in-out border-t-2 border-buttonColor bg-buttonColor2 ${
					isScrolled ? "translate-y-0" : "translate-y-full"
				}`}
			>
				<div className="flex items-center">
					<button
						type="button"
						onClick={menuPage}
						className="flex gap-2 text-colorFundo"
					>
						{" "}
						{/* Clicar na seta da página menu e levar para o inicio*/}
						<ArrowLeft className="size-6" />
						<House />
					</button>
				</div>

				<div className="flex gap-4 items-center">
					<CartButton />
				</div>
			</footer>
		</div>
	);
}
