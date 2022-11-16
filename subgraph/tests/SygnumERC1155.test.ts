import {
  TransferSingle,
  TransferBatch,
  Initialized,
  SygnumERC1155,
} from "../generated/SygnumERC1155/SygnumERC1155";
import { log, Address, BigInt, ethereum } from "@graphprotocol/graph-ts";
import {
  newMockEvent,
  describe,
  test,
  assert,
  createMockedFunction,
  beforeAll,
  beforeEach,
  clearStore,
} from "matchstick-as/assembly/index";
import {
  handleTransferSingle,
  handleTransferBatch,
  handleInitialized,
} from "../src/erc1155";

export function createNewTransferSingle(
  operator: string,
  from: string,
  to: string,
  id: number,
  amount: number
): TransferSingle {
  let transferSingleEvent = changetype<TransferSingle>(newMockEvent());
  transferSingleEvent.parameters = new Array();

  let operatorParam = new ethereum.EventParam(
    "operator",
    ethereum.Value.fromAddress(Address.fromString(operator))
  );
  let fromParam = new ethereum.EventParam(
    "from",
    ethereum.Value.fromAddress(Address.fromString(from))
  );
  let toParam = new ethereum.EventParam(
    "to",
    ethereum.Value.fromAddress(Address.fromString(to))
  );
  let idParam = new ethereum.EventParam(
    "id",
    ethereum.Value.fromI32(id as i32)
  );
  let amountParam = new ethereum.EventParam(
    "amount",
    ethereum.Value.fromI32(amount as i32)
  );

  transferSingleEvent.parameters.push(operatorParam);
  transferSingleEvent.parameters.push(fromParam);
  transferSingleEvent.parameters.push(toParam);
  transferSingleEvent.parameters.push(idParam);
  transferSingleEvent.parameters.push(amountParam);

  return transferSingleEvent;
}

export function createNewTransferBatchEvent(
  operator: string,
  from: string,
  to: string,
  ids: number[],
  amounts: number[]
): TransferBatch {
  let transferBatchEvent = changetype<TransferBatch>(newMockEvent());
  transferBatchEvent.parameters = new Array();

  let operatorParam = new ethereum.EventParam(
    "operator",
    ethereum.Value.fromAddress(Address.fromString(operator))
  );
  let fromParam = new ethereum.EventParam(
    "from",
    ethereum.Value.fromAddress(Address.fromString(from))
  );
  let toParam = new ethereum.EventParam(
    "to",
    ethereum.Value.fromAddress(Address.fromString(to))
  );
  let idsParam = new ethereum.EventParam(
    "id",
    ethereum.Value.fromI32Array(ids.map<i32>((id) => id as i32))
  );
  let amountsParam = new ethereum.EventParam(
    "amount",
    ethereum.Value.fromI32Array(amounts.map<i32>((amount) => amount as i32))
  );

  transferBatchEvent.parameters.push(operatorParam);
  transferBatchEvent.parameters.push(fromParam);
  transferBatchEvent.parameters.push(toParam);
  transferBatchEvent.parameters.push(idsParam);
  transferBatchEvent.parameters.push(amountsParam);

  return transferBatchEvent;
}

export function createNewInitializedEvent(
  maxUniqueTokens: number,
  baseUri: string
): Initialized {
  let initializedEvent = changetype<Initialized>(newMockEvent());
  initializedEvent.parameters = new Array();

  let baseUriParam = new ethereum.EventParam(
    "baseUri",
    ethereum.Value.fromString(baseUri)
  );
  let maxSupplyParam = new ethereum.EventParam(
    "maxUniqueTokens",
    ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(maxUniqueTokens as i32))
  );

  initializedEvent.parameters.push(maxSupplyParam);
  initializedEvent.parameters.push(baseUriParam);

  return initializedEvent;
}

