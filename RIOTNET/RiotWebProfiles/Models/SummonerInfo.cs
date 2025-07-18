namespace RiotWebProfiles.Models
{
    public class SummonerInfo
    {
        public string gameName { get; set; }
        public required int profileIconId { get; set; }
        public required long revisionDate { get; set; }
        public required string puuid { get; set; }
        public required long summonerLevel { get; set; }
    }
}