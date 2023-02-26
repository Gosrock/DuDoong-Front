import { FlexBox, Padding } from '@dudoong/ui';
import { EventPlace } from '@dudoong/utils';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

interface MobileMapProps {
  place: EventPlace;
}

interface MarkerType {
  position: {
    lat: number;
    lng: number;
  };
}

const MobileMap = (props: MobileMapProps) => {
  const [curMarker, setMarker] = useState<MarkerType>();
  const [map, setMap] = useState<any>(); //typeOf 찍어보면 object, object라 하면 에러뜸, 근데 따로 인터페이스로 분리하기엔 원형이 너무 많음그래서 any로 해놓음

  useEffect(() => {
    if (props.place.latitude) {
      setMarker({
        position: {
          lat: props.place.latitude,
          lng: props.place.longitude,
        },
      });
    }
  }, [props.place]);

  return (
    <>
      <FlexBox align={'center'} justify={'center'}>
        <Padding size={[20, 0, 0, 0]} fill>
          {curMarker && (
            <StyledMap // 로드뷰를 표시할 Container
              center={{
                lat: Number(`${curMarker.position.lat}`),
                lng: Number(`${curMarker.position.lng}`),
              }}
              level={2}
              onCreate={setMap}
            >
              <MapMarker
                key={`marker-${curMarker.position.lat},${curMarker.position.lng}`}
                position={curMarker.position}
              ></MapMarker>
            </StyledMap>
          )}
        </Padding>
      </FlexBox>
    </>
  );
};

export default MobileMap;

const StyledMap = styled(Map)`
  width: 100%;
  height: 285px;
  z-index: 0;
  border-radius: 8px !important;
`;
