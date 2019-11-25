const SCSI = artifacts.require("SCSI");

module.exports = function(deployer) {
  deployer.deploy(SCSI);
};
