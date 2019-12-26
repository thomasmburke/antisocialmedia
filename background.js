'use strict';

chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({color: '#3aa757'}, function() {
    console.log('The color is green.');
  });
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {
          urlMatches: '.*facebook\.com',
          schemes: ['http', 'https']
        }
      })],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});

function informUser(){
  console.log('Your time is up!')
}

let chrome_notification_create = function () {
  informUser();
  chrome.notifications.create(
    'timerNotification',
    {
      type: 'basic',
      iconUrl: chrome.runtime.getURL("images/antisocialmedia128.png"),
      title: "Time's Up!",
      message: "Time to stop F***ing off and get back to work!",
      priority: 1,
      buttons: [{
        title: 'call'
      }, {
        title: 'send mail'
      }],
      isClickable: true
    },
    function () {
      console.log(chrome.runtime.lastError);
    }
  );}

chrome.webNavigation.onCompleted.addListener(function (details) {
  console.log("Certain url with hostSuffix facebook.com has been loaded");
  setTimeout(chrome_notification_create, 20000);
}, { url: [{ hostSuffix: 'facebook.com' }] });
