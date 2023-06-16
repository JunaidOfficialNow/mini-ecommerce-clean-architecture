import express from 'express';
const express = require('express');

const app = express();

const port = process.env.PORT || 3000;

exports.startServer = () => app.listen(port, () => console.log('server listening on port ' + port));