#pragma once

#include <string>

// Set constants used in code
namespace config
{
	// Drogon parameters used in main
	namespace main
	{
		const std::string ip("0.0.0.0");
		const std::string document_root("document_root");
		const int session_timeout(3600);
		const size_t threads(5);
	}

	// Path of URLs
	namespace url
	{
		const std::string root("/");
	}

	// Strings used in HTML
	namespace html
	{
		// Ajax request
		const std::string ajax_request("ajax_request");

		// Movie puzzle
		const std::string puzzle_movie("puzzle_movie");
		const std::string div_movie("div_movie");
		const std::string table_movie_film("table_movie_film");
		const std::string table_movie_day("table_movie_day");
		const std::string table_movie_time("table_movie_time");
		const std::string clear_table_movie("clear_table_movie");
		const std::string solution_movie("solution_movie");

		// Computer puzzle
		const std::string puzzle_computer("puzzle_computer");
		const std::string div_computer("div_computer");
		const std::string table_computer_processor("table_computer_processor");
		const std::string table_computer_hard_disk("table_computer_hard_disk");
		const std::string table_computer_price("table_computer_price");
		const std::string clear_table_computer("clear_table_computer");
		const std::string solution_computer("solution_computer");
 
		// Pasta puzzle
		const std::string puzzle_pasta("puzzle_pasta");
		const std::string div_pasta("div_pasta");
		const std::string table_pasta("table_pasta");
		const std::string clear_table_pasta("clear_table_pasta");
		const std::string solution_pasta("solution_pasta");

		// Creation puzzle
		const std::string puzzle_creation("puzzle_creation");
		const std::string div_creation("div_creation");
		const std::string div_values_creation("div_values_creation");
		const std::string div_constraints_creation("div_constraints_creation");
		const std::string name_1_creation("name_1_creation");
		const std::string name_2_creation("name_2_creation");
		const std::string name_3_creation("name_3_creation");
		const std::string place_1_creation("place_1_creation");
		const std::string place_2_creation("place_2_creation");
		const std::string place_3_creation("place_3_creation");
		const std::string object_1_creation("object_1_creation");
		const std::string object_2_creation("object_2_creation");
		const std::string object_3_creation("object_3_creation");
		const std::string values_error_creation("values_error_creation");
		const std::string values_error_message_creation("values_error_message_creation");
		const std::string add_constraint_creation("add_constraint_creation");
		const std::string constraint_content_creation("constraint_content_creation");
		const std::string type_block_creation("type_block_creation");
		const std::string type_select_creation("type_select_creation");
		const std::string type_content_creation("type_content_creation");
		const std::string constraint_error_creation("constraint_error_creation");
		const std::string constraint_error_message_creation("constraint_error_message_creation");
		const std::string txt_constraints_creation("txt_constraints_creation");
		const std::string solutions_number_creation("solutions_number_creation");
		const std::string constraints_solutions_creation("constraints_solutions_creation");
		const std::string pagination_creation("pagination_creation");
	}
};