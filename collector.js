/**
 * Copyright 2014 Nicholas Humfrey
 * Copyright 2013 IBM Corp.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/

var deepExtend = require('deep-extend');
var isSubset = require('is-subset');

module.exports = function(RED) {
    "use strict";

    function CollectorNode(n) {
        RED.nodes.createNode(this,n);
        this.name = n.name;
        this.onlyIfChanged = n.onlyIfChanged;
        this.mode = n.mode;
        this.values = {};

        var node = this;
        node.on("input", function(msg) {
            try {
                if (msg.topic) {
                    var value = undefined;
                    if (msg.payload != null && msg.payload != '') {
                        value = msg.payload;
                    }
                    if (!node.onlyIfChanged
                    || !isSubset([node.values[msg.topic]],[value])) {
                        if (value == undefined) {
                            delete node.values[msg.topic];
                        } else if (node.mode === 'merge'
                        && node.values.hasOwnProperty(msg.topic)) {
                            var m = {"val": node.values[msg.topic]};
                            deepExtend(m, {"val": value});
                            node.values[msg.topic] = m.val;
                        } else {
                            node.values[msg.topic] = value;
                        }
                        msg.payload = node.values;
                        node.send(msg);
                    }
                } else {
                    node.warn("No msg.topic set on message to collector");
                }
            } catch(err) {
                node.error(err.message);
            }
        });
    }

    RED.nodes.registerType("collector",CollectorNode);
}
