import { TariUniverseProvider } from "./tari_universe";

export type SubstateRequirement = {
  substate_id: string;
  version?: number | null;
};

export type SubmitTransactionRequest = {
  account_id: number;
  instructions: object[];
  fee_instructions: object[];
  inputs: object[];
  input_refs: object[];
  required_substates: SubstateRequirement[];
  is_dry_run: boolean;
  min_epoch: number | null;
  max_epoch: number | null;
};

export type SubmitTransactionResponse = {
  transaction_id: string;
};

export type TransactionResult = {
  transaction_id: string;
  status: TransactionStatus;
  result: object | null;
};

export enum TransactionStatus {
  New,
  DryRun,
  Pending,
  Accepted,
  Rejected,
  InvalidTransaction,
  OnlyFeeAccepted,
}

export interface Account {
  account_id: number;
  address: string;
  public_key: string;
  resources: VaultData[];
}

export interface VaultData {
  type: string;
  balance: number;
  resource_address: string;
}

export interface VaultBalances {
  balances: Map<string, number | null>;
}

export interface TemplateDefinition {
  // TODO: Define this type
  [key: string]: any;
}

export interface Substate {
  value: any;
  address: {
    substate_id: string;
    version: number;
  };
}

export type PickMatching<T, V> = { [K in keyof T as T[K] extends V ? K : never]: T[K] };
export type ExtractMethods<T> = PickMatching<T, Function>;
export type ProviderMethods = ExtractMethods<TariUniverseProvider>;
export type ProviderMethodNames = keyof ProviderMethods;
export type ProviderReturnType<T extends ProviderMethodNames> = Awaited<ReturnType<ProviderMethods[T]>>;

export type ProviderRequest<T extends ProviderMethodNames> = {
  id: number;
  methodName: T;
  args: Parameters<ProviderMethods[T]>;
};

export type ProviderResponse<T extends ProviderMethodNames> = {
  id: number;
  result: ProviderReturnType<T>;
};
