/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

function initPushwoosh() {
	
	var pushNotification = window.plugins.pushNotification;
	
	//set push notification callback before we initialize the plugin
	document.addEventListener('push-notification', function(event) {
								//get the notification payload
								var notification = event.notification;

								//display alert to the user for example
								alert(notification.aps.alert);
							  
								//clear the app badge
								pushNotification.setApplicationIconBadgeNumber(0);
							});

	
    //initialize the plugin
    pushNotification.onDeviceReady({pw_appid:"539E9-AB8AE"});

    //register for pushes
	pushNotification.registerDevice(function(status) {
                                        var deviceToken = status['deviceToken'];
                                        console.warn('registerDevice: ' + deviceToken);
									},
									function(status) {
                                        console.warn('failed to register : ' + JSON.stringify(status));
                                        navigator.notification.alert(JSON.stringify(['failed to register ', status]));
									});
    
	pushNotification.setApplicationIconBadgeNumber(0);
    
	pushNotification.getTags(function(tags) {
								console.warn('tags for the device: ' + JSON.stringify(tags));
							 },
							 function(error) {
								console.warn('get tags error: ' + JSON.stringify(error));
							 });

	pushNotification.getPushToken(function(token) {
								  console.warn('push token device: ' + token);
							 });

	pushNotification.getPushwooshHWID(function(token) {
									console.warn('Pushwoosh HWID: ' + token);
								});

	//start geo tracking.
    pushNotification.startLocationTracking(function() {
                                           console.warn('Location Tracking Started');
                                           });
}

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        initPushwoosh();
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};
