// import { ethers } from "hardhat";
import { BigNumber, ethers, utils } from "ethers";
import ABI_ERC20Mock from "../artifacts/src/ERC20Mock.sol/ERC20Mock.json";
import ABI_SwapToken from "../artifacts/src/SwapToken.sol/SwapToken.json";

import { SWAP_WALLET_MAXSWAP_LIST } from "../constants";

const privateKey = process.env.PRIVATE_KEY_TEST;
const rpc = process.env.ETH_NODE_URI_BSC_TEST;

const CONTRACT_MAP = {
  ZRO: "0xfD69a1aAE97A910f134Dc01BC53F8a02183fa321",
  USDT: "0x70AF9f834E448C1a115Ea98cc151A315e6538248",
  SWAPTOKEN: "0xCaA05157d50d473FC0d48c5199Bd353Ee3b5F3Bf",
};

const WALLETS_ADDRESS = [
  "0x3fB5da47abB13F826E1FEfCf445f3637a86420Da",
  "0x96dD1FDC50129C218ab522D19317EAc5298c65dB",
  "0xc7dcabd2729ee1Dd73E8a76C4451F5484F232D13",
  "0xE8e36298Df2f1bAba5E437406d1F257b6bEE6a82",
  "0x7C630B053A23fD8D8E2EdF31456FCb3e204783bF",
  "0x15183914c344D7c9efB4DDA209BA6F002AbF272F",
];

const WALLETS_PRIVATE_KEY = [
  "0xa1ef1ae3462acd294e834a3cfc84d93c4cdf81c5038e625ac5168d0f4e0ae657",
  "0x3edc17dc8fd3a03f34e2ffec314ece4fed4e8f7ff1b53d67082fbb6af475126a",
  "0x389ea3f266c07e1fe3ec1ccf0841ef74cb1f70995da434acda8bf3987a1d4ee1",
  "0x5810ca795400b6585211468cedd767a83d5bdb8b73c1444e8ac7b7af52c52607",
  "0x8d9e5851c5c5eb12f38eca588b5e0318f2cebfb78ba0deb979a73f0a25ead7dc",
  "0x69fed5b88c10977b10bdd1aa4b69edc6541c019c09d0c8725cf18270eb0ec7bc",
];

const TEST_WALLETS_POOL_INFO = [
  {
    price: "0.006",
    totalSupply: "5000000",
  },
  {
    price: "0.007",
    totalSupply: "10000000",
  },
  {
    price: "0.008",
    totalSupply: "10000000",
  },
  {
    price: "0.009",
    totalSupply: "10000000",
  },
  {
    price: "0.01",
    totalSupply: "10000000",
  },
  {
    price: "0.011",
    totalSupply: "10000000",
  },
];

const POOL_INFO = TEST_WALLETS_POOL_INFO.map((item: any, index) => {
  return {
    ...item,
    address: WALLETS_ADDRESS[index],
    privateKey: WALLETS_PRIVATE_KEY[index],
  };
});

const createAccount = () => {
  const WALLETS_POOL = TEST_WALLETS_POOL_INFO.map((item: any, index) => {
    const wallet = ethers.Wallet.createRandom();
    const address = wallet.address;
    const privateKey = wallet.privateKey;
    return {
      ...item,
      wallet: {
        address,
        privateKey,
      },
    };
  });
  console.log(`-----Done =>`, "createAccount");
  return WALLETS_POOL;
};

const deployToken = async () => {
  const provider = new ethers.providers.JsonRpcProvider(rpc);
  const owner = new ethers.Wallet(privateKey || "", provider);
  const Factory_ERC20Mock = new ethers.ContractFactory(ABI_ERC20Mock.abi, ABI_ERC20Mock.bytecode);
  const USDT = await Factory_ERC20Mock.connect(owner).deploy("USDT Test", "USDT");
  const ZRO = await Factory_ERC20Mock.connect(owner).deploy("ZRO Test", "ZRO");
  await ZRO.deployed();
  await USDT.deployed();

  console.log(`-----Done =>`, "deployToken");
  return {
    ZRO: ZRO.address,
    USDT: USDT.address,
  };
};
const deploySwap = async (ZRO: string, USDT: string) => {
  const provider = new ethers.providers.JsonRpcProvider(rpc);
  const owner = new ethers.Wallet(privateKey || "", provider);
  const Factory_SwapToken = new ethers.ContractFactory(ABI_SwapToken.abi, ABI_SwapToken.bytecode);
  const SwapToken = await Factory_SwapToken.connect(owner).deploy(
    ZRO,
    USDT,
    owner.address,
    POOL_INFO.map((item: any) => item.address),
    POOL_INFO.map((item: any) => ethers.utils.parseEther(item.totalSupply)),
    POOL_INFO.map((item: any) => ethers.utils.parseEther(item.price))
  );
  await SwapToken.deployed();
  console.log(`-----Done =>`, "deploySwap");
  return {
    SwapToken: SwapToken.address,
  };
};
const sendGasHandle = async (amount: string, addressList: string[]) => {
  const provider = new ethers.providers.JsonRpcProvider(rpc);
  const owner = new ethers.Wallet(privateKey || "", provider);
  for (let i = 0; i < addressList.length; i++) {
    const account = addressList[i];
    const ethBalance = await provider.getBalance(account);
    if (BigNumber.from(ethBalance).lt(ethers.utils.parseEther(amount))) {
      const sendGas = await owner.sendTransaction({
        to: account,
        value: ethers.utils.parseEther(amount),
      });
      await sendGas.wait();
    }
  }
  console.log(`-----Done =>`, "sendGasHandle");
};

const mintTokenHandle = async (token: string, amountList: string[], addressList: string[]) => {
  const provider = new ethers.providers.JsonRpcProvider(rpc);
  const owner = new ethers.Wallet(privateKey || "", provider);
  const Token_contract = new ethers.Contract(token, ABI_ERC20Mock.abi, provider);
  const Token = Token_contract.connect(owner);
  for (let i = 0; i < addressList.length; i++) {
    const ethAmount = ethers.utils.parseEther(amountList[i]);
    const to = addressList[i];
    const balance = await Token.balanceOf(to);
    if (BigNumber.from(balance).lt(ethAmount)) {
      const tx = await Token.mint(to, ethAmount);
      await tx.wait();
    }
  }
  console.log(`-----Done =>`, "mintTokenHandle");
};
const approveTokenHandle = async (token: string, to: string, amountList: string[], privateKeyList: string[]) => {
  const provider = new ethers.providers.JsonRpcProvider(rpc);
  const Token_contract = new ethers.Contract(token, ABI_ERC20Mock.abi, provider);
  for (let i = 0; i < privateKeyList.length; i++) {
    const ethAmount = ethers.utils.parseEther(amountList[i]);
    const wallet = new ethers.Wallet(privateKeyList[i], provider);
    const Token = Token_contract.connect(wallet);
    const allowance = await Token.allowance(wallet.address, to);
    if (BigNumber.from(allowance).lt(ethAmount)) {
      const tx = await Token.approve(to, ethAmount);
      await tx.wait();
    }
  }
  console.log(`-----Done =>`, "approveTokenHandle");
};

const main = async () => {
  // step.1
  // console.log("createAccount", createAccount());

  // step.2
  // const tokenContractList = await deployToken();
  // console.log(tokenContractList);

  // step.3
  // const swapTokenContract = await deploySwap(
  //   CONTRACT_MAP.ZRO,
  //   CONTRACT_MAP.USDT
  // );
  // console.log(swapTokenContract);
  // await mintTokenHandle(
  //   CONTRACT_MAP.USDT,
  //   ["10000000", "1000"],
  //   [
  //     "0x8bdE032c2B98e2177BBed236dDdC4782568Fc4f2",
  //     "0xa55BC788183d81C24b52551B9b75599FCAAA1191",
  //   ]
  // );

  // step.4
  // await mintTokenHandle(
  //   CONTRACT_MAP.ZRO,
  //   TEST_WALLETS_POOL_INFO.map((item: any) => item.totalSupply),
  //   WALLETS_ADDRESS
  // );
  // await sendGasHandle("0.001", WALLETS_ADDRESS);
  // await approveTokenHandle(
  //   CONTRACT_MAP.ZRO,
  //   CONTRACT_MAP.SWAPTOKEN,
  //   TEST_WALLETS_POOL_INFO.map((item: any) => item.totalSupply),
  //   WALLETS_PRIVATE_KEY
  // );
  console.log(
    "token",
    SWAP_WALLET_MAXSWAP_LIST.map((item: string) => String(utils.parseEther(item)))
  );
};
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
