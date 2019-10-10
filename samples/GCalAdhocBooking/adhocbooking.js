var {google} = require('googleapis');
var key = require ('./panl-254907-4630d5f9b82b.json'); // private json
var scopes = ['https://www.googleapis.com/auth/calendar'];


console.log("Calendar Service connected");
console.log(`Client ID : ${key.client_email}`);
  const CALENDAR_ID = 'srini@mrbstest2016.com';
var jwtClient = new google.auth.JWT(
  key.client_email, 
  null, 
  key.private_key, 
  scopes,
  CALENDAR_ID
);

 jwtClient.authorize(function(err, token) {
    if(err) { 
      console.log(err);
    }else{
      let startTime = new Date("2019-10-09T07:00:00+08:00");
      console.log(`Authorization successfull + ${startTime}`);
      const calendar = google.calendar({version : "v3", auth : jwtClient});
      var event = {
        'summary': 'PRM Room Booking',
        'description': 'Testing the Room booking system.',
        'start': {
          'dateTime': '2019-10-09T18:35:00+08:00',
          'timeZone': 'Singapore',
        },
        'end': {
          'dateTime': '2019-10-09T18:40:00+08:00',
          'timeZone': 'Singapore',
        }
      };
      calendar.events.insert({
        calendarId: CALENDAR_ID,
        resource: event,
      },(err, res) =>{
        if(!err){
          const events = res.data.items;
          const start = event.start.dateTime || event.start.date;
          console.log(`${start} - ${event.summary}`);
        }
        else{
          console.log(err);          
        }
      });
      calendar.events.list({
        calendarId: CALENDAR_ID,
        timeMin: (new Date()).toISOString(),
        maxResults: 10,
        singleEvents: true,
        orderBy: 'startTime',
      }, function (err, res) {
        if (err) return console.log('The API returned an error: ' + err);
          const events = res.data.items;
          if (events.length) {
              console.log('Upcoming 10 events:');
              events.map((event, i) => {
                const start = event.start.dateTime || event.start.date;
                console.log(`${start} - ${event.summary}`);
              });
          } else {
            console.log('No upcoming events found.');
          }
      });
      
    }
   });