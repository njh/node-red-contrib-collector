node-red-contrib-collector
==========================

A [Node-RED] node that collects topic/payload pairs and outputs all values as an object,
for every message received. This can be useful if you want to perform a condition or calculation on more than one message value at once.

It can also be used to only pass a message through if the value has changed since last time the message was received.


Install
-------

Run the following command in the root directory of your Node-RED install

    npm install node-red-contrib-collector


Usage
-----

The node collects message payloads and stores them against topic names. Upon recieving a message it will output all previously received **msg.topic**/**msg.payload** pairs as an object.

If "**Only return message if value changed?**" is set, then a message will only be output, if the payload has changed since the last message with the same topic was received.

If if a message is received with a **msg.topic** but no **msg.payload**, then that topic will be deleted from the collector.


Example
-------

Illustrating what this node does may be easier with this example flow:
![screenshot](https://github.com/njh/node-red-contrib-collector/raw/master/screenshot.png)

After pressing the *a*, *b* and *c* inject buttons, the following XML is output in the debug tab:

```xml
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<root>
  <a>Value A</a>
  <b>Value B</b>
  <c>Value C</c>
</root>
```

Pressing the *no b* button causes the ```<b>Value B</b>``` element to be removed again.

The flow can be downloaded from the Node-Red Flow Library here:
http://flows.nodered.org/flow/bce112d484f93a8c282a


[Node-RED]:  http://nodered.org/
