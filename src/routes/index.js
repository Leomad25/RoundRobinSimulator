const express = require('express');
const router = express.Router();
const getProcess = require('./../lib/getProcess');
const order = require('./../lib/order');

router.get('/', (req, res) => {
    let data = order.order(getProcess.getListProcess());
    const dataLength = data.length;
    res.render( 'home', { data, dataLength } );
});

module.exports = router;