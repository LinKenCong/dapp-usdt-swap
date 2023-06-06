/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type {
  UsdtSwapLibrary,
  UsdtSwapLibraryInterface,
} from "../../src/UsdtSwapLibrary";

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
  "0x610771610053600b82828239805160001a607314610046577f4e487b7100000000000000000000000000000000000000000000000000000000600052600060045260246000fd5b30600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600436106100405760003560e01c8063443f4e711461004557806398390dab14610075575b600080fd5b61005f600480360381019061005a9190610448565b6100a5565b60405161006c919061048e565b60405180910390f35b61008f600480360381019061008a91906104d5565b6102ca565b60405161009c919061048e565b60405180910390f35b6000808273ffffffffffffffffffffffffffffffffffffffff1663fc0c546a6040518163ffffffff1660e01b8152600401602060405180830381865afa1580156100f3573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610117919061052a565b73ffffffffffffffffffffffffffffffffffffffff166370a08231846040518263ffffffff1660e01b815260040161014f9190610566565b602060405180830381865afa15801561016c573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906101909190610596565b905060008373ffffffffffffffffffffffffffffffffffffffff166302c7e7af6040518163ffffffff1660e01b8152600401602060405180830381865afa1580156101df573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102039190610596565b905060008473ffffffffffffffffffffffffffffffffffffffff1663b3863bf96040518163ffffffff1660e01b8152600401602060405180830381865afa158015610252573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102769190610609565b6dffffffffffffffffffffffffffff169050600083821115610298578361029a565b815b9050808310156102bc576102b783826103a390919063ffffffff16565b6102bf565b60005b945050505050919050565b6000808373ffffffffffffffffffffffffffffffffffffffff1663a035b1fe6040518163ffffffff1660e01b8152600401602060405180830381865afa158015610318573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061033c9190610609565b90506000816dffffffffffffffffffffffffffff161461039857610393670de0b6b3a7640000610385836dffffffffffffffffffffffffffff16866103b990919063ffffffff16565b6103cf90919063ffffffff16565b61039a565b825b91505092915050565b600081836103b19190610665565b905092915050565b600081836103c79190610699565b905092915050565b600081836103dd919061070a565b905092915050565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000610415826103ea565b9050919050565b6104258161040a565b811461043057600080fd5b50565b6000813590506104428161041c565b92915050565b60006020828403121561045e5761045d6103e5565b5b600061046c84828501610433565b91505092915050565b6000819050919050565b61048881610475565b82525050565b60006020820190506104a3600083018461047f565b92915050565b6104b281610475565b81146104bd57600080fd5b50565b6000813590506104cf816104a9565b92915050565b600080604083850312156104ec576104eb6103e5565b5b60006104fa85828601610433565b925050602061050b858286016104c0565b9150509250929050565b6000815190506105248161041c565b92915050565b6000602082840312156105405761053f6103e5565b5b600061054e84828501610515565b91505092915050565b6105608161040a565b82525050565b600060208201905061057b6000830184610557565b92915050565b600081519050610590816104a9565b92915050565b6000602082840312156105ac576105ab6103e5565b5b60006105ba84828501610581565b91505092915050565b60006dffffffffffffffffffffffffffff82169050919050565b6105e6816105c3565b81146105f157600080fd5b50565b600081519050610603816105dd565b92915050565b60006020828403121561061f5761061e6103e5565b5b600061062d848285016105f4565b91505092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b600061067082610475565b915061067b83610475565b925082820390508181111561069357610692610636565b5b92915050565b60006106a482610475565b91506106af83610475565b92508282026106bd81610475565b915082820484148315176106d4576106d3610636565b5b5092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b600061071582610475565b915061072083610475565b9250826107305761072f6106db565b5b82820490509291505056fea2646970667358221220ddbf618f7a93d13510038190d4b6d9a24d82700e2b9b9ebcd5020e8f45cefb1964736f6c63430008130033";

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
