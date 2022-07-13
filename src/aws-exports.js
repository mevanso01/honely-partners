/* eslint-disable */

const awsmobile = {
  "aws_project_region": "us-east-1",
  // "aws_cognito_identity_pool_id": "us-east-1:d914c4bd-5879-4945-a64a-1c5ab5f75e00",
  "aws_cognito_region": "us-east-1",
  "aws_user_pools_id": "us-east-1_BHLxONUjg",
  "aws_user_pools_web_client_id": "7qcghai45m815v1epkg9q1pljq",
  "oauth": {
      "domain": "partners-honely.auth.us-east-1.amazoncognito.com",
      "scope": [
          "phone",
          "email",
          "openid",
          "profile",
          "aws.cognito.signin.user.admin"
      ],
      // "redirectSignIn": "http://localhost:8080/",
      // "redirectSignOut": "http://localhost:8080/",
      // "redirectSignIn": "https://d3vysvze1cydzh.cloudfront.net/",
      // "redirectSignOut": "https://d3vysvze1cydzh.cloudfront.net/",
      "redirectSignIn": "https://www.honely.com/",
      "redirectSignOut": "https://www.honely.com/",
      "responseType": "code"
  },
  "federationTarget": "COGNITO_USER_POOLS",
};


export default awsmobile;
