import { Model } from 'https://cdn.jsdelivr.net/npm/minizinc/dist/minizinc.mjs';

async function solve(model_file)
{
	// Define model
	const model = new Model();

	// Load model
	const response = await fetch('mzn/' + model_file);
	const csp = await response.text();
	model.addFile('test.mzn', csp);

	// Solve model
	//const solve = model.solve({options: {solver: 'gecode', 'all-solutions': true, 'intermediate-solutions': false, 'num-solutions': 2}});
	const solve = model.solve({options: {solver: 'gecode', 'all-solutions': true}});

	// Print solutions
	solve.on('solution', solution => {console.log(solution.output.raw);});
	solve.then(result => {console.log(model_file, ': ', result.status);});
}

solve('movie_buffs_associated.txt');
solve('a_new_personal_computer.txt');
solve('pasta_and_wine.txt');