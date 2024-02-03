import { Model } from '../third-party/node_modules/minizinc/dist/minizinc.mjs';
import { config } from './config.js';
import { Cell_state } from './cell_state.js';
import { movie } from './movie.js';	
import { computer } from './computer.js';
import { pasta } from './pasta.js';

// Solve a CSP model with additional constraints given by the user
// table_id is used to update solving status
async function solve(model_file, constraints, solution_id)
{
	// Update HTML solution
	const solution = document.getElementById(solution_id);

	// Define model
	const model = new Model();

	// Load model and add constraints
	const response = await fetch('mzn/' + model_file);
	let csp = await response.text();
	csp += constraints
	model.addFile('test.mzn', csp);

	// Solve model	
	const solve = model.solve({options: {solver: 'gecode', 'all-solutions': false}});

	solution.classList.remove('is-danger');
	solution.classList.remove('is-success');
	solution.classList.remove('is-hidden');
	solution.classList.add('is-warning');
	solution.classList.add('is-loading');

	// Print solutions
	solve.then
	(
		result => 
		{
			if (result.status == 'ALL_SOLUTIONS' || result.status == 'OPTIMAL_SOLUTION' || result.status == 'SATISFIED')
			{
				solution.classList.remove('is-warning');
				solution.classList.remove('is-loading');
				solution.classList.add('is-success');
				solution.textContent = 'Your proposition has solutions';
			}

			else
			{
				solution.classList.remove('is-warning');
				solution.classList.remove('is-loading');
				solution.classList.add('is-danger');
				solution.textContent = 'Your proposition has no solution';
			}
		}
	);
}

