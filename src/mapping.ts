import { BigInt, Bytes } from "@graphprotocol/graph-ts"
import {
  AuctionHouse,

  AuctionBid,
  AuctionCreated,
  AuctionSettled,

} from "../generated/AuctionHouse/AuctionHouse"
import { Wizard, Bid } from "../generated/schema"

// Have the entities centered around the wizard 
//    When it was created, when it was settled, what bids it has, etc. 

export function handleAuctionBid(event: AuctionBid): void {

  // const { wizardId, aId, sender, value, extended } = event.params;

  const id = `${event.params.wizardId.toHex()}:${event.params.sender.toHex()}:${event.params.value.toHex()}`
  let bid = new Bid(id);

  bid.wizardId = event.params.wizardId;
  bid.aId = event.params.aId;
  bid.sender = event.params.sender;
  bid.value = event.params.value;
  bid.extended = event.params.extended;

  bid.save();

}

export function handleAuctionCreated(event: AuctionCreated): void {


  // const { wizardId, aId, startTime, endTime, oneOfOne, isWhitelistDay } = event.params;
  let wizard = new Wizard(event.params.wizardId.toHex());

  wizard.wizardId = event.params.wizardId;
  wizard.aId = event.params.aId;
  wizard.winner = new Bytes(0);
  wizard.amount = new BigInt(0);
  wizard.oneOfOne = event.params.oneOfOne;
  wizard.isWhitelistDay = event.params.isWhitelistDay;

  wizard.save();

}

export function handleAuctionSettled(event: AuctionSettled): void {

  // const { wizardId, aId, winner, amount } = event.params;
  const id = event.params.wizardId.toHex()
  let wizard = Wizard.load(id);

  if (wizard == null) {
    wizard = new Wizard(id);

    wizard.wizardId = event.params.wizardId;
    wizard.aId = event.params.aId;
    wizard.oneOfOne = false;
    wizard.isWhitelistDay = false;
  }

  wizard.winner = event.params.winner;
  wizard.amount = event.params.amount;

  wizard.save();

}




