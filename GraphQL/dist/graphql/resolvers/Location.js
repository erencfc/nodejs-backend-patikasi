"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.Location=void 0;var Location={event:function event(parent,__,_ref){var db=_ref.db;return db.events.find(function(event){return parent.id===event.location_id})}};exports.Location=Location;