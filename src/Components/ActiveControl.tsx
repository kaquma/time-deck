import React from "react";
import styled from "styled-components";

type Props = {
  isPlaying: boolean;
  disabled: boolean;
  noNext: boolean;
  onPlayButtonPushed: () => void;
  onNextButtonPushed: () => void;
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Button = styled.button`
  font-size: 18px;
`;

const ActiveControl: React.FC<Props> = ({
  isPlaying,
  disabled,
  noNext,
  onPlayButtonPushed,
  onNextButtonPushed
}) => (
  <Wrapper>
    <Button disabled={disabled} onClick={onPlayButtonPushed}>
      {isPlaying ? "停止" : "開始"}
    </Button>
    <Button disabled={disabled || noNext} onClick={onNextButtonPushed}>
      次へ
    </Button>
  </Wrapper>
);

export default ActiveControl;
