import { Model } from '../third-party/node_modules/minizinc/dist/minizinc.mjs';
import { config } from './config.js';

// Get static DOM elements
const puzzle_creation = document.getElementById(config.puzzle_creation);
const div_creation = document.getElementById(config.div_creation);
const div_values_creation = document.getElementById(config.div_values_creation);
const div_constraints_creation = document.getElementById(config.div_constraints_creation);
const name_1_creation = document.getElementById(config.name_1_creation);
const name_2_creation = document.getElementById(config.name_2_creation);
const name_3_creation = document.getElementById(config.name_3_creation);
const place_1_creation = document.getElementById(config.place_1_creation);
const place_2_creation = document.getElementById(config.place_2_creation);
const place_3_creation = document.getElementById(config.place_3_creation);
const object_1_creation = document.getElementById(config.object_1_creation);
const object_2_creation = document.getElementById(config.object_2_creation);
const object_3_creation = document.getElementById(config.object_3_creation);
const values_error_creation = document.getElementById(config.values_error_creation);
const values_error_message_creation = document.getElementById(config.values_error_message_creation);
const add_constraint_creation = document.getElementById(config.add_constraint_creation);
const constraint_content_creation = document.getElementById(config.constraint_content_creation);
const type_block_creation = document.getElementById(config.type_block_creation);
const type_select_creation = document.getElementById(config.type_select_creation);
const type_content_creation = document.getElementById(config.type_content_creation);
const constraint_error_creation = document.getElementById(config.constraint_error_creation);
const constraint_error_message_creation = document.getElementById(config.constraint_error_message_creation);
const txt_constraints_creation = document.getElementById(config.txt_constraints_creation);
const solutions_number_creation = document.getElementById(config.solutions_number_creation);
const constraints_solutions_creation = document.getElementById(config.constraints_solutions_creation);
const pagination_creation = document.getElementById(config.pagination_creation);

// TODO: Remove after testing
name_1_creation.value = 'n1';
name_2_creation.value = 'n2';
name_3_creation.value = 'n3';
place_1_creation.value = 'p1';
place_2_creation.value = 'p2';
place_3_creation.value = 'p3';
object_1_creation.value = 'o1';
object_2_creation.value = 'o2';
object_3_creation.value = 'o3';

// Set ids for dynamic DOM elements
const ids =
{
	exists_content_creation: 'exists_content_creation',
	exists_sequence_creation: 'exists_sequence_creation',
	equals_variable_creation: 'equals_variable_creation',
	equals_index_creation: 'equals_index_creation',
	equals_value_creation: 'equals_value_creation'
}
const classes =
{
	operation_block_creation: 'operation_block_creation',
	operation_type_creation: 'operation_type_creation',
	operation_content_creation: 'operation_content_creation',
	domain_index_left_creation: 'domain_index_left_creation',
	domain_predicate_creation: 'domain_predicate_creation',
	domain_index_right_creation: 'domain_index_right_creation',
	domain_operator_creation: 'domain_operator_creation',
	domain_number_creation: 'domain_number_creation',
	ground_variable_creation: 'ground_variable_creation',
	ground_index_creation: 'ground_index_creation',
	ground_value_creation: 'ground_value_creation',
	member_index_creation: 'member_index_creation',
	member_set_creation: 'member_set_creation',
	add_operation_creation: 'add_operation_creation',
};

// Return true if values are different litterals
let error = { message: null };
function different_litterals(values, name)
{
	// Values should all be litterals
	for (let i = 0; i < values.length; ++i)
		if (!values[i].match(/^[_a-zA-Z][_a-zA-Z0-9]*$/))
		{
			error.message = `${name} ${i + 1} should be a litteral ([_a-zA-Z][_a-zA-Z0-9]*)`;
			return false;
		}

	// Values should all be different
	for (let i = 0; i < values.length; ++i)
		for (let j = i + 1; j < values.length; ++j)
			if (values[i] == values[j])
			{
				error.message = `${name} ${i + 1} and ${name} ${j + 1} should be different`;
				return false;
			}

	// Values are valid
	return true;
}

let csp = null;
let mzn_constraints = [];

function solve()
{
	// Define model
	const model = new Model();

	// Load model and add constraints
	model.addFile('test.mzn', csp + mzn_constraints.join('\n'));

	// Solve model	
	const solve = model.solve({options: {solver: 'gecode', 'all-solutions': true, statistics: true}});

	// Empty solutions
	constraints_solutions_creation.replaceChildren();

	// Loading animations
	document.body.style.cursor = 'wait';

	// Append each solution to HTML
	solve.on
	(
		'solution',
		solution =>
		{

			// Append mzn constraint to HTML
			const output = solution.output.json;
			const Name = output.Name;
			const Place = output.Place;
			const Object = output.Object;
			let tr = document.createElement('tr');
			function append_mzn_td(value)
			{
				let td = document.createElement('td');
				td.innerText = value;
				tr.appendChild(td);
			}
			append_mzn_td(Name[0].e)
			append_mzn_td(Place[0].e);
			append_mzn_td(Object[0].e);
			append_mzn_td(Name[1].e);
			append_mzn_td(Place[1].e);
			append_mzn_td(Object[1].e);
			append_mzn_td(Name[2].e);
			append_mzn_td(Place[2].e);
			append_mzn_td(Object[2].e);
			constraints_solutions_creation.appendChild(tr);
		}
	);

	// Print number of solutions
	solve.then
	(
		result => 
		{
			document.body.style.cursor = null;
			solutions_number_creation.innerText = result.statistics.nSolutions ? result.statistics.nSolutions : 0;
		}
	);
}

