using System.ComponentModel.DataAnnotations;

namespace asp.net_xss.Models
{
    public class MessageEntity
    {
        [Key]
        public Guid Id { get; set; }

        public string Title { get; set; } = null!;

        public string? Body { get; set; }

    }
}
