import { client, db } from ".";
import { customerOrder, goods } from "./schema";

async function seed() {
	await db.delete(goods);
	//await db.delete(customerOrder);

	await db.insert(goods).values([
		{
			title: "Hambuguer tuneza simples de carne",
			price: "40000", // Agora pode ser um number
			heart: 2,
			description: "hambúrguer tuneza ( carne + ovo + bacon + queijo cheddar + batata palha + molho especial da casa )",
			category: "Tuneza"
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


