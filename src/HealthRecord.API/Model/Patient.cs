namespace eHealthscape.HealthRecord.API.Model;

public class Patient
{
    public Guid Id { get; set; }
    public string FirstName { get; set; } = default!;
    public string LastName { get; set; } = default!;
    public DateTime DateOfBirth { get; set; }
    public bool Gender { get; set; }
    public string Address { get; set; } = default!;
    public string PhoneNumber { get; set; } = default!;
    public string BloodType { get; set; } = default!;
    
    // TODO: Add information related to social security
}