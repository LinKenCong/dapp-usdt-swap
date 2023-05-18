/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  UsdtSwapLibrary,
  UsdtSwapLibraryInterface,
} from "../../../src/library/UsdtSwapLibrary";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_pool",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_tokenOut",
        type: "uint256",
      },
    ],
    name: "getUsdtIn",
    outputs: [
      {
        internalType: "uint256",
        name: "usdtIn",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_pool",
        type: "address",
      },
    ],
    name: "purchasableTokens",
    outputs: [
      {
        internalType: "uint256",
        name: "purchasable",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

const _bytecode =
  "0x6106d4610053600b82828239805160001a607314610046577f4e487b7100000000000000000000000000000000000000000000000000000000600052600060045260246000fd5b30600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600436106100405760003560e01c8063443f4e711461004557806398390dab14610075575b600080fd5b61005f600480360381019061005a91906103ca565b6100a5565b60405161006c9190610410565b60405180910390f35b61008f600480360381019061008a9190610457565b61024c565b60405161009c9190610410565b60405180910390f35b60008060008373ffffffffffffffffffffffffffffffffffffffff16630902f1ac6040518163ffffffff1660e01b8152600401606060405180830381865afa1580156100f5573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906101199190610519565b509150915060008473ffffffffffffffffffffffffffffffffffffffff1663b3863bf96040518163ffffffff1660e01b8152600401602060405180830381865afa15801561016b573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061018f919061056c565b905060008390506000826dffffffffffffffffffffffffffff161180156101d55750816dffffffffffffffffffffffffffff16846dffffffffffffffffffffffffffff16115b156101de578190505b806dffffffffffffffffffffffffffff16836dffffffffffffffffffffffffffff16101561023e57610239836dffffffffffffffffffffffffffff16826dffffffffffffffffffffffffffff1661032590919063ffffffff16565b610241565b60005b945050505050919050565b6000808373ffffffffffffffffffffffffffffffffffffffff1663a035b1fe6040518163ffffffff1660e01b8152600401602060405180830381865afa15801561029a573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102be919061056c565b90506000816dffffffffffffffffffffffffffff161461031a57610315670de0b6b3a7640000610307836dffffffffffffffffffffffffffff168661033b90919063ffffffff16565b61035190919063ffffffff16565b61031c565b825b91505092915050565b6000818361033391906105c8565b905092915050565b6000818361034991906105fc565b905092915050565b6000818361035f919061066d565b905092915050565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006103978261036c565b9050919050565b6103a78161038c565b81146103b257600080fd5b50565b6000813590506103c48161039e565b92915050565b6000602082840312156103e0576103df610367565b5b60006103ee848285016103b5565b91505092915050565b6000819050919050565b61040a816103f7565b82525050565b60006020820190506104256000830184610401565b92915050565b610434816103f7565b811461043f57600080fd5b50565b6000813590506104518161042b565b92915050565b6000806040838503121561046e5761046d610367565b5b600061047c858286016103b5565b925050602061048d85828601610442565b9150509250929050565b60006dffffffffffffffffffffffffffff82169050919050565b6104ba81610497565b81146104c557600080fd5b50565b6000815190506104d7816104b1565b92915050565b600063ffffffff82169050919050565b6104f6816104dd565b811461050157600080fd5b50565b600081519050610513816104ed565b92915050565b60008060006060848603121561053257610531610367565b5b6000610540868287016104c8565b9350506020610551868287016104c8565b925050604061056286828701610504565b9150509250925092565b60006020828403121561058257610581610367565b5b6000610590848285016104c8565b91505092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60006105d3826103f7565b91506105de836103f7565b92508282039050818111156105f6576105f5610599565b5b92915050565b6000610607826103f7565b9150610612836103f7565b9250828202610620816103f7565b9150828204841483151761063757610636610599565b5b5092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b6000610678826103f7565b9150610683836103f7565b9250826106935761069261063e565b5b82820490509291505056fea2646970667358221220a28b846bf16ff2e03dd7a85704000a260738b26192b0689ae0b2714c23bd22f164736f6c63430008130033";

type UsdtSwapLibraryConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: UsdtSwapLibraryConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class UsdtSwapLibrary__factory extends ContractFactory {
  constructor(...args: UsdtSwapLibraryConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<UsdtSwapLibrary> {
    return super.deploy(overrides || {}) as Promise<UsdtSwapLibrary>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): UsdtSwapLibrary {
    return super.attach(address) as UsdtSwapLibrary;
  }
  override connect(signer: Signer): UsdtSwapLibrary__factory {
    return super.connect(signer) as UsdtSwapLibrary__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): UsdtSwapLibraryInterface {
    return new utils.Interface(_abi) as UsdtSwapLibraryInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): UsdtSwapLibrary {
    return new Contract(address, _abi, signerOrProvider) as UsdtSwapLibrary;
  }
}