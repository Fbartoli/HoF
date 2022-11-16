import { log, Address, BigInt, ethereum } from "@graphprotocol/graph-ts";
import {
  TransferSingle,
  TransferBatch,
  Initialized,
  SygnumERC1155,
} from "../generated/SygnumERC1155/SygnumERC1155";
import {
  Account,
  Token,
  Balance,
  Transaction,
  Collection,
  Mint,
  Burn,
} from "../generated/schema";

export function handleTransferSingle(event: TransferSingle): void {
  log.debug(
    "Single transfer detected. From: {} | To: {} | TokenID: {} | Amount: {}",
    [
      event.params.from.toHexString(),
      event.params.to.toHexString(),
      event.params.id.toHexString(),
      event.params.amount.toHexString(),
    ]
  );

  // load Accounts
  let previousOwner = Account.load(event.params.from.toHexString());
  let newOwner = Account.load(event.params.to.toHexString());

  // load Token
  let token = Token.load(event.params.id.toString());

  // load Transaction
  let tx = Transaction.load(event.transaction.hash.toHexString());

  // load Balances
  let previousOwnerBalanceId = event.params.from
    .toHexString()
    .concat(":".concat(event.params.id.toString()));
  let previousOwnerBalance = Balance.load(previousOwnerBalanceId);
  let newOwnerBalanceId = event.params.to
    .toHexString()
    .concat(":".concat(event.params.id.toString()));
  let newOwnerBalance = Balance.load(newOwnerBalanceId);

  // load contract instance
  let instance = SygnumERC1155.bind(event.address);

  if (previousOwner == null) {
    previousOwner = new Account(event.params.from.toHexString());
  }
  if (previousOwnerBalance == null) {
    previousOwnerBalance = new Balance(previousOwnerBalanceId);

    previousOwnerBalance.token = event.params.id.toString();
    previousOwnerBalance.account = event.params.from.toHexString();
    // realistically only account there won't be a previousOwner entity for is zero account
    // so makes sense to set its balance to zero
    previousOwnerBalance.value = BigInt.fromI32(0);
  } else {
    let prevTokenAmount = previousOwnerBalance.value;
    if (prevTokenAmount > BigInt.fromI32(0)) {
      previousOwnerBalance.value = prevTokenAmount.minus(event.params.amount);
    }
  }

  if (newOwner == null) {
    newOwner = new Account(event.params.to.toHexString());
  }
  if (newOwnerBalance == null) {
    newOwnerBalance = new Balance(newOwnerBalanceId);

    newOwnerBalance.token = event.params.id.toString();
    newOwnerBalance.account = event.params.to.toHexString();
    newOwnerBalance.value = event.params.amount;
  } else {
    let prevBalance = newOwnerBalance.value;
    newOwnerBalance.value = prevBalance.plus(event.params.amount);
  }

  if (token == null) {
    token = new Token(event.params.id.toString());
    token.collectionId = event.address.toHexString();

    let uri = instance.try_uri(event.params.id);
    if (!uri.reverted) {
      token.URI = uri.value;
    }

    token.identifier = event.params.id;
    let supply = instance.try_maxTokenSupply(token.identifier);
    if (!supply.reverted) {
      token.totalSupply = supply.value;
    }
    token.circulatingSupply = BigInt.fromI32(0);
  }
  // if the sender is the zero address, it's a mint
  // we update the circulating supply and create a Mint event
  if (
    event.params.from.toHexString() ==
    "0x0000000000000000000000000000000000000000"
  ) {
    token.circulatingSupply = token.circulatingSupply.plus(event.params.amount);
    let mint = new Mint(event.transaction.hash.toHexString().concat(":0"));

    mint.identifier = token.identifier;
    mint.amount = event.params.amount;
    mint.to = event.params.to.toHexString();

    mint.save();
  }
  if (
    event.params.to.toHexString() ==
    "0x0000000000000000000000000000000000000000"
  ) {
    token.circulatingSupply = token.circulatingSupply.minus(
      event.params.amount
    );

    let burn = new Burn(event.transaction.hash.toHexString().concat(":0"));

    burn.identifier = token.identifier;
    burn.amount = event.params.amount;
    burn.from = event.params.from.toHexString();

    burn.save();
  }

  if (tx == null) {
    tx = new Transaction(event.transaction.hash.toHexString());
    tx.timestamp = event.block.timestamp;
    tx.blocknumber = event.block.number;
  }

  previousOwner.save();
  newOwner.save();
  token.save();
  previousOwnerBalance.save();
  newOwnerBalance.save();
  tx.save();
}

