import React from "react";
import { Button, Card, Modal, ProgressBar } from "react-bootstrap";
import styled from "styled-components";
import { Report } from "../../models/Report";
import UserOtherSuses from "./UserOtherSuses";

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
  `;
  const UserName = styled.span`
    font-weight: 600;
    font-size: 1.5rem;
  `;
  const ReportContent = styled.div`
    max-width: 500px;
  `;

  const Footer = styled(Modal.Footer)`
    display: flex;
    justify-content: space-around;
  `;
  const ModalBody = styled(Modal.Body)`
    padding: 1rem;
    display: flex;
    flex-direction: row;
    gap: 10px;
    flex-wrap: wrap;
    justify-content: center;
  `;
  const StatsWrapper = styled.div`
    padding: 10px;
    min-width: 400px;
    max-width: 700px;
    gap: 8px;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  `;
  const ReportMediaContent = styled.img`
    width: 50%;
    max-width: 500px;
    object-fit: contain;
    margin: auto;
    display: block;
    margin: 5px auto;
  `;
  const UserId = styled.span`
    font-size: 1rem;
    opacity: 0.7;
    align-self: end;
    padding-bottom: 2px;
  `;
  const OtherSusesCard = styled(Card)`
    width: 600px;
    min-height: 300px;
    align-self: start;
  `;

  const markReport = (sus: boolean) => props.onClose(sus);
  const url =
    "https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350";

  return (
    <Modal
      dialogClassName="modal-90w"
      show={props.show}
      onHide={() => props.onClose(undefined)}
    >
      <Modal.Header closeButton>
        <Modal.Title>This post was reported</Modal.Title>
      </Modal.Header>

      <ModalBody>
        <ReportWrapper>
          <UserBar>
            <UserName>{props.report?.authorName} </UserName>
            <UserId>#{props.report?.authorId}</UserId>
          </UserBar>
          <ReportMediaContent src={url} alt="avatar" />
          <ReportContent>{props.report?.text}</ReportContent>
        </ReportWrapper>

        <OtherSusesCard>
          <Card.Body>
            <UserOtherSuses
              userId={props.report?.authorId}
              currentId={props.report?.id}
            ></UserOtherSuses>
          </Card.Body>
        </OtherSusesCard>

        <StatsWrapper>
          Wynik testu słów:
          <ProgressBar now={60} label={`${60}%`} />
          Wynik fraz:
          <ProgressBar now={60} label={`${60}%`} />
        </StatsWrapper>
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
