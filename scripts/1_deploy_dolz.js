async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);

    console.log("Account balance:", (await deployer.getBalance()).toString());

    const Token = await ethers.getContractFactory("Dolz");
    const initialSupply = web3.utils.toWei('1250000000', 'ether'); // 1.25 billion tokens
    const token = await Token.deploy('Dolz', 'DOLZ', initialSupply);

    console.log("DOLZ Token address:", token.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });


// npx hardhat run scripts/1_deploy_dolz.js --network goerli

// npx hardhat verify --network goerli 0xC5f6A60560cc2bA60F4096625dFc02bf2D877A9E Dolz DOLZ 1250000000000000000000000000

// polygon bridge
// grant role mintable / predicateproxy (on etherscan)
// https://docs.polygon.technology/docs/develop/ethereum-polygon/mintable-assets/

// npx hardat console --network goerli
// const c = await hre.ethers.getContractAt("Dolz","0xC5f6A60560cc2bA60F4096625dFc02bf2D877A9E")
// await c.totalSupply()
