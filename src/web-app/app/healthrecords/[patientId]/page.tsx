import { getHealthRecordRelatedToPatient } from "@/actions/health-record";
import { PatientOverview } from "@/components/patient-overview";
import { PatientVitals } from "@/components/vital-signs/patient-vitals";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Examination } from "@/components/examination";
import { CareSheet } from "@/components/caresheet";
import { currentUser } from "@/actions/token";

const HealthRecordIdPage = async ({
  params,
}: {
  params: { patientId: string };
}) => {
  const user = await currentUser();

  if (!params.patientId) return <div>Nothing to show</div>;

  const patientRecord =
    (await getHealthRecordRelatedToPatient(params.patientId));

  if (!patientRecord) return <div>Nothing to show</div>;

  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-4 md:p-8">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">
            Health Record for{" "}
            <span className="text-xl text-muted-foreground">
              {patientRecord.patient?.firstName}{" "}
              {patientRecord.patient?.lastName} {", "}
            </span>
            <span className="text-sm text-muted-foreground">
              {patientRecord.id}
            </span>
            👋
          </h2>
        </div>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="examinations">Examinations</TabsTrigger>
            <TabsTrigger value="careSheets">Care Sheets</TabsTrigger>
            <TabsTrigger value="vitalSigns">Vital Signs</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <PatientOverview patientRecord={patientRecord} />
          </TabsContent>
          <TabsContent value="examinations" className="space-y-4">
            <Examination
              patientRecordId={patientRecord.id}
              userId={user?.sub || ""}
            />
          </TabsContent>
          <TabsContent value="careSheets" className="space-y-4">
            <CareSheet
              patientRecordId={patientRecord.id}
              userId={user?.sub || ""}
            />
          </TabsContent>
          <TabsContent value="vitalSigns" className="space-y-4">
            <PatientVitals patientRecordId={patientRecord.id} />
          </TabsContent>
        </Tabs>
      </div>
    </ScrollArea>
  );
};

export default HealthRecordIdPage;
