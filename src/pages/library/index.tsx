//import { t } from "i18next";
import { ArrowLeft, House } from "lucide-react";
import { MenuButton } from "../../components/buttons/menu-button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";


export function LibraryPage() {

	const { t } = useTranslation();
	//Variavél navigate recebendo o useNavigate do react-router-dom
	const navigate = useNavigate();
	//Função homePage para navegar da blogPage para a homePage ao clicar no evento onclick{homePage}
	function homePage() {
		navigate("/"); //Navegar para a página home
	}

	//Esse código utiliza React para detectar quando o usuário rola a página mais de 50px e ajusta o estado isScrolled de acordo
	const [isScrolled, setIsScrolled] = useState(false);

	//O listener é removido no cleanup do useEffect quando o componente é desmontado para evitar vazamentos de memória
	useEffect(() => {
		const handleScroll = () => {
			//Função que verifica se window.scrollY é maior que 50px. Se sim, isScrolled é definido como true; caso contrário, false
			//Verifica se o usuário rolou mais de 50px da página
			if (window.scrollY > 50) {
				setIsScrolled(true);
			} else {
				setIsScrolled(false);
			}
		};

		//significa que um "listener" (ouvinte) de evento está sendo registrado para o evento de rolagem ("scroll") da janela (window)
		window.addEventListener("scroll", handleScroll);

		// Limpar o event listener quando o componente for desmontado
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);


	return (
		<div>
			<div
				className={`border-b-2 border-buttonColor h-20 shadow-shape bg-buttonColor2 text-colorFundo flex flex-wrap items-center justify-around font-medium text-xl ${
					isScrolled ? "-translate-y-10" : "translate-y-0"
				}`}
			>
				<div className="flex items-center justify-between">
					<div>
						{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
						<button className="flex items-center gap-3" onClick={homePage}>
							<ArrowLeft className="size-6" />
							<p className="text-2xl font-normal">
								<House />
							</p>
						</button>
					</div>
				</div>
					<MenuButton />
			</div>
			<div>
				
				<div>
					<div>
						<div className="w-10/12 leading-loose flex flex-col gap-4 mx-auto pl-2">					
							<div className="libraryPage flex flex-wrap items-center h-screen w-full justify-center gap-8">
								<p>
									<h1 className="text-3xl flex items-start justify-center text-buttonColor mb-8 font-medium">
										{t('biblioteca.faturaDigital')}
									</h1>
									<a href="/pdf/modelo_fatura.pdf" download="modelo_fatura.pdf">
										<img className="rounded-xl w-80 h-auto" src="/doc-2.jpeg" alt="" />
									</a>
								</p>	
								<p>
									<h1 className="text-3xl flex items-start justify-center text-buttonColor mb-8 font-medium">
										{t('biblioteca.coordenadasBancarias')}
									</h1>
									<a href="/pdf/coordenadas_bancarias.pdf" download="coordenadas_bancarias.pdf">
									<img className="rounded-xl w-80 h-full" src="/doc-1.jpeg" alt="" />
									</a>
								</p>							
							</div>
				
						</div>
					</div>
				</div>
			</div>
			
			<footer
				className={`flex py-3 gap-3 items-center flex-wrap justify-around fixed bottom-0 left-0 w-full transition-transform duration-500 ease-in-out border-t-2 border-buttonColor bg-buttonColor2 ${
					isScrolled ? "translate-y-0" : "translate-y-full"
				}`}
			>

				{/** <ProfileModal /> */}
				<button type="button" className="flex items-center justify-between gap-3 text-colorFundo" onClick={homePage}>
					<ArrowLeft className="size-6" />
					<p className="text-2xl font-normal">
						<House />
					</p>
				</button>
				
				<div className="flex gap-4">
				<MenuButton />
					{/**
					 <div className="w-px h-12 bg-buttonColor2"></div>
					*/}
				</div>
			</footer>
		</div>
	);
}