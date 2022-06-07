#!/usr/bin/env node

const cdk = require('aws-cdk-lib');
const { WebStack } = require('../lib/web-stack');
const { Part2CdkStack } = require('../lib/part2-cdk-stack');

const app = new cdk.App();

let core = new Part2CdkStack(app, 'Part2CdkStack', {});
new WebStack(app, 'WebStack', {
    vpc: core.vpc
});