let newInitializedEvent: Initialized;
describe("Initialized", () => {
  beforeEach(() => {
    clearStore();
    newInitializedEvent = createNewInitializedEvent(250, "https://sygnum.com/");

    createMockedFunction(
      newInitializedEvent.address,
      "baseUri",
      "baseUri():(string)"
    ).returns([ethereum.Value.fromString("https://sygnum.com/")]);

    createMockedFunction(
      newInitializedEvent.address,
      "maxUniqueTokens",
      "maxUniqueTokens():(uint256)"
    ).returns([ethereum.Value.fromI32(250)]);

    handleInitialized(newInitializedEvent);
  });
  test("Collection fields set correctly", () => {
    assert.fieldEquals("Collection", "0", "maxTokens", "250");
    assert.fieldEquals("Collection", "0", "baseUri", "https://sygnum.com/");
  });
});

let newTransferSingleEvent: TransferSingle;
describe("Non-mint SingleTransfer", () => {
  beforeAll(() => {
    clearStore();
    newTransferSingleEvent = createNewTransferSingle(
      "0x0000000000000000000000000000000000000000",
      "0xBEEF000000000000000000000000000000000000",
      "0x1230000000000000000000000000000000000000",
      1,
      2
    );

    createMockedFunction(
      newTransferSingleEvent.address,
      "uri",
      "uri(uint256):(string)"
    )
      .withArgs([ethereum.Value.fromUnsignedBigInt(BigInt.fromString("1"))])
      .returns([ethereum.Value.fromString("https://sygnum.com/1.json")]);

    createMockedFunction(
      newTransferSingleEvent.address,
      "maxTokenSupply",
      "maxTokenSupply(uint256):(uint256)"
    )
      .withArgs([ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(1))])
      .returns([ethereum.Value.fromI32(25)]);

    handleTransferSingle(newTransferSingleEvent);
  });
  test("Token fields set correctly", () => {
    assert.fieldEquals("Token", "1", "identifier", "1");
    assert.fieldEquals("Token", "1", "URI", "https://sygnum.com/1.json");
    assert.fieldEquals("Token", "1", "totalSupply", "25");
    assert.fieldEquals("Token", "1", "circulatingSupply", "0");
  });
  test("Balance fields set correctly", () => {
    assert.fieldEquals(
      "Balance",
      "0x1230000000000000000000000000000000000000:1",
      "token",
      "1"
    );
    assert.fieldEquals(
      "Balance",
      "0x1230000000000000000000000000000000000000:1",
      "value",
      "2"
    );
  });
  test("Transaction fields set correctly", () => {
    assert.fieldEquals(
      "Transaction",
      newTransferSingleEvent.transaction.hash.toHexString(),
      "blocknumber",
      newTransferSingleEvent.block.number.toString()
    );
    assert.fieldEquals(
      "Transaction",
      newTransferSingleEvent.transaction.hash.toHexString(),
      "timestamp",
      newTransferSingleEvent.block.timestamp.toString()
    );
  });
});

describe("Minting TransferSingle", () => {
  beforeAll(() => {
    clearStore();
    newTransferSingleEvent = createNewTransferSingle(
      "0x0000000000000000000000000000000000000000",
      "0x0000000000000000000000000000000000000000",
      "0x1230000000000000000000000000000000000000",
      2,
      3
    );
    log.debug("Single transfer detected. From: {}", [
      newTransferSingleEvent.address.toHexString(),
    ]);
    createMockedFunction(
      newTransferSingleEvent.address,
      "uri",
      "uri(uint256):(string)"
    )
      .withArgs([ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(2))])
      .returns([ethereum.Value.fromString("https://sygnum.com/2.json")]);

    createMockedFunction(
      newTransferSingleEvent.address,
      "maxTokenSupply",
      "maxTokenSupply(uint256):(uint256)"
    )
      .withArgs([ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(2))])
      .returns([ethereum.Value.fromI32(25)]);

    handleTransferSingle(newTransferSingleEvent);
  });
  test("Token fields set correctly", () => {
    assert.fieldEquals("Token", "2", "identifier", "2");
    assert.fieldEquals("Token", "2", "URI", "https://sygnum.com/2.json");
    assert.fieldEquals("Token", "2", "totalSupply", "25");
    assert.fieldEquals("Token", "2", "circulatingSupply", "3");
  });
  test("Mint fields set correctly", () => {
    let mintId = newTransferSingleEvent.transaction.hash
      .toHexString()
      .concat(":0");
    assert.fieldEquals("Mint", mintId, "identifier", "2");
    assert.fieldEquals(
      "Mint",
      mintId,
      "to",
      "0x1230000000000000000000000000000000000000"
    );
    assert.fieldEquals("Mint", mintId, "amount", "3");
  });
  test("Balance fields set correctly", () => {
    assert.fieldEquals(
      "Balance",
      "0x1230000000000000000000000000000000000000:2",
      "token",
      "2"
    );
    assert.fieldEquals(
      "Balance",
      "0x1230000000000000000000000000000000000000:2",
      "value",
      "3"
    );
  });
  test("Transaction fields set correctly", () => {
    assert.fieldEquals(
      "Transaction",
      newTransferSingleEvent.transaction.hash.toHexString(),
      "blocknumber",
      newTransferSingleEvent.block.number.toString()
    );
    assert.fieldEquals(
      "Transaction",
      newTransferSingleEvent.transaction.hash.toHexString(),
      "timestamp",
      newTransferSingleEvent.block.timestamp.toString()
    );
  });
});

