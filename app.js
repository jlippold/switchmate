const express = require('express');
const devices = require('./devices');
const { exec } = require('child_process');
const app = express();

app.get('/:device/:status', (req, res) => {
    var device = devices.find(item => item.name == req.params.device);
    if (!device) {
        return res.send('Device not found: ' + req.params.device)
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