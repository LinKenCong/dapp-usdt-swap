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

export interface UsdtSwapFactoryInterface extends utils.Interface {
  functions: {
    "USDT()": FunctionFragment;
    "allPools(uint256)": FunctionFragment;
    "allPoolsLength()": FunctionFragment;
    "createPool(address)": FunctionFragment;
    "getPool(address,address)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "USDT"
      | "allPools"
      | "allPoolsLength"
      | "createPool"
      | "getPool"
  ): FunctionFragment;

  encodeFunctionData(functionFragment: "USDT", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "allPools",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "allPoolsLength",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "createPool",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "getPool",
    values: [PromiseOrValue<string>, PromiseOrValue<string>]
  ): string;

  decodeFunctionResult(functionFragment: "USDT", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "allPools", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "allPoolsLength",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "createPool", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getPool", data: BytesLike): Result;

  events: {
    "PoolCreated(address,address,address,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "PoolCreated"): EventFragment;
}

export interface PoolCreatedEventObject {
  owner: string;
  token: string;
  pool: string;
  arg3: BigNumber;
}
export type PoolCreatedEvent = TypedEvent<
  [string, string, string, BigNumber],
  PoolCreatedEventObject
>;

export type PoolCreatedEventFilter = TypedEventFilter<PoolCreatedEvent>;

export interface UsdtSwapFactory extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: UsdtSwapFactoryInterface;

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
    USDT(overrides?: CallOverrides): Promise<[string]>;

    allPools(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    allPoolsLength(overrides?: CallOverrides): Promise<[BigNumber]>;

    createPool(
      _token: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    getPool(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[string]>;
  };

  USDT(overrides?: CallOverrides): Promise<string>;

  allPools(
    arg0: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<string>;

  allPoolsLength(overrides?: CallOverrides): Promise<BigNumber>;

  createPool(
    _token: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  getPool(
    arg0: PromiseOrValue<string>,
    arg1: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<string>;

  callStatic: {
    USDT(overrides?: CallOverrides): Promise<string>;

    allPools(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string>;

    allPoolsLength(overrides?: CallOverrides): Promise<BigNumber>;

    createPool(
      _token: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<string>;

    getPool(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<string>;
  };

  filters: {
    "PoolCreated(address,address,address,uint256)"(
      owner?: PromiseOrValue<string> | null,
      token?: PromiseOrValue<string> | null,
      pool?: null,
      arg3?: null
    ): PoolCreatedEventFilter;
    PoolCreated(
      owner?: PromiseOrValue<string> | null,
      token?: PromiseOrValue<string> | null,
      pool?: null,
      arg3?: null
    ): PoolCreatedEventFilter;
  };

  estimateGas: {
    USDT(overrides?: CallOverrides): Promise<BigNumber>;

    allPools(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    allPoolsLength(overrides?: CallOverrides): Promise<BigNumber>;

    createPool(
      _token: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    getPool(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    USDT(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    allPools(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    allPoolsLength(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    createPool(
      _token: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    getPool(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