// Hide values edition and show constraint edition if values values are correct
// Also initialize CSP
// Show an error message otherwise
function confirm_values()
{
	// Hide variable edition and show constraint edition
	// Also change pagination creation click event
	if 
	(
		different_litterals([name_1_creation.value, name_2_creation.value, name_3_creation.value], 'Name') 
		&& different_litterals([place_1_creation.value, place_2_creation.value, place_3_creation.value], 'Place') 
		&& different_litterals([object_1_creation.value, object_2_creation.value, object_3_creation.value], 'Object') 
	)
	{
		div_values_creation.classList.add('is-hidden');
		div_constraints_creation.classList.remove('is-hidden');
		pagination_creation.classList.remove('pagination-next');
		pagination_creation.classList.add('pagination-previous', 'is-danger');
		pagination_creation.innerText = 'Change values';
		pagination_creation.onclick = 
			() =>
			{
				div_values_creation.classList.remove('is-hidden');
				div_constraints_creation.classList.add('is-hidden');
				pagination_creation.classList.add('pagination-next');
				pagination_creation.classList.remove('pagination-previous', 'is-danger');
				pagination_creation.innerText = 'Confirm';
				pagination_creation.onclick = confirm_values;
			}
		;

		// Initialize CSP
		csp = `
include "globals.mzn";

% Static data
int: individuals = 3;
set of int: individual_indexes = 1..individuals;
enum name_values = {${name_1_creation.value}, ${name_2_creation.value}, ${name_3_creation.value}};
enum place_values = {${place_1_creation.value}, ${place_2_creation.value}, ${place_3_creation.value}};
enum object_values = {${object_1_creation.value}, ${object_2_creation.value}, ${object_3_creation.value}};

% Decision variables
array[individual_indexes] of var name_values: Name;
array[individual_indexes] of var place_values: Place;
array[individual_indexes] of var object_values: Object;

% Each tuple is different
constraint alldifferent(Name);
constraint alldifferent(Place);
constraint alldifferent(Object);

`;
		
		// Solve model
		solve();
	}

	// Show the error message
	else
	{
		values_error_message_creation.innerText = error.message;
		values_error_creation.classList.remove('is-hidden');
	}
}
pagination_creation.onclick = confirm_values;

// Hide error message when user modify values values
div_values_creation.oninput = () => values_error_creation.classList.add('is-hidden');

// Hide error message when user modify constraint
constraint_content_creation.oninput = () => constraint_error_creation.classList.add('is-hidden');

// Append a litteral to an exists block
function append_exists_litteral()
{
	// Input to set litteral name
	let literal_input = document.createElement('input');
	literal_input.type = 'text';
	literal_input.classList.add('input');
	literal_input.size = 10;

	// Input to add another litteral
	let icon_span = document.createElement('span');
	icon_span.classList.add('icon');
	let icon_i = document.createElement('i');
	icon_i.classList.add('fa-solid', 'fa-plus');
	icon_i.ariaHidden = 'true';
	icon_span.appendChild(icon_i);
	let add_literal = document.createElement('button');
	add_literal.classList.add('button');
	add_literal.appendChild(icon_span);
	add_literal.onclick =
		() => 
		{
			// Change icon to an xmark
			icon_i.classList.remove('fa-plus');
			icon_i.classList.add('fa-xmark');
			icon_span.classList.add('has-text-danger');

			// Click remove current litteral
			add_literal.onclick =
				() =>
				{
					literal_input.remove();
					add_literal.remove();
				}
			;

			append_exists_litteral();
		}
	;

	let exists_creation = document.getElementById(ids.exists_sequence_creation);
	exists_creation.appendChild(literal_input);
	exists_creation.appendChild(add_literal);
}

