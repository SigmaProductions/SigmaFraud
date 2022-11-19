import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import { Report } from "../models/Report";
import { markReport } from "../services/reports.service";
import MarkedToast from "./MarkedToast";
import SusModal from "./sus-modal/SusModal";

export default function SusTable({ data }: { data: Report[] }) {
  const [showModal, setShowModal] = useState<{
    data: Report | undefined;
    show: boolean;
  }>({ data: undefined, show: false });

  const [toast, setToast] = useState<{
    variant: "Success" | "Danger";
    onClose: () => void;
  }>();

  const rowClicked = (rowData: Report) =>
    setShowModal({ data: rowData, show: true });

  const showToast = (isSuccess: boolean) =>
    setToast({
      variant: isSuccess ? "Success" : "Danger",
      onClose: () => setToast(undefined),
    });

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Source</th>
            <th>Is sus</th>
          </tr>
        </thead>
        <tbody>
          {data.map((r) => {
            return (
              <tr onClick={() => rowClicked(r)}>
                <td>{r.source}</td>
                <td>{r.sus}</td>
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
              let res = await markReport(wasSus, showModal.data!.id);

              if (res.ok) showToast(true);
              else showToast(false);
            }

            setShowModal({ data: undefined, show: false });
          },
        }}
      ></SusModal>
      {toast && <MarkedToast {...toast!} />}
    </>
  );
}
