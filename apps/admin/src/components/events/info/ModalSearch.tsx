import {
  Text,
  Divider,
  FlexBox,
  Input,
  ListHeader,
  ListRow,
  Modal,
  Padding,
  Search,
  Spacing,
  theme,
} from '@dudoong/ui';
import { css } from '@emotion/react';
import { SyntheticEvent } from 'react';

interface place {
  content: string;
  placeAddress: string;
  roadAddress: string;
  position: {
    lat: number;
    lng: number;
  };
}
interface ModalSearchProps {
  isOpen: boolean;
  address: string;
  handleChange: (e: {
    target: {
      value: string;
    };
  }) => void;
  markers: any;
  setInfos: React.Dispatch<any>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleMap: () => void;
}

const ModalSearch = ({
  isOpen,
  address,
  handleChange,
  markers,
  setInfos,
  setIsOpen,
  handleMap,
}: ModalSearchProps) => {
  const ps = new kakao.maps.services.Places();

  const onInput = (props: SyntheticEvent) => {
    // eslint-disable-next-line react/prop-types
    props.preventDefault();
    ps.keywordSearch(address, handleMap);
  };

  return (
    <>
      <Modal open={isOpen} onDismiss={() => setIsOpen(!isOpen)}>
        <Padding size={[0, 35]}>
          <Text typo={'P_Header_20_B'}>
            <Padding size={[31, 0, 0, 0]}>공연장소 찾기</Padding>
          </Text>
          <Divider line={true} />
          <Spacing size={10} />
          <form onSubmit={onInput}>
            <Input
              height={60}
              styles={InputStyle}
              placeholder="예)와우산로 94"
              value={address}
              onChange={handleChange}
              rightIcon={<Search />}
            ></Input>
          </form>
          <Spacing size={16} />
          {markers.length === 0 ? (
            <div>a</div>
          ) : (
            <>
              <FlexBox direction={'row'} gap={8} align={'flex-start'}>
                <Padding fill={true} size={[32, 0, 12, 0]}>
                  {' '}
                  <Text
                    typo={'P_Header_18_SB'}
                    css={css`
                      margin-right: 5px;
                    `}
                  >
                    주소 검색결과 총
                  </Text>
                  <Text typo={'P_Header_18_SB'} color={'main_400'}>
                    {markers.length}건
                  </Text>
                </Padding>
              </FlexBox>
              <FlexBox
                direction={'column'}
                align={'flex-start'}
                justify={'space-between'}
              >
                {markers.slice(0, 3).map((marker: place) => (
                  <button
                    css={css`
                      width: 100%;
                    `}
                    onClick={() => setInfos(marker)}
                    key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
                  >
                    <ListRow
                      padding={0}
                      text={
                        <ListHeader
                          size={'listHeader_18'}
                          padding={[16, 0, 16, 10]}
                          title={`${marker.content}`}
                        />
                      }
                      rightElement={
                        <ListHeader
                          size={'listHeader_18'}
                          title={`${marker.placeAddress}`}
                          description={`${marker.roadAddress}`}
                          padding={[16, 0, 16, 0]}
                        />
                      }
                    />
                  </button>
                ))}
              </FlexBox>
            </>
          )}
        </Padding>
      </Modal>
    </>
  );
};

export default ModalSearch;

const InputStyle = css`
  border-radius: 16px;
  border: 1px solid black;
  background-color: ${theme.palette.gray_100};
  color: ${theme.palette.black};
  margin-top:16px
  box-sizing: border-box;
  width: 806px;
`;