// Check puzzle from current tables
function check_puzzle(puzzle_id)
{
	switch (puzzle_id) 
	{
		case config.puzzle_movie:
		{
			let constraints = '';
			const film = JSON.parse(sessionStorage.getItem(config.table_movie_film));
			const day = JSON.parse(sessionStorage.getItem(config.table_movie_day));
			const time = JSON.parse(sessionStorage.getItem(config.table_movie_time));
			for (let row = 0; row < 5; ++row)
			{
				for (let column = 0; column < 5; ++column)
				{
					// Film
					switch(film[row][column])
					{
						case Cell_state.CHECK:
							constraints += `
							constraint exists(releases_indexe in releases_indexes)
							(
								name_releases[releases_indexe] = ${movie.names[row]}
								/\\ film_name_values[film_indexes[releases_indexe]] = ${movie.films[column]}
							);
							`;
						break;
						case Cell_state.XMARK:
							constraints += `
							constraint exists(releases_indexe in releases_indexes)
							(
								name_releases[releases_indexe] != ${movie.names[row]}
								\\/ film_name_values[film_indexes[releases_indexe]] != ${movie.films[column]}
							);
							`;
						break;
					}
					
					// Day
					switch (day[row][column]) 
					{
						case Cell_state.CHECK:
							constraints += `
							constraint exists(releases_indexe in releases_indexes)
							(
								name_releases[releases_indexe] = ${movie.names[row]}
								/\\ day_name_values[day_indexes[releases_indexe]] = ${movie.days[column]}
							);
							`;
						break;
						case Cell_state.XMARK:
							constraints += `
							constraint exists(releases_indexe in releases_indexes)
							(
								name_releases[releases_indexe] != ${movie.names[row]}
								\\/ day_name_values[day_indexes[releases_indexe]] != ${movie.days[column]}
							);
							`;
						break;	
					}

					// Time
					switch (time[row][column]) 
					{
						case Cell_state.CHECK:
							constraints += `
							constraint exists(releases_indexe in releases_indexes)
							(
								name_releases[releases_indexe] = ${movie.names[row]}
								/\\ time_values[time_indexes[releases_indexe]] = ${movie.times[column]}
							);
							`;
						break;
						case Cell_state.XMARK:
							constraints += `
							constraint exists(releases_indexe in releases_indexes)
							(
								name_releases[releases_indexe] != ${movie.names[row]}
								\\/ time_values[time_indexes[releases_indexe]] != ${movie.times[column]}
							);
							`;
						break;
					}
				}
			}

			solve(movie.model_file, constraints, config.solution_movie);
		}
		break;
		
		case config.puzzle_computer:
		{
			let constraints = '';
			const processor = JSON.parse(sessionStorage.getItem(config.table_computer_processor));
			const hard_disk = JSON.parse(sessionStorage.getItem(config.table_computer_hard_disk));
			const price = JSON.parse(sessionStorage.getItem(config.table_computer_price));
			for (let row = 0; row < 5; ++row)
			{
				for (let column = 0; column < 5; ++column)
				{
					// Processor
					switch(processor[row][column])
					{
						case Cell_state.CHECK:
							constraints += `
							constraint exists(computer_indexe in computer_indexes)
							(
								monitor_values[monitor_indexes[computer_indexe]] = ${computer.monitors[row]}
								/\\ processor_values[processor_indexes[computer_indexe]] = ${computer.processors[column]}
							);
							`;
						break;
						case Cell_state.XMARK:
							constraints += `
							constraint exists(computer_indexe in computer_indexes)
							(
								monitor_values[monitor_indexes[computer_indexe]] != ${computer.monitors[row]}
								\\/ processor_values[processor_indexes[computer_indexe]] != ${computer.processors[column]}
							);
							`;
						break;
					}
					
					// Hard Disk
					switch (hard_disk[row][column]) 
					{
						case Cell_state.CHECK:
							constraints += `
							constraint exists(computer_indexe in computer_indexes)
							(
								monitor_values[monitor_indexes[computer_indexe]] = ${computer.monitors[row]}
								/\\ hard_disk_values[hard_disk_indexes[computer_indexe]] = ${computer.hard_disks[column]}
							);
							`;
						break;
						case Cell_state.XMARK:
							constraints += `
							constraint exists(computer_indexe in computer_indexes)
							(
								monitor_values[monitor_indexes[computer_indexe]] != ${computer.monitors[row]}
								\\/ hard_disk_values[hard_disk_indexes[computer_indexe]] != ${computer.hard_disks[column]}
							);
							`;
						break;	
					}

					// Price
					switch (price[row][column]) 
					{
						case Cell_state.CHECK:
							constraints += `
							constraint exists(computer_indexe in computer_indexes)
							(
								monitor_values[monitor_indexes[computer_indexe]] = ${computer.monitors[row]}
								/\\ price_values[price_indexes[computer_indexe]] = ${computer.prices[column]}
							);
							`;
						break;
						case Cell_state.XMARK:
							constraints += `
							constraint exists(computer_indexe in computer_indexes)
							(
								monitor_values[monitor_indexes[computer_indexe]] != ${computer.monitors[row]}
								\\/ price_values[price_indexes[computer_indexe]] != ${computer.prices[column]}
							);
							`;
						break;
					}
				}
			}

			solve(computer.model_file, constraints, config.solution_computer);
		}
		break;

		case config.puzzle_pasta:
		{
			let constraints = '';
			const data = JSON.parse(sessionStorage.getItem(config.table_pasta));
			for (let individual = 0; individual < pasta.individuals; ++individual)
			{
				// Shirt
				if (data[individual][0] > 0)
				{
					constraints += `
					constraint shirt_woman[${individual + 1}] = ${pasta.attributes[0].model_values[data[individual][0] - 1]};
					`;
				}

				// Name
				if (data[individual][1] > 0)
				{
					constraints += `
					constraint name_woman[${individual + 1}] = ${pasta.attributes[1].model_values[data[individual][1] - 1]};
					`;
				}

				// Surname
				if (data[individual][2] > 0)
				{
					constraints += `
					constraint surname_woman[${individual + 1}] = ${pasta.attributes[2].model_values[data[individual][2] - 1]};
					`;
				}

				// Pasta
				if (data[individual][3] > 0)
				{
					constraints += `
					constraint pasta_woman[${individual + 1}] = ${pasta.attributes[3].model_values[data[individual][3] - 1]};
					`;
				}

				// Wine
				if (data[individual][4] > 0)
				{
					constraints += `
					constraint wine_woman[${individual + 1}] = ${pasta.attributes[4].model_values[data[individual][4] - 1]};
					`;
				}

				// Age
				if (data[individual][5] > 0)
				{
					constraints += `
					constraint age_woman[${individual + 1}] = ${pasta.attributes[5].model_values[data[individual][5] - 1]};
					`;
				}
			}

			solve(pasta.model_file, constraints, config.solution_pasta);
		}
		break;
	}
}