// Append a litteral to an exists block
function append_member_element(member_set_creation, exists_indexes)
{
	// Append select index to member set
	let header_option = document.createElement('option');
	header_option.selected = true;
	header_option.disabled = true;
	header_option.innerText = '- index -';
	let select_index = document.createElement('select');
	select_index.appendChild(header_option);
	for (let exists_index of exists_indexes)
	{
		let index_option = document.createElement('option');
		index_option.innerText = `#${exists_index}`;
		index_option.value = exists_index;
		select_index.appendChild(index_option);
	}
	let div_select_index = document.createElement('div');
	div_select_index.classList.add('select', classes.ground_index_creation);
	div_select_index.appendChild(select_index);
	member_set_creation.appendChild(div_select_index);

	// Input to add another litteral
	let icon_span = document.createElement('span');
	icon_span.classList.add('icon');
	let icon_i = document.createElement('i');
	icon_i.classList.add('fa-solid', 'fa-plus');
	icon_i.ariaHidden = 'true';
	icon_span.appendChild(icon_i);
	let add_index = document.createElement('button');
	add_index.classList.add('button');
	add_index.appendChild(icon_span);
	add_index.onclick =
		() => 
		{
			// Change icon to an xmark
			icon_i.classList.remove('fa-plus');
			icon_i.classList.add('fa-xmark');
			icon_span.classList.add('has-text-danger');

			// Click remove current litteral
			add_index.onclick =
				() =>
				{
					div_select_index.remove();
					add_index.remove();
				}
			;

			append_member_element(member_set_creation, exists_indexes)
		}
	;
	member_set_creation.appendChild(add_index);
}

// Select empty option by default (override cache at reload)
type_select_creation.querySelector('option').selected = true;

