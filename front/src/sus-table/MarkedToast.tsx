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
    <ToastStyled
      bg={variant.toLowerCase()}
      animation={true}
      delay={3000}
      autohide
    >
      <Toast.Header onClick={onClose}>
        <strong className="me-auto">
          {variant === "Success" ? "Success" : "Error"}
        </strong>
      </Toast.Header>
      <Toast.Body>
        {variant === "Success"
          ? "Successfuly saved changes"
          : "Error has occured"}
      </Toast.Body>
    </ToastStyled>
  );
}
