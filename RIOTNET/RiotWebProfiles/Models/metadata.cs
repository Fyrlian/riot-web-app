using System.Data;

namespace RiotWebProfiles.Models
{
    public class MetadataDto
{
    public string DataVersion { get; set; }
    public string MatchId { get; set; }
    public List<ParticipantDto> Participants { get; set; }
}
}