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
	}
};