namespace eHealthscape.HealthRecord.API.Model;

public class CreateVitalSign
{
    public int Pulse { get; set; }
    public decimal BloodPressure { get; set; }
    public float Temperature { get; set; }
    public int Spo2 { get; set; }
    public int RespirationRate { get; set; }
    public float Height { get; set; }
    public float Weight { get; set; }
    public Guid PatientRecordId { get; set; }
}

public class CreateExamination
{
    public Guid DoctorId { get; set; }
    public DateTime IssueAt { get; set; } = DateTime.UtcNow;
    public string ProgressNote { get; set; } = default!;
    public string MedicalServices { get; set; } = default!;
    public string Prescription { get; set; } = default!;

    public Guid PatientRecordId { get; set; }
}

public class CreateCareSheet
{
    public Guid NurseId { get; set; }
    public string ProgressNote { get; set; } = default!;
    public string CareInstruction { get; set; } = default!;

    public Guid PatientRecordId { get; set; }
}

public class CreatePatient
{
    public string FirstName { get; set; } = default!;
    public string LastName { get; set; } = default!;
    public DateTime DateOfBirth { get; set; }
    public bool Gender { get; set; }
    public string Address { get; set; } = default!;
    public string PhoneNumber { get; set; } = default!;
    public string BloodType { get; set; } = default!;
}