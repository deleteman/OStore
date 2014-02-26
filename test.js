#!/usr/bin/env node

// Based on https://github.com/laverdet/node-fibers/blob/master/test.js

var fs = require('fs');
var spawn = require('child_process').spawn;
var path = require('path');
var assert = require("assert");
var color = require("colors");

function runTest(test, cb) {
  var testPath = path.join(__dirname, 'test', test);

  var testCases = require(testPath);
  console.log("-- " + testPath);
  for(var testCase in testCases) { 
    var passes = true;
    try {
      testCases[testCase](assert);
    } catch (ex) {
      passes = false; 
      console.log("    ------------------- Error ---------------".red);
      console.log("    " + ex.message.red);
      console.log("    ------------------- /Error ---------------".red);
    }
    console.log("    # " + testCase + ": " + (passes? "Pass".green : "Fail".red ));
  }
cb();

}

var cb = function(err) {
  if (err) {
    console.error(String(err));
    process.exit(1);
  }
};
fs.readdirSync('./test').reverse().forEach(function(file) {
    var stats = fs.lstatSync(path.join('./test',file));
    if (!stats.isFile() || !file.match(/\.js$/)) //ignore tmp files and what not 
      return;
  
  cb = new function(cb, file) {
    return function(err) {
      if (err) return cb(err);
      runTest(file, cb);
    };
  }(cb, file);
});
cb();
