//



function hasOgMeta() {
	var m = document.getElementsByTagName('meta');
	for(var i = 0; i < m.length; i++) {
		var prop = m[i].getAttribute('property');
		if (!prop) continue;
		if (prop.search('og:') == 0) return true;
	}
	return false;
}

function getOgMetaAsArray() {
	var arr = new Array();
	var m = document.getElementsByTagName('meta');
	for(var i = 0; i < m.length; i++) {
		var prop = m[i].getAttribute('property');
		if (!prop) continue;
		if (prop.search('og:') == 0) {
			var o = new Object();
			o.property	= prop;
			o.content	= m[i].getAttribute('content');
			arr.push(o);
		}
	}
	return arr;
}

function main() {
	if (hasOgMeta()) {

		chrome.extension.onRequest.addListener(
			function(request, sender, sendResponse) {
				if (request.method == 'getOgMetaAsArray')
					sendResponse({result: JSON.stringify(getOgMetaAsArray())});
				else
					sendResponse({});
				}
			)

		chrome.extension.sendRequest(
			{method: "showPageAction"},
			function(response) {}
		);
	
	}
}

main();
