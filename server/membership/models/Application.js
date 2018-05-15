const Verifier = function (args) {
  const verifier = {};
  verifier.username = args.username;
  verifier.email = args.email;
  verifier.password = args.password;
  verifier.confirm = args.confirm;
  verifier.status = "pending";
  verifier.message = null;
  verifier.user = null;

  verifier.isValid = function () {
    return verifier.status === "validated";
  };
  verifier.isInvalid = function () {
    return !isValid();
  };
  verifier.setInvalid = function (message) {
    verifier.status = "invalid";
    verifier.message = message;
  };
  verifier.validate = function () {
    verifier.status = "validated";
  };

  return verifier;
};

module.exports = Verifier;