import { t } from "i18next";
import { SquareChartGantt } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function MenuButton() {
	const navigate = useNavigate(); // Esportar useNavigate do react-router-dom

	function menuPage() {
		navigate("/menu/123");
	}

	return (
		// biome-ignore lint/a11y/useButtonType: <explanation>
		<button
			onClick={menuPage}
			className="flex items-center font-medium text-xl justify-between w-72 hover:bg-colorHover shadow-shape bg-buttonColor2 transition duration-400 text-colorFundo hover:text-zinc-50 rounded-2xl px-7 py-3.5"
		>
			{t('buttons.menuButton')}
			<SquareChartGantt />
		</button>
	);
}