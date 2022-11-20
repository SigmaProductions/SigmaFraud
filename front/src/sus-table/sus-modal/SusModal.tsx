import React from "react";
import { Button, Card, ListGroup, Modal, ProgressBar } from "react-bootstrap";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import styled from "styled-components";
import { isPropertySignature } from "typescript";
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
  const Phrases = styled.span`
    display: flex;
    gap: 5px;
    align-items: center;
  `;
  const markReport = (sus: boolean) => props.onClose(sus);

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
          {/* {props.report?.mediaUrl && (
            <ReportMediaContent src={props.report?.mediaUrl} alt="avatar" />
          )} */}
          {props.report?.mediaUrl && (
            <ReportMediaContent src="/Untitled.png" alt="avatar" />
          )}
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
          Wynik klasyfikatora słów:
          <ProgressBar
            now={props.report?.textClassifier}
            label={`${props.report?.textClassifier}`}
            max={10}
          />
          <Phrases>
            Wynik fraz:
            {props.report?.phrases ? <FaCheckCircle /> : <FaTimesCircle />}
          </Phrases>
        </StatsWrapper>
        <StatsWrapper>
          Detekcja podmiotów:
          {props.report?.brands?.length > 0 && (
            <ListGroup>
              {props.report?.brands &&
                props.report.brands.map((b) => (
                  <ListGroup.Item>b</ListGroup.Item>
                ))}
            </ListGroup>
          )}
          {(props.report?.brands?.length === 0 || props.report?.brands == null)&& (
            <span>
              Nie znaleziono żadnych podmiotów lub ten tweet nie ma obrazów.
            </span>
          )}
        </StatsWrapper>
      </ModalBody>

      <Footer>
        <Button variant="danger" onClick={() => markReport(true)}>
          Oznacz jako oszustwo
        </Button>
        <Button variant="success" onClick={() => markReport(false)}>
          Oznacz jako fałszywy pozytyw
        </Button>
      </Footer>
    </Modal>
  );
}
