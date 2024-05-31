namespace eHealthscape.HealthRecord.API.Apis;

public static class HealthRecordApi
{
    // Maps the Health Record V1 endpoint route. Handles the GET request for the Health Record API V1.0 and logs the activity.
    public static RouteGroupBuilder MapHealthRecordV1(this IEndpointRouteBuilder app)
    {
        var api = app.MapGroup("api").HasApiVersion(1.0);

        var doctor = api.MapGroup("").RequireAuthorization(builder => builder.RequireRole("Doctor"));
        var nurse = api.MapGroup("").RequireAuthorization(builder => builder.RequireRole("Nurse"));
        
        // Modifying patients
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
        api.MapGet("/healthrecords/related/to/patient/{patientId:Guid}", GetHealthRecordsByPatientId);

        // Querying Vital Signs
        api.MapGet("/healthrecords/vitalsigns/{patientRecordId:Guid}", GetVitalSignByPatientRecordId);

        // Querying examination records
        api.MapGet("/healthrecords/examinations/related/to/{patientRecordId:Guid}", GetExaminationByPatientRecordId);
        api.MapGet("/healthrecords/examinations/{examinationId:Guid}",
            ([AsParameters] HealthRecordServices services, Guid examinationId) =>
            {
                return services.Context.Examinations.SingleOrDefaultAsync(ex => ex.Id == examinationId);
            });

        // Querying care sheets
        api.MapGet("/healthrecords/caresheets/related/to/{patientRecordId:Guid}", GetCareSheetsByPatientRecordId);
        api.MapGet("/healthrecords/caresheets/{caresheetId:Guid}",
            ([AsParameters] HealthRecordServices services, Guid caresheetId) =>
            {
                return services.Context.CareSheets.SingleOrDefaultAsync(ex => ex.Id == caresheetId);
            });

        // Modifying patient records
        api.MapPost("/healthrecords/vitalsigns", CreateVitalSign);
        api.MapPost("/healthrecords/examinations", CreateExamination);
        api.MapPost("/healthrecords/caresheets", CreateCareSheet);

        // Check info
        api.MapGet("/hello-world", HelloWorld).AllowAnonymous();

        return api;
    }

    public static async Task<Ok<PaginatedItems<CareSheet>>> GetCareSheetsByPatientRecordId(
        [AsParameters] HealthRecordServices services, [AsParameters] PaginationRequest request, Guid patientRecordId)
    {
        var pageIndex = request.PageIndex;
        var pageSize = request.PageSize;

        var total = await services.Context.CareSheets.Where(cs => cs.PatientRecordId == patientRecordId)
            .LongCountAsync();

        var caresheets = await services.Context.CareSheets
            .Where(cs => cs.PatientRecordId == patientRecordId)
            .ToListAsync();

        return TypedResults.Ok(new PaginatedItems<CareSheet>(pageIndex, pageSize, total, caresheets));
    }

    public static async Task<Ok<PaginatedItems<Examination>>> GetExaminationByPatientRecordId(
        [AsParameters] HealthRecordServices services, [AsParameters] PaginationRequest request, Guid patientRecordId)
    {
        var pageIndex = request.PageIndex;
        var pageSize = request.PageSize;

        var total = await services.Context.Examinations.Where(ex => ex.PatientRecordId == patientRecordId)
            .LongCountAsync();

        var examinations = await services.Context.Examinations.Where(ex => ex.PatientRecordId == patientRecordId)
            .ToListAsync();

        return TypedResults.Ok(new PaginatedItems<Examination>(pageIndex, pageSize, total, examinations));
    }

    private static async Task<Results<Created, NotFound>> CreateCareSheet(
        [AsParameters] HealthRecordServices services, [FromBody] CreateCareSheet create)
    {
        var patientRecord = await services.Context.PatientRecords.FindAsync(create.PatientRecordId);

        if (patientRecord == null) return TypedResults.NotFound();

        var caresheet = new CareSheet
        {
            ProgressNote = create.ProgressNote,
            CareInstruction = create.CareInstruction,
            PatientRecordId = create.PatientRecordId,
            PatientRecord = patientRecord,
            NurseId = create.NurseId, //  TODO: Get from claim
        };

        var entry = await services.Context.CareSheets.AddAsync(caresheet);
        await services.Context.SaveChangesAsync();

        return TypedResults.Created($"/api/healthrecords/caresheets/{entry.Entity.Id}");
    }

