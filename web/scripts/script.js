window.onload = async function () {

  var x = await init_web3()

  var petId = null;

  document.getElementById("btnAdoptPet").addEventListener("click", function () {
    console.log("Adopting pet")

    // Get required data and create entry on blockchain using web3
    let petName = document.getElementById("petName").value

    let results = document.getElementById("results");
    results.innerHTML = "Adoption in progress..."

    window.contract.methods.adoptPet(petName).send({ from: window.accounts[0] })
      .then(result => {
        console.log("Success")
        console.log(result);
        let txHash = result.transactionHash;

        let results = document.getElementById("results");
        results.innerHTML = "Adoption successful!"

      });
  });

  // updating pet data
  document.getElementById("btnUpdatePet").addEventListener("click", function () {
    console.log("Updating pet data")

    // Get required data and create entry on blockchain using web3
    let petName = document.getElementById("petName").value

    let results = document.getElementById("results");
    results.innerHTML = "Adoption in progress..."

    window.contract.methods.adoptPet(petName).send({ from: window.accounts[0] })
      .then(result => {
        console.log("Success")
        console.log(result);
        let txHash = result.transactionHash;

        let results = document.getElementById("results");
        results.innerHTML = "Adoption successful!"

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
    ])

    window.contract.options.address = ''

}
