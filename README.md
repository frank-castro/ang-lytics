<p>
	Custom angular service to send up google analytics pageview or events.
	Works on web , mobile web  and cordova .
</p>

<pre>
	pageview : trackerSvc.sendupcall("name_of_view",false,"","");
</pre>

<pre>
	event  : trackerSvc.sendupcall("name_of_view",true,"name_of_event_action","name_of_event_category");
</pre>

Be sure to place your Google info in appglobals object located in 'ang-lytics-core.js' :

<pre>
	var appglobals = {
	    ga_root : "http://www.google-analytics.com/collect?v=1",
	    clientid : "1",
	    ua : "UA-XXXXXXXX-X", 
	    appname : "myapp",
	    av : "1.0"
	};
</pre>


Note* do not used minifed version, it contains dummy data. Once you make the appropriate changes in 'ang-lytics-core.js' you can use grunt
or some workflow of your choosing to minify the file.

Read more here : Google analytics: https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters