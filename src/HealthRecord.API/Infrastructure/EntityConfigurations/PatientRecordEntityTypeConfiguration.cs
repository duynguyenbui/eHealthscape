namespace eHealthscape.HealthRecord.API.Infrastructure.EntityConfigurations;

public class PatientRecordEntityTypeConfiguration : IEntityTypeConfiguration<PatientRecord>
{
    public void Configure(EntityTypeBuilder<PatientRecord> builder)
    {
        builder.ToTable("PatientRecord");

        builder.HasOne(pr => pr.Patient).WithOne().HasForeignKey<PatientRecord>(pr => pr.PatientId).IsRequired(false);
    }
}