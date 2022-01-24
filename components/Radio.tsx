import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { IRadioPageProps, IRadioStation, ChangeStationEnum } from "utils/types";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import RadioStation from "components/RadioStation";
import Button from "components/Button-styles";

const Holder = styled.div`
  max-width: 450px;
  width: 100%;
  margin: 0 auto;
`;

const Header = styled.header`
  background: orange;
  border-radius: 20px 20px 0 0;
  padding: 30px 15px;
  display: flex;
  color: #fff;
  align-items: center;
  justify-content: space-between;
  h1 {
    margin: 0;
    text-transform: uppercase;
    font-size: 26px;
    font-weight: bold;
  }
`;

const Body = styled.div`
  background: #2f2f2f;
  padding: 20px;
  height: 350px;
  overflow: auto;
`;

const Footer = styled.div`
  background: #222;
  height: 98px;
  border-radius: 0 0 20px 20px;
  border-top: 2px solid #666;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  p {
    text-transform: uppercase;
    color: gold;
    font-size: 12px;
    font-weight: bold;
    margin: 0 0 15px;
  }
  h3 {
    margin: 0;
    color: #aaa;
    font-weight: 400;
    font-size: 22px;
  }
`;

export default function Radio({ radios }: IRadioPageProps) {
  const [playing, setPlaying] = useState(false);
  const [activeStationIndex, setActiveStationIndex] = useState<number | null>(null);
  const [radioHistory, setRadioHistory] = useState<number[]>([]);

  useEffect(() => {
    if (activeStationIndex && !playing) {
      setPlaying(true);
    }
  }, [activeStationIndex]);

  const turnOff = () => {
    setPlaying(false);
    setActiveStationIndex(null);
    setRadioHistory([]);
  };

  const changeStation = (e: ChangeStationEnum) => {
    if (activeStationIndex !== null) {
      setRadioHistory((history) => [...history, activeStationIndex]);
      if (e === "NEXT") {
        activeStationIndex < radios.length - 1
          ? setActiveStationIndex(activeStationIndex + 1)
          : setActiveStationIndex(0);
      } else {
        activeStationIndex > 0
          ? setActiveStationIndex(activeStationIndex - 1)
          : setActiveStationIndex(radios.length - 1);
      }
    }
  };

  const goBack = () => {
    const tmpArr = [...radioHistory];
    const lastItem = tmpArr.pop();
    lastItem && setActiveStationIndex(lastItem);
    setRadioHistory(tmpArr);
  };

  return (
    <Holder>
      <Header>
        <Button title="Go to previous station" onClick={goBack}>
          {radioHistory.length > 0 && <ChevronLeftIcon fontSize="large" />}
        </Button>
        <h1>Stations</h1>
        <Button title="Turn Off!" onClick={turnOff}>
          <PowerSettingsNewIcon fontSize="large" />
        </Button>
      </Header>
      <Body>
        {radios.map((rd: IRadioStation, index: number) => {
          return (
            <RadioStation
              key={rd.frequency}
              {...rd}
              playing={activeStationIndex === index}
              playStation={() => {
                if (activeStationIndex !== index) {
                  activeStationIndex !== null &&
                    setRadioHistory((history) => [...history, activeStationIndex]);
                  setActiveStationIndex(index);
                }
              }}
              changeStation={changeStation}
            />
          );
        })}
      </Body>
      <Footer>
        {activeStationIndex !== null && (
          <div>
            <p>Currently playing</p>
            <h3>{radios[activeStationIndex]?.name}</h3>
          </div>
        )}
      </Footer>
    </Holder>
  );
}
