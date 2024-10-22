'use strict';

const { LambdaClient, InvokeCommand } = require('@aws-sdk/client-lambda');
const debug = require('debug')('plugin:lambda');

module.exports.Plugin = ArtilleryLambdaPlugin;

function ArtilleryLambdaPlugin(script, events) {
  const self = this;

  self.config = script.config.plugins['lambda'];

  if (!self.config.function) {
    throw new Error('function is missing');
  }

  if (!self.config.region) {
    throw new Error('region is missing');
  }

  self.lambdaClient = function() {
    return new LambdaClient({ region: self.config.region })
  }

  self.lambdaCommand = function(report) {
    return new InvokeCommand({
      FunctionName: self.config.function,
      Payload: new TextEncoder().encode(JSON.stringify(report)),
    });
  }

  events.on('done', function(report) {
    self.report = report;
  });

  return this;
}

ArtilleryLambdaPlugin.prototype.cleanup = async function(done) {
  const client = this.lambdaClient();

  try {
    const result = await client.send(this.lambdaCommand(this.report));
    console.log(`Sent Artillery report to Lambda function: ${this.config.function} (${this.config.region})`);
    debug(result);
  } catch(err) {
    console.log("There was an error invoking the Lambda function");
    debug(err);
  } finally {
    debug("Wrapping up");
    done(null);
  }
};
