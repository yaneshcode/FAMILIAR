const PetInteraction = artifacts.require("PetInteraction");

module.exports = function(deployer) {
  deployer.deploy(PetInteraction);
};
