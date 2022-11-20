import React from "react";
import { Button, Modal } from "react-bootstrap";
import styled from "styled-components";
import { Report } from "../../models/Report";

export default function SusModal(props: {
  report: Report;
  show: boolean;
  onClose: (isFraudulent: boolean | undefined) => void;
}) {
  const ReportWrapper = styled.div`
    padding: 0.5rem;
    background-color: rgba(0, 0, 0, 0.1);

    border-radius: 8px;
  `;

  const UserBar = styled.div`
    display: flex;
    flex-direction: row;
    gap: 5px;

    span {
      font-weight: 600;
      font-size: 1.5rem;
    }
  `;
  const ReportContent = styled.div``;

  const Footer = styled(Modal.Footer)`
    display: flex;
    justify-content: space-around;
  `;
  const ModalBody = styled(Modal.Body)`
    padding: 1rem;
  `;

  const markReport = (sus: boolean) => props.onClose(sus);

  return (
    <Modal show={props.show} onHide={() => props.onClose(undefined)}>
      <Modal.Header closeButton>
        <Modal.Title>This post was reported</Modal.Title>
      </Modal.Header>

      <ModalBody>
        <ReportWrapper>
          <UserBar>
            <span>Marek</span>
          </UserBar>
          <ReportContent>{props.report?.content}</ReportContent>
        </ReportWrapper>
      </ModalBody>

      <Footer>
        <Button variant="danger" onClick={() => markReport(true)}>
          Fraudulant
        </Button>
        <Button variant="success" onClick={() => markReport(false)}>
          Safe
        </Button>
      </Footer>
    </Modal>
  );
}
