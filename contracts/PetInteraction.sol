pragma solidity ^0.5.12;

contract PetInteraction {

    // type = cat, dog, bird, etc if we expand?
    event NewPet(uint petId, string name, uint type);

    struct Pet {
        string name;
        /* uint type; */
        uint lifeStage;
        uint happyMeter;
        // More attributes tbd
    }

    Pet[] public pets;

    mapping (uint => address) public petToOwner;
    mapping (address => uint) public ownerPetCount;
    mapping(address => uint[]) public ownerToPets;

    // User creates a new pet
    // - can name the pet
    // - can choose the pet type (cat, dog, bird, etc)
    function adopt(string _name) public {
        uint id = pets.push(Pet(_name, _type, 0, 0)) - 1;
        petToOwner[id] = msg.sender;
        ownerToPets[msg.sender].push(id);
        ownerPetCount[msg.sender]++;
        emit NewPet(id, _name);
    }

    // Returns all pets of user address
    //TODO

    // Feeding pet...
    // -> can later expand to petting, playing with, and other actions
    function feedPet(uint _petId) public {
      require(msg.sender == petToOwner[_petId]);
      Pet storage petObj = pets[_petId];

      petObj.happyMeter += 1;

      if(petObj.happyMeter >= 3){
        petObj.lifeStage += 1;
        petObj.happyMeter = 0;
      }
    }


  /// @notice Returns a list of all Kitty IDs assigned to an address.
  /// @param _owner The owner whose Kitties we are interested in.
  /// @dev This method MUST NEVER be called by smart contract code. First, it's fairly
  ///  expensive (it walks the entire Kitty array looking for cats belonging to owner),
  ///  but it also returns a dynamic array, which is only supported for web3 calls, and
  ///  not contract-to-contract calls.
  /* function tokensOfOwner(address _owner) external view returns(uint256[] ownerTokens) {
    uint256 tokenCount = balanceOf(_owner);

    if (tokenCount == 0) {
        // Return an empty array
        return new uint256[](0);
    } else {
        uint256[] memory result = new uint256[](tokenCount);
        uint256 totalCats = totalSupply();
        uint256 resultIndex = 0;

        // We count on the fact that all cats have IDs starting at 1 and increasing
        // sequentially up to the totalCat count.
        uint256 catId;

        for (catId = 1; catId <= totalCats; catId++) {
            if (kittyIndexToOwner[catId] == _owner) {
                result[resultIndex] = catId;
                resultIndex++;
            }
        }

        return result;
    }
  } */

}
