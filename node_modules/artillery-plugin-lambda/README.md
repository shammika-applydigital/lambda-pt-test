# artillery-plugin-lambda

Invoke an AWS Lambda function after an [Artillery](https://artillery.io/) test run with your load test metrics and events.

## Configuration

### AWS credentials

This plugin uses the AWS SDK for JavaScript (V3). Read [the documentation for the SDK](https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/setting-credentials-node.html) to properly set the credentials you need to invoke the Lambda function.

### Artillery test script

```yaml
config:
  plugins:
    lambda:
      function: "NameOfLambdaFunction"
      region: "aws-region"
```

| Configuration Setting | Value |
| --------------------- | ----- |
| `function`  | The name of your AWS Lambda function. |
| `region`  | The [AWS region](https://docs.aws.amazon.com/general/latest/gr/lambda-service.html) where your Lambda function is deployed.  |

## Usage

After configuring the plugin, run your Artillery load test as usual. When the test run is completed, the plugin will invoke the defined Lambda function in the AWS region specified in the configuration. The Lambda function will receive a payload with the metrics and events from the test run.

## Debugging

You can view debug messages by setting the `DEBUG=plugin:lambda` environment variable when running your Artillery test:

```shell
DEBUG=plugin:lambda npx artillery run my-test-script.yml
```
