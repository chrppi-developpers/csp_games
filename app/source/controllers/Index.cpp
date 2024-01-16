#include "Index.hh"

namespace fs = std::filesystem;

void Index::asyncHandleHttpRequest(const drogon::HttpRequestPtr & req, std::function<void(const drogon::HttpResponsePtr &)> && callback)
{
	drogon::MultiPartParser req_multi_part;
    req_multi_part.parse(req);
    const std::map<std::string,std::string> & req_parameter(req_multi_part.getParameters());

	drogon::HttpViewData data;
	drogon::HttpResponsePtr resp(nullptr);
	Json::Value json_response;

	LOG_INFO << "session @" << req->session()->sessionId() << ": " << req->getMethodString() << " " << req->getPath();

	// Index
	if (req->getPath() == config::url::root)
	{

	}

	// Response has not been set yet
	if (!resp)
	{
		// Return an update in Json format
		if (req_parameter.find(config::html::ajax_request) != req_parameter.end())
 			resp = drogon::HttpResponse::newHttpJsonResponse(json_response);

		// Return the view with data
		else
			resp = drogon::HttpResponse::newHttpViewResponse("index_view", data);
	}

	callback(resp);
}