
/*
Use :
pageview :  trackerservice.sendupcall("name_of_view",false,"","");
event  : trackerservice.sendupcall("name_of_view",true,"name_of_event_action","name_of_event_category");
Read more here : Google analytics: https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters
*/

(function(){
    'use strict';
    angular.module('myApp.core')
    .service('trackerservice',['$http',trackerservice]);

        function trackerservice($http){
            /*  appglobals could be provided as a factory as well, supply these parameters however you wish */
            var appglobals = {
                ga_root : "http://www.google-analytics.com/collect?v=1",
                clientid : "1",
                ua : "UA-XXXXXXXX-X",
                appname : "myapp",
                av : "1.0"
            };

            /*
            * isevent set to true to send up google event , set to false  to send up google pageview
            * Read more here : Google analytics: https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters
            */
            var buildpageviewurl =  function(view,isevent,eventaction,eventcategory){
                var cid =  getClientId();
                var url = appglobals.ga_root + "&z="+ getRandomInt(1,1000000);
                url = url + "&cid=" + cid;
                url = url + "&tid=" + appglobals.ua; 
                url = url + "&dp=" + view;   
                url = url + "&dt=" + view; 
                url = url + "&cd=" + view; 
                url = url + "&an=" + appglobals.appname;
                url = url + "&av=" + appglobals.av;
               
                if(isevent){
                    url = url + "&ec=" + eventcategory;
                    url = url + "&ea=" + eventaction;
                    url = url + "&t=event";             
                }
                else{
                    url = url + "&t=pageview";
                }
                return url;
            };

            var sendupcall = function(view,isevent,eventaction,eventcategory){
                try{
                    var _url = buildpageviewurl(view,isevent,eventaction,eventcategory);
                    $http.get(_url)
                    .success(function(data,status){
                        console.log("GA call completed ...");
                    })
                    .error(function(data){
                        console.log("GA call failed ...");
                    });
                }
                catch(err){
                    console.log(err);
                }
            };

            function gen4Set(){
                return (((1+Math.random())*0x10000)|0).toString(16).substring(1);                         //0x10000 hex version of 65536
            }

            function generateGUID(){
                var GUID = (gen4Set()  + gen4Set() + "-" + gen4Set() + "-4"  + gen4Set().substr(0,3) + "-" + gen4Set() + "-" + gen4Set()  + gen4Set() + gen4Set()).toLowerCase();
                return GUID;
            }
            function generateDate(){
                var currentTime = Date.now() || +new Date();                                            //use Date.now()  so we don't create an unecessary date object.
                return currentTime;
            }

            function generateClientId(){
                var clientId = generateDate() +"-"+ generateGUID();                                     //Piece together our unique id for this device
                if(clientId){
                    window.localStorage.setItem('cid',clientId);
                }
                return clientId;
            }

            function getClientId(){
                var cid = "1F";
                try{
                    cid = window.localStorage.getItem('cid');
                    if(cid !== null){
                        return cid;
                    }
                    cid = generateClientId();
                }
                catch(err){
                    console.log(err);
                }
                return cid; 
            }
            

            function getRandomInt(min, max) {
              return Math.floor(Math.random() * (max - min + 1)) + min;
            }

            return {
                sendupcall : sendupcall
            };
        }

})();