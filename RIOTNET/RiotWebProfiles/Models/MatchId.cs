namespace RiotWebProfiles.Models
{
    public class MatchId
    {
        public required string puuid { get; set; }

        public long startTime { get; set; }

        public long endTime { get; set; }

        public int queue { get; set; }

        public string type { get; set; }

        public int start { get; set; }

        public int count { get; set; }

    }
}