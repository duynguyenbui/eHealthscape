namespace eHealthscape.HealthRecord.API.Infrastructure.EntityConfigurations;

class PatientEntityTypeConfiguration : IEntityTypeConfiguration<Patient>
{
    public void Configure(EntityTypeBuilder<Patient> builder)
    {
        builder.ToTable("Patient");
    }
}