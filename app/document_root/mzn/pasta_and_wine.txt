include "globals.mzn";

% Based on https://www.ahapuzzles.com/logic/zebra/pasta-and-wine

% Static data
int: people = 5;
set of int: people_indexes = 1..people;
enum shirt_values = {blue, green, red, white, yellow};
enum name_values = {Andrea, Holly, Julie, Leslie, Victoria};
enum surname_values = {Brown, Davis, Lopes, Miller, Wilson};
enum pasta_values = {farfalle, lasagne, penne, spaghetti, ravioli};
enum wine_values = {Australian, Argentine, Chilean, French, Italian};
enum age_values = {y_30, y_35, y_40, y_45, y_50};

% Decision variables
array[people_indexes] of var shirt_values: shirt_people;
array[people_indexes] of var name_values: name_people;
array[people_indexes] of var surname_values: surname_people;
array[people_indexes] of var pasta_values: pasta_people;
array[people_indexes] of var wine_values: wine_people;
array[people_indexes] of var age_values: age_people;
var pasta_values: holly_pasta;

% Each one enjoys different kinds of pasta and wines from different countries.
constraint alldifferent(shirt_people);
constraint alldifferent(name_people);
constraint alldifferent(surname_people);
constraint alldifferent(pasta_people);
constraint alldifferent(wine_people);
constraint alldifferent(age_people);

predicate next_to(people_indexes: person_index_1, people_indexes: person_index_2) =
	member([person_index_2 - 1, person_index_2 + 1], person_index_1)
;

predicate between(people_indexes: person_index_1, people_indexes: person_index_2, people_indexes: person_index_3) =
	strictly_increasing([person_index_2, person_index_1, person_index_3])
;

predicate exactly_right_of(people_indexes: person_index_1, people_indexes: person_index_2) =
	person_index_1 = person_index_2 + 1
;

predicate right_of(people_indexes: person_index_1, people_indexes: person_index_2) =
	person_index_1 > person_index_2
;

predicate exactly_left_of(people_indexes: person_index_1, people_indexes: person_index_2) =
	person_index_1 = person_index_2 - 1
;

predicate left_of(people_indexes: person_index_1, people_indexes: person_index_2) =
	person_index_1 < person_index_2
;

% Figure out which pasta Holly likes the most.
constraint exists(person_index_1 in people_indexes)
(
  name_people[person_index_1] = Holly
	/\ pasta_people[person_index_1] = holly_pasta
);

% The woman wearing the White shirt is next to the woman who likes Lombardian wines.
constraint exists(person_index_1 in people_indexes, person_index_2 in people_indexes)
(
	shirt_people[person_index_1] = white
	/\ wine_people[person_index_2] = Italian
	/\ next_to(person_index_1, person_index_2)
);

% Ms Miller is somewhere between Ms Davis and Ms Brown, in that order.
constraint exists(person_index_1 in people_indexes, person_index_2 in people_indexes, person_index_3 in people_indexes)
(
	surname_people[person_index_1] = Miller
	/\ surname_people[person_index_2] = Davis
	/\ surname_people[person_index_3] = Brown
	/\ between(person_index_1, person_index_2, person_index_3)
);

% The youngest woman is at the third position.
constraint age_people[3] = y_30;

% The 45-year-old woman is somewhere to the right of the woman wearing the Red shirt.
constraint exists(person_index_1 in people_indexes, person_index_2 in people_indexes)
(
	age_people[person_index_1] = y_45
	/\ shirt_people[person_index_2] = red
	/\ right_of(person_index_1, person_index_2)
);

% The woman who likes Chilean wines also likes Farfalle.
constraint exists(person_index_1 in people_indexes)
(
	wine_people[person_index_1] = Chilean
	/\ pasta_people[person_index_1] = farfalle
);

% At the first position is the woman that likes Argentine wines.
constraint wine_people[1] = Argentine;

% Andrea is exactly to the right of the 35-year-old woman.
constraint exists(person_index_1 in people_indexes, person_index_2 in people_indexes)
(
	name_people[person_index_1] = Andrea
	/\ age_people[person_index_2] = y_35
	/\ exactly_right_of(person_index_1, person_index_2)
);

