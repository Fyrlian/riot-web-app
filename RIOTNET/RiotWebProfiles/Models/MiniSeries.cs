namespace RiotWebProfiles.Models
{
    public class MiniSeries
    {

        public required int wins { get; set; }

        public required int losses { get; set; }

        public required string progress { get; set; }
        
        public required int target { get; set; }
    }
}