let newTransferBatchEvent: TransferBatch;
describe("Non-minting TransferBatch", () => {
  beforeAll(() => {
    clearStore();
    newTransferBatchEvent = createNewTransferBatchEvent(
      "0x0000000000000000000000000000000000000000",
      "0xBEEF000000000000000000000000000000000000",
      "0x1230000000000000000000000000000000000000",
      [3, 4],
      [10, 20]
    );
    createMockedFunction(
      newTransferBatchEvent.address,
      "uri",
      "uri(uint256):(string)"
    )
      .withArgs([ethereum.Value.fromUnsignedBigInt(BigInt.fromString("3"))])
      .returns([ethereum.Value.fromString("https://sygnum.com/3.json")]);
    createMockedFunction(
      newTransferBatchEvent.address,
      "uri",
      "uri(uint256):(string)"
    )
      .withArgs([ethereum.Value.fromUnsignedBigInt(BigInt.fromString("4"))])
      .returns([ethereum.Value.fromString("https://sygnum.com/4.json")]);
    createMockedFunction(
      newTransferBatchEvent.address,
      "maxTokenSupply",
      "maxTokenSupply(uint256):(uint256)"
    )
      .withArgs([ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(3))])
      .returns([ethereum.Value.fromI32(30)]);
    createMockedFunction(
      newTransferBatchEvent.address,
      "maxTokenSupply",
      "maxTokenSupply(uint256):(uint256)"
    )
      .withArgs([ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(4))])
      .returns([ethereum.Value.fromI32(40)]);
    handleTransferBatch(newTransferBatchEvent);
  });
  test("Token fields set correctly", () => {
    assert.fieldEquals("Token", "3", "identifier", "3");
    assert.fieldEquals("Token", "3", "URI", "https://sygnum.com/3.json");
    assert.fieldEquals("Token", "3", "totalSupply", "30");
    assert.fieldEquals("Token", "3", "circulatingSupply", "0");

    assert.fieldEquals("Token", "4", "identifier", "4");
    assert.fieldEquals("Token", "4", "URI", "https://sygnum.com/4.json");
    assert.fieldEquals("Token", "4", "totalSupply", "40");
    assert.fieldEquals("Token", "4", "circulatingSupply", "0");
  });
  test("Balance fields set correctly", () => {
    assert.fieldEquals(
      "Balance",
      "0x1230000000000000000000000000000000000000:3",
      "token",
      "3"
    );
    assert.fieldEquals(
      "Balance",
      "0x1230000000000000000000000000000000000000:3",
      "value",
      "10"
    );

    assert.fieldEquals(
      "Balance",
      "0x1230000000000000000000000000000000000000:4",
      "token",
      "4"
    );
    assert.fieldEquals(
      "Balance",
      "0x1230000000000000000000000000000000000000:4",
      "value",
      "20"
    );
  });
  test("Transaction fields set correctly", () => {
    assert.fieldEquals(
      "Transaction",
      newTransferBatchEvent.transaction.hash.toHexString(),
      "blocknumber",
      newTransferBatchEvent.block.number.toString()
    );
    assert.fieldEquals(
      "Transaction",
      newTransferBatchEvent.transaction.hash.toHexString(),
      "timestamp",
      newTransferBatchEvent.block.timestamp.toString()
    );
  });
});

