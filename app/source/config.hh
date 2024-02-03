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
		const std::string creation_name_1("creation_name_1");
		const std::string creation_name_2("creation_name_2");
		const std::string creation_name_3("creation_name_3");
		const std::string creation_object_1("creation_object_1");
		const std::string creation_object_2("creation_object_2");
		const std::string creation_object_3("creation_object_3");
		const std::string creation_location_1("creation_location_1");
		const std::string creation_location_2("creation_location_2");
		const std::string creation_location_3("creation_location_3");
	}
};