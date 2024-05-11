using Microsoft.AspNetCore.Http.HttpResults;

namespace eHealthscape.HealthRecord.API.Apis;

public static class HealthRecordApi
{
    // Maps the Health Record V1 endpoint route. Handles the GET request for the Health Record API V1.0 and logs the activity.
    public static void MapHealthRecordV1(this IEndpointRouteBuilder app)
    {
        var api = app.MapGroup("api/healthrecord").HasApiVersion(1.0);

        // Creating patient
        api.MapPost("/patients", CreatePatient);
        api.MapPut("/patients", UpdatePatient);
        api.MapDelete("/patients/{patientId:Guid}", DeletePatient);

        // Querying patient
        api.MapGet("/patients/all", GetPatients);
        api.MapGet("/patients/{patientId:Guid}", GetPatientById);
        api.MapGet("/patients/bloodtypes/{bloodType:minlength(1)}", GetPatientsByBloodType);
        api.MapGet("/patients/bloodtypes/all",
            async (HealthRecordContext context) =>
                await context.Patients.Select(p => p.BloodType).Distinct().ToListAsync());

        // Querying patient records

        // Modifying patient records

        // Check info
        api.MapGet("/", HealthRecordInfo);
    }


    // Querying patient api routes
    private static async Task<Ok<PaginatedItems<Patient>>> GetPatients(
        [AsParameters] PaginationRequest paginationRequest, [AsParameters] HealthRecordServices services)
    {
        var pageSize = paginationRequest.PageSize;
        var pageIndex = paginationRequest.PageIndex;

        var root = (IQueryable<Patient>)services.Context.Patients;

        var totalItems = await root
            .LongCountAsync();

        var itemsOnPage = await root
            .Skip(pageSize * pageIndex)
            .Take(pageSize)
            .ToListAsync();

        return TypedResults.Ok(new PaginatedItems<Patient>(pageIndex, pageSize, totalItems, itemsOnPage));
    }

    private static async Task<Ok<PaginatedItems<Patient>>> GetPatientsByBloodType(
        [AsParameters] PaginationRequest paginationRequest,
        [AsParameters] HealthRecordServices services,
        string? bloodType)
    {
        var pageSize = paginationRequest.PageSize;
        var pageIndex = paginationRequest.PageIndex;

        var root = (IQueryable<Patient>)services.Context.Patients;

        if (bloodType is not null)
        {
            root = root.Where(ci => ci.BloodType == bloodType);
        }

        var totalItems = await root
            .LongCountAsync();

        var itemsOnPage = await root
            .Skip(pageSize * pageIndex)
            .Take(pageSize)
            .ToListAsync();

        return TypedResults.Ok(new PaginatedItems<Patient>(pageIndex, pageSize, totalItems, itemsOnPage));
    }

    private static async Task<Results<Ok<Patient>, BadRequest<string>, NotFound>> GetPatientById(
        [AsParameters] HealthRecordServices services, Guid patientId)
    {
        services.Logger.LogInformation($"Info:::Called API route api/healthrecord/patient/{patientId.ToString()}");
        if (patientId == Guid.Empty)
        {
            return TypedResults.BadRequest("Patient Id is not valid.");
        }

        var patient = await services.Context.Patients.SingleOrDefaultAsync(p => p.Id == patientId);

        if (patient == null)
        {
            return TypedResults.NotFound();
        }

        return TypedResults.Ok(patient);
    }


    // Modifying patient api routes
    private static async Task<Created> CreatePatient([AsParameters] HealthRecordServices services, Patient created)
    {
        services.Logger.LogInformation("Info:::Called API route 'api/healthrecord/patient'");
        var patient = new Patient()
        {
            Id = Guid.NewGuid(),
            FirstName = created.FirstName,
            LastName = created.LastName,
            DateOfBirth = created.DateOfBirth,
            Gender = created.Gender,
            Address = created.Address,
            PhoneNumber = created.PhoneNumber,
            BloodType = created.BloodType
        };

        services.Context.Patients.Add(patient);
        await services.Context.SaveChangesAsync();

        return TypedResults.Created($"/api/healthrecord/patient/{patient.Id}");
    }

    private static async Task<Results<Created, NotFound<string>>> UpdatePatient(
        [AsParameters] HealthRecordServices services,
        Patient patientNeedToUpdate)
    {
        var patient = await services.Context.Patients.SingleOrDefaultAsync(p => p.Id == patientNeedToUpdate.Id);

        if (patient == null)
        {
            return TypedResults.NotFound($"Patient with GUID {patientNeedToUpdate.Id} not found.");
        }

        // Update current product
        var patientEntry = services.Context.Entry(patient);
        patientEntry.CurrentValues.SetValues(patientNeedToUpdate);

        await services.Context.SaveChangesAsync();

        return TypedResults.Created($"/api/patients/{patientNeedToUpdate.Id}");
    }

    private static async Task<Results<NoContent, NotFound<string>>> DeletePatient(
        [AsParameters] HealthRecordServices services,
        Guid patientId)
    {
        var patient = await services.Context.Patients.SingleOrDefaultAsync(p => p.Id == patientId);

        if (patient is null)
        {
            return TypedResults.NotFound($"Patient with GUID {patientId} not found.");
        }

        services.Context.Patients.Remove(patient);
        await services.Context.SaveChangesAsync();

        return TypedResults.NoContent();
    }

    // Check info patient service
    private static Task<Results<Ok<string>, BadRequest>> HealthRecordInfo([AsParameters] HealthRecordServices services)
    {
        services.Logger.LogInformation("Called API route 'api/healthrecord'");
        return Task.FromResult<Results<Ok<string>, BadRequest>>(TypedResults.Ok("Health Record API V1.0"));
    }
}