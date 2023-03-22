const { expect } = require("chai");

describe("Token Contract", function () {
    it("Deployment should assign the total supply of tokens to the owner", async function (){
        const [owner] = await ethers.getSigners();

        // A Signer in Ethers.js is an object that represents an Ethereum account. It's used to send transactions to contracts and other accounts. Here we're getting a list of the accounts in the node we're connected to, which in this case is Hardhat Network, and only keeping the first and second ones.

        console.log("Singer object:", owner);
        const Token = await ethers.getContractFactory("Token");
// A ContractFactory in ethers.js is an abstraction used to deploy new smart contracts, so Greeter here is a factory for instances of our greeter contract.
        const hardhatToken = await Token.deploy();

        const ownerBalance = await hardhatToken.balanceof(owner.address);
        console.log("Owner Address:", owner.address);

        expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
    });
});