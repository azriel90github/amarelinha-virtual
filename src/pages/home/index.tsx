import { Library, 
	//MessageCircleMore, 
	//PersonStanding, 
	//Rss, 
	ShoppingCart, 
	SquareChartGantt, 
	//UserRoundCog 
	} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { LanguageModal } from "../../components/modal/language-modal";
import { ProfileModal } from "../../components/modal/profile-modal";
//import { AccountButton } from "../../components/buttons/account-button";
import { ContactModal } from "../../components/modal/contact-modal";
//import { GalleryModal } from "../../components/modal/gallery-modal";
import { useTranslation } from 'react-i18next';

export function HomePage() {
	const { t } = useTranslation();
	const navigate = useNavigate();

	function menuPage() {
		navigate("/menu/123");
	}

	function orderPage() {
		navigate("/order/123");
	}

	/**
	 * 	
		function blogPage() {
			navigate("/blog/123");
		}
	 */

	/**
	 * 	
		function AccessibilityPage() {
			navigate("/accessibility/123");
		}
	 */


	function LibraryPage() {
		navigate("/library/123");
	}

	return (
		<div>
			<div className="py-3 px-3 ml-1 mt-1">
				<LanguageModal variant="outlined" />
			</div>
			
			<div className="mainHome h-screen w-full bg-fundoHome bg-no-repeat bg-center before:bg-black/50 flex items-center justify-center ">
				<div className="max-w-3xl w-full px-6 text-center space-y-10">
					<div className="flex flex-col items-center gap-4">
						<img className="w-44" src="/logo-amarelinha.png" alt="logoAmarelinha" />
						<p className="text-buttonColor text-2xl font-normal">
							{t('homepage.description')}
						</p>
					</div>
					<div className="w-full">
						{/**
						 * <button
								onClick={blogPage}
								className="accountButton border-2 border-colorInput flex items-center justify-between w-80 bg-searchColor px-8 py-4 rounded-full shadow-shape text-buttonColor hover:bg-colorHover hover:text-zinc-200 transition duration-400 font-medium text-xl"
							>
								<p className="text-1xl font-normal">{t('homepage.buttonBlog')}</p>
								<Rss className="size-6" />
							</button>
						 */}
						<div className="flex justify-center flex-wrap gap-3.5 w-full">
							
							<ContactModal />

							{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
							<button
								onClick={menuPage}
								className="accountButton duration-400 flex items-center justify-between w-80 bg-buttonColor2 px-8 py-4 rounded-full shadow-shape text-colorFundo hover:bg-colorHover hover:text-zinc-200 transition duration-400 font-medium text-xl"
							>
								<p className="text-1xl font-medium">{t('homepage.buttonMenu')}</p>
								{/*
									<div className="w-px h-6 bg-zinc-800">
									</div>
								*/}
								<SquareChartGantt className="size-6" />
							</button>
							{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
							<button
								onClick={orderPage}
								className="accountButton flex items-center justify-between w-80 bg-buttonColor2 px-8 py-4 rounded-full shadow-shape text-colorFundo hover:bg-colorHover hover:text-zinc-200 transition duration-400 font-medium text-xl"
							>
								<p className="text-1xl font-medium">{t('homepage.buttonCart')}</p>
								<ShoppingCart className="size-6" />
							</button>
							<button type="button"
								onClick={LibraryPage}
								className="accountButton flex items-center justify-between w-80 bg-buttonColor2 px-8 py-4 rounded-full shadow-shape text-colorFundo hover:bg-colorHover hover:text-zinc-200 transition duration-400 font-medium text-xl"
							>
								<p className="text-1xl font-medium">{t('homepage.buttonLibrary')}</p>
								<Library className="size-6" />
							</button>
							{/*
								<button type="button"
								onClick={AccessibilityPage}
								className="accountButton border-2 border-colorInput flex items-center justify-between w-80 bg-searchColor px-8 py-4 rounded-full shadow-shape text-buttonColor hover:bg-colorHover hover:text-zinc-200 transition duration-400 font-medium text-xl"
							>
								<p className="text-1xl font-normal">Acessibilidade</p>
								<PersonStanding className="size-6" />
							</button>
							 */}
							
						</div>
					</div>
					<p className="text-lg text-colorButton font-normal">
						{t('homepage.terms')}
					</p>
				</div>
			</div>
				<p className="px-3 py-3 flex items-center justify-between text-1xl text-colorText1">
					<ProfileModal />{/** */}
				</p>

			
		</div>
	);
}