    public static async Task<Results<Created, NotFound>> CreateExamination([AsParameters] HealthRecordServices services,
        [FromBody] CreateExamination create)
    {
        var patientRecord = await services.Context.PatientRecords.FindAsync(create.PatientRecordId);

        if (patientRecord == null) return TypedResults.NotFound();

        var examination = new Examination
        {
            ProgressNote = create.ProgressNote,
            MedicalServices = create.MedicalServices,
            Prescription = create.Prescription,
            PatientRecordId = create.PatientRecordId,
            DoctorId = create.DoctorId, //  TODO: Get from claim
            PatientRecord = patientRecord
        };

        var entry = await services.Context.Examinations.AddAsync(examination);
        await services.Context.SaveChangesAsync();

        return TypedResults.Created($"/api/healthrecords/examinations/{entry.Entity.Id}");
    }

    public static async Task<Ok<PaginatedItems<VitalSign>>> GetVitalSignByPatientRecordId(
        [AsParameters] HealthRecordServices services, [AsParameters] PaginationRequest request, Guid patientRecordId)
    {
        var pageIndex = request.PageIndex;
        var pageSize = request.PageSize;

        var total = await services.Context.VitalSigns.Where(vs => vs.PatientRecordId == patientRecordId)
            .LongCountAsync();

        var vitalSigns = await services.Context.VitalSigns
            .Where(vs => vs.PatientRecordId == patientRecordId)
            .ToListAsync();

        return TypedResults.Ok(new PaginatedItems<VitalSign>(pageIndex, pageSize, total, vitalSigns));
    }


    public static async Task<Results<Created, NotFound>> CreateVitalSign([AsParameters] HealthRecordServices services,
        [FromBody] CreateVitalSign create)
    {
        var patientRecord = await services.Context.PatientRecords.FindAsync(create.PatientRecordId);

        if (patientRecord == null) return TypedResults.NotFound();

        var vitalSign = new VitalSign
        {
            Pulse = create.Pulse,
            BloodPressure = create.BloodPressure,
            Temperature = create.Temperature,
            Spo2 = create.Spo2,
            RespirationRate = create.RespirationRate,
            Height = create.Height,
            Weight = create.Weight,
            NurseId = Guid.NewGuid(),
            MeasureAt = DateTime.UtcNow,
            PatientRecordId = create.PatientRecordId,
            PatientRecord = patientRecord
        };

        var vitalSignEntry = await services.Context.VitalSigns.AddAsync(vitalSign);
        await services.Context.SaveChangesAsync();

        return TypedResults.Created($"/healthrecords/vitalsigns/{vitalSignEntry.Entity.PatientRecordId}");
    }

    public static async Task<Results<Ok<PatientRecord>, NotFound>> GetHealthRecordsByPatientId(
        [AsParameters] HealthRecordServices services, Guid patientId)
    {
        var patientRecord = await services.Context.PatientRecords
            .Include(pr => pr.Patient)
            .FirstOrDefaultAsync(pr => pr.PatientId == patientId);

        if (patientRecord is not null) return TypedResults.Ok(patientRecord);

        return TypedResults.NotFound();
    }

    public static async Task<Ok<PaginatedItems<Patient>>> GetPatients(
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

    public static async Task<Ok<PaginatedItems<Patient>>> GetPatientsByBloodType(
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

    public static async Task<Results<Ok<Patient>, BadRequest<string>, NotFound>> GetPatientById(
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


    public static async Task<Created> CreatePatient([AsParameters] HealthRecordServices services, CreatePatient create)
    {
        services.Logger.LogInformation("Info:::Called API route 'api/healthrecord/patient'");
        var patient = new Patient()
        {
            FirstName = create.FirstName,
            LastName = create.LastName,
            DateOfBirth = create.DateOfBirth,
            Gender = create.Gender,
            Address = create.Address,
            PhoneNumber = create.PhoneNumber,
            BloodType = create.BloodType
        };

        var patientEntry = services.Context.Patients.Add(patient);

        var patientRecord = new PatientRecord
        {
            NurseId = Guid.NewGuid(), PatientId = patientEntry.Entity.Id, Patient = patientEntry.Entity
        };

        await services.Context.PatientRecords.AddAsync(patientRecord);

        await services.Context.SaveChangesAsync();

        return TypedResults.Created($"/api/healthrecord/patient/{patientEntry.Entity.Id}");
    }

    public static async Task<Results<Created, NotFound<string>>> UpdatePatient(
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

    public static async Task<Results<NoContent, NotFound<string>>> DeletePatient(
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

    public static Task<string> HelloWorld([AsParameters] HealthRecordServices services)
    {
        services.Logger.LogInformation("Called API route 'api/healthrecord'");
        return Task.FromResult("Hello, world!");
    }
}