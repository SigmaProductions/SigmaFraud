import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { Report } from "../../models/Report";
import { fetchReportsByUser } from "../../services/reports.service";
import { FaCheckCircle, FaSkullCrossbones } from "react-icons/fa";

type Props = { userId: string; currentId: string };

export default function UserOtherSuses({ userId, currentId }: Props) {
  useEffect(() => {
    let req = fetchReportsByUser(userId);
    req.catch((e) => {});
    req.then((res) => setReports(res.filter((r) => r.id !== currentId)));
  }, []);

  const [reports, setReports] = useState<Report[]>();

  return (
    <>
      <h4>Poprzednio zsusowane posty użytkownika:</h4>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Date</th>
            <th>Was marked</th>
          </tr>
        </thead>
        <tbody>
          {reports?.map((r) => {
            return (
              <tr>
                <td>{r.dateCreated}</td>
                <td>{r.state === "sus" && <FaSkullCrossbones />}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
}
