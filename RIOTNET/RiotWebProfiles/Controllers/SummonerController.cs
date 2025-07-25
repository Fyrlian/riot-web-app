using Microsoft.AspNetCore.Mvc;
using RiotWebProfiles.Services;
using RiotWebProfiles.Models;
using Microsoft.Extensions.Logging;

namespace RiotWebProfiles.Controllers
{
    [ApiController]
    [Route("api/[controller]")]             //la ruta sera api/SummonerController pero se quita directamente el controller por la propiedad de ApiController
    public class SummonerController : ControllerBase
    {
        private readonly RiotService _riotService;
        private readonly ILogger<SummonerController> _logger;
        public SummonerController(RiotService riotService, ILogger<SummonerController> logger)
        {
            _riotService = riotService;
            _logger = logger;
        }
        [HttpGet("{region}/{gameName}/{tagLine}/deprecated")]
        public async Task<ActionResult<Summoner>> getSummoner(string region, string gameName, string tagLine)
        {
            var summoner = await _riotService.getSummonerByRiotId(gameName, tagLine, region);
            _logger.LogInformation("Region: {Region}, Nombre: {GameName}, Tag: {TagLine}", region, gameName, tagLine);
            if (summoner == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(summoner);

            }
        }
        [HttpGet("{region}/{gameName}/{tagLine}/summoner")]
        public async Task<ActionResult<SummonerInfo>> getSummonerInfo(string region, string gameName, string tagLine)
        {
            var summonerInfo = await _riotService.getSummonerInfoByRiotId(gameName, tagLine, region);
            _logger.LogInformation("Region: {Region}, Nombre: {GameName}, Tag: {TagLine}", region, gameName, tagLine);
            if (summonerInfo == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(summonerInfo);
            }

        }

        [HttpGet("{region}/{gameName}/{tagLine}/{queueType}")]
        public async Task<ActionResult<LeagueInfo>> getLeagueInfo(string region, string gameName, string tagLine, string queueType)
        {
            var leagueInfo = await _riotService.getLeagueInfoByRiotId(gameName, tagLine, region, queueType);
            if (leagueInfo == null)
            {
                return NotFound();
            }
            else
            {

                leagueInfo.winrate = (leagueInfo.wins * 100) / (leagueInfo.wins + leagueInfo.losses);

                return Ok(leagueInfo);
            }

        }

        //check this method if it should return string of IDS or MatchDTO probably ID list thats the issue
        [HttpGet("{region}/{gameName}/{tagLine}/{count}/{queue}/matches")]
        public async Task<ActionResult<List<String>>> getMatches( string region,string gameName, string tagLine, int count, int queue)
        {
            var matchIds = await _riotService.getMatchIds(region,gameName, tagLine, count, queue);
            if (matchIds == null)
            {
                return NotFound("No matches for this summoner");
            }

            return Ok(matchIds);
        }

        //controller for the game information
        [HttpGet("{region}/{matchId}")]
        
        //gets the parameters from the front-end request
        public async Task<ActionResult<List<MatchDto>>> getMatchInfo(string region, string matchId)
        {
            //stores the info returned by the service
            var matchInfo = await _riotService.getMatchInfo(region, matchId);
            if (matchInfo == null)
                return NotFound("theres no info for this match ID");

            return Ok(matchInfo);
        }
    }
}