describe("Minting TransferBatch", () => {
  beforeAll(() => {
    clearStore();
    newTransferBatchEvent = createNewTransferBatchEvent(
      "0x0000000000000000000000000000000000000000",
      "0x0000000000000000000000000000000000000000",
      "0x1230000000000000000000000000000000000000",
      [3, 4],
      [10, 20]
    );
    createMockedFunction(
      newTransferBatchEvent.address,
      "uri",
      "uri(uint256):(string)"
    )
      .withArgs([ethereum.Value.fromUnsignedBigInt(BigInt.fromString("3"))])
      .returns([ethereum.Value.fromString("https://sygnum.com/3.json")]);
    createMockedFunction(
      newTransferBatchEvent.address,
      "uri",
      "uri(uint256):(string)"
    )
      .withArgs([ethereum.Value.fromUnsignedBigInt(BigInt.fromString("4"))])
      .returns([ethereum.Value.fromString("https://sygnum.com/4.json")]);
    createMockedFunction(
      newTransferBatchEvent.address,
      "maxTokenSupply",
      "maxTokenSupply(uint256):(uint256)"
    )
      .withArgs([ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(3))])
      .returns([ethereum.Value.fromI32(30)]);
    createMockedFunction(
      newTransferBatchEvent.address,
      "maxTokenSupply",
      "maxTokenSupply(uint256):(uint256)"
    )
      .withArgs([ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(4))])
      .returns([ethereum.Value.fromI32(40)]);
    handleTransferBatch(newTransferBatchEvent);
  });
  test("Token fields set correctly", () => {
    assert.fieldEquals("Token", "3", "identifier", "3");
    assert.fieldEquals("Token", "3", "URI", "https://sygnum.com/3.json");
    assert.fieldEquals("Token", "3", "totalSupply", "30");
    assert.fieldEquals("Token", "3", "circulatingSupply", "10");

    assert.fieldEquals("Token", "4", "identifier", "4");
    assert.fieldEquals("Token", "4", "URI", "https://sygnum.com/4.json");
    assert.fieldEquals("Token", "4", "totalSupply", "40");
    assert.fieldEquals("Token", "4", "circulatingSupply", "20");
  });
  test("Balance fields set correctly", () => {
    assert.fieldEquals(
      "Balance",
      "0x1230000000000000000000000000000000000000:3",
      "token",
      "3"
    );
    assert.fieldEquals(
      "Balance",
      "0x1230000000000000000000000000000000000000:3",
      "value",
      "10"
    );

    assert.fieldEquals(
      "Balance",
      "0x1230000000000000000000000000000000000000:4",
      "token",
      "4"
    );
    assert.fieldEquals(
      "Balance",
      "0x1230000000000000000000000000000000000000:4",
      "value",
      "20"
    );
  });
  test("Mint fields set correctly", () => {
    let mintId = newTransferBatchEvent.transaction.hash
      .toHexString()
      .concat(":0");
    assert.fieldEquals("Mint", mintId, "identifier", "3");
    assert.fieldEquals(
      "Mint",
      mintId,
      "to",
      "0x1230000000000000000000000000000000000000"
    );
    assert.fieldEquals("Mint", mintId, "amount", "10");

    mintId = newTransferBatchEvent.transaction.hash.toHexString().concat(":1");
    assert.fieldEquals("Mint", mintId, "identifier", "4");
    assert.fieldEquals(
      "Mint",
      mintId,
      "to",
      "0x1230000000000000000000000000000000000000"
    );
    assert.fieldEquals("Mint", mintId, "amount", "20");
  });
  test("Transaction fields set correctly", () => {
    assert.fieldEquals(
      "Transaction",
      newTransferBatchEvent.transaction.hash.toHexString(),
      "blocknumber",
      newTransferBatchEvent.block.number.toString()
    );
    assert.fieldEquals(
      "Transaction",
      newTransferBatchEvent.transaction.hash.toHexString(),
      "timestamp",
      newTransferBatchEvent.block.timestamp.toString()
    );
  });
});
