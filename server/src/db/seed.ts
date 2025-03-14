import { client, db } from ".";
import { customerOrder, goods } from "./schema";

async function seed() {
	await db.delete(goods);
	//await db.delete(customerOrder);

	await db.insert(goods).values([

		//Tuneza
		{
			title: "Hambúrguer tuneza simples de Carne",
			price: "4000", // Agora pode ser um number
			heart: 3,
			description: "Hambúrguer tuneza ( carne + ovo + bacon	+ queijo cheddar + batata palha	+ molho especial da casa )",
			category: "Tuneza"
		},
		{
			title: "Hambúrguer tuneza simples de Frango",
			price: "4000", // Agora pode ser um number
			heart: 3,
			description: "( Hambúrguer de frango + ovo + bacon	+ queijo cheddar + batata palha	+ molho especial da casa )",
			category: "Tuneza"
		},
		{
			title: "Menu tuneza de Carne",
			price: "5000", // Agora pode ser um number
			heart: 3,
			description: "Hambúrguer tuneza ( carne + ovo + bacon	+ queijo cheddar + batata palha	+ molho especial da casa ) + dose de batata + refrigerante",
			category: "Tuneza"
		},
		{
			title: "Menu tuneza de Frango",
			price: "5000", // Agora pode ser um number
			heart: 3,
			description: "( Hambúrguer de frango + ovo + bacon + queijo cheddar + batata palha + molho especial da casa ) + dose de batata frita + refrigerante",
			category: "Tuneza"
		},
		

		// Papa tudo
    {
			title: "Papa tudo",
			price: "3500", // Agora pode ser um number
			heart: 4,
			description: "( Carne, ovo, bacon, queijo cheddar, cebola caramelizada	e batata palha )",
			category: "Papa tudo"
		},
		{
			title: "Menu Papa tudo",
			price: "4500", // Agora pode ser um number
			heart: 4,
			description: "( Carne + ovo + bacon + queijo cheddar + cebola caramelizada + molho especial da casa + dose de batata frita )",
			category: "Papa tudo"
		},
		{
			title: "Batata frita",
			price: "2000", // Agora pode ser um number
			heart: 4,
			description: "Dose de batata frita ( Extra )",
			category: "Papa tudo"
		},
		{
			title: "Pote de Molhos ( cada )",
			price: "200", // Agora pode ser um number
			heart: 4,
			description: "ketchup, Maionese, Molho especial da casa",
			category: "Papa tudo"
		},
		{
			title: "Ovo",
			price: "500", // Agora pode ser um number
			heart: 4,
			description: "Ovo ( Extra )",
			category: "Papa tudo"
		},
		{
			title: "Coca Cola",
			price: "1000", // Agora pode ser um number
			heart: 4,
			description: "Refrigerante ( 350ml )",
			category: "Bebidas"
		},
		{
			title: "Fanta",
			price: "1000", // Agora pode ser um number
			heart: 4,
			description: "Refrigerante ( 350ml )",
			category: "Bebidas"
		},
		{
			title: "Sprite",
			price: "1000", // Agora pode ser um number
			heart: 4,
			description: "Refrigerante ( 350ml )",
			category: "Bebidas"
		},
		{
			title: "Pepsi",
			price: "1000", // Agora pode ser um number
			heart: 4,
			description: "Refrigerante ( 350ml )",
			category: "Bebidas"
		},
		{
			title: "Mirinda",
			price: "1000", // Agora pode ser um number
			heart: 4,
			description: "Refrigerante ( 350ml )",
			category: "Bebidas"
		},
		{
			title: "Água Pura",
			price: "500", // Agora pode ser um number
			heart: 4,
			description: "Água Pura ( 500ml )",	
			category: "Bebidas"
		},
		

		//Fahitas
		{
			title: "Fahita de Carne",
			price: "4500", // Agora pode ser um number
			heart: 2,
			description: "Carne de lombo de vaca	+  milho	+ queijo e molhos a seu gosto ( maionese, ketchup, mostarda, picante )",
			category: "Fahitas"
		},
		{
			title: "Fahita de Frango",
			price: "4000", // Agora pode ser um number
			heart: 3,
			description: "Peito de frango	 + milho	+ queijo e molhos a seu gosto ( maionese, ketchup, mostarda, picante )",
			category: "Fahitas"
		},
    {
			title: "Fahita Mista",
			price: "4500", // Agora pode ser um number
			heart: 4,
			description: "Peito de frango	+ carne de lombo de vaca + milho	+ queijo e molhos do seu gosto ( maionese, ketchup, mostarda, picante )",
			category: "Fahitas"
		}
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
