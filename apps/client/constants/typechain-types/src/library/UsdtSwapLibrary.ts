/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../../common";

export interface UsdtSwapLibraryInterface extends utils.Interface {
  functions: {
    "getUsdtIn(address,uint256)": FunctionFragment;
    "purchasableTokens(address)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic: "getUsdtIn" | "purchasableTokens"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "getUsdtIn",
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "purchasableTokens",
    values: [PromiseOrValue<string>]
  ): string;

  decodeFunctionResult(functionFragment: "getUsdtIn", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "purchasableTokens",
    data: BytesLike
  ): Result;

  events: {};
}

export interface UsdtSwapLibrary extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: UsdtSwapLibraryInterface;

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
    getUsdtIn(
      _pool: PromiseOrValue<string>,
      _tokenOut: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { usdtIn: BigNumber }>;

    purchasableTokens(
      _pool: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { purchasable: BigNumber }>;
  };

  getUsdtIn(
    _pool: PromiseOrValue<string>,
    _tokenOut: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  purchasableTokens(
    _pool: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  callStatic: {
    getUsdtIn(
      _pool: PromiseOrValue<string>,
      _tokenOut: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    purchasableTokens(
      _pool: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  filters: {};

  estimateGas: {
    getUsdtIn(
      _pool: PromiseOrValue<string>,
      _tokenOut: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    purchasableTokens(
      _pool: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    getUsdtIn(
      _pool: PromiseOrValue<string>,
      _tokenOut: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    purchasableTokens(
      _pool: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
