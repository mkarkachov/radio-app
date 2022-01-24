import React from "react";
import { IRadioStation, ChangeStationEnum } from "utils/types";
import styled from "styled-components";
import Image from "next/image";
import Button from "components/Button-styles";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";

const Wrapper = styled.div``;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #aaa;
  border-bottom: 1px solid #555;
  padding: 10px 0;
  cursor: pointer;
  h2 {
    font-weight: 400;
    margin: 0;
    font-size: 24px;
  }
  strong {
    font-size: 20px;
  }
`;
const ImgWrapper = styled(Image)`
  border-radius: 50%;
`;

const Body = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0;
`;

export default function RadioStation({
  frequency,
  name,
  image,
  playing,
  playStation,
  changeStation,
}: IRadioStation) {
  return (
    <Wrapper>
      <Title
        onClick={() => {
          playStation();
        }}
      >
        <h2>{name}</h2>
        <strong>{frequency}</strong>
      </Title>
      {playing && (
        <Body>
          <Button
            onClick={() => {
              changeStation(ChangeStationEnum.Prev);
            }}
          >
            <SkipPreviousIcon fontSize="large" />
          </Button>
          <ImgWrapper src={image} alt={name} height={150} width={150} />
          <Button
            onClick={() => {
              changeStation(ChangeStationEnum.Next);
            }}
          >
            <SkipNextIcon fontSize="large" />
          </Button>
        </Body>
      )}
    </Wrapper>
  );
}
