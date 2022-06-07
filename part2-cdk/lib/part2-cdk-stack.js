const { Stack, Fn } = require('aws-cdk-lib');
const ec2 =  require('aws-cdk-lib/aws-ec2');
const iam = require('aws-cdk-lib/aws-iam')


// We need the following resources in a core stack:
//
// 1 VPC
// 3 public subnets
// 3 private subnets
// 1 internet gateway
// 1 NAT gateway
// 1 public route table
// 1 private route table
// 2 IAM roles (for administrators and developers)



class Part2CdkStack extends Stack {
  /**
   *
   * @param {Construct} scope
   * @param {string} id
   * @param {StackProps=} props
   */
  constructor(scope, id, props) {
    super(scope, id, props);

    let admin_role = this.createRole("admin", "AdministratorAccess")
    let developer_role = this.createRole("developer", "ReadOnlyAccess")
    this.vpc = new ec2.Vpc(this, "mariaVpc", { // we have defined a single VPC but it creates subnets, nat gateway, route table...
      cidr: "10.0.0.0/16",
      enableDnsHostnames: true,
      enableDnsSupport: true,
      maxAzs: 3,
      natGateways: 1,
      subnetConfiguration: [{
        name: "public",
        subnetType: ec2.SubnetType.PUBLIC,
        cidrMask: 24
      }, {
        name: "private",
        subnetType: ec2.SubnetType.PRIVATE_WITH_NAT,
        cidrMask: 24
      }
      ]
    })


  }

  createRole(id, policyName) {
    let role = new iam.Role(this, id, {
      assumedBy: new iam.AccountPrincipal(Fn.ref("AWS::AccountId"))
    })
    role.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName(policyName));
    return role;
  }
}

module.exports = { Part2CdkStack }