% The woman wearing the Blue shirt is somewhere between Ms Davis and Holly, in that order.
constraint exists(person_index_1 in people_indexes, person_index_2 in people_indexes, person_index_3 in people_indexes)
(
	shirt_people[person_index_1] = blue
	/\ surname_people[person_index_2] = Davis
	/\ name_people[person_index_3] = Holly
	/\ between(person_index_1, person_index_2, person_index_3)
);

% Victoria is next to Leslie.
constraint exists(person_index_1 in people_indexes, person_index_2 in people_indexes)
(
	name_people[person_index_1] = Victoria
	/\ name_people[person_index_2] = Leslie
	/\ next_to(person_index_1, person_index_2)
);

% The woman wearing the Red shirt is somewhere to the left of the woman who likes Australian wines.
constraint exists(person_index_1 in people_indexes, person_index_2 in people_indexes)
(
	shirt_people[person_index_1] = red
	/\ wine_people[person_index_2] = Australian
	/\ left_of(person_index_1, person_index_2)
);

% Ms Wilson is next to the 30-year-old woman.
constraint exists(person_index_1 in people_indexes, person_index_2 in people_indexes)
(
	surname_people[person_index_1] = Wilson
	/\ age_people[person_index_2] = y_30
	/\ next_to(person_index_1, person_index_2)
);

% Leslie is exactly to the left of the 30-year-old woman.
constraint exists(person_index_1 in people_indexes, person_index_2 in people_indexes)
(
	name_people[person_index_1] = Leslie
	/\ age_people[person_index_2] = y_30
	/\ exactly_left_of(person_index_1, person_index_2)
);

% Holly is somewhere to the right of the woman wearing the Red shirt.
constraint exists(person_index_1 in people_indexes, person_index_2 in people_indexes)
(
	name_people[person_index_1] = Holly
	/\ shirt_people[person_index_2] = red
	/\ right_of(person_index_1, person_index_2)
);

% Ms Brown is exactly to the left of Julie.
constraint exists(person_index_1 in people_indexes, person_index_2 in people_indexes)
(
	surname_people[person_index_1] = Brown
	/\ name_people[person_index_2] = Julie
	/\ exactly_left_of(person_index_1, person_index_2)
);

% The youngest woman likes Penne.
constraint exists(person_index_1 in people_indexes)
(
	age_people[person_index_1] = y_30
	/\ pasta_people[person_index_1] = penne
);

% Ms Wilson is wearing the White shirt.
constraint exists(person_index_1 in people_indexes)
(
	surname_people[person_index_1] = Wilson
	/\ shirt_people[person_index_1] = white
);

% The woman who likes Lasagne is somewhere between the woman who likes Italian wines and the woman who likes Spaghetti, in that order.
constraint exists(person_index_1 in people_indexes, person_index_2 in people_indexes, person_index_3 in people_indexes)
(
	pasta_people[person_index_1] = lasagne
	/\ wine_people[person_index_2] = Italian
	/\ pasta_people[person_index_3] = spaghetti
	/\ between(person_index_1, person_index_2, person_index_3)
);

% At the second position is the woman wearing the Blue shirt.
constraint shirt_people[2] = blue;

% The 40-year-old woman likes Lasagne.
constraint exists(person_index_1 in people_indexes)
(
	age_people[person_index_1] = y_40
	/\ pasta_people[person_index_1] = lasagne
);

% Ms Lopes is at the fifth position.
constraint surname_people[5] = Lopes;

% The woman that likes Australian wines is somewhere between Victoria and the woman who likes wines from Bordeaux, in that order.
constraint exists(person_index_1 in people_indexes, person_index_2 in people_indexes, person_index_3 in people_indexes)
(
	wine_people[person_index_1] = Australian
	/\ name_people[person_index_2] = Victoria
	/\ wine_people[person_index_3] = French
	/\ between(person_index_1, person_index_2, person_index_3)
);

% The woman wearing the Yellow shirt is exactly to the left of the 35-year-old woman.
constraint exists(person_index_1 in people_indexes, person_index_2 in people_indexes)
(
	shirt_people[person_index_1] = yellow
	/\ age_people[person_index_2] = y_35
	/\ exactly_left_of(person_index_1, person_index_2)
);

output 
[
	"shirt: \(shirt_people[i]), name: \(name_people[i]), surname: \(surname_people[i]), pasta: \(pasta_people[i])"
	++ ", wine: \(wine_people[i]), age: \(age_people[i])\n" | i in people_indexes
];
output ["holly_pasta: PC \(holly_pasta)\n"];