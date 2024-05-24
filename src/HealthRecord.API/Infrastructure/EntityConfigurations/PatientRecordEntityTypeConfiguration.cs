namespace eHealthscape.HealthRecord.API.Infrastructure.EntityConfigurations;

public class PatientRecordEntityTypeConfiguration : IEntityTypeConfiguration<PatientRecord>
{
    public void Configure(EntityTypeBuilder<PatientRecord> builder)
    {
        builder.ToTable("PatientRecord");

        builder.HasOne(pr => pr.Patient).WithOne()
            .HasForeignKey<PatientRecord>(pr => pr.PatientId).IsRequired(false);

        builder.HasMany(pr => pr.Examinations)
            .WithOne(ex => ex.PatientRecord).HasForeignKey(ex => ex.PatientRecordId);
        builder.HasMany(pr => pr.CareSheets)
            .WithOne(cs => cs.PatientRecord).HasForeignKey(cs => cs.PatientRecordId);
        builder.HasMany(pr => pr.VitalSigns)
            .WithOne(vs => vs.PatientRecord).HasForeignKey(vs => vs.PatientRecordId);
    }
}