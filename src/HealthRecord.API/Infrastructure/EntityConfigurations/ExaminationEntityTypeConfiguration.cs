namespace eHealthscape.HealthRecord.API.Infrastructure.EntityConfigurations;

class ExaminationEntityTypeConfiguration : IEntityTypeConfiguration<Examination>
{
    public void Configure(EntityTypeBuilder<Examination> builder)
    {
        builder.ToTable("Examination");

        builder.HasOne(cs => cs.PatientRecord)
            .WithMany();
    }
}