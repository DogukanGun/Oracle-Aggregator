/** Error codes from AWS and the translated messages they convey */
export default {
  UserNotConfirmedException: {
    code: 'UserNotConfirmedException',
    message: 'You need to confirm your account before you can log in.',
  },
  CodeDeliveryFailureException: {
    code: 'CodeDeliveryFailureException',
    message: 'Verification code delivery failed.',
  },
  ForbiddenException: {
    code: 'ForbiddenException',
    message: 'You do not have access to this resource.',
  },
  InternalErrorException: {
    code: 'InternalErrorException',
    message: 'Internal error, please try again.',
  },
  InvalidParameterException: {
    code: 'InvalidParameterException',
    message: 'One of the fields has an invalid value.',
  },
  InvalidPasswordException: {
    code: 'InvalidPasswordException',
    message: 'The password is not valid.',
  },
  UserLambdaValidationException: {
    code: 'UserLambdaValidationException',
    message: 'Error validating user.',
  },
  UsernameExistsException: {
    code: 'UsernameExistsException',
    message: 'The given username already exists, please try logging in.',
  },
  InvalidSmsRoleAccessPolicyException: {
    code: 'InvalidSmsRoleAccessPolicyException',
    message: "Current Role doesn't have access to Amazon SNS",
  },
  InvalidSmsRoleTrustRelationshipException: {
    code: 'InvalidSmsRoleTrustRelationshipException',
    message: 'Unexpected error (InvalidSmsRoleTrustRelationshipException).',
  },
  LimitExceededException: {
    code: 'LimitExceededException',
    message: 'Exceeded the limit for requested resource.',
  },
  NotAuthorizedException: {
    code: 'NotAuthorizedException',
    message: 'You are not authorized to make this request.',
  },
  ResourceNotFoundException: {
    code: 'ResourceNotFoundException',
    message: 'Resource not found.',
  },
  TooManyRequestsException: {
    code: 'TooManyRequestsException',
    message: 'Too many requests. Please wait.',
  },
  UserNotFoundException: {
    code: 'UserNotFoundException',
    message: 'No such user.',
  },
};
