import React from "react";
import styled from "styled-components";

type Props = {
  name: string;
  configuredTime: number;
  passedTime: number;
};

const CardContainer = styled.div`
  width: 450px;
  height: 800px;
  background-color: #0062ff;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
`;

const Name = styled.p`
  font-size: 24px;
  color: #f2f7ff;
`;

const Time = styled.p`
  font-size: 24px;
  color: #f2f7ff;
`;

const BPCard: React.FC<Props> = ({
  name,
  configuredTime: ct,
  passedTime: pt
}) => {
  return (
    <CardContainer>
      <Name>{name}</Name>
      <Time>{ct - pt}</Time>
    </CardContainer>
  );
};

export default BPCard;
