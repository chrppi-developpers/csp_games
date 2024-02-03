#include "Index.hh"

void Index::asyncHandleHttpRequest(const drogon::HttpRequestPtr & req, std::function<void(const drogon::HttpResponsePtr &)> && callback)
{
	LOG_INFO << "session @" << req->session()->sessionId() << ": " << req->getMethodString() << " " << req->getPath();
	callback(drogon::HttpResponse::newHttpViewResponse("index_view"));
}