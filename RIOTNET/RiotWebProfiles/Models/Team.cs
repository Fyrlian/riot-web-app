namespace RiotWebProfiles.Models
{
    public class TeamDto
    {
        public int TeamId { get; set; }
        public bool Win { get; set; }
        public ObjectivesDto Objectives { get; set; }
        public List<BanDto> Bans { get; set; }
    }
}