// Select constraint type
type_select_creation.onchange = 
	event => 
	{
		// Empty constraint
		type_content_creation.replaceChildren();
		constraint_content_creation.replaceChildren(type_block_creation);

		switch (event.target.selectedIndex)
		{
			// Exists
			case 1:
			{
				// Create sequence
				let exists_sequence_creation = document.createElement('span');
				exists_sequence_creation.id = ids.exists_sequence_creation;
				exists_sequence_creation.classList.add('in-line');

				// Create lock
				let icon_span = document.createElement('span');
				icon_span.classList.add('icon');
				let icon_i = document.createElement('i');
				icon_i.classList.add('fa-solid', 'fa-lock');
				icon_i.ariaHidden = 'true';
				icon_span.appendChild(icon_i);
				let exists_lock_creation = document.createElement('button');
				exists_lock_creation.classList.add('button');
				exists_lock_creation.appendChild(icon_span);
				function lock_exists()
				{
					// Get all indexes
					let exists_indexes = [];
					for (let element of exists_sequence_creation.getElementsByTagName('input'))
						exists_indexes.push(element.value);

					// Show error and abort lock if indexes are not different litterals
					if (!different_litterals(exists_indexes, 'Index'))
					{
						constraint_error_message_creation.innerText = error.message;
						constraint_error_creation.classList.remove('is-hidden');
						return;
					}

					// Disable exists sequence
					for (let element of exists_sequence_creation.getElementsByTagName('*'))
						element.disabled = true;

					// Append operation
					function append_operation()
					{
						let operation_content_creation = document.createElement('div');
						operation_content_creation.classList.add('in-line', classes.operation_content_creation);

						// Append plus button to operation content
						function allow_append_operation()
						{
							// Abort if add operation is already in operation content
							if (operation_content_creation.querySelector(`.${classes.add_operation_creation}`))
								return;

							let icon_span = document.createElement('span');
							icon_span.classList.add('icon');
							let icon_b = document.createElement('b');
							icon_b.innerText = '∧';
							icon_b.style.fontFamily = 'sans-serif';
							icon_span.appendChild(icon_b);
							let add_operation = document.createElement('button');
							add_operation.classList.add('button', classes.add_operation_creation);
							add_operation.appendChild(icon_span);
							add_operation.onclick =
								() => 
								{
									// Change icon to an red
									icon_span.classList.add('has-text-danger');
								
									// Click remove current operation block
									add_operation.onclick =
										() =>
										{
											operation_block_creation.remove();
										}
									;
									
									append_operation();
								}
							;
							operation_content_creation.appendChild(add_operation);
						}

						let header_option = document.createElement('option');
						header_option.selected = true;
						header_option.disabled = true;
						header_option.innerText = '- operation -';
						let ground_option = document.createElement('option');
						ground_option.innerText = 'ground';
						ground_option.value = 'ground';
						let domain_option = document.createElement('option');
						domain_option.innerText = 'domain';
						domain_option.value = 'domain';
						let member_option = document.createElement('option');
						member_option.innerText = 'member';
						member_option.value = 'member';
						let select_operation = document.createElement('select');
						select_operation.appendChild(header_option);
						select_operation.appendChild(ground_option);
						select_operation.appendChild(domain_option);
						select_operation.appendChild(member_option);
						select_operation.onchange =
							() =>
							{
								// Empty operation content
								operation_content_creation.replaceChildren();

								switch (select_operation.selectedIndex)
								{
									// Ground
									case 1:
									{
										// Append select variable to operation content
										{
											let header_option = document.createElement('option');
											header_option.selected = true;
											header_option.disabled = true;
											header_option.innerText = '- variable -';
											let name_option = document.createElement('option');
											name_option.innerText = 'Name';
											name_option.value = 'Name';
											let place_option = document.createElement('option');
											place_option.innerText = 'Place';
											place_option.value = 'Place';
											let object_option = document.createElement('option');
											object_option.innerText = 'Object';
											object_option.value = 'Object';
											let select_variable = document.createElement('select');
											select_variable.onchange =
												() =>
												{
													// Remove select value if already present
													let ground_value_creation = operation_content_creation.querySelector(`.${classes.ground_value_creation}`);
													if (ground_value_creation)
														ground_value_creation.remove();

													// Append select value to operation content
													let header_option = document.createElement('option');
													header_option.selected = true;
													header_option.disabled = true;
													header_option.innerText = '- value -';
													let select_value = document.createElement('select');
													select_value.onchange =
														() =>
														{
															// Append add operation button if not exists
															allow_append_operation();
														}
													;
													select_value.appendChild(header_option);
													let variables_values =
													[
														[name_1_creation.value, name_2_creation.value, name_3_creation.value],
														[place_1_creation.value, place_2_creation.value, place_3_creation.value],
														[object_1_creation.value, object_2_creation.value, object_3_creation.value]
													];
													for (let variable_value of variables_values[select_variable.selectedIndex - 1])
													{
														let value_option = document.createElement('option');
														value_option.innerText = variable_value;
														value_option.value = variable_value;
														select_value.appendChild(value_option);
													}
													let div_select_value = document.createElement('div');
													div_select_value.classList.add('select', classes.ground_value_creation);
													div_select_value.appendChild(select_value);
													operation_content_creation.appendChild(div_select_value);
												}
											;
											select_variable.appendChild(header_option);
											select_variable.appendChild(name_option);
											select_variable.appendChild(place_option);
											select_variable.appendChild(object_option);
											let div_select_variable = document.createElement('div');
											div_select_variable.classList.add('select', classes.ground_variable_creation);
											div_select_variable.appendChild(select_variable);
											operation_content_creation.appendChild(div_select_variable);
										}

										// Append select index to operation content
										{
											let header_option = document.createElement('option');
											header_option.selected = true;
											header_option.disabled = true;
											header_option.innerText = '- index -';
											let select_index = document.createElement('select');
											select_index.appendChild(header_option);
											for (let exists_index of exists_indexes)
											{
												let index_option = document.createElement('option');
												index_option.innerText = `#${exists_index}`;
												index_option.value = exists_index;
												select_index.appendChild(index_option);
											}
											let div_select_index = document.createElement('div');
											div_select_index.classList.add('select', classes.ground_index_creation);
											div_select_index.appendChild(select_index);
											operation_content_creation.appendChild(div_select_index);
										}
									}
									break;

									// Domain
									case 2:
									{
										// Append select left index to operation content
										{
											let header_option = document.createElement('option');
											header_option.selected = true;
											header_option.disabled = true;
											header_option.innerText = '- index -';
											let select_index = document.createElement('select');
											select_index.appendChild(header_option);
											for (let exists_index of exists_indexes)
											{
												let index_option = document.createElement('option');
												index_option.innerText = `#${exists_index}`;
												index_option.value = exists_index;
												select_index.appendChild(index_option);
											}
											let div_select_index = document.createElement('div');
											div_select_index.classList.add('select', classes.domain_index_left_creation);
											div_select_index.appendChild(select_index);
											operation_content_creation.appendChild(div_select_index);
										}

										// Append select operator to operation content
										{
											let header_option = document.createElement('option');
											header_option.selected = true;
											header_option.disabled = true;
											header_option.innerText = '- predicate -';
											let less_option = document.createElement('option');
											less_option.innerText = '<';
											less_option.value = '<';
											let equal_option = document.createElement('option');
											equal_option.innerText = '=';
											equal_option.value = '=';
											let more_option = document.createElement('option');
											more_option.innerText = '>';
											more_option.value = '>';
											let select_predicate = document.createElement('select');
											select_predicate.appendChild(header_option);
											select_predicate.appendChild(less_option);
											select_predicate.appendChild(equal_option);
											select_predicate.appendChild(more_option);
											let div_select_predicate = document.createElement('div');
											div_select_predicate.classList.add('select', classes.domain_predicate_creation);
											div_select_predicate.appendChild(select_predicate);
											operation_content_creation.appendChild(div_select_predicate);
										}

										// Append select right index to operation content
										{
											let domain_right_creation = document.createElement('div');

											let header_option = document.createElement('option');
											header_option.selected = true;
											header_option.disabled = true;
											header_option.innerText = '- index -';
											let empty_option = document.createElement('option');
											empty_option.innerText = '';
											let select_index = document.createElement('select');
											select_index.appendChild(header_option);
											select_index.appendChild(empty_option);
											for (let exists_index of exists_indexes)
											{
												let index_option = document.createElement('option');
												index_option.innerText = `#${exists_index}`;
												index_option.value = exists_index;
												select_index.appendChild(index_option);
											}
											select_index.onchange =
												() =>
												{
													// Empty domain right
													domain_right_creation.replaceChildren();

													// Create number select
													let header_option = document.createElement('option');
													header_option.selected = true;
													header_option.disabled = true;
													header_option.innerText = '- number -';
													let numer_1_option = document.createElement('option');
													numer_1_option.innerText = '1';
													numer_1_option.value = '1';
													let numer_2_option = document.createElement('option');
													numer_2_option.innerText = '2';
													numer_2_option.value = '2';
													let select_number = document.createElement('select');
													select_number.appendChild(header_option);
													select_number.appendChild(numer_1_option);
													select_number.appendChild(numer_2_option);
													let div_select_number = document.createElement('div');
													div_select_number.classList.add('select', classes.domain_number_creation);
													div_select_number.appendChild(select_number);

													switch (select_index.selectedIndex)
													{
														// Empty
														case 1:
														{
															// Append number select to domain right
															domain_right_creation.appendChild(div_select_number);
														}
														break;

														// Index
														default:
														{
															// Append select operator to domain right
															{
																let header_option = document.createElement('option');
																header_option.selected = true;
																header_option.disabled = true;
																header_option.innerText = '- operator -';
																let empty_option = document.createElement('option');
																empty_option.innerText = '';
																let plus_option = document.createElement('option');
																plus_option.innerText = '+';
																plus_option.value = '+';
																let minus_option = document.createElement('option');
																minus_option.innerText = '-';
																minus_option.value = '-';
																let select_operator = document.createElement('select');
																select_operator.appendChild(header_option);
																select_operator.appendChild(empty_option);
																select_operator.appendChild(plus_option);
																select_operator.appendChild(minus_option);
																select_operator.onchange =
																	() =>
																	{
																		switch (select_operator.selectedIndex)
																		{
																			case 1:
																				div_select_number.remove();
																			break;

																			// Append number select to domain right if operator is not empty
																			default:
																			{
																				div_select_number.remove();
																				domain_right_creation.appendChild(div_select_number);
																			}
																			break;
																		}
																	}
																;
																let div_select_operator = document.createElement('div');
																div_select_operator.classList.add('select', classes.domain_operator_creation);
																div_select_operator.appendChild(select_operator);
																domain_right_creation.appendChild(div_select_operator);
															}
														}
														break;
													}

													// Append add operation button if not exists
													allow_append_operation();
												}
											;
											let div_select_index = document.createElement('div');
											div_select_index.classList.add('select', classes.domain_index_right_creation);
											div_select_index.appendChild(select_index);
											operation_content_creation.appendChild(div_select_index);
											operation_content_creation.appendChild(domain_right_creation);
										}
									}
									break;
								
									// Member
									case 3:
									{
										// Append select index to operation content
										{
											let header_option = document.createElement('option');
											header_option.selected = true;
											header_option.disabled = true;
											header_option.innerText = '- index -';
											let select_index = document.createElement('select');
											select_index.appendChild(header_option);
											for (let exists_index of exists_indexes)
											{
												let index_option = document.createElement('option');
												index_option.innerText = `#${exists_index}`;
												index_option.value = exists_index;
												select_index.appendChild(index_option);
											}
											let div_select_index = document.createElement('div');
											div_select_index.classList.add('select', classes.member_index_creation);
											div_select_index.appendChild(select_index);
											operation_content_creation.appendChild(div_select_index);
										}

										// Append member set
										let member_set_creation = document.createElement('span');
										member_set_creation.classList.add('in-line', classes.member_set_creation);
										operation_content_creation.appendChild(member_set_creation);

										// Append member element
										append_member_element(member_set_creation, exists_indexes);

										// Append add operation button if not exists
										allow_append_operation();
									}
								}
							}
						;
						let operation_block_creation = document.createElement('span');
						operation_block_creation.classList.add('in-line', classes.operation_block_creation);
						let div_select_operation = document.createElement('div');
						div_select_operation.classList.add('select', classes.operation_type_creation);
						div_select_operation.appendChild(select_operation);
						operation_block_creation.appendChild(div_select_operation);
						operation_block_creation.appendChild(operation_content_creation);
						constraint_content_creation.appendChild(operation_block_creation);
					}
					append_operation();

					// Next click will unlock
					icon_i.classList.remove('fa-lock');
					icon_i.classList.add('fa-unlock');
					icon_span.classList.add('has-text-danger');
					exists_lock_creation.onclick =
						() => 
						{
							// Enable exists sequence
							for (let element of exists_sequence_creation.getElementsByTagName('*'))
								element.disabled = false;

							// Remove operation blocks
							for (let operation_block_creation of constraint_content_creation.querySelectorAll(`.${classes.operation_block_creation}`))
								operation_block_creation.remove();

							// Next click will lock
							icon_i.classList.add('fa-lock');
							icon_i.classList.remove('fa-unlock');
							icon_span.classList.remove('has-text-danger');
							exists_lock_creation.onclick = lock_exists;
						}
					;
				}
				exists_lock_creation.onclick = lock_exists;

				// Append sequence and lock
				let exists_content_creation = document.createElement('span');
				exists_content_creation.id = ids.exists_content_creation;
				exists_content_creation.classList.add('in-line');
				exists_content_creation.appendChild(exists_sequence_creation)
				exists_content_creation.appendChild(exists_lock_creation)
				type_content_creation.appendChild(exists_content_creation);

				// Append litteral input to sequence
				append_exists_litteral();
			}
			break;

			// Equals
			case 2:
			{
				// Append select variable to type content
				{
					let header_option = document.createElement('option');
					header_option.selected = true;
					header_option.disabled = true;
					header_option.innerText = '- variable -';
					let name_option = document.createElement('option');
					name_option.innerText = 'Name';
					name_option.value = 'Name';
					let place_option = document.createElement('option');
					place_option.innerText = 'Place';
					place_option.value = 'Place';
					let object_option = document.createElement('option');
					object_option.innerText = 'Object';
					object_option.value = 'Object';
					let select_variable = document.createElement('select');
					select_variable.onchange =
						() =>
						{
							// Remove select value if already present
							let equals_value_creation = document.getElementById(ids.equals_value_creation);
							if (equals_value_creation)
								equals_value_creation.remove();
							
							// Append select value to operation content
							let header_option = document.createElement('option');
							header_option.selected = true;
							header_option.disabled = true;
							header_option.innerText = '- value -';
							let select_value = document.createElement('select');
							select_value.appendChild(header_option);
							let variables_values =
							[
								[name_1_creation.value, name_2_creation.value, name_3_creation.value],
								[place_1_creation.value, place_2_creation.value, place_3_creation.value],
								[object_1_creation.value, object_2_creation.value, object_3_creation.value]
							];
							for (let variable_value of variables_values[select_variable.selectedIndex - 1])
							{
								let value_option = document.createElement('option');
								value_option.innerText = variable_value;
								value_option.value = variable_value;
								select_value.appendChild(value_option);
							}
							let div_select_value = document.createElement('div');
							div_select_value.id = ids.equals_value_creation;
							div_select_value.classList.add('select');
							div_select_value.appendChild(select_value);
							type_content_creation.appendChild(div_select_value);
						}
					;
					select_variable.appendChild(header_option);
					select_variable.appendChild(name_option);
					select_variable.appendChild(place_option);
					select_variable.appendChild(object_option);
					let div_select_variable = document.createElement('div');
					div_select_variable.id = ids.equals_variable_creation;
					div_select_variable.classList.add('select');
					div_select_variable.appendChild(select_variable);
					type_content_creation.appendChild(div_select_variable);
				}

				// Append select index to type content
				{
					let header_option = document.createElement('option');
					header_option.selected = true;
					header_option.disabled = true;
					header_option.innerText = '- index -';
					let index_1_option = document.createElement('option');
					index_1_option.innerText = '#1';
					index_1_option.value = '1';
					let index_2_option = document.createElement('option');
					index_2_option.innerText = '#2';
					index_2_option.value = '2';
					let index_3_option = document.createElement('option');
					index_3_option.innerText = '#3';
					index_3_option.value = '3';
					let select_index = document.createElement('select');
					select_index.appendChild(header_option);
					select_index.appendChild(index_1_option);
					select_index.appendChild(index_2_option);
					select_index.appendChild(index_3_option);
					let div_select_index = document.createElement('div');
					div_select_index.id = ids.equals_index_creation;
					div_select_index.classList.add('select');
					div_select_index.appendChild(select_index);
					type_content_creation.appendChild(div_select_index);
				}
			}
			break;
		}
	}
