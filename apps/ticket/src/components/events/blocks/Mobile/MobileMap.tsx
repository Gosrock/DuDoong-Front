import { FlexBox, Padding } from '@dudoong/ui';
import { EventPlace } from '@dudoong/utils';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

interface MobileMapProps {
  place: EventPlace;
}

const MobileMap = (props: MobileMapProps) => {
  const [curMarker, setMarker] = useState({
    placeName: '',
    position: {
      lat: 37.566826,
      lng: 126.9786567,
    },
  });
  const [info, setInfo] = useState<boolean>(false);
  const [map, setMap] = useState<any>(); //typeOf 찍어보면 object, object라 하면 에러뜸, 근데 따로 인터페이스로 분리하기엔 원형이 너무 많음그래서 any로 해놓음

  useEffect(() => {
    if (props.place.latitude) {
      setMarker({
        placeName: props.place.placeName,
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
          <StyledMap // 로드뷰를 표시할 Container
            center={{
              lat: Number(`${curMarker.position.lat}`),
              lng: Number(`${curMarker.position.lng}`),
            }}
            level={2}
            onCreate={setMap}
          >
            {curMarker && (
              <MapMarker
                key={`marker-${curMarker.placeName}-${curMarker.position.lat},${curMarker.position.lng}`}
                position={curMarker.position}
                onClick={() => {
                  setInfo(!info);
                }}
              >
                {info && (
                  <div style={{ color: '#000' }}>{curMarker.placeName}</div> //이름 뜨는 박스 스타일링 가능
                )}
              </MapMarker>
            )}
          </StyledMap>
        </Padding>
      </FlexBox>
    </>
  );
};

export default MobileMap;

const StyledMap = styled(Map)`
  width: 100%;
  height: 285px;

  border-radius: 8px !important;
`;
