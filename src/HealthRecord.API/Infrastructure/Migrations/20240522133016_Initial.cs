using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace eHealthscape.HealthRecord.API.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class Initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Patient",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    FirstName = table.Column<string>(type: "text", nullable: false),
                    LastName = table.Column<string>(type: "text", nullable: false),
                    DateOfBirth = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Gender = table.Column<bool>(type: "boolean", nullable: false),
                    Address = table.Column<string>(type: "text", nullable: false),
                    PhoneNumber = table.Column<string>(type: "text", nullable: false),
                    BloodType = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Patient", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "PatientRecord",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    NurseId = table.Column<Guid>(type: "uuid", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    PatientId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PatientRecord", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PatientRecord_Patient_PatientId",
                        column: x => x.PatientId,
                        principalTable: "Patient",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "CarSheet",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    NurseId = table.Column<Guid>(type: "uuid", nullable: false),
                    IssueAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    ProgressNote = table.Column<string>(type: "text", nullable: false),
                    CareInstruction = table.Column<string>(type: "text", nullable: false),
                    PatientRecordId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CarSheet", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CarSheet_PatientRecord_PatientRecordId",
                        column: x => x.PatientRecordId,
                        principalTable: "PatientRecord",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Examination",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    DoctorId = table.Column<Guid>(type: "uuid", nullable: false),
                    IssueAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    ProgressNote = table.Column<string>(type: "text", nullable: false),
                    MedicalServices = table.Column<string>(type: "text", nullable: false),
                    Prescription = table.Column<string>(type: "text", nullable: false),
                    PatientRecordId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Examination", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Examination_PatientRecord_PatientRecordId",
                        column: x => x.PatientRecordId,
                        principalTable: "PatientRecord",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "VitalSign",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Pulse = table.Column<int>(type: "integer", nullable: false),
                    BloodPressure = table.Column<decimal>(type: "numeric", nullable: false),
                    Temperature = table.Column<float>(type: "real", nullable: false),
                    Spo2 = table.Column<int>(type: "integer", nullable: false),
                    RespirationRate = table.Column<int>(type: "integer", nullable: false),
                    Height = table.Column<float>(type: "real", nullable: false),
                    Weight = table.Column<float>(type: "real", nullable: false),
                    MeasureAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    NurseId = table.Column<Guid>(type: "uuid", nullable: false),
                    PatientRecordId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VitalSign", x => x.Id);
                    table.ForeignKey(
                        name: "FK_VitalSign_PatientRecord_PatientRecordId",
                        column: x => x.PatientRecordId,
                        principalTable: "PatientRecord",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CarSheet_PatientRecordId",
                table: "CarSheet",
                column: "PatientRecordId");

            migrationBuilder.CreateIndex(
                name: "IX_Examination_PatientRecordId",
                table: "Examination",
                column: "PatientRecordId");

            migrationBuilder.CreateIndex(
                name: "IX_PatientRecord_PatientId",
                table: "PatientRecord",
                column: "PatientId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_VitalSign_PatientRecordId",
                table: "VitalSign",
                column: "PatientRecordId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CarSheet");

            migrationBuilder.DropTable(
                name: "Examination");

            migrationBuilder.DropTable(
                name: "VitalSign");

            migrationBuilder.DropTable(
                name: "PatientRecord");

            migrationBuilder.DropTable(
                name: "Patient");
        }
    }
}
