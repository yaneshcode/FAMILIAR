window.onload = async function () {

  const mySKALEChain = {
    nodeUrl: "https://waterloo1.skalenodes.com:10183",
    nodeProtocol: 'rpc',
  };


  const portis = new Portis('d9f9ad84-5dff-4ab6-8859-373a9ab1abaa', mySKALEChain);
  const web3 = new Web3(portis.provider);

  portis.onLogin((walletAddress, email, reputation) => {
    console.log(walletAddress, email, reputation);
    console.log("on login!")

    document.getElementById("showPortis").style.display = "none";
    document.getElementById("showAdopt").style.display = "block";
  });

  portis.isLoggedIn().then(({ error, result }) => {
    console.log("isloggedin!")
    document.getElementById("showPortis").style.display = "none";
    document.getElementById("showAdopt").style.display = "block";
  });

  document.getElementById("showPortis").onclick = () => portis.showPortis();


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
      "type": "function",
      "signature": "0x9e0a1b7f"
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
      "type": "function",
      "signature": "0xbd06b552"
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
      "type": "function",
      "signature": "0xc6431043"
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
          "name": "level",
          "type": "uint256"
        },
        {
          "name": "xp",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function",
      "signature": "0xcfb869bf"
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
      "type": "event",
      "signature": "0x2d1290ac7e468aef52fc49096417955764c2cd7b335d24fd818436c68d6e0f04"
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
          "name": "level",
          "type": "uint256"
        }
      ],
      "name": "LevelPet",
      "type": "event",
      "signature": "0xd36a59035edce0b1c8b802a32c9660009db294925e6b365b4e7b9bad816485bc"
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
          "name": "xp",
          "type": "uint256"
        },
        {
          "indexed": false,
          "name": "doubleXp",
          "type": "uint256"
        }
      ],
      "name": "XpGainPet",
      "type": "event",
      "signature": "0x69c6d049ece25c8153a31a465f90e39539ad286fcfbc0b22ca5cc941dd25978e"
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
      "type": "function",
      "signature": "0x566fc123"
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
      "type": "function",
      "signature": "0xfbfabac4"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_petId",
          "type": "uint256"
        }
      ],
      "name": "playPet",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function",
      "signature": "0x19d5eaad"
    }
  ])

  //v1(ropsten) - 0xbb205aec980838409fa56f24a90d968fdfccaa4f
  // v2(skale) - 0x49eD503F9c86C6f907c22B14587572F348a3e3d5
  // v3(after downgrading metamask) 0x7941f8F1f2501866fDC08eF7160F65875C80BD5e

  // v4(kovan, rewrite) 0x05626eefe43697972312494d8619d11356bd59d0
  // v5 (kovan, final) 0xc222c80c8ca26fcfec76bcf32aa67db46b815832
  //v 6 (skale) 0x47728404136c84a110c0002a631ef5eDc65B3C8D
  //v7 skale https  0x6F37A10F6bB7C0E01A17bA1F34A0a4B8F18eF578
  window.contract.options.address = '0x6F37A10F6bB7C0E01A17bA1F34A0a4B8F18eF578'

  var petId = null;

  document.getElementById("inputPetName").addEventListener("keypress", function (e) {
    if (e.key === 'Enter') {
      console.log("Adopting pet")

      // Get required data and create entry on blockchain using web3
      let petName = document.getElementById("inputPetName").value

      // let results = document.getElementById("resultsAdopt");
      // results.innerHTML = "Adoption in progress..."

      window.contract.methods.adopt(petName).send({ from: window.accounts[0] })
        .then(result => {
          console.log("Success")
          console.log(result);
          let txHash = result.transactionHash;

          // let results = document.getElementById("resultsAdopt");
          // results.innerHTML = "Adoption successful!"

          document.getElementById("first_page").style.display = "none";
          document.getElementById("game_page").style.display = "block";

          petId = result.events.NewPet.returnValues.petId;

          window.contract.methods.pets(petId).call().then((result) => {
            console.log(result);
            document.getElementById("outputPetName").innerHTML = result.name;
            document.getElementById("outputLevel").innerHTML = result.level;
            document.getElementById("outputXp").innerHTML = result.xp;
          });

        });
    }


  });

  // // updating pet data
  // document.getElementById("btnUpdatePet").addEventListener("click", function () {
  //   console.log("Updating pet data")
  //
  //   window.contract.methods.pets(petId).call().then((result) => {
  //     console.log(result);
  //     document.getElementById("outputPetName").innerHTML = result.name;
  //     document.getElementById("outputStageLevel").innerHTML = result.lifeStage;
  //     document.getElementById("outputHappyMeter").innerHTML = result.happyMeter;
  //   });
  //
  //
  // });

  // FEED THE PET
  document.getElementById("feed_button").addEventListener("click", function () {
    console.log("FEEDING PET")
    // let results = document.getElementById("resultsFeed");
    // results.innerHTML = "Feeding in progress..."

    window.contract.methods.feedPet(petId).send({ from: window.accounts[0] })
      .then(result => {

        // let results = document.getElementById("resultsFeed");
        // results.innerHTML = "Nom nom nom!<br>xp: +" + result.events.XpGainPet.returnValues.xp + (result.events.XpGainPet.returnValues.doubleXp == 1 ? " (x2 bonus!)" : "");
        console.log(result);

        if(result.events.LevelPet) {
          document.getElementById("lvl_up_img").style.display = "block";
          document.getElementById("lvl_up_img").style.animation = "3s ease-in 1s infinite reverse both running slidein";
          setTimeout(function(){
            document.getElementById("lvl_up_img").style.display = "none";
          }, 3000);

        }
        window.contract.methods.pets(petId).call().then((result) => {
          console.log(result);
          document.getElementById("outputPetName").innerHTML = result.name;
          document.getElementById("outputLevel").innerHTML = result.level;
          document.getElementById("outputXp").innerHTML = result.xp;
            });
      });
  });


  // Play with pet
  document.getElementById("play_button").addEventListener("click", function () {
    console.log("Playing with pet")
    // let results = document.getElementById("resultsFeed");
    // results.innerHTML = "Interaction in progress..."

    window.contract.methods.playPet(petId).send({ from: window.accounts[0] })
      .then(result => {

        // let results = document.getElementById("resultsFeed");
        // results.innerHTML = "Meow meow meow!<br>xp: +" + result.events.XpGainPet.returnValues.xp + (result.events.XpGainPet.returnValues.doubleXp == 1 ? " (x2 bonus!)" : "");

        setTimeout(function(){

                window.contract.methods.pets(petId).call().then((result) => {
                console.log(result);
                document.getElementById("outputPetName").innerHTML = result.name;
                document.getElementById("outputLevel").innerHTML = result.level;
                document.getElementById("outputXp").innerHTML = result.xp;

                });; }

        , 1000, petId);


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
        "type": "function",
        "signature": "0x9e0a1b7f"
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
        "type": "function",
        "signature": "0xbd06b552"
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
        "type": "function",
        "signature": "0xc6431043"
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
            "name": "level",
            "type": "uint256"
          },
          {
            "name": "xp",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0xcfb869bf"
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
        "type": "event",
        "signature": "0x2d1290ac7e468aef52fc49096417955764c2cd7b335d24fd818436c68d6e0f04"
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
            "name": "level",
            "type": "uint256"
          }
        ],
        "name": "LevelPet",
        "type": "event",
        "signature": "0xd36a59035edce0b1c8b802a32c9660009db294925e6b365b4e7b9bad816485bc"
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
            "name": "xp",
            "type": "uint256"
          },
          {
            "indexed": false,
            "name": "doubleXp",
            "type": "uint256"
          }
        ],
        "name": "XpGainPet",
        "type": "event",
        "signature": "0x69c6d049ece25c8153a31a465f90e39539ad286fcfbc0b22ca5cc941dd25978e"
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
        "type": "function",
        "signature": "0x566fc123"
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
        "type": "function",
        "signature": "0xfbfabac4"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "_petId",
            "type": "uint256"
          }
        ],
        "name": "playPet",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function",
        "signature": "0x19d5eaad"
      }
    ])

    //v1(ropsten) - 0xbb205aec980838409fa56f24a90d968fdfccaa4f
    // v2(skale) - 0x49eD503F9c86C6f907c22B14587572F348a3e3d5
    // v3(after downgrading metamask) 0x7941f8F1f2501866fDC08eF7160F65875C80BD5e

    // v4(kovan, rewrite) 0x05626eefe43697972312494d8619d11356bd59d0
    // v5 (kovan, final) 0xc222c80c8ca26fcfec76bcf32aa67db46b815832
    //v 6 (skale) 0x47728404136c84a110c0002a631ef5eDc65B3C8D
    window.contract.options.address = '0x47728404136c84a110c0002a631ef5eDc65B3C8D'

}
