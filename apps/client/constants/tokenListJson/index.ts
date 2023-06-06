import { TokenListItem } from "../type";
import LOCAL from "./local.json";
import BSC from "./bsc.json";

export const CURRENT_TOKEN_LIST: TokenListItem[] = process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true" ? LOCAL : BSC;