// Update HTML for logic puzzles (movie and computer)
function update_html_logic(table_id, table)
{
	// Update table
	for (let td of document.getElementById(table_id).getElementsByTagName('td')) 
	{
		// Get cell row and column
		let column = td.cellIndex;
		let row = td.parentNode.rowIndex;
		
		// Update cell icon
		let cell_span = td.querySelector('span');
		let cell_i = cell_span.querySelector('i');
		td.onclick = null;
		td.style.cursor = null;
		switch (table[row][column])
		{
			case Cell_state.NONE:
				cell_span.setAttribute('class', 'icon is-small');
				cell_i.setAttribute('class', '');
			break;
			case Cell_state.XMARK_DISABLE:
				td.onclick = (event) => { event.stopPropagation(); };
				td.style.cursor = 'not-allowed';
				cell_span.setAttribute('class', 'icon is-small has-text-grey');
				cell_i.setAttribute('class', 'fas fa-lg fa-xmark');
			break
			case Cell_state.XMARK:
				cell_span.setAttribute('class', 'icon is-small has-text-danger');
				cell_i.setAttribute('class', 'fas fa-lg fa-xmark');
			break;
			case Cell_state.CHECK:
				cell_span.setAttribute('class', 'icon is-small has-text-success');
				cell_i.setAttribute('class', 'fas fa-lg fa-check');
			break;
		}
	}
}

// Update HTML for zebra puzzles (pasta)
function update_html_zebra(table_id, data)
{
	// Update table
	for (let td of document.getElementById(table_id).getElementsByTagName('td'))
	{
		// Get individual (cell column), attribute (cell row)
		let individual = td.cellIndex - 1;
		let attribute = td.parentNode.rowIndex - 1;
	
		// Update cell
		let options = td.getElementsByTagName('option');
		for (let attribute_value = 0; attribute_value < options.length; ++attribute_value)
		{
			// Enabled by default
			options[attribute_value].disabled = false;

			// Selected
			if (data[individual][attribute] == attribute_value)
				options[attribute_value].selected = true;

			// Not selected
			else
			{
				options[attribute_value].selected = false;

				// Disabled if an other individual have it (not for empty attribute value)
				if (attribute_value > 0)
				{
					for (let other_individual = 0; other_individual < pasta.individuals; ++other_individual)
					{
						if (other_individual != individual && data[other_individual][attribute] == attribute_value)
						{
							options[attribute_value].disabled = true;
							break;
						}
					}
				}
			}
		}
	}
}

