import { client, db } from ".";
import { customerOrder, goods } from "./schema";

async function seed() {
	await db.delete(goods);
	//await db.delete(customerOrder);

	await db.insert(goods).values([
		{
			title: "Hamburguer tuneza simples de carne",
			price: "4000", // Agora pode ser um number
			heart: 3,
			description: "hambúrguer tuneza ( carne + ovo + bacon	+ queijo cheddar + batata palha	+ molho especial da casa )",
			category: "Tuneza"
		},
    {
			title: "Menu papa tudo",
			price: "3500", // Agora pode ser um number
			heart: 4,
			description: "( carne	+ ovo	+ bacon	+ queijo cheddar	+ batata palha	+ cebola caramelizada	+ molho especial da casa + dose de batata frita )",
			category: "Papa tudo"
		},
    {
			title: "Fahitas de carne",
			price: "4500", // Agora pode ser um number
			heart: 2,
			description: "peito de frango	+ carne de lombo de vaca + milho	+ queijo e molhos do seu gosto ( maionese, ketchup, mostarda, picante )",
			category: "Fahitas"
		},
	]);

	/**
	 * await db.insert(customerOrder).values([
		{
			name: "Azriel Armando",
			number: "932101903", // Agora pode ser um number
			flavors: "3",
			payment: "360",
			paymentMethod: "Dinheiro em mão",
			cityOrNeighborhood: "Rocha",
			landmark: "Gamek"
		},
	]);

	 */

}

seed().finally(() => { 
	client.end();
}); 
