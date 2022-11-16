import { SygnumERC1155 } from "../generated/templates";
import { NewCollection } from "../generated/NFTfactory/NFTFactory";

export function NewCollectionHandler(event: NewCollection): void {
  // Start indexing the exchange; `event.params.exchange` is the
  // address of the new exchange contract
  SygnumERC1155.create(event.params._proxyAddress);
}
