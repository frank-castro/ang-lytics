(function(){
    'use strict';

    /**
    *
    *Root module
    */
    angular.module('ang.core.module',[]);                       

    /**
    *
    *Service to set u meta data to attach to analytics post data
    */
    angular.module('ang.core.module').service('metaSVC',metaservice);

    function metaservice(){
        var _client_id =  null;
        
        /**
        *
        *Generate GUID 
        */
         this.getClientId = function(){
            try{
                if(!!_client_id){                                                                      //check for null or undefined
                    return _client_id;
                }
                _client_id = generateClientId();
            }
            catch(err){ console.log(err); }
            return _client_id; 
        }

        /**
        *
        *Generate GUID 
        */
        function generateClientId(){
            _client_id = generateDate() +"-"+ generateGUID();                                     //Piece together our unique id for this device
            return _client_id;
        }

        /**
        *
        *Generate GUID 
        */
        function generateGUID(){
            var GUID = (gen4Set()  + gen4Set() + "-" + gen4Set() + "-4"  + gen4Set().substr(0,3) + "-" + gen4Set() + "-" + gen4Set()  + gen4Set() + gen4Set()).toLowerCase();
            return GUID;
        }

        /**
        *
        *Generate GUID 
        */
        function gen4Set(){
            return (((1+Math.random())*0x10000)|0).toString(16).substring(1);                       //0x10000 hex version of 65536
        }

        /**
        *
        *Generate GUID 
        */
        function generateDate(){
            var currentTime = Date.now() || +new Date();                                            //use Date.now()  so we don't create an unecessary date object.
            return currentTime;
        }

        /**
        *
        *Generate a random integer 
        */
        this.getRandomInt = function(min, max) {
          return Math.floor(Math.random() * (max - min + 1)) + min;
        }
    }

    /*
    Use :
    pageview :  trackerSvc.sendupcall("name_of_view",false,"","");
    event  : trackerSvc.sendupcall("name_of_view",true,"name_of_event_action","name_of_event_category");
    Read more here : Google analytics: https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters
    */

    angular.module('ang.core.module')
    .service('trackerSvc',['$http','metaSVC',trackerSvc]);

    function trackerSvc($http,metaSVC){
        
        /**********************************************************************************************
        *
        * Be sure to chagne the data below to appropriate data from Google Analytics Dashboard
        * appglobals could be provided as a factory as well, supply these parameters however you wish
        * 
        ********************************************************************************************* */
        var appglobals = {
            ga_root : "http://www.google-analytics.com/collect?v=1",
            clientid : "1",
            ua : "UA-XXXXXXXX-X",
            appname : "myapp",
            av : "1.0"
        };

        
        /**
        *
        *@param view (page) you wish to send up in post data
        *@param flag t determine whether this regular page view or user event
        *@param event action to attach to post
        *@param event category to attach to post
        */
        this.sendupcall = function(view,isevent,eventaction,eventcategory){
            try{
                var _url = buildpageviewurl(view,isevent,eventaction,eventcategory);
                $http.post(_url)
                .success(function(data,status){
                    console.log("GA call completed ...");
                })
                .error(function(data){
                    console.log("GA call failed ...");
                });
            }
            catch(err){ console.log(err); }
        };

        /*
        * isevent set to true to send up google event , set to false  to send up google pageview
        * Read more here : Google analytics: https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters
        */
        function buildpageviewurl(view,isevent,eventaction,eventcategory){
            var cid =  metaSVC.getClientId();
            var url = appglobals.ga_root + "&z="+ metaSVC.getRandomInt(1,1000000);
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
        }
    }

})();