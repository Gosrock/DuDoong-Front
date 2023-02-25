import { Input, ListHeader, Search, Spacing, TagButton } from '@dudoong/ui';
import { BasicEventRequest } from '@lib/apis/event/eventType';
import useBottomButton from '@lib/hooks/useBottomButton';
import useEvents from '@lib/hooks/useEvents';
import timeFormatter from '@lib/utils/timeFormatter';
import { useEffect, useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import ModalSearch from './ModalSearch';

interface place {
  content: string;
  placeAddress: string;
  roadAddress: string;
  position: {
    lat: number;
    lng: number;
  };
}

const MapPage = (props: any) => {
  const [lat, setLat] = useState<number | null>();
  const [lng, setLng] = useState<number | null>();
  const [placeName, setPlaceName] = useState<string | undefined>();
  const [placeAddress, setPlaceAddress] = useState<string | undefined>();
  const [detailAddress, setDetailAddress] = useState<string | undefined>();
  const [markers, setMarkers] = useState<any>();
  const [map, setMap] = useState<any>();
  const [address, setAddress] = useState<string | undefined>('');
  const [isOpen, setIsOpen] = useState(false);
  const [curMarker, setMarker] = useState<place>({
    content: '홍대 001',
    placeAddress: '서울 마포구 서교동 360-18',
    roadAddress: '서울특별시 마포구 와우산로18길 20',
    position: {
      lat: Number('37.55097092681401'),
      lng: Number('126.92364650757898'),
    },
  });
  const [roadAddress, setRoadAddress] = useState<string | null>();
  const [pagination, setPagination] = useState<any>();

  useEffect(() => {
    if (props?.place) {
      setMarker({
        content: props.place.placeName,
        placeAddress: props.place.placeAddress,
        roadAddress: props.place.roadAddress,
        position: {
          lat: Number(props.place.latitude),
          lng: Number(props.place.longitude),
        },
      });
      setPlaceName(props.place.placeName);
      setDetailAddress(props.place.placeAddress);
    }
  }, [props?.place]);

  const { changeEventMutation } = useEvents();

  const { setButtonInfo } = useBottomButton({
    type: 'save',
    isActive: true,
  });

  const changeEventHandler = () => {
    if (curMarker.position.lng && curMarker.position.lat) {
      const payload: BasicEventRequest = {
        name: props.name,
        startAt: timeFormatter(props.startDate, props.startTime),
        runTime: props.runtime,
        placeName: placeName,
        placeAddress: detailAddress,
        longitude: Number(curMarker.position.lng),
        latitude: Number(curMarker.position.lat),
      };
      console.log(payload);
      changeEventMutation.mutate(payload);
    }
  };

  const buttonHandler = [props, curMarker];
  useEffect(() => {
    setButtonInfo({
      firstHandler: changeEventHandler,
      firstDisable: checkButtonDisable(buttonHandler),
    });
  }, [buttonHandler]);

  function getAddress(lat: string, lng: string) {
    const geocoder = new kakao.maps.services.Geocoder();

    const coord = new kakao.maps.LatLng(Number(lat), Number(lng));
    const callback = function (result: any, status: string) {
      console.log(result);
      if (status === kakao.maps.services.Status.OK) {
        setRoadAddress(result[0].road_address.address_name);
        setPlaceAddress(result[0].address.address_name);
      }
    };
    //좌표에서 주소 변환까지 완료
    geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
  }

  const handleChange = (e: { target: { value: string } }) => {
    setAddress(e.target.value);
  };

  const handleName = (e: any) => {
    e.preventDefault();
  };

  const handleMap = () => {
    if (!map) return;
    const ps = new kakao.maps.services.Places();
    if (ps) {
      ps.keywordSearch(address, (data, status, _pagination) => {
        if (status === kakao.maps.services.Status.OK) {
          // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
          // LatLngBounds 객체에 좌표를 추가합니다
          const bounds = new kakao.maps.LatLngBounds();
          const markers = [];

          for (let i = 0; i < data.length; i++) {
            markers.push({
              position: {
                lat: data[i].y,
                lng: data[i].x,
              },
              content: data[i].place_name,
              placeAddress: data[i].address_name,
              roadAddress: data[i].road_address_name,
            });

            bounds.extend(
              new kakao.maps.LatLng(Number(data[i].y), Number(data[i].x)),
            );
          }
          setMarkers(markers);
          console.log(markers);
          console.log(_pagination);
          setPagination(_pagination);
          //여기서 lat,lngset해주면될듯?

          // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
          map.setBounds(bounds);
          getAddress(markers[0].position.lat, markers[0].position.lng);
        }
      });
    }
  };

  const setInfos = (markers: place) => {
    const bounds = new kakao.maps.LatLngBounds();
    setMarker(markers);
    setLat(Number(markers.position.lat));
    setLng(Number(markers.position.lng));

    bounds.extend(
      new kakao.maps.LatLng(
        Number(markers.position.lat),
        Number(markers.position.lng),
      ),
    );
    map.setBounds(bounds);
    setIsOpen(false);
  };

  useEffect(() => {
    handleMap();
  }, [map]);

  console.log(address);
  return (
    <>
      <div>
        <ListHeader
          padding={[32, 0, 10, 0]}
          size={'listHeader_18'}
          title={'공연 장소'}
          rightElement={
            <TagButton
              size="md"
              color="primary"
              text="주소 찾기"
              onClick={() => setIsOpen(true)}
            />
          }
        ></ListHeader>

        <form onSubmit={handleName}>
          <Input
            width={398}
            placeholder="공연장 이름을 적어주세요"
            value={placeName}
            onChange={(e: { target: { value: string } }) =>
              setPlaceName(e.target.value)
            }
          ></Input>
          <ListHeader
            padding={[32, 24, 12, 0]}
            size={'listHeader_18'}
            title={'상세주소'}
            description={placeAddress ? placeAddress : ''}
          ></ListHeader>
          <Input
            placeholder="중요! 상세주소를 그대로 적어주세요!"
            value={detailAddress}
            onChange={(e: { target: { value: string } }) =>
              setDetailAddress(e.target.value)
            }
          ></Input>
        </form>
        <Spacing size={12} />
        <Map // 로드뷰를 표시할 Container
          center={{
            lat: curMarker.position.lat,
            lng: curMarker.position.lng,
          }}
          style={{ width: '398px', height: '292px', borderRadius: '8px' }}
          level={4}
          onCreate={setMap}
        >
          {curMarker && (
            <MapMarker
              key={`marker-${curMarker.content}-${curMarker.position.lat},${curMarker.position.lng}`}
              position={curMarker.position}
            ></MapMarker>
          )}
          {isOpen && (
            <ModalSearch
              handleMap={handleMap}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              address={address === '' ? '' : address}
              markers={markers !== undefined ? markers : undefined}
              handleChange={handleChange}
              setInfos={setInfos}
              pagination={pagination !== undefined ? pagination : undefined}
            />
          )}
        </Map>
      </div>
    </>
  );
};

export default MapPage;

const checkButtonDisable = (props: any) => {
  if (props.content === null) return true;
  return false;
};
