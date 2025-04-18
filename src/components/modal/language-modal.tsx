import { Languages, X } from "lucide-react";
import { useState } from "react";
import i18n from "../../i18n";
import { t } from "i18next";
// Certifique-se de que o caminho para o i18n está correto

type Variant = "default" | "outlined" | "filled" | "iconOnly";

export function LanguageModal({ variant = "default" }: { variant?: Variant }) {

	function disableScroll() {
    document.body.style.overflow = "hidden";
  }
  
  function enableScroll() {
    document.body.style.overflow = "";
  }

	const [selectedOption, setSelectedOption] = useState(""); // Estado para o valor selecionado
	const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);

	const languageMapping: Record<string, string> = {
		umb: "umbundu",
		kmb: "kimbundo",
		ln: "lingala",
		pt: "portugues",
		en: "ingles",
		es: "espanhol",
		fr: "frances"
	};
	
	const handleSelectOption = (option: string, languageCode: string) => {
		setSelectedOption(languageMapping[languageCode] || option);
		i18n.changeLanguage(languageCode);
		setIsLanguageModalOpen(false);
		enableScroll();
	};
	

	function openLanguageModal() {
		setIsLanguageModalOpen(true);
		disableScroll(); // Bloqueia rolagem ao abrir
	}

	function closeLanguageModal() {
		setIsLanguageModalOpen(false);
		enableScroll(); // Desbloqueia rolagem ao fechar
	}

	const buttonStyles = {
		default: "text-buttonColor font-medium text-lg bg-searchColor w-80 flex justify-between font-medium flex items-center gap-2 px-2.5 py-2.5 rounded-full",
		outlined: "text-buttonColor font-medium text-lg bg-buttonColor2 w-96 flex justify-between font-medium flex items-center gap-2 px-2.5 py-2.5 rounded-full",
		filled: "",
		iconOnly: "",
  };

	return (
		<>
			<button
				value={selectedOption}
				onClick={openLanguageModal}
				type="button"
				className={ buttonStyles[variant] }
			>
				{variant !== "iconOnly" && (
					<span className="bg-searchColor w-full py-2.5 flex items-center justify-center rounded-full">
						{selectedOption ? t(`modal.modalLanguage.${selectedOption.toLowerCase()}`) : t('homepage.h3modal')}
					</span>
				)}

				<Languages className="text-colorFundo size-7 mr-3 ml-2" />
			</button>

			{isLanguageModalOpen && (
				// biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
					<div
					onClick={closeLanguageModal}
					className="fixed inset-0 bg-black/60 flex items-center p-4 justify-center text-xl"
					>
					{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
					<div
						onClick={() => setIsLanguageModalOpen(false)}
						className="w-[640px] rounded-xl py-5 px-6 bg-colorButton"
					>
						{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
						<div 
							onClick={(e) => e.stopPropagation()}
							className="text-colorFundo font-normal"
						>
							<div className="flex items-center justify-between text-2xl ml-1">
							{t('homepage.h3modal')}
								<X onClick={closeLanguageModal} className="cursor-pointer" />
							</div>

							<div className="flex text-colorFundo flex-col py-3 mt-2 gap-3">
								<button
									type="button"
									className="py-2 px-5 outline-none rounded-xl transition duration-400 hover:text-zinc-50 hover:bg-colorHover bg-buttonColor2 flex items-center justify-between"
									onClick={() => handleSelectOption("Umbundu", "umb")}
								>
									<p>{t('modal.modalLanguage.umbundu')}</p>
									<img className="w-10" src="/languages/angola.png" alt="emojiAngola" />
								</button>
								<button
									type="button"
									className="py-2 px-5 outline-none rounded-xl transition duration-400 hover:text-zinc-50 hover:bg-colorHover bg-buttonColor2 flex items-center justify-between"
									onClick={() => handleSelectOption("Kimbundu", "kmb")}
								>
									<p>{t('modal.modalLanguage.kimbundo')}</p>
									<img className="w-10" src="/languages/angola.png" alt="emojiAngola" />
								</button>
								<button
									type="button"
									className="py-2 px-5 outline-none rounded-xl transition duration-400 hover:text-zinc-50 hover:bg-colorHover bg-buttonColor2 flex items-center justify-between"
									onClick={() => handleSelectOption("Lingala", "ln")}
								>
									<p>{t('modal.modalLanguage.lingala')}</p>
									<img className="w-10" src="/languages/angola.png" alt="emojiAngola" />
								</button>
								<button
									type="button"
									className="py-2 px-5 outline-none rounded-xl transition duration-400 hover:text-zinc-50 hover:bg-colorHover bg-buttonColor2 flex items-center justify-between"
									onClick={() => handleSelectOption("Português", "pt")}
								>
									<p>{t('modal.modalLanguage.portugues')}</p>
									<img className="w-10" src="/languages/portugal.png" alt="emojiPortugal" />
								</button>
								<button
									type="button"
									className="py-2 px-5 outline-none rounded-xl transition duration-400 hover:text-zinc-50 hover:bg-colorHover bg-buttonColor2 flex items-center justify-between"
									onClick={() => handleSelectOption("Inglês", "en")}
								>
									<p>{t('modal.modalLanguage.ingles')}</p>
									<img className="w-10" src="/languages/eua.png" alt="emojiEUA" />
								</button>
								<button
									type="button"
									className="py-2 px-5 outline-none rounded-xl transition duration-400 hover:text-zinc-50 hover:bg-colorHover bg-buttonColor2 flex items-center justify-between"
									onClick={() => handleSelectOption("Espanhol", "es")}
								>
									<p>{t('modal.modalLanguage.espanhol')}</p>
									<img className="w-10" src="/languages/espanha1.png" alt="emojiFrança" />
								</button>
								<button
									type="button"
									className="py-2 px-5 outline-none rounded-xl transition duration-400 hover:text-zinc-50 hover:bg-colorHover bg-buttonColor2 flex items-center justify-between"
									onClick={() => handleSelectOption("Francês", "fr")}
								>
									<p>{t('modal.modalLanguage.frances')}</p>
									<img className="w-10" src="/languages/franca.png" alt="emojiFrança" />
								</button>
								{/**
								 * <button
									type="button"
									className="py-2 px-5 outline-none rounded-xl transition duration-400 hover:text-zinc-300 hover:bg-buttonColor bg-searchColorInput flex items-center justify-between"
									onClick={() => handleSelectOption("Chinês (Mandarim)", "zh")}
								>
									<p className="text-zinc-300">{t('modal.modalLanguage.chines')}</p>
									<img className="w-10" src="/languages/china.png" alt="emojiChina" />
								</button>
								 */}
								{/**
								 * <button
									type="button"
									className="py-2 px-5 outline-none rounded-xl transition duration-400 hover:text-zinc-300 hover:bg-buttonColor bg-searchColorInput flex items-center justify-between"
									onClick={() => handleSelectOption("Russo", "ru")}
								>
									<p className="text-zinc-300">{t('modal.modalLanguage.russo')}</p>
									<img className="w-10" src="/languages/russia.png" alt="emojiRussia" />
								</button>
								 */}
								
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
}

