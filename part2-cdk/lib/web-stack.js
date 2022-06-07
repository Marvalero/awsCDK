const { Stack, Fn } = require('aws-cdk-lib');
const autoscaling =  require('aws-cdk-lib/aws-autoscaling');
const ec2 = require('aws-cdk-lib/aws-ec2')

// In the web tier, we expect to have the following:
//
// Application load balancer
// Launch configuration
// Autoscaling group
// A bunch of security groups

class WebStack extends Stack {
  /**
   *
   * @param {Construct} scope
   * @param {string} id
   * @param {StackProps=} props
   */
  constructor(scope, id, props) {
    super(scope, id, props);
    const {vpc} = props;

    let asg = new autoscaling.AutoScalingGroup(this, "WebAsg", {
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.BURSTABLE3, ec2.InstanceSize.MICRO),
      machineImage: new ec2.AmazonLinuxImage(),
      vpc: vpc,
      vpcSubnets: { subnetType: ec2.SubnetType.PRIVATE_WITH_NAT},
      minCapacity: 1,
      maxCapacity: 1
    });

  }


}

module.exports = { WebStack }
