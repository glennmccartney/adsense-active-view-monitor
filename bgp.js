chrome.webRequest.onBeforeRequest.addListener(function(details) 
{			
	if((details.url.indexOf("activeview?") > -1)&&(details.type=="image"))
  	{
	  	var CurrentURL;
	  	chrome.tabs.query({
			active: true,
			lastFocusedWindow: true
		}, function(tabs) 
			{
				var slotID 
			
				if (details.url.indexOf("slotname%3D") > -1)
				{
					slotID = details.url.substr(details.url.indexOf("slotname%3D") + 11,10); 
				}
				else
				{
					slotID="N/A";
				}	
				var tab = tabs[0];
				
				//If the current URL can be found
				if (tab)
				{
					CurrentURL=tab.url;
					var opt = {
					  type: "basic",
					  title: "Active View Has Triggered",
					  message: "Active View Has Triggered for Slot ID : " + slotID + " (" + CurrentURL+ ")",
					  iconUrl: "icon.png"
					}	
					chrome.notifications.create(String(getRandomInt(0,9999)), opt, function(id) 
					{
					   if(chrome.runtime.lastError) {
						 console.error(chrome.runtime.lastError.message);
					   }
					});
				}
				else
				{
					var opt = {
					  type: "basic",
					  title: "Active View Has Triggered",
					  message: "Active View Has Triggered for Slot ID : " + slotID,
					  iconUrl: "icon.png"
					}
					chrome.notifications.create(String(getRandomInt(0,9999)), opt, function(id) 
					{
					   if(chrome.runtime.lastError) 
					   {
						 console.error(chrome.runtime.lastError.message);
					   }
					});
				}
			});
		}
		return {cancel: false};
	},{urls: ["<all_urls>"]
});
						
function getRandomInt(min, max) 
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}