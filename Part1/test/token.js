const { expect } = require("chai");

describe("Token Comtract", function () {
  let Token;
  let hardhatToken;
  let owner;
  let addr1;
  let addr2;
  let addrs;

  // it will run before every test
  beforeEach(async function () {
    Token = await ethers.getContractFactory("Token");
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
    hardhatToken = await Token.deploy();
  });
  describe("deployment", function () {
    it("Should set the right owner", async function () {
      expect(await hardhatToken.owner()).to.equal(owner.address);
    });
    it("Should assign the total supply of token to the owner", async function () {
      const ownerBalance = await hardhatToken.balanceof(owner.address);
      expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
    });
  });
  describe("Transations", function () {
    it("Should transfer between accounts", async function () {
      // owner account to addr1.address
      await hardhatToken.transfer(addr1.address, 5);
      const addr1Balance = await hardhatToken.balanceof(addr1.address);
      expect(addr1Balance).to.equal(5);

      await hardhatToken.connect(addr1).transfer(addr2.address, 5);
      const addr2Balance = await hardhatToken.balanceof(addr2.address);
      expect(addr2Balance).to.equal(5);
    });

    it ("Should fall if sender does not have enought tokens",
      async function () {
        const initialOwnerBalance = await hardhatToken.balanceof(owner.address);
        await expect(
          hardhatToken.connect(addr1).transfer(owner.address, 1)
        ).to.be.revertedWith("Not enough Tokens");
        expect(await hardhatToken.balanceof(owner.address)).to.equal(
          initialOwnerBalance
        );
      });

       it("should update balance after transfer", async function (){
        const initialOwnerBalance = await hardhatToken.balanceof(owner.address);
        await hardhatToken.transfer(addr1.address, 5);
        await hardhatToken.transfer(addr2.address, 10);

        const finalOwnerBalance = await hardhatToken.balanceof(owner.address);
        expect(finalOwnerBalance).to.equal(initialOwnerBalance-15);
        
        const addr1Balance = await hardhatToken.balanceof(addr1.address);
        expect(addr1Balance).to.equal(5);
        const addr2Balance = await hardhatToken.balanceof(addr2.address);
        expect(addr2Balance).to.equal(10);

       });
  });
});
