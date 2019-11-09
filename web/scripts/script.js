window.onload = async function () {

  var x = await init_web3()

  var petId = null;

  document.getElementById("btnAdoptPet").addEventListener("click", function () {
    console.log("Adopting pet")

    // Get required data and create entry on blockchain using web3
    let petName = document.getElementById("inputPetName").value

    let results = document.getElementById("resultsAdopt");
    results.innerHTML = "Adoption in progress..."

    window.contract.methods.adopt(petName).send({ from: window.accounts[0] })
      .then(result => {
        console.log("Success")
        console.log(result);
        let txHash = result.transactionHash;

        let results = document.getElementById("resultsAdopt");
        results.innerHTML = "Adoption successful!"

        petId = result.events.NewPet.returnValues.petId;

        window.contract.methods.pets(petId).call().then((result) => {
          console.log(result);
          document.getElementById("outputPetName").value = result.name;
          document.getElementById("outputStageLevel").value = result.lifeStage;
          document.getElementById("outputHappyMeter").value = result.happyMeter;
        });

      });
  });

  // updating pet data
  document.getElementById("btnUpdatePet").addEventListener("click", function () {
    console.log("Updating pet data")

    window.contract.methods.pets(petId).call().then((result) => {
      console.log(result);
      document.getElementById("outputPetName").value = result.name;
      document.getElementById("outputStageLevel").value = result.lifeStage;
      document.getElementById("outputHappyMeter").value = result.happyMeter;
    });


  });

  // FEED THE PET
  document.getElementById("btnFeedPet").addEventListener("click", function () {
    console.log("FEEDING PET")
    let results = document.getElementById("resultsFeed");
    results.innerHTML = "Interaction in progress..."

    window.contract.methods.feedPet(petId).send({ from: window.accounts[0] })
      .then(result => {
        window.contract.methods.pets(petId).call().then((result) => {
          console.log(result);
          document.getElementById("outputPetName").value = result.name;
          document.getElementById("outputStageLevel").value = result.lifeStage;
          document.getElementById("outputHappyMeter").value = result.happyMeter;

          let results = document.getElementById("resultsFeed");
          results.innerHTML = "Nom nom nom!"

        });
      });




  });

}

async function init_web3() {
    //Web3 init
    web3 = new Web3(web3.currentProvider) // what Metamask injected
    //Load accounts
    window.accounts = await web3.eth.getAccounts()
    console.log("Loaded accounts")
    console.log(window.accounts);

    window.contract = new web3.eth.Contract([
      // ABI here
      {
        "constant": true,
        "inputs": [
          {
            "name": "",
            "type": "address"
          },
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "ownerToPets",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "",
            "type": "address"
          }
        ],
        "name": "ownerPetCount",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "petToOwner",
        "outputs": [
          {
            "name": "",
            "type": "address"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "pets",
        "outputs": [
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "lifeStage",
            "type": "uint256"
          },
          {
            "name": "happyMeter",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "name": "petId",
            "type": "uint256"
          },
          {
            "indexed": false,
            "name": "name",
            "type": "string"
          }
        ],
        "name": "NewPet",
        "type": "event"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "_name",
            "type": "string"
          }
        ],
        "name": "adopt",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "_petId",
            "type": "uint256"
          }
        ],
        "name": "feedPet",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      }
    ])

    //v1(ropsten) - 0xbb205aec980838409fa56f24a90d968fdfccaa4f
    window.contract.options.address = '0xbb205aec980838409fa56f24a90d968fdfccaa4f'

}
