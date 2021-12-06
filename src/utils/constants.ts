import { PublicKey, clusterApiUrl } from "@solana/web3.js";
import { web3 } from "@project-serum/anchor";

import kp from "../data/keypair.json";
import idl from "../data/idl.json";

// Create a keypair for the account that will hold the GIF data.
export const SECRET_KEY_ARR = Object.values(kp._keypair.secretKey);
export const SECRET_KEYPAIR = new Uint8Array(SECRET_KEY_ARR);
export const BASE_ACCOUNT = web3.Keypair.fromSecretKey(SECRET_KEYPAIR);

// Get our program's id form the IDL file.
export const PROGRAM_ID = new PublicKey(idl.metadata.address);

// Set our network to devent.
export const NETWORK = clusterApiUrl("devnet");

// Control's how we want to acknowledge when a trasnaction is "done".
export const OPTS = {
    preflightCommitment: "processed",
};