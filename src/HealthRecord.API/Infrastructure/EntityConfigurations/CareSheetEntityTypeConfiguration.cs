namespace eHealthscape.HealthRecord.API.Infrastructure.EntityConfigurations;

class CareSheetEntityTypeConfiguration : IEntityTypeConfiguration<CareSheet>
{
    public void Configure(EntityTypeBuilder<CareSheet> builder)
    {
        builder.ToTable("CarSheet");

        builder.HasOne(cs => cs.PatientRecord)
            .WithMany().OnDelete(DeleteBehavior.Cascade);
    }
}