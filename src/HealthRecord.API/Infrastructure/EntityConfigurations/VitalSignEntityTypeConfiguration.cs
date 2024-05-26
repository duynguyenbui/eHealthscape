namespace eHealthscape.HealthRecord.API.Infrastructure.EntityConfigurations;

class VitalSignEntityTypeConfiguration : IEntityTypeConfiguration<VitalSign>
{
    public void Configure(EntityTypeBuilder<VitalSign> builder)
    {
        builder.ToTable("VitalSign");

        builder.HasOne(vs => vs.PatientRecord).WithMany().OnDelete(DeleteBehavior.Cascade);
    }
}