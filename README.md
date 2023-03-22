# Hardhat-Basics
  npm init --yes 

  npm install --save-dev hardhat

  npx hardhat
   then select  create an empty hardhat.cofig.js

make all the neccity folder and instal this for test case

   npm install --save-dev @nomiclabs/hardhat-ethers ethers @nomiclabs/hardhat-waffle ethereum-waffle chai

   for check test run "npx hardhat test"

hardhat also help in the debuging by using javascript in our smart Contracts (solidity) by adding this link init  ``import "hardhat/console.sol";``


for depoly in test network 
make a file(deploy.js) in script folder and write some code for deplyment purpose

then run  this in terminal ``npx hardhat run scripts/deploy.js``

if u get token no the code run succesfully

then we have to make some changes in config.js for deployment purpose

create a new app in alchemy and copy the http key of it

then inside metamask click in the account details then click in Export privste key then copy it also 



``npx hardhat run scripts/deploy.js --network goerli``

then u get the token no 

u can also check the mempoole of alchemy for verification

by clicking the hash no