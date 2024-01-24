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
		const std::string upload_path("uploads");
		const int session_timeout(3600);
		const size_t threads(5);
	}

	// Path of URLs
	namespace url
	{
		const std::string root("/");
	}

	// Path of files
	namespace file
	{

	}

	// Strings used in HTML
	namespace html
	{
		// Ajax request
		const std::string ajax_request("ajax_request");

		//id tabs 
		const std::string tabs_movie_buffs("tabs_movie_buffs");
		const std::string tabs_new_computer("tabs_new_computer");
		const std::string tabs_pasta_wine("tabs_pasta_wine");
		const std::string tabs_creation_puzzle("tabs_creation_puzzle");

		//id div containing all the code of each puzzle
		const std::string div_movie_buffs("div_movie_buffs");
		const std::string div_new_computer("div_new_computer");
		const std::string div_pasta_wine("div_pasta_wine");
		const std::string div_creation_puzzle("div_creation_puzzle");

		//id table
		//movie
		const std::string id_table_movie("id_table_movie");
		const std::string id_clear_table_movie("id_clear_table_movie");
		const std::string id_check_table_movie("id_check_table_movie");
		//computer
		const std::string id_table_computer("id_table_computer");
		const std::string id_clear_table_computer("id_clear_table_computer");
		const std::string id_check_table_computer("id_check_table_computer");

		//id check solution
		//movie
		const std::string id_solution_div_movie("id_solution_div_movie");
		const std::string id_solution_notification_movie("id_solution_notification_movie");
		//computer
		const std::string id_solution_div_computer("id_solution_div_computer");
		const std::string id_solution_notification_computer("id_solution_notification_computer");
		//Pasta
		const std::string id_solution_div_pasta("id_solution_div_pasta");
		const std::string id_solution_notification_pasta("id_solution_notification_pasta");

		const std::string id_table_pasta("id_table_pasta");

		const std::string id_clear_table_pasta("id_clear_table_pasta");
		const std::string id_check_table_pasta("id_check_table_pasta");

		//creation puzzle
		const std::string id_creation_name_1("id_creation_name_1");
		const std::string id_creation_name_2("id_creation_name_2");
		const std::string id_creation_name_3("id_creation_name_3");

		const std::string id_creation_object_1("id_creation_object_1");
		const std::string id_creation_object_2("id_creation_object_2");
		const std::string id_creation_object_3("id_creation_object_3");

		const std::string id_creation_location_1("id_creation_location_1");
		const std::string id_creation_location_2("id_creation_location_2");
		const std::string id_creation_location_3("id_creation_location_3");
		
		

		const std::string id_check_csp("id_check_csp");
		
	}
};
