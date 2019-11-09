pragma solidity ^0.5.12;

contract PetInteraction {

    // type = cat, dog, bird, etc if we expand?
    event NewPet(uint petId, string name, uint type);

    struct Pet {
        string name;
        uint type;
        uint lifeStage;
        uint happyMeter;
        // More attributes tbd
    }

    Pet[] public pets;

    mapping (uint => address) public petToOwner;
    mapping (address => uint) ownerPetCount;

    // User creates a new pet
    // - can name the pet
    // - can choose the pet type (cat, dog, bird, etc)
    function adpotPet(string _name, uint _type) public {
        uint id = pets.push(Pet(_name, _type, 0, 0)) - 1;
        petToOwner[id] = msg.sender;
        ownerPetCount[msg.sender]++;
        emit NewPet(id, _name, _type);
    }

    function feedPet(uint _petId) public {
      require(msg.sender == petToOwner[_petId]);
      Pet storage petObj = pets[_petId];

      petObj.happyMeter += 1;

      if(petObj.happyMeter >= 3){
        petObj.lifeStage += 1;
        petObj.happyMeter = 0;
      }
    }
}