// Update table from given click event
// Then update HTML and nd check puzzle
function update_table(click_event, puzzle_id, table_id)
{
	switch (puzzle_id)
	{
		// Update logic puzzles (movie and computer)
		case config.puzzle_movie:
		case config.puzzle_computer:
		{
			// Get clicked cell
			let cell = click_event.target;
			while (!(cell instanceof HTMLTableCellElement))
				cell = cell.parentNode;

			// Get cell row and column
			let column = cell.cellIndex;
			let row = cell.parentNode.rowIndex;

			// Update table
			let table = JSON.parse(sessionStorage.getItem(table_id));
			switch (table[row][column])
			{
				case Cell_state.NONE:
					table[row][column] = Cell_state.XMARK;
				break;
				case Cell_state.XMARK:
					for (let i = 0; i < 5; ++i)
					{
						table[i][column] = Cell_state.XMARK_DISABLE;
						table[row][i] = Cell_state.XMARK_DISABLE;
					}
					table[row][column] = Cell_state.CHECK;
				break;
				case Cell_state.CHECK:
					for (let i = 0; i < 5; ++i)
					{
						let remove_column = true;
						for (let j = 0; j < 5; ++j)
							if (!(i == row && j == column) && table[i][j] == Cell_state.CHECK)
							{
								remove_column = false;
								break;
							}
						if (remove_column)
							table[i][column] = Cell_state.NONE;
						let remove_row = true;
						for (let j = 0; j < 5; ++j)
							if (!(j == row && i == column) && table[j][i] == Cell_state.CHECK)
							{
								remove_row = false;
								break;
							}
						if (remove_row)
							table[row][i] = Cell_state.NONE;
					}
					table[row][column] = Cell_state.NONE;
				break;
			}
			sessionStorage.setItem(table_id, JSON.stringify(table));

			// Update HTML and check table
			update_html_logic(table_id, table);
		}
		break;

		// Update zebra puzzles (pasta)
		case config.puzzle_pasta:
		{
			// Get clicked cell
			let cell = click_event.target;
			while (!(cell instanceof HTMLTableCellElement))
				cell = cell.parentNode;

			// Get individual (cell column), attribute (cell row) and attribute value (cell value)
			let individual = cell.cellIndex - 1;
			let attribute = cell.parentNode.rowIndex - 1;
			let attribute_value = click_event.target.selectedIndex

			// Update table
			let data = JSON.parse(sessionStorage.getItem(table_id));
			data[individual][attribute] = attribute_value;
			sessionStorage.setItem(table_id, JSON.stringify(data));

			// Update HTML
			update_html_zebra(table_id, data);
		}
		break;
	}

	// Check puzzle
	check_puzzle(puzzle_id);
}

// Select a puzzle to show
const div_puzzles =
{
	[config.puzzle_movie]: config.div_movie,
	[config.puzzle_computer]: config.div_computer,
	[config.puzzle_pasta]: config.div_pasta,
	[config.puzzle_creation]: config.div_creation
};
function select_puzzle(puzzle_id)
{
	// Hide previous puzzle
	const previous_puzzle = sessionStorage.getItem(config.current_puzzle);
	if (previous_puzzle)
	{
		document.getElementById(previous_puzzle).classList.remove('is-active');
		document.getElementById(div_puzzles[previous_puzzle]).classList.add('is-hidden');
	}
	
	// Show given puzzle
	document.getElementById(puzzle_id).classList.add('is-active');
	document.getElementById(div_puzzles[puzzle_id]).classList.remove('is-hidden');

	// Update session
	sessionStorage.setItem(config.current_puzzle, puzzle_id);
}

// Initialize session or load data from it
const empty_logic_object = [...Array(5)].map(_ => Array(5).fill(Cell_state.NONE));
const empty_logic_string = JSON.stringify(empty_logic_object);
function initialize_logic_table(table_id)
{
	if (sessionStorage.getItem(table_id))
		update_html_logic(table_id, JSON.parse(sessionStorage.getItem(table_id)));
	else
		sessionStorage.setItem(table_id, empty_logic_string);
}
function initialize_zebra_table(table_id, data_string)
{
	if (sessionStorage.getItem(table_id))
		update_html_zebra(table_id, JSON.parse(sessionStorage.getItem(table_id)));
	else
		sessionStorage.setItem(table_id, data_string);
}
initialize_logic_table(config.table_movie_film);
initialize_logic_table(config.table_movie_day);
initialize_logic_table(config.table_movie_time);
initialize_logic_table(config.table_computer_processor);
initialize_logic_table(config.table_computer_hard_disk);
initialize_logic_table(config.table_computer_price);
initialize_zebra_table(config.table_pasta, pasta.data_string);
if (!sessionStorage.getItem(config.current_puzzle))
	sessionStorage.setItem(config.current_puzzle, config.puzzle_movie);

// Select current puzzle in session
select_puzzle(sessionStorage.getItem(config.current_puzzle));

