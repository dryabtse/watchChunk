// This is script will tail both the actionlog and changelog collections
// Consider using it when the size of these collections is to small for 
// the balancing activity that you need to monitor
//
// The script can be run as:
//
// mongo --host MONGOS_HOST --port MONGOS_PORT -u admin -p 123 admin watchChunks.js | gzip > /tmp/actionChangelgoWatcher.log.gz
//
var watchCursorChangelog = db.getSiblingDB("config").changelog.watch();
var watchCursorActionlog = db.getSiblingDB("config").actionlog.watch();

while (!watchCursorChangelog.isExhausted() && !watchCursorActionlog.isExhausted()) {

    if (watchCursorChangelog.hasNext()){
        var change = watchCursorChangelog.next();
        printjson(change);
    };

    if (watchCursorActionlog.hasNext()){
        var change = watchCursorActionlog.next();
        printjson(change);
    };
};

watchCursorChangelog.close();
watchCursorActionlog.close();
