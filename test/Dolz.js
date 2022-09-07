const { expect } = require("chai");


describe("Dolz contract", async function () {
    it("Deployment should assign the total supply of tokens to the owner", async function () {
        const initialSupply = web3.utils.toWei('1250000000', 'ether'); // 1.25 billion tokens

        const [owner] = await ethers.getSigners();

        const Token = await ethers.getContractFactory("Dolz");

        const hardhatToken = await Token.deploy('Dolz', 'DOLZ', initialSupply);

        const ownerBalance = await hardhatToken.balanceOf(owner.address);
        expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
    });
});