const express = require('express');
const devices = require('./devices');
const { exec } = require('child_process');

const app = express();
/*
var Switchmate3Device = require('node-switchmate3').Switchmate3Device;
Switchmate3Device.discoverById("0d58df5525764e0a97e65acb62286257", function onFound(Switchmate3) {
    Switchmate3Device.stopDiscoverAll(onFound);

    Switchmate3._updateToggleState(Switchmate3);
    
    Switchmate.disconnect();
});
*/

app.get('/:device/:status', (req, res) => {
    var device = devices.find(item => item.name == req.params.device);
    if (!device) {
        return res.send('Device not found: ' + req.params.device)
    }
    if (req.params.status == "status") {
        var SwitchmateDevice = require('../index').SwitchmateDevice;

    }
    var cmd = `node node_modules/node-switchmate3/bin/toggle.switchmate3 ${device.id} ${req.params.status}`;
    exec(cmd, (err, stdout, stderr) => {
        if (err) return res.send(err);
        console.log(`${stdout}`);
        console.log(`${stderr}`);
        res.send("OK: " + cmd)
    });  
});

app.listen(3000, () => console.log('Example app listening on port 3000!'))