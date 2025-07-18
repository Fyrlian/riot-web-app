namespace RiotWebProfiles.Models
{
    public class LeagueInfo
    {
        public required String leagueId { get; set; }

        public required String puuid { get; set; }

        public required String queueType { get; set; }

        public required String tier { get; set; }

        public required String rank { get; set; }

        public required int leaguePoints { get; set; }

        public required int wins { get; set; }

        public required int losses { get; set; }

        public required bool hotStreak { get; set; }

        public required bool veteran { get; set; }

        public required bool freshBlood { get; set; }

        public required bool inactive { get; set; }
        
        public MiniSeries miniSeries { get; set; } //not used bcs there are promos no more

        public double winrate { get; set; }
    }
}