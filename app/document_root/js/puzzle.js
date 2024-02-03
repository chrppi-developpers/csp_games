export class Attribute
{
	constructor(name, show_values, model_values)
	{
		this.name = name;
		this.show_values = show_values;
		this.model_values = model_values;
	}
}

export class Puzzle 
{
	constructor(model_file, individual_name, individuals, attributes) 
	{
		this.model_file = model_file;
		this.individual_name = individual_name;
		this.individuals = individuals;
		this.attributes = attributes;

		// Row: attribute
		// Column: individual
		// Value: attribute index from 1 to attributes (0 is empty value)
		this.data = [...Array(individuals)].map(_ => Array(attributes.length).fill(0));
		this.data_string = JSON.stringify(this.data);
	}
}