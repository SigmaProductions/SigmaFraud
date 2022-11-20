import React from "react";

type Props = { children: React.ReactNode };

export default function ReportWrapper({ children }: Props) {
  return <div>{children}</div>;
}
