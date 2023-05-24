/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../common";

export interface UsdtSwapPoolInterface extends utils.Interface {
  functions: {
    "factory()": FunctionFragment;
    "getUsdtIn(uint256)": FunctionFragment;
    "initialize(address,address,address)": FunctionFragment;
    "maxOutLock()": FunctionFragment;
    "owner()": FunctionFragment;
    "price()": FunctionFragment;
    "purchasableTokens()": FunctionFragment;
    "setMaxOutLock(uint112)": FunctionFragment;
    "setNewOwner(address)": FunctionFragment;
    "setPrice(uint112)": FunctionFragment;
    "sold()": FunctionFragment;
    "subReserve(uint256,address)": FunctionFragment;
    "swap(uint256,address)": FunctionFragment;
    "swapAccountsCount()": FunctionFragment;
    "swapCountOf(address)": FunctionFragment;
    "token()": FunctionFragment;
    "totalSwap()": FunctionFragment;
    "usdt()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "factory"
      | "getUsdtIn"
      | "initialize"
      | "maxOutLock"
      | "owner"
      | "price"
      | "purchasableTokens"
      | "setMaxOutLock"
      | "setNewOwner"
      | "setPrice"
      | "sold"
      | "subReserve"
      | "swap"
      | "swapAccountsCount"
      | "swapCountOf"
      | "token"
      | "totalSwap"
      | "usdt"
  ): FunctionFragment;

