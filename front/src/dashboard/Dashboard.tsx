import { useState } from "react";
import "./Dashboard.scss";
import SusTable from "../sus-table/SusTable";
import { Report } from "../models/Report";

export default function Dashboard() {
  const spoofData = [
    {
      source: "twitter",
      sus: "suuss",
      content: "dfdsfdsffdsfdfsdfdsfdsfdsf sdf dsfdsf ds fds",
    } as Report,
  ];
  const [Reports, setReports] = useState(spoofData);

  return (
    <div className="main">
      <SusTable data={Reports}></SusTable>
    </div>
  );
}
