import { BigInt } from "@graphprotocol/graph-ts"
import {
  AuctionHouse,

  AuctionBid,
  AuctionCreated,
  AuctionSettled,

} from "../generated/AuctionHouse/AuctionHouse"
import { AuctionBidEntity, AuctionCreatedEntity, AuctionSettledEntity } from "../generated/schema"

export function handleAuctionBid(event: AuctionBid): void {

  // const { wizardId, aId, sender, value, extended } = event.params;

  const id = `${event.params.wizardId.toHex()}:${event.params.sender.toHex()}:${event.params.value.toHex()}`
  let entity = new AuctionBidEntity(id);

  entity.wizardId = event.params.wizardId;
  entity.aId = event.params.aId;
  entity.sender = event.params.sender;
  entity.value = event.params.value;
  entity.extended = event.params.extended;

  entity.save();

}

export function handleAuctionCreated(event: AuctionCreated): void {


  // const { wizardId, aId, startTime, endTime, oneOfOne, isWhitelistDay } = event.params;
  let entity = new AuctionCreatedEntity(event.params.wizardId.toHex());

  entity.wizardId = event.params.wizardId;
  entity.aId = event.params.aId;
  entity.startTime = event.params.startTime;
  entity.endTime = event.params.endTime;
  entity.oneOfOne = event.params.oneOfOne;
  entity.isWhitelistDay = event.params.isWhitelistDay;

  entity.save();

}

export function handleAuctionSettled(event: AuctionSettled): void {

  // const { wizardId, aId, winner, amount } = event.params;
  let entity = new AuctionSettledEntity(event.params.wizardId.toHex());

  entity.wizardId = event.params.wizardId;
  entity.aId = event.params.aId;
  entity.winner = event.params.winner;
  entity.amount = event.params.amount;

  entity.save();

}




