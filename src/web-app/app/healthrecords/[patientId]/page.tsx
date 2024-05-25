import { getHealthRecordRelatedToPatient } from "@/actions/health-record";
import { Chart } from "@/components/chart";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatDate } from "@/lib/utils";

const HealthRecordIdPage = async ({
  params,
}: {
  params: { patientId: string };
}) => {
  if (!params.patientId) return <div>Nothing to show</div>;

  const patientRecord = await getHealthRecordRelatedToPatient(params.patientId);

  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-4 md:p-8">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">
            Health Record for{" "}
            <span className="text-xl text-muted-foreground">
              {patientRecord.patient.firstName} {patientRecord.patient.lastName}{" "}
              {", "}
            </span>
            <span className="text-sm text-muted-foreground">
              {patientRecord.patient.id}
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
            <Card>
              <CardHeader>
                <CardTitle className="text-blue-600">
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div>
                  <h4 className="text-sm font-medium text-blue-500">
                    Full Name
                  </h4>
                  <p className="text-2xl font-bold text-blue-300">
                    {patientRecord.patient.firstName}{" "}
                    {patientRecord.patient.lastName}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-blue-500">
                    Date of Birth
                  </h4>
                  <p className="text-2xl font-bold text-blue-400">
                    {formatDate(patientRecord.patient.dateOfBirth)}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-blue-500">Gender</h4>
                  <p className="text-2xl font-bold text-blue-600">
                    {patientRecord.patient.gender ? "Male" : "Female"}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-blue-500">
                    Blood Type
                  </h4>
                  <p className="text-2xl font-bold text-blue-500">
                    {patientRecord.patient.bloodType}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-blue-500">Address</h4>
                  <p className="text-md font-bold text-blue-700">
                    {patientRecord.patient.address}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-blue-500">
                    Phone Number
                  </h4>
                  <p className="text-md font-bold text-blue-700">
                    {patientRecord.patient.phoneNumber}
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-blue-600">Record Overview</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div>
                  <h4 className="text-sm font-medium text-blue-500">
                    Nurse ID
                  </h4>
                  <p className="text-md font-bold text-blue-700">
                    {patientRecord.nurseId}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-blue-500">
                    Created At
                  </h4>
                  <p className="text-md font-bold text-blue-700">
                    {formatDate(patientRecord.createdAt)}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-blue-500">
                    Updated At
                  </h4>
                  <p className="text-md font-bold text-blue-700">
                    {formatDate(patientRecord.updatedAt)}
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="examinations" className="space-y-4">
            <Chart />
          </TabsContent>
          <TabsContent value="careSheets" className="space-y-4">
            {patientRecord.careSheets.map((careSheet, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>Care Sheet {index + 1}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{JSON.stringify(careSheet, null, 2)}</p>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
          <TabsContent value="vitalSigns" className="space-y-4">
            {patientRecord.vitalSigns.map((vitalSign, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>Vital Sign {index + 1}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{JSON.stringify(vitalSign, null, 2)}</p>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </ScrollArea>
  );
};

export default HealthRecordIdPage;
