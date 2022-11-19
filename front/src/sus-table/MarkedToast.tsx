import React from "react";
import { Toast } from "react-bootstrap";
import styled from "styled-components";

type Props = {
  variant: "Success" | "Danger";
  onClose: () => void;
};

export default function MarkedToast({ variant, onClose }: Props) {
  const ToastStyled = styled(Toast)`
    z-index: 99;
    position: fixed;
    top: 1rem;
    right: 1rem;
  `;
  return (
    <ToastStyled bg={variant}>
      <Toast.Header onClick={onClose}>
        <strong className="me-auto"></strong>
        <small>11 mins ago</small>
      </Toast.Header>
      <Toast.Body>Hello, world! This is a toast message.</Toast.Body>
    </ToastStyled>
  );
}
