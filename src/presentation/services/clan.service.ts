import { Clan, ClanMember, ClanMemberRole } from "../../data";
import { CreateClanDTO, CustomError, JoinMember } from "../../domain";
import { PlayerService } from "./player.service";



export class ClanService {

  constructor(
    private readonly playerService: PlayerService
  ) { }

  async createClan(createClanDTO: CreateClanDTO) {

    const clan = new Clan();
    clan.name = createClanDTO.name;

    try {
      return await clan.save()
    } catch (error) {
      throw CustomError.internalServer("Something went wrong")
    }
  }

  async addMemberToClan(playerReceiverId: number, joinMemberDTO: JoinMember) {
    const playerReceiverPromise = this.playerService.findOnePlayer(playerReceiverId);
    const playerSenderPromise = this.playerService.findOnePlayer(joinMemberDTO.senderMemberId)

    const [playerReceiver, playerSender] = await Promise.all([playerReceiverPromise, playerSenderPromise])

    if (!playerReceiver) throw CustomError.notFound("Player Receiver not found")
    if (!playerSender) throw CustomError.notFound("Player Sender not found")

    const allowedRoles = [ClanMemberRole.MASTER, ClanMemberRole.OFFICER, ClanMemberRole.SUBOFFICER]

    if (!allowedRoles.includes(playerSender.clanMembers[0].role)) {
      throw CustomError.badRequest("You don't have permission to join this clan")
    }

    const clanMember = new ClanMember();
    clanMember.player = playerReceiver;
    clanMember.clan = playerSender.clanMembers[0].clan;

    try {
      return await clanMember.save()
    } catch (error) {
      throw CustomError.internalServer("Something went wrong")
    }
  }
}