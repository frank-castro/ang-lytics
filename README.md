<p>
	Custom angular service to send up google analytics pageview or events.
	Works on web , mobile web  and cordova .
</p>

<pre>
	pageview : trackerservice.sendupcall("name_of_view",false,"","");
</pre>

<pre>
	event  : trackerservice.sendupcall("name_of_view",true,"name_of_event_action","name_of_event_category");
</pre>


Read more here : Google analytics: https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters