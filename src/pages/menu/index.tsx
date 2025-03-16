import {
	//Importações
	ArrowLeft,
	CircleCheck,
	House,
	LayoutList,
	Minus,
	Plus,
	ShoppingCart,
	Trash2,
} from "lucide-react"; // Ícones do Lucide
//import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CartButton } from "../../components/buttons/cart-button";
import { Searchbox } from "../../components/searchBox/search-box";
import { useCart } from "../../context/CartContext";
import { useImage } from "../../context/ImageContext";
import { useState } from "react";
import { QrCodeButton } from "../../components/buttons/QrCode";
import { useTranslation } from "react-i18next";
import { LanguageModal } from "../../components/modal/language-modal";

// Tipo para os produtos
export interface Product {
	id: string; // Alterado de number para string
	title: string; // Nome do produto
	price: number; // Preço do produto
	description: string; // Descrição do produto
	image?: string; // URL da imagem do produto (opcional)
}

export function MenuPage() {
	const {
		products,
		counts,
		buttonColors,
		icons,
		addButtonTexts,
		removeButtonTexts,
		incrementCount,
		decrementCount,
		toggleIcon,
		handleRemoveFromCart,
		isScrolled,
	} = useCart();

	const navigate = useNavigate();
	const { t } = useTranslation();

	const HomePage = () => {
		navigate("/");
	};

	const [selecteCategory, setSelectedCategory] = useState<string>("");

	// Função para filtrar os produtos com base no título selecionado
	const filteredProducts = selecteCategory
		? products.filter((product) => product.category === selecteCategory)
		: products;

	const { getImageByTitle } = useImage(); // Atualizado para o novo método

	return (
		<div className="mx-auto space-y-9 bg-searchColorInput bg-fundoHome bg-no-repeat bg-top bg-fixed">
			<div
				className={`border-b-2 border-colorButton h-20 shadow-shape bg-buttonColor2 flex flex-wrap items-center justify-around font-medium text-xl ${
					isScrolled ? "-translate-y-10" : "translate-y-0"
				}`}
			>
				<div className="flex text-colorFundo items-center">
					<button type="button" onClick={HomePage} className="flex gap-2">
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

			<div className="flex flex-wrap justify-center gap-3">
				{/** <ContactAndLanguage /> */}
				<LanguageModal variant="outlined" />
				<Searchbox onCategorySelect={setSelectedCategory} />
			</div>
			{/* Renderização dos cards */}
			<div className="flex flex-wrap gap-5 justify-center pb-10">
				{filteredProducts.map((product) => (
					<div
						key={product.id}
						className="bg-buttonColor2 rounded-3xl py-4 px-4 w-80 cardProd"
					>
						{/* Informações do produto */}
						<div className="flex justify-between gap-5 py-2 px-3 font-normal">
							<p className="text-colorFundo w-40 text-1.5xl font-medium">{product.title}</p>
							<span className="">
								<QrCodeButton productId={""} productUrl={""} />
							</span>
						</div>
						<div className="py-3 flex flex-col items-center">
							<img
								className="mx-auto w-44 h-40 rounded-full"
								src={getImageByTitle(product.title)} // Usando o título do produto
								alt={`Product ${product.title}`}
							/>
							<div>
								⭐ ⭐ ⭐ ⭐
							</div>
						</div>
						<span className="flex justify-center text-zinc-200 font-normal text-2xl gap-2 py-3">
							<small className="text-lx text-moneyColor1">kz</small>
							<p className="text-6xl">{product.price}</p>
							<small className="text-lx">00</small>
						</span>

						{/* Texto Saber Mais */}
							<button
								type="button"
								onClick={() =>
									navigate(`/product/${product.id}`, { state: { product } })
								} // Passa os dados via state
								className="flex items-center justify-between py-4 px-3 w-full text-colorFundo text-1xl font-medium"
							>
								<div className="text-1.5xl">
									{t('cardMenu.detalhesProduto')}
								</div>
								<div>
									<LayoutList className="text-zinc-50" />
								</div>
							</button>

						<div className="flex flex-col gap-3">
							<button
								type="button"
								className="flex transition duration-400 bg-colorHover text-zinc-100 py-3 px-5 w-full rounded-2xl justify-between"
							>
								<div>
									{t("cardMenu.colheres")} <span className="ml-2">{counts[product.id]}</span>
								</div>
								<div className="flex gap-5">
									<Plus onClick={() => incrementCount(product.id)} />
									<Minus onClick={() => decrementCount(product.id)} />
								</div>
							</button>
							<button
								type="button"
								onClick={() => toggleIcon(product.id)}
								className={`flex transition duration-400 hover:bg-moneyColor text-zinc-100 py-3 px-5 w-full rounded-2xl justify-between ${
									buttonColors[product.id] === "green"
										? "bg-moneyColor"
										: "bg-buttonColor"
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
								className={`flex transition duration-400 hover:bg-colorRemove text-zinc-100 py-3 px-5 w-full rounded-2xl justify-between ${
									buttonColors[product.id] === "red"
										? "bg-colorRemove"
										: "bg-buttonColor"
								}`}
								disabled={counts[product.id] === 0} // Botão desativado se não houver colheres
							>
								{removeButtonTexts[product.id] || t("cardMenu.removerCarrinho")}
								<Trash2 />
							</button>
						</div>
					</div>
				))}
			</div>

			<div className="flex pb-32 flex-wrap justify-center gap-4">
				{/** <ContactAndLanguage /> */}
				<LanguageModal variant="outlined" />
				<Searchbox onCategorySelect={setSelectedCategory} />
			</div>
			<footer
				className={`footerMenu flex flex-wrap h-20 items-center justify-around fixed bottom-0 left-0 w-full transition-transform duration-500 ease-in-out border-t-2 font-medium text-xl border-colorButton bg-buttonColor2 text-colorFundo ${
					isScrolled ? "translate-y-0" : "translate-y-full"
				}`}
			>
				<div className="flex items-center">
					<button
						type="button"
						onClick={HomePage}
						className="flex gap-2"
					>
						{" "}
						{/* Clicar na seta da página menu e levar para o inicio*/}
						<ArrowLeft className="size-6" />
						<House />
					</button>
				</div>

				<div className="flex items-center">
					<CartButton />
				</div>
			</footer>
		</div>
	);
}
