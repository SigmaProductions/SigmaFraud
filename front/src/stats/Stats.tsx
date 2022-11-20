import React from "react";
import { Card } from "react-bootstrap";
import Sustribution from "../distribution/Sustribution";

type Props = {};

export default function Stats(props: Props) {
  return (
    <Card>
      <Sustribution></Sustribution>
    </Card>
  );
}
