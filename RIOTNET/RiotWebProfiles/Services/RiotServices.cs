using System.Net.Http;
using System.Net.Http.Headers;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using RiotWebProfiles.Models;
using Microsoft.Extensions.Logging;
using System.Collections;

namespace RiotWebProfiles.Services
{
    //this class will manage every connection with the RIOT api throught different services
    public class RiotService
    {
        private readonly HttpClient _httpClient;
        private readonly string _apiKey;
        private readonly ILogger<RiotService> _logger;

        public RiotService(HttpClient httpClient, IConfiguration configuration, ILogger<RiotService> logger)
        {
            _httpClient = httpClient;
            _apiKey = configuration["RiotApi:ApiKey"];
            _logger = logger;
        }

        public async Task<Summoner> getSummonerByRiotId(string gameName, string tagLine, string region)     //get summoner by riot id converting it to puuid
        {
            _logger.LogInformation("Iniciando llamada a Riot API con region={Region}, gameName={GameName}, tagLine={TagLine}", region, gameName, tagLine);

            var url = $"https://{region}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/{gameName}/{tagLine}";
            _logger.LogInformation("URL: {Url}", url);

            var request = new HttpRequestMessage(HttpMethod.Get, url);
            request.Headers.Add("X-Riot-Token", _apiKey);

            var response = await _httpClient.SendAsync(request);

            if (!response.IsSuccessStatusCode)
            {
                return null;
            }

            var json = await response.Content.ReadAsStringAsync();

            // Deserializamos el JSON a SummonerDto (asegúrate de que las propiedades coincidan)
            var summoner = JsonSerializer.Deserialize<Summoner>(json, new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            });

            return summoner;
        }

        public async Task<SummonerInfo> getSummonerInfoByRiotId(string gameName, string tagLine, string region)
        {
            var summoner = await getSummonerByRiotId(gameName, tagLine, region);
            
            var puuid = summoner.puuid;

            string regionShorten = "";
            switch (region)
            {
                case ("europe"): regionShorten = "euw1"; break;
                default: regionShorten = "euw1"; break;
            }

            var url2 = $"https://{regionShorten}.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/{puuid}";

            var request2 = new HttpRequestMessage(HttpMethod.Get, url2);
            request2.Headers.Add("X-Riot-Token", _apiKey);

            var response2 = await _httpClient.SendAsync(request2);

            if (!response2.IsSuccessStatusCode)
            {
                return null;
            }

            var json2 = await response2.Content.ReadAsStringAsync();

            // Deserializamos el JSON a SummonerDto (asegúrate de que las propiedades coincidan)
            var summonerInfo = JsonSerializer.Deserialize<SummonerInfo>(json2, new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            });

            summonerInfo.gameName = gameName;

            return summonerInfo;

        }

        public async Task<LeagueInfo> getLeagueInfoByRiotId(string gameName, string tagLine, string region, string queueTypeFront)
        {
            var summoner = await getSummonerByRiotId(gameName, tagLine, region);

            var puuid = summoner.puuid;

            string regionShorten = "";
            switch (region)
            {
                case ("europe"): regionShorten = "euw1"; break;
                default: regionShorten = "euw1"; break;
            }

            var url2 = $"https://{regionShorten}.api.riotgames.com/lol/league/v4/entries/by-puuid/{puuid}";

            var request2 = new HttpRequestMessage(HttpMethod.Get, url2);
            request2.Headers.Add("X-Riot-Token", _apiKey);

            var response2 = await _httpClient.SendAsync(request2);

            if (!response2.IsSuccessStatusCode)
            {
                return null;
            }

            var json2 = await response2.Content.ReadAsStringAsync();

            var leagueInfo = JsonSerializer.Deserialize<List<LeagueInfo>>(json2, new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            });

            var soloQueue = leagueInfo?.FirstOrDefault(l => l.queueType == queueTypeFront);

            return soloQueue;

        }

        public async Task<List<string>> getMatchIds(string region,string gameName, string tagLine, int count, int queue)     //get matches id
        {
            var summoner = await getSummonerByRiotId(gameName, tagLine, region);

            var puuid = summoner.puuid;

            var url = $"https://{region}.api.riotgames.com/lol/match/v5/matches/by-puuid/{puuid}/ids?count={count}&queue={queue}";
            _logger.LogInformation("Get match IDS URL: {Url}", url);

            var request = new HttpRequestMessage(HttpMethod.Get, url);
            request.Headers.Add("X-Riot-Token", _apiKey);

            var response = await _httpClient.SendAsync(request);

            if (!response.IsSuccessStatusCode)
            {
                return null;
            }

            var json = await response.Content.ReadAsStringAsync();

            var matchId = JsonSerializer.Deserialize<List<string>>(json, new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            });

            return matchId;
        }

        //gets match information from RIOT's API using the region of the game and the ID.
        public async Task<MatchDto> getMatchInfo(string region, string matchId)
        {
            var url = $"https://{region}.api.riotgames.com/lol/match/v5/matches/{matchId}";
            _logger.LogInformation("URL: {url}", url);

            //creates the request and adds the api key.
            var request = new HttpRequestMessage(HttpMethod.Get, url);
            request.Headers.Add("X-Riot-Token", _apiKey);

            //stores the response
            var response = await _httpClient.SendAsync(request);

            if (!response.IsSuccessStatusCode)
            {
                return null;
            }

            //stores the content of the response
            var json = await response.Content.ReadAsStringAsync();

            //deseriales the JSON matching the clasas MatchDto properties (not caring about uppercase)
            var matchInfo = JsonSerializer.Deserialize<MatchDto>(json, new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            });

            //returns the information
            return matchInfo;
        }
    }
}