  encodeFunctionData(functionFragment: "factory", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "getUsdtIn",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "initialize",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<string>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "maxOutLock",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(functionFragment: "price", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "purchasableTokens",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "setMaxOutLock",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "setNewOwner",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "setPrice",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(functionFragment: "sold", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "subReserve",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "swap",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "swapAccountsCount",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "swapCountOf",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(functionFragment: "token", values?: undefined): string;
  encodeFunctionData(functionFragment: "totalSwap", values?: undefined): string;
  encodeFunctionData(functionFragment: "usdt", values?: undefined): string;

  decodeFunctionResult(functionFragment: "factory", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getUsdtIn", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "maxOutLock", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "price", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "purchasableTokens",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setMaxOutLock",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setNewOwner",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "setPrice", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "sold", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "subReserve", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "swap", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "swapAccountsCount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "swapCountOf",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "token", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "totalSwap", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "usdt", data: BytesLike): Result;

  events: {
    "SubReserve(address,uint256,address)": EventFragment;
    "Swap(address,uint256,uint256,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "SubReserve"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Swap"): EventFragment;
}

export interface SubReserveEventObject {
  owner: string;
  amount: BigNumber;
  to: string;
}
export type SubReserveEvent = TypedEvent<
  [string, BigNumber, string],
  SubReserveEventObject
>;

export type SubReserveEventFilter = TypedEventFilter<SubReserveEvent>;

export interface SwapEventObject {
  sender: string;
  usdtIn: BigNumber;
  tokenOut: BigNumber;
  to: string;
}
export type SwapEvent = TypedEvent<
  [string, BigNumber, BigNumber, string],
  SwapEventObject
>;

export type SwapEventFilter = TypedEventFilter<SwapEvent>;

export interface UsdtSwapPool extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: UsdtSwapPoolInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    factory(overrides?: CallOverrides): Promise<[string]>;

    getUsdtIn(
      _tokenOut: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { usdtIn: BigNumber }>;

    initialize(
      _owner: PromiseOrValue<string>,
      _usdt: PromiseOrValue<string>,
      _token: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    maxOutLock(overrides?: CallOverrides): Promise<[BigNumber]>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    price(overrides?: CallOverrides): Promise<[BigNumber]>;

    purchasableTokens(
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { purchasable: BigNumber }>;

    setMaxOutLock(
      _newMaxOut: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setNewOwner(
      _newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setPrice(
      _newPrice: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    sold(overrides?: CallOverrides): Promise<[BigNumber]>;

    subReserve(
      _amount: PromiseOrValue<BigNumberish>,
      _to: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    swap(
      _tokenOut: PromiseOrValue<BigNumberish>,
      _to: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    swapAccountsCount(overrides?: CallOverrides): Promise<[BigNumber]>;

    swapCountOf(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    token(overrides?: CallOverrides): Promise<[string]>;

    totalSwap(overrides?: CallOverrides): Promise<[BigNumber]>;

    usdt(overrides?: CallOverrides): Promise<[string]>;
  };

  factory(overrides?: CallOverrides): Promise<string>;

  getUsdtIn(
    _tokenOut: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  initialize(
    _owner: PromiseOrValue<string>,
    _usdt: PromiseOrValue<string>,
    _token: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  maxOutLock(overrides?: CallOverrides): Promise<BigNumber>;

  owner(overrides?: CallOverrides): Promise<string>;

  price(overrides?: CallOverrides): Promise<BigNumber>;

  purchasableTokens(overrides?: CallOverrides): Promise<BigNumber>;

  setMaxOutLock(
    _newMaxOut: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setNewOwner(
    _newOwner: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setPrice(
    _newPrice: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  sold(overrides?: CallOverrides): Promise<BigNumber>;

  subReserve(
    _amount: PromiseOrValue<BigNumberish>,
    _to: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  swap(
    _tokenOut: PromiseOrValue<BigNumberish>,
    _to: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  swapAccountsCount(overrides?: CallOverrides): Promise<BigNumber>;

  swapCountOf(
    arg0: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  token(overrides?: CallOverrides): Promise<string>;

  totalSwap(overrides?: CallOverrides): Promise<BigNumber>;

  usdt(overrides?: CallOverrides): Promise<string>;

  callStatic: {
    factory(overrides?: CallOverrides): Promise<string>;

    getUsdtIn(
      _tokenOut: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    initialize(
      _owner: PromiseOrValue<string>,
      _usdt: PromiseOrValue<string>,
      _token: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    maxOutLock(overrides?: CallOverrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<string>;

    price(overrides?: CallOverrides): Promise<BigNumber>;

    purchasableTokens(overrides?: CallOverrides): Promise<BigNumber>;

    setMaxOutLock(
      _newMaxOut: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    setNewOwner(
      _newOwner: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    setPrice(
      _newPrice: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    sold(overrides?: CallOverrides): Promise<BigNumber>;

    subReserve(
      _amount: PromiseOrValue<BigNumberish>,
      _to: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    swap(
      _tokenOut: PromiseOrValue<BigNumberish>,
      _to: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    swapAccountsCount(overrides?: CallOverrides): Promise<BigNumber>;

    swapCountOf(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    token(overrides?: CallOverrides): Promise<string>;

    totalSwap(overrides?: CallOverrides): Promise<BigNumber>;

    usdt(overrides?: CallOverrides): Promise<string>;
  };

  filters: {
    "SubReserve(address,uint256,address)"(
      owner?: PromiseOrValue<string> | null,
      amount?: null,
      to?: PromiseOrValue<string> | null
    ): SubReserveEventFilter;
    SubReserve(
      owner?: PromiseOrValue<string> | null,
      amount?: null,
      to?: PromiseOrValue<string> | null
    ): SubReserveEventFilter;

    "Swap(address,uint256,uint256,address)"(
      sender?: PromiseOrValue<string> | null,
      usdtIn?: null,
      tokenOut?: null,
      to?: PromiseOrValue<string> | null
    ): SwapEventFilter;
    Swap(
      sender?: PromiseOrValue<string> | null,
      usdtIn?: null,
      tokenOut?: null,
      to?: PromiseOrValue<string> | null
    ): SwapEventFilter;
  };

  estimateGas: {
    factory(overrides?: CallOverrides): Promise<BigNumber>;

    getUsdtIn(
      _tokenOut: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    initialize(
      _owner: PromiseOrValue<string>,
      _usdt: PromiseOrValue<string>,
      _token: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    maxOutLock(overrides?: CallOverrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    price(overrides?: CallOverrides): Promise<BigNumber>;

    purchasableTokens(overrides?: CallOverrides): Promise<BigNumber>;

    setMaxOutLock(
      _newMaxOut: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setNewOwner(
      _newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setPrice(
      _newPrice: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    sold(overrides?: CallOverrides): Promise<BigNumber>;

    subReserve(
      _amount: PromiseOrValue<BigNumberish>,
      _to: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    swap(
      _tokenOut: PromiseOrValue<BigNumberish>,
      _to: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    swapAccountsCount(overrides?: CallOverrides): Promise<BigNumber>;

    swapCountOf(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    token(overrides?: CallOverrides): Promise<BigNumber>;

    totalSwap(overrides?: CallOverrides): Promise<BigNumber>;

    usdt(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    factory(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getUsdtIn(
      _tokenOut: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    initialize(
      _owner: PromiseOrValue<string>,
      _usdt: PromiseOrValue<string>,
      _token: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    maxOutLock(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    price(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    purchasableTokens(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    setMaxOutLock(
      _newMaxOut: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setNewOwner(
      _newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setPrice(
      _newPrice: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    sold(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    subReserve(
      _amount: PromiseOrValue<BigNumberish>,
      _to: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    swap(
      _tokenOut: PromiseOrValue<BigNumberish>,
      _to: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    swapAccountsCount(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    swapCountOf(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    token(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    totalSwap(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    usdt(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
