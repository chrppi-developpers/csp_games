import { Attribute, Puzzle } from './puzzle.js';

export const pasta = new Puzzle
(
	'pasta_and_wine.mzn',
	'Woman',
	5,
	[
		new Attribute('Shirt', ['blue', 'green', 'red', 'white', 'yellow'], ['blue', 'green', 'red', 'white', 'yellow']),
		new Attribute('Name', ['Andrea', 'Holly', 'Julie', 'Leslie', 'Victoria'], ['Andrea', 'Holly', 'Julie', 'Leslie', 'Victoria']),
		new Attribute('Surname', ['Brown', 'Davis', 'Lopes', 'Miller', 'Wilson'], ['Brown', 'Davis', 'Lopes', 'Miller', 'Wilson']),
		new Attribute('Pasta', ['farfalle', 'lasagne', 'penne', 'spaghetti', 'ravioli' ], ['farfalle', 'lasagne', 'penne', 'spaghetti', 'ravioli' ]),
		new Attribute('Wine', ['Australian', 'Argentine', 'Chilean', 'French', 'Italian'], ['Australian', 'Argentine', 'Chilean', 'French', 'Italian']),
		new Attribute('Age', ['y_30', 'y_35', 'y_40', 'y_45', 'y_50'], ['y_30', 'y_35', 'y_40', 'y_45', 'y_50'])
	]
);