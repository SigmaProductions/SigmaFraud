import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import styled from "styled-components";
import { Report } from "../models/Report";
import SusModal from "./sus-modal/SusModal";

export default function SusTable({
  data,
  reportChange,
}: {
  data: Report[];
  reportChange: (rep: Report) => void;
}) {
  const [showModal, setShowModal] = useState<{
    data: Report | undefined;
    show: boolean;
  }>({ data: undefined, show: false });

  const rowClicked = (rowData: Report) =>
    setShowModal({ data: rowData, show: true });

  const ReportText = styled.td`
    word-wrap: break-word;
    max-height: 2rem;
    overflow: hidden;
    word-wrap: ;
  `;
  const SusMarker = styled.td`
    font-size: 2rem;
  `;

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Source</th>
            <th>Text</th>
            <th>Is sus</th>
          </tr>
        </thead>
        <tbody>
          {data.map((r) => {
            return (
              <tr onClick={() => rowClicked(r)}>
                <td>{r.source}</td>
                <ReportText>{r.text}</ReportText>
                <SusMarker>
                  {r.state === "sus"
                    ? "ඞ"
                    : data.filter((r) => r.state === "sus").length +
                      " Impostor remains "}
                </SusMarker>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <SusModal
        {...{
          report: showModal.data!,
          show: showModal.show,
          onClose: async (wasSus: boolean | undefined) => {
            if (wasSus !== undefined) {
              let report = showModal.data!;
              report.state = wasSus ? "sus" : "non-sus";
              await reportChange(report);
              // await markOnModalClose(wasSus, showModal.data!);
            }
            setShowModal({ data: undefined, show: false });
          },
        }}
      ></SusModal>
    </>
  );
}
