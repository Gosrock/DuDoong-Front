import { FlexBox, Input, ListHeader } from '@dudoong/ui';
import { useEffect, useState } from 'react';
import { Map, MapMarker, StaticMap } from 'react-kakao-maps-sdk';

//지도
const MapPage = (props: any) => {
  const [info, setInfo] = useState<any>();
  const [markers, setMarkers] = useState<any>([]);
  const [map, setMap] = useState<any>();
  const [address, setAddress] = useState<any>('홍대 001');

  const ps = new kakao.maps.services.Places();

  const onInput = (props: any) => {
    props.preventDefault();
    console.log(props);
    console.log('한번만 실행');
    ps.keywordSearch(address, handleMap);
  };
  const handleChange = (e: { target: { value: any } }) => {
    setAddress(e.target.value);
    console.log(e.target.value);
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
        }
      });
    }
  };

  useEffect(() => {
    handleMap();
  }, [map]);
  console.log(markers);
  return (
    <>
      <FlexBox align={'center'} direction={'column'}>
        <form onSubmit={onInput}>
          <input
            placeholder="검색하세요"
            value={address}
            onChange={handleChange}
          ></input>
          <button type="submit">제출</button>
        </form>

        <Map // 로드뷰를 표시할 Container
          center={{
            lat: 37.566826,
            lng: 126.9786567,
          }}
          style={{ width: '398px', height: '292px' }}
          level={4}
          onCreate={setMap}
        >
          {markers.map((marker: any) => (
            <MapMarker
              key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
              position={marker.position}
              onClick={() => setInfo(marker)}
            >
              {info && info.content === marker.content && (
                <div style={{ color: '#000' }}>{marker.content}</div>
              )}
            </MapMarker>
          ))}
        </Map>
      </FlexBox>
    </>
  );
};

export default MapPage;
