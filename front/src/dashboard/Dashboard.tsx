import { useState, useEffect } from "react";
import "./Dashboard.scss";
import SusTable from "../sus-table/SusTable";
import { Report } from "../models/Report";
import { fetchReports, markReport } from "../services/reports.service";
import MarkedToast from "../sus-table/MarkedToast";

export default function Dashboard() {
  const spoofData = [
    {
      source: "twitter",
      state: "suuss",
      text: "dfdsfdsffdsfdfsdfdsfdsfdsf sdf dsfdsf ds fds",
    } as Report,
  ];
  const [reports, setReports] = useState(spoofData);

  useEffect(() => {
    fetchReports()
      .then((res) => setReports(res))
      .catch((e) => {
        alert("something went horribly wrong");
      });
  }, []);

  const [toast, setToast] = useState<{
    variant: "Success" | "Danger";
    onClose: () => void;
  }>();

  const showToast = (isSuccess: boolean) =>
    setToast({
      variant: isSuccess ? "Success" : "Danger",
      onClose: () => setToast(undefined),
    });

  const reportChange = async (report: Report) => {
    try {
      let res = await markReport(report.state, report.id);
      if (res.ok) {
        setReports(
          reports.map((r) => {
            if (r.id === report.id) {
              r.state = report.state;
            }
            return r;
          })
        );
        showToast(true);
      } else showToast(false);
    } catch (e) {
      showToast(false);
    }
  };

  return (
    <div className="main">
      <SusTable data={reports} reportChange={reportChange}></SusTable>
      {toast && <MarkedToast {...toast!} />}
    </div>
  );
}