;

// Incomplete data
function incomplete_constraint()
{
	constraint_error_message_creation.innerText = 'Incomplete constraint';
	constraint_error_creation.classList.remove('is-hidden');
}

// Add a constraint to CSP
add_constraint_creation.onclick =
	() =>
	{
		// Get constraint data
		// Abort if find incomplete
		let constraint_AST = null;
		switch (type_select_creation.querySelector('select').selectedIndex)
		{
			// Incomplete
			case 0: 
				incomplete_constraint();
			return;

			// Exists
			case 1:
			{
				constraint_AST = { exists: { indexes: [], operations: [] } };

				// Get indexes
				let exists_sequence_creation = document.getElementById(ids.exists_sequence_creation);
				if (exists_sequence_creation)
				{
					for (let index_input of exists_sequence_creation.getElementsByTagName('input'))
						constraint_AST.exists.indexes.push(index_input.value);
				}
				else
				{
					incomplete_constraint();
					return;
				}

				// Exists should have operations
				const operations_block_creation = constraint_content_creation.getElementsByClassName(classes.operation_block_creation);
				if (operations_block_creation.length == 0)
				{
					incomplete_constraint();
					return;
				}

				// Get operation blocks
				for (let operation_block_creation of operations_block_creation)
				{
					let operation = null;

					let operation_type_creation = operation_block_creation.querySelector(`.${classes.operation_type_creation}`).querySelector('select');
					switch (operation_type_creation.selectedIndex)
					{
						case 0:
							incomplete_constraint();
						return;

						// Ground
						case 1:
						{
							let ground_variable_creation = operation_block_creation.querySelector(`.${classes.ground_variable_creation}`).querySelector('select');
							let ground_index_creation = operation_block_creation.querySelector(`.${classes.ground_index_creation}`).querySelector('select');
							let ground_value_creation_div = operation_block_creation.querySelector(`.${classes.ground_value_creation}`);
							let ground_value_creation = ground_value_creation_div == null ? null : ground_value_creation_div.querySelector('select');

							if
							(
								ground_variable_creation.selectedIndex == 0 
								|| ground_index_creation.selectedIndex == 0
								|| ground_value_creation == null
								|| ground_value_creation.selectedIndex == 0
							)
							{
								incomplete_constraint();
								return;
							}

							operation = 
							{ 
								ground: 
								{ 
									variable: ground_variable_creation.options[ground_variable_creation.selectedIndex].value, 
									index: ground_index_creation.options[ground_index_creation.selectedIndex].value, 
									value: ground_value_creation.options[ground_value_creation.selectedIndex].value
								}
							};
						}
						break;

						// Domain
						case 2:
						{
							operation = { domain: null };
							
							let domain_index_left_creation = operation_block_creation.querySelector(`.${classes.domain_index_left_creation}`).querySelector('select');
							let domain_predicate_creation = operation_block_creation.querySelector(`.${classes.domain_predicate_creation}`).querySelector('select');
							let domain_index_right_creation = operation_block_creation.querySelector(`.${classes.domain_index_right_creation}`).querySelector('select');
							let domain_operator_creation_div = operation_block_creation.querySelector(`.${classes.domain_operator_creation}`);
							let domain_operator_creation = domain_operator_creation_div == null ? null : domain_operator_creation_div.querySelector('select');
							let domain_number_creation_div = operation_block_creation.querySelector(`.${classes.domain_number_creation}`);
							let domain_number_creation = domain_number_creation_div == null ? null : domain_number_creation_div.querySelector('select');

							// Left side of the operation should be set and operator should exists
							if (domain_index_left_creation.selectedIndex < 1 || domain_predicate_creation.selectedIndex < 1)
							{
								incomplete_constraint();
								return;
							}

							// Domain of type "#j = 2"
							if (domain_index_right_creation.selectedIndex < 2)
							{
								if (domain_number_creation == null || domain_number_creation.selectedIndex < 1)
								{
									incomplete_constraint();
									return;
								}
								operation.domain = 
								{ 
									number: 
									{ 
										index: domain_index_left_creation.options[domain_index_left_creation.selectedIndex].value,
										predicate: domain_predicate_creation.options[domain_predicate_creation.selectedIndex].value,
										number: domain_number_creation.options[domain_number_creation.selectedIndex].value
									}
								};
							}

							// Domain of type "#i < #j"
							else if (domain_operator_creation.selectedIndex < 2)
							{
								operation.domain = 
								{ 
									index: 
									{ 
										index_left: domain_index_left_creation.options[domain_index_left_creation.selectedIndex].value,
										predicate: domain_predicate_creation.options[domain_predicate_creation.selectedIndex].value,
										index_right: domain_index_right_creation.options[domain_index_right_creation.selectedIndex].value
									}
								};
							}

							// Domain of type "#j = #i + 1"
							else if (domain_operator_creation != null && domain_number_creation != null && domain_number_creation.selectedIndex > 0)
							{
								operation.domain = 
								{ 
									mixed: 
									{ 
										index_left: domain_index_left_creation.options[domain_index_left_creation.selectedIndex].value,
										predicate: domain_predicate_creation.options[domain_predicate_creation.selectedIndex].value,
										index_right: domain_index_right_creation.options[domain_index_right_creation.selectedIndex].value,
										operator: domain_operator_creation.options[domain_operator_creation.selectedIndex].value,
										number: domain_number_creation.options[domain_number_creation.selectedIndex].value
									}
								};
							}

							else
							{
								incomplete_constraint();
								return;
							}
						}
						break;
					
						// Member
						case 3:
						{
							operation = { member: { index: null, indexes: [] } };

							// Get index
							let member_index_creation = operation_block_creation.querySelector(`.${classes.member_set_creation} select`);
							if (member_index_creation.select_index == 0)
							{
								incomplete_constraint();
								return;
							}
							operation.member.index = member_index_creation.options[member_index_creation.selectedIndex].value;

							// Get indexes
							for (let index_input of operation_block_creation.querySelector(`.${classes.member_set_creation}`).getElementsByTagName('select'))
							{
								if (index_input.selectedIndex == 0)
								{
									incomplete_constraint();
									return;
								}
								operation.member.indexes.push(index_input.options[index_input.selectedIndex].value);
							}
						}
					}

					// Append operation to constraint
					constraint_AST.exists.operations.push(operation);
				}
			}
			break;

			// Equals
			case 2:
			{
				let equals_variable_creation = document.getElementById(ids.equals_variable_creation).querySelector('select');
				let equals_index_creation = document.getElementById(ids.equals_index_creation).querySelector('select');
				let equals_value_creation = document.getElementById(ids.equals_value_creation).querySelector('select');

				if 
				(
					equals_variable_creation.selectedIndex == 0 
					|| equals_index_creation.selectedIndex == 0 
					|| equals_value_creation.selectedIndex == 0
				)
				{
					incomplete_constraint();
					return;
				}

				constraint_AST = 
					{ 
						equals:
						{ 
							variable: equals_variable_creation.options[equals_variable_creation.selectedIndex].value, 
							index: equals_index_creation.options[equals_index_creation.selectedIndex].value, 
							value: equals_value_creation.options[equals_value_creation.selectedIndex].value 
						} 
					}
				;
			}
			break;
		}

		// Convert constraint to txt and mzn
		let txt_constraint = '';
		let mzn_constraint = 'constraint ';
		if (constraint_AST.hasOwnProperty('exists'))
		{
			// Append indexes
			let txt_indexes = [];
			let mzn_indexes = [];
			for (let index of constraint_AST.exists.indexes)
			{
				txt_indexes.push(`#${index}`);
				mzn_indexes.push(`${index} in individual_indexes`);
			}
			txt_constraint = `∃(${txt_indexes.join(', ')})`;
			mzn_constraint += `exists(${mzn_indexes.join(', ')})`;

			// Append operations
			let txt_operations = [];
			let mzn_operations = [];
			for (let operation of constraint_AST.exists.operations)
			{
				if (operation.hasOwnProperty('ground'))
				{
					const ground = operation.ground;
					txt_operations.push(`${ground.variable}#${ground.index} = ${ground.value}`);
					mzn_operations.push(`${ground.variable}[${ground.index}] = ${ground.value}`);
				}

				else if (operation.hasOwnProperty('domain'))
				{
					const domain = operation.domain;
					if (domain.hasOwnProperty('number'))
					{
						const number = domain.number;
						txt_operations.push(`#${number.index} ${number.predicate} ${number.number}`);
						mzn_operations.push(`${number.index} ${number.predicate} ${number.number}`);
					}
					else if (domain.hasOwnProperty('index'))
					{
						const index = domain.index;
						txt_operations.push(`#${index.index_left} ${index.predicate} #${index.index_right}`);
						mzn_operations.push(`${index.index_left} ${index.predicate} ${index.index_right}`);
					}
					else if (domain.hasOwnProperty('mixed'))
					{
						const mixed = domain.mixed;
						txt_operations.push(`#${mixed.index_left} ${mixed.predicate} #${mixed.index_right} ${mixed.operator} ${mixed.number}`);
						mzn_operations.push(`${mixed.index_left} ${mixed.predicate} ${mixed.index_right} ${mixed.operator} ${mixed.number}`);
					}
				}

				else if (operation.hasOwnProperty('member'))
				{
					let txt_indexes = [];
					let mzn_indexes = [];
					for (let index of operation.member.indexes)
					{
						txt_indexes.push(`#${index}`);
						mzn_indexes.push(`${index}`);
					}
					txt_operations.push(`${operation.member.index} ∈ {${txt_indexes.join(', ')}}`);
					mzn_operations.push(`member([${mzn_indexes.join(', ')}], ${operation.member.index})`);
				}
			}
			txt_constraint += `[${txt_operations.join(', ')}]`;
			mzn_constraint += `(${mzn_operations.join(' /\\ ')});`;
		}
		else if (constraint_AST.hasOwnProperty('equals'))
		{
			txt_constraint = `${constraint_AST.equals.variable}#${constraint_AST.equals.index} = ${constraint_AST.equals.value}`;
			mzn_constraint += `${constraint_AST.equals.variable}[${constraint_AST.equals.index}] = ${constraint_AST.equals.value};`;
		}

		// Append txt constraint to HTML
		let tr = document.createElement('tr');
		let remove_td = document.createElement('td');
		let remove_button = document.createElement('button');
		remove_button.classList.add('button');
		const constraint_index = mzn_constraints.length;
		remove_button.onclick = 
			() => 
			{ 
				// Remove table row
				tr.remove();

				// Remove constraint
				mzn_constraints.splice(constraint_index, 1);

				// Solve model
				solve();
			}
		let remove_span = document.createElement('span');
		remove_span.classList.add('icon', 'has-text-danger');
		let remove_i = document.createElement('i');
		remove_i.classList.add('fa-solid', 'fa-xmark');
		remove_i.ariaHidden = true;
		remove_span.appendChild(remove_i);
		remove_button.appendChild(remove_span);
		remove_td.appendChild(remove_button);
		let constraint_td = document.createElement('td');
		constraint_td.classList.add('constraint');
		constraint_td.innerText = txt_constraint;
		tr.appendChild(remove_td);
		tr.appendChild(constraint_td);
		txt_constraints_creation.append(tr);

		// Add new constraints to the store
		mzn_constraints.push(mzn_constraint);

		solve();
	}
;