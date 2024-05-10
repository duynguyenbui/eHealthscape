namespace eHealthscape.HealthRecord.API.Infrastructure;

/// <remarks>
/// Add migrations using the following command inside the 'Catalog.API' project directory:
///
/// dotnet ef migrations add --context CatalogContext [migration-name]
/// </remarks>
public class HealthRecordContext : DbContext
{
    public HealthRecordContext(DbContextOptions options) : base(options)
    {
    }

    public DbSet<CareSheet> CareSheets { get; set; }
    public DbSet<Examination> Examinations { get; set; }
    public DbSet<Patient> Patients { get; set; }
    public DbSet<PatientRecord> PatientRecords { get; set; }
    public DbSet<VitalSign> VitalSigns { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        builder.ApplyConfiguration(new CareSheetEntityTypeConfiguration());
        builder.ApplyConfiguration(new ExaminationEntityTypeConfiguration());
        builder.ApplyConfiguration(new PatientEntityTypeConfiguration());
        builder.ApplyConfiguration(new VitalSignEntityTypeConfiguration());
        builder.ApplyConfiguration(new PatientRecordEntityTypeConfiguration());
    }
}