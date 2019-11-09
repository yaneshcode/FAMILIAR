pragma solidity ^0.5.0;

contract PetInteraction {

    // type = cat, dog, bird, etc if we expand?
    event NewPet(uint petId, string name);
    event LevelPet(uint petId, uint level);
    event XpGainPet(uint petId, uint xp, uint doubleXp);

    struct Pet {
        string name;
        /* uint type; */
        uint level;
        uint xp;
        // More attributes tbd
    }

    Pet[] public pets;

    mapping (uint => address) public petToOwner;
    mapping (address => uint) public ownerPetCount;
    mapping(address => uint[]) public ownerToPets;

    // User creates a new pet
    // - can name the pet
    // - can choose the pet type (cat, dog, bird, etc)
    function adopt(string memory _name) public returns (uint) {
        uint id = pets.push(Pet(_name, 1, 0)) - 1;
        petToOwner[id] = msg.sender;
        ownerToPets[msg.sender].push(id);
        ownerPetCount[msg.sender]++;
        emit NewPet(id, _name);
        return id;
    }

    // Returns all pets of user address
    //TODO

    // Feeding pet...
    // -> can later expand to petting, playing with, and other actions
    function feedPet(uint _petId) public {
      require(msg.sender == petToOwner[_petId]);
      Pet storage petObj = pets[_petId];

      // 50% chance of hitting a double xp drop
      uint doubleChance = uint(now) % 2;  // yes this is pretty crappy

      uint xpDrop = 4 * (doubleChance + 1);
      petObj.xp += xpDrop;

      emit XpGainPet(_petId, xpDrop, doubleChance);

      if (petObj.xp >= (petObj.level) * 10) {
        levelPet(_petId);
      }

    }

    function playPet(uint _petId) public {
      require(msg.sender == petToOwner[_petId]);
      Pet storage petObj = pets[_petId];

      // 50% chance of hitting a double xp drop
      uint doubleChance = uint(now) % 2; // yes this is pretty crappy

      uint xpDrop = 5 * (doubleChance + 1);
      petObj.xp += xpDrop;

      emit XpGainPet(_petId, xpDrop, doubleChance);

      if (petObj.xp >= (petObj.level) * 10) {
        levelPet(_petId);
      }

    }

    function levelPet(uint _petId) internal {
      Pet storage petObj = pets[_petId];
      uint level = petObj.level + 1;
      petObj.level = level;
      emit LevelPet(_petId, level);
    }

}
