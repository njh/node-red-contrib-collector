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

module.exports = function(RED) {
    "use strict";

    function CollectorNode(n) {
        RED.nodes.createNode(this,n);
        this.name = n.name;
        this.state = {};

        var node = this;
        node.on("input", function(msg) {
            try {
                if (msg.topic) {
                    if (msg.payload == undefined || msg.payload == null || msg.payload == '') {
                        delete node.state[msg.topic];
                    } else {
                        node.state[msg.topic] = msg.payload;
                        node.send(node.state);
                    }
                } else {
                    node.warn("No topic set on message to collector");
                }
            } catch(err) {
                node.error(err.message);
            }
        });
    }

    RED.nodes.registerType("collector",CollectorNode);
}
