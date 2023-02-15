import {
  FlexBox,
  Input,
  ListHeader,
  Modal,
  Padding,
  Spacing,
} from '@dudoong/ui';
import { BasicEventRequest } from '@lib/apis/event/eventType';
import useEvents from '@lib/hooks/useEvents';
import timeFormatter from '@lib/utils/timeFormatter';
import Info from '@pages/events/Info';
import { SyntheticEvent, useEffect, useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { useLocation } from 'react-router-dom';

interface place {
  content: string;
  position: {
    lat: number;
    lng: number;
  };
}

const MapPage = (props: any) => {
  const [lat, setLat] = useState<number | null>();
  const [lng, setLng] = useState<number | null>();
  const [placeName, setPlaceName] = useState<string | null>();
  const [placeAddress, setPlaceAddress] = useState<string | null>();
  const [info, setInfo] = useState<any>();
  const [markers, setMarkers] = useState<any>();
  const [map, setMap] = useState<any>();
  const [address, setAddress] = useState<string>('홍대 001');
  const [isOpen, setIsOpen] = useState(false);
  const [curMarker, setMarker] = useState<place>({
    content: '홍대 001',
    position: {
      lat: Number('37.55097092681401'),
      lng: Number('126.92364650757898'),
    },
  });

  console.log(lat);
  console.log(lng);
  console.log(curMarker);

  useEffect(() => {
    if (props?.place) {
      setMarker({
        content: props.place.placeName,
        position: {
          lat: Number(props.place.latitude),
          lng: Number(props.place.longitude),
        },
      });
    }
  }, [props?.place]);

  const ps = new kakao.maps.services.Places();

  const { changeEventMutation } = useEvents();
  const { pathname } = useLocation();
  const eventId = pathname.split('/')[2];

  // const payload = {
  //   name: props.name,
  //   startAt: timeFormatter(props.startDate, props.startTime),
  //   runTime: props.runtime,
  //   placeName: placeName,
  //   placeAddress: placeAddress,
  //   longitude: Number(lng),
  //   latitude: Number(lat),
  // } as BasicEventRequest;

  const changeEventHandler = () => {
    if (curMarker.position.lng && curMarker.position.lat) {
      const payload = {
        name: props.name,
        startAt: timeFormatter(props.startDate, props.startTime),
        runTime: props.runtime,
        placeName: curMarker.content,
        placeAddress: placeAddress,
        longitude: Number(curMarker.position.lng),
        latitude: Number(curMarker.position.lat),
      } as BasicEventRequest;

      changeEventMutation.mutate(payload);
    }
  };
  console.log(curMarker);

  function getAddress(lat: string, lng: string) {
    const geocoder = new kakao.maps.services.Geocoder();

    const coord = new kakao.maps.LatLng(Number(lat), Number(lng));
    const callback = function (result: any, status: string) {
      console.log(result);
      if (status === kakao.maps.services.Status.OK) {
        setPlaceAddress(result[0].address.address_name);
      }
    };
    //좌표에서 주소 변환까지 완료
    geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
  }

  const onInput = (props: SyntheticEvent) => {
    props.preventDefault();
    ps.keywordSearch(address, handleMap);
  };
  const handleChange = (e: { target: { value: string } }) => {
    setAddress(e.target.value);
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
            });

            bounds.extend(
              new kakao.maps.LatLng(Number(data[i].y), Number(data[i].x)),
            );
          }
          setMarkers(markers);
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
    setPlaceName(markers.content);
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

  return (
    <>
      <Padding size={[0, 0, 0, 80]}>
        <ListHeader
          padding={[32, 0, 12, 0]}
          size={'listHeader_18'}
          title={'공연 장소'}
        ></ListHeader>
        <form>
          <Input
            width={398}
            placeholder="검색하세요"
            value={
              curMarker.content !== null ? curMarker.content : '설정해주세요'
            }
            onClick={() => setIsOpen(true)}
            readOnly
          ></Input>
        </form>
        <Spacing size={12} />
        <Map // 로드뷰를 표시할 Container
          center={{
            lat: 37.566826,
            lng: 126.9786567,
          }}
          style={{ width: '398px', height: '292px', borderRadius: '8px' }}
          level={4}
          onCreate={setMap}
        >
          {curMarker && (
            <MapMarker
              key={`marker-${curMarker.content}-${curMarker.position.lat},${curMarker.position.lng}`}
              position={curMarker.position}
              onClick={() => setInfo(curMarker)}
            >
              {info && info.content === curMarker.content && (
                <div style={{ color: '#000' }}>{curMarker.content}</div>
              )}
            </MapMarker>
          )}
          {isOpen && (
            <Modal open={isOpen} onDismiss={() => setIsOpen(!isOpen)}>
              <form onSubmit={onInput}>
                <Input
                  width={398}
                  placeholder="검색하세요"
                  value={address}
                  onChange={handleChange}
                ></Input>
              </form>
              <div>
                {markers.map((marker: place) => (
                  <button
                    onClick={() => setInfos(marker)}
                    key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
                  >
                    {marker.content}
                  </button>
                ))}
              </div>
            </Modal>
          )}
        </Map>
      </Padding>
      {/* <FooterButton payload={payload} /> */}
      <button onClick={changeEventHandler}>+</button>
    </>
  );
};

export default MapPage;