export function handleTransferBatch(event: TransferBatch): void {
  log.debug("Batch transfer detected. From: {} | To: {} | Tx Hash: {}", [
    event.params.from.toHexString(),
    event.params.to.toHexString(),
    event.transaction.hash.toHexString(),
  ]);

  // load Accounts
  let previousOwner = Account.load(event.params.from.toHexString());
  let newOwner = Account.load(event.params.to.toHexString());

  // load Transaction
  let tx = Transaction.load(event.transaction.hash.toHexString());

  // load contract instance
  let instance = SygnumERC1155.bind(event.address);

  if (previousOwner == null) {
    previousOwner = new Account(event.params.from.toHexString());
  }

  if (newOwner == null) {
    newOwner = new Account(event.params.to.toHexString());
  }

  for (let i = 0; i < event.params.ids.length; i++) {
    let tokenId = event.params.ids[i];
    let tokenAmount = event.params.amounts[i];
    // load Token
    let token = Token.load(tokenId.toString());

    // load Balances
    let previousOwnerBalanceId = event.params.from
      .toHexString()
      .concat(":".concat(tokenId.toString()));
    let previousOwnerBalance = Balance.load(previousOwnerBalanceId);
    let newOwnerBalanceId = event.params.to
      .toHexString()
      .concat(":".concat(tokenId.toString()));
    let newOwnerBalance = Balance.load(newOwnerBalanceId);

    if (previousOwnerBalance == null) {
      previousOwnerBalance = new Balance(previousOwnerBalanceId);

      previousOwnerBalance.token = tokenId.toString();
      previousOwnerBalance.account = event.params.from.toHexString();
      // realistically only account there won't be a previousOwner entity for is zero account
      // so makes sense to set its balance to zero
      previousOwnerBalance.value = BigInt.fromI32(0);
    } else {
      let prevTokenAmount = previousOwnerBalance.value;
      if (prevTokenAmount > BigInt.fromI32(0)) {
        previousOwnerBalance.value = prevTokenAmount.minus(tokenAmount);
      }
    }

    if (newOwnerBalance == null) {
      newOwnerBalance = new Balance(newOwnerBalanceId);

      newOwnerBalance.token = tokenId.toString();
      newOwnerBalance.account = event.params.to.toHexString();
      newOwnerBalance.value = tokenAmount;
    } else {
      let prevBalance = newOwnerBalance.value;
      newOwnerBalance.value = prevBalance.plus(tokenAmount);
    }

    if (token == null) {
      token = new Token(tokenId.toString());
      token.collectionId = event.address.toHexString();

      let uri = instance.try_uri(tokenId);
      if (!uri.reverted) {
        token.URI = uri.value;
      }

      token.identifier = tokenId;
      let supply = instance.try_maxTokenSupply(token.identifier);
      if (!supply.reverted) {
        token.totalSupply = supply.value;
      }
      token.circulatingSupply = BigInt.fromI32(0);
    }
    // if the sender is the zero address, it's a mint and we update the circulating supply
    if (
      event.params.from.toHexString() ==
      "0x0000000000000000000000000000000000000000"
    ) {
      token.circulatingSupply = token.circulatingSupply.plus(tokenAmount);

      let mint = new Mint(
        event.transaction.hash.toHexString().concat(":".concat(i.toString()))
      );

      mint.identifier = token.identifier;
      mint.amount = tokenAmount;
      mint.to = event.params.to.toHexString();

      mint.save();
    }
    if (
      event.params.to.toHexString() ==
      "0x0000000000000000000000000000000000000000"
    ) {
      token.circulatingSupply = token.circulatingSupply.minus(tokenAmount);

      let burn = new Burn(
        event.transaction.hash.toHexString().concat(":".concat(i.toString()))
      );

      burn.identifier = token.identifier;
      burn.amount = tokenAmount;
      burn.from = event.params.from.toHexString();

      burn.save();
    }

    token.save();
    previousOwnerBalance.save();
    newOwnerBalance.save();
  }

  if (tx == null) {
    tx = new Transaction(event.transaction.hash.toHexString());
    tx.timestamp = event.block.timestamp;
    tx.blocknumber = event.block.number;
  }

  previousOwner.save();
  newOwner.save();
  tx.save();
}

export function handleInitialized(event: Initialized): void {
  log.debug("Initialization detected. Contract: {} | Hash: {}", [
    event.address.toHexString(),
    event.transaction.hash.toHexString(),
  ]);

  // create new collection
  let collection = new Collection(event.address.toHexString())
  // load contract instance
  let instance = SygnumERC1155.bind(event.address);

  let resSupply = instance.try_maxUniqueTokens();
  if (!resSupply.reverted) {
    collection.maxTokens = resSupply.value;
  }

  let resUri = instance.try_baseUri();
  if (!resUri.reverted) {
    collection.baseUri = resUri.value;
  }

  collection.save();
}