// Select puzzle
document.getElementById(config.puzzle_movie).addEventListener('click', () => { select_puzzle(config.puzzle_movie); });
document.getElementById(config.puzzle_computer).addEventListener('click', () => { select_puzzle(config.puzzle_computer); });
document.getElementById(config.puzzle_pasta).addEventListener('click', () => { select_puzzle(config.puzzle_pasta); });
document.getElementById(config.puzzle_creation).addEventListener('click', () => { select_puzzle(config.puzzle_creation); });

// Clear table data
document.getElementById(config.clear_table_movie).addEventListener
(
	'click',
	() => 
	{
		// Empty session tables
		sessionStorage.setItem(config.table_movie_film, empty_logic_string);
		sessionStorage.setItem(config.table_movie_day, empty_logic_string);
		sessionStorage.setItem(config.table_movie_time, empty_logic_string);

		// Update HTML tables
		update_html_logic(config.table_movie_film, empty_logic_object);
		update_html_logic(config.table_movie_day, empty_logic_object);
		update_html_logic(config.table_movie_time, empty_logic_object);

		// Update HTML solution
		const solution = document.getElementById(config.solution_movie);
		solution.classList.remove('is-danger');
		solution.classList.remove('is-success');
		solution.classList.remove('is-warning');		
		solution.classList.add('is-hidden');
		solution.textContent = '';
	}
);
document.getElementById(config.clear_table_computer).addEventListener
(
	'click',
	() => 
	{
		// Empty session tables
		sessionStorage.setItem(config.table_computer_processor, empty_logic_string);
		sessionStorage.setItem(config.table_computer_hard_disk, empty_logic_string);
		sessionStorage.setItem(config.table_computer_price, empty_logic_string);

		// Update HTML tables
		update_html_logic(config.table_computer_processor, empty_logic_object);
		update_html_logic(config.table_computer_hard_disk, empty_logic_object);
		update_html_logic(config.table_computer_price, empty_logic_object);

		// Update HTML solution
		const solution = document.getElementById(config.solution_computer);
		solution.classList.remove('is-danger');
		solution.classList.remove('is-success');
		solution.classList.remove('is-warning');
		solution.classList.add('is-hidden');
		solution.textContent = '';
	}
);
document.getElementById(config.clear_table_pasta).addEventListener
(
	'click',
	() => 
	{
		// Empty session tables
		sessionStorage.setItem(config.table_pasta, pasta.data_string);

		// Update HTML tables
		update_html_zebra(config.table_pasta, pasta.data);

		// Update HTML solution
		const solution = document.getElementById(config.solution_pasta);
		solution.classList.remove('is-danger');
		solution.classList.remove('is-success');
		solution.classList.remove('is-warning');
		solution.classList.add('is-hidden');
		solution.textContent = '';
	}
);

// Update table
document.getElementById(config.table_movie_film).addEventListener
(
	'click',
	event => { update_table(event, config.puzzle_movie, config.table_movie_film); }
);
document.getElementById(config.table_movie_day).addEventListener
(
	'click',
	event => { update_table(event, config.puzzle_movie, config.table_movie_day); }
);
document.getElementById(config.table_movie_time).addEventListener
(
	'click',
	event => { update_table(event, config.puzzle_movie, config.table_movie_time); }
);
document.getElementById(config.table_computer_processor).addEventListener
(
	'click',
	event => { update_table(event, config.puzzle_computer, config.table_computer_processor); }
);
document.getElementById(config.table_computer_hard_disk).addEventListener
(
	'click',
	event => { update_table(event, config.puzzle_computer, config.table_computer_hard_disk); }
);
document.getElementById(config.table_computer_price).addEventListener
(
	'click',
	event => { update_table(event, config.puzzle_computer, config.table_computer_price); }
);
for (let select of document.getElementById(config.table_pasta).getElementsByTagName('select')) 
	select.addEventListener('change', event => { update_table(event, config.puzzle_pasta, config.table_pasta); });