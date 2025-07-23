using System.Data;

namespace RiotWebProfiles.Models
{
    public class MetadataDto
{
    public string DataVersion { get; set; }
    public string MatchId { get; set; }
    public List<String> Participants { get; set; }
}
}