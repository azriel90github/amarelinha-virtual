import { 
	Facebook, 
	Headset, 
	Instagram, 
	Mail, 
	MessageCircle, X, } from "lucide-react";
import { type SetStateAction, useState } from "react";
import { useTranslation } from "react-i18next";

export function ContactModal() {
	function disableScroll() {
		document.body.style.overflow = "hidden";
	}
	
	function enableScroll() {
		document.body.style.overflow = "";
	}

	const { t } = useTranslation()

	const [, setSelectedOption] = useState(""); // Estado para o valor selecionado
	// Função para fechar o modal e definir a opção selecionada
	const handleSelectOption = (option: SetStateAction<string>) => {
		setSelectedOption(option);
		setIsContactModalOpen(false);
	};

	const [isContactModalOpen, setIsContactModalOpen] = useState(false);

	function openContactModal() {
		setIsContactModalOpen(true);
		disableScroll();
	}

	function closeContactModal() {
		setIsContactModalOpen(false);
		enableScroll();
	}

	return (
		<>
			<button
				type="button"
				className="accountButton px-8 py-4 w-80 duration-400 flex items-center justify-between bg-buttonColor2 rounded-full shadow-shape text-colorFundo hover:bg-colorHover hover:text-zinc-200 transition duration-400 font-medium text-xl"
				onClick={openContactModal}
			>
				<p className="text-1xl font-medium">{t('homepage.buttonContact')}</p>
				<Headset />
			</button>
				{isContactModalOpen && (
					// biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
					<div
						onClick={closeContactModal}
						className="fixed inset-0 bg-black/60 flex items-center p-4 justify-center"
					>
						{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
						<div
							onClick={() => setIsContactModalOpen(false)}
							className="w-[640px] rounded-xl py-5 px-6 bg-buttonColor"
						>
							{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
							<div
								onClick={(e) => e.stopPropagation()}
								className="text-colorFundo font-medium"
							>
								<div className="flex items-center justify-between text-xl ml-1">
									{t('modal.modalContact.title')}
									<X onClick={closeContactModal} className="cursor-pointer" />
									{/** <X className="size-6 cursor-pointer" /> */}
								</div>
								<div className="flex flex-col py-3 mt-2 gap-3">
								<h3 className="flex mx-2 text-lx">{t('modal.modalContact.numero')}</h3>
                <button
										type="button"
										className="py-3 px-5 outline-none rounded-xl transition duration-400 hover:text-zinc-50 hover:bg-colorHover bg-buttonColor2 flex items-center justify-between"
										onClick={() => handleSelectOption("")}
									>
										<p className="text-zinc-50">Africel - 959 261 926</p>
                    <Headset />
									</button>
									<button
										type="button"
										className="py-3 px-5 outline-none rounded-xl transition duration-400 hover:text-zinc-50 hover:bg-colorHover bg-buttonColor2 flex items-center justify-between"
										onClick={() => handleSelectOption("")}
									>
										<p className="text-zinc-50">Unitel - 929 261 926</p>
                    <Headset />
									</button>
									<h3 className="flex mx-2 text-lx">{t('modal.modalContact.social')}</h3>
									<button
										type="button"
										className="py-3 px-5 outline-none rounded-xl transition duration-400 hover:text-zinc-50 hover:bg-colorHover bg-buttonColor2 flex items-center justify-between"
										onClick={() => {
											const phoneNumber = "932101903"; // Substitua pelo número desejado
											const message = encodeURIComponent("Olá! Estou entrando em contato...");
											const whatsappUri = `whatsapp://send?phone=${phoneNumber}&text=${message}`;
											
											// Tenta abrir o aplicativo WhatsApp diretamente
											window.location.assign(whatsappUri);
										}}
									>
                    <p className="text-zinc-50">WhatsApp</p>
                    <MessageCircle />
									</button>
									<button
										type="button"
										className="py-3 px-5 outline-none rounded-xl transition duration-400 hover:text-zinc-50 hover:bg-colorHover bg-buttonColor2 flex items-center justify-between"
										onClick={() => handleSelectOption("")}
									>
										<p className="text-zinc-50">Instagram</p>
                    <Instagram />
									</button>
									<button
										type="button"
										className="py-3 px-5 outline-none rounded-xl transition duration-400 hover:text-zinc-50 hover:bg-colorHover bg-buttonColor2 flex items-center justify-between"
										onClick={() => handleSelectOption("")}
									>
                    <p className="text-zinc-50">Facebook</p>
                    <Facebook />
									</button>
									<h3 className="flex mx-2 text-lx">{t('modal.modalContact.email')}</h3>
									<button
										type="button"
										className="py-3 px-5 outline-none rounded-xl transition duration-400 hover:text-zinc-50 hover:bg-colorHover bg-buttonColor2 flex items-center justify-between"
										onClick={() => handleSelectOption("")}
									>
                    <p className="text-zinc-50">azrielgithub@gmail.com</p>
                    <Mail />
									</button>

									<button
										type="button"
										className="py-3 px-5 outline-none rounded-xl transition duration-400 hover:text-zinc-50 hover:bg-colorHover bg-buttonColor2 flex items-center justify-between"
										onClick={() => handleSelectOption("")}
									>
                    <p className="text-zinc-50">azrielmoreira@gmail.com</p>
                    <Mail />
									</button>
								</div>
							</div>
						</div>
					</div>
				)}
		</>
	);
}
