"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.Query=void 0;var Query={// Event
events:function events(_,__,_ref){var db=_ref.db;return db.events},event:function event(_,args,_ref2){var db=_ref2.db;return db.events.find(function(event){return event.id==args.id})},// Location
locations:function locations(_,__,_ref3){var db=_ref3.db;return db.locations},location:function location(_,args,_ref4){var db=_ref4.db;return db.locations.find(function(location){return location.id==args.id})},// User
users:function users(_,__,_ref5){var db=_ref5.db;return db.users},user:function user(_,args,_ref6){var db=_ref6.db;return db.users.find(function(user){return user.id==args.id})},// Participant
participants:function participants(_,__,_ref7){var db=_ref7.db;return db.participants},participant:function participant(_,args,_ref8){var db=_ref8.db;return db.participants.find(function(participant){return participant.id==args.id})}};exports.Query=Query;