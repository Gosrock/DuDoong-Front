import { SearchInput } from '@components/shared/component/SearchInput';
import {
  Text,
  Divider,
  FlexBox,
  ListHeader,
  ListRow,
  Modal,
  Padding,
  Spacing,
  Button,
} from '@dudoong/ui';
import { css } from '@emotion/react';
import { SyntheticEvent, useState } from 'react';
import ModalTip from './ModalTip';
import Pagination from './Pagination';

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
  address: string | undefined;
  handleChange: (e: {
    target: {
      value: string;
    };
  }) => void;
  markers: any;
  setInfos: React.Dispatch<any>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleMap: () => void;
  pagination: any;
}

const ModalSearch = ({
  isOpen,
  address,
  handleChange,
  markers,
  setInfos,
  setIsOpen,
  handleMap,
  pagination,
}: ModalSearchProps) => {
  const ps = new kakao.maps.services.Places();
  const [pageCount, setTotalPage] = useState<number>();

  const onInput = (props: SyntheticEvent) => {
    // eslint-disable-next-line react/prop-types
    props.preventDefault();
    if (address !== undefined) {
      ps.keywordSearch(address, handleMap);
      displayPagination(pagination);
    }
  };

  function displayPagination(pagination: any) {
    setTotalPage(pagination?.last);
  }

  return (
    <>
      <Modal open={isOpen} onDismiss={() => setIsOpen(!isOpen)}>
        <Padding size={[0, 35]}>
          <Text typo={'P_Header_20_B'}>
            <Padding size={[32, 0, 0, 0]}>공연장소 찾기</Padding>
          </Text>
          <Divider line={true} />
          <Spacing size={10} />
          <form onSubmit={onInput}>
            <SearchInput
              placeholder="예)와우산로 94"
              value={address}
              onChange={handleChange}
            ></SearchInput>
          </form>
          <Spacing size={16} />
          {address === '' || markers?.length === 0 || !markers ? (
            <ModalTip />
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
                    {pagination?.totalCount}건
                  </Text>
                </Padding>
              </FlexBox>
              <FlexBox
                direction={'column'}
                align={'flex-start'}
                justify={'space-between'}
              >
                <div
                  css={css`
                    width: 806px;
                    height: 400px;
                    overflow: scroll;
                  `}
                >
                  {markers?.map((marker: place) => (
                    <button
                      key={`marker-${marker?.content}-${marker?.position?.lat},${marker?.position?.lng}`}
                      css={css`
                        width: 100%;
                        text-align: end;
                      `}
                      onClick={() => setInfos(marker)}
                    >
                      <ListRow
                        padding={0}
                        text={
                          <ListHeader
                            size={'listHeader_18'}
                            padding={[16, 0, 16, 10]}
                            title={`${marker?.content}`}
                          />
                        }
                        rightElement={
                          <ListRow
                            textTypo={'P_Text_16_M'}
                            text={`${marker?.roadAddress}`}
                            subText={`지번: ${marker?.placeAddress}`}
                            padding={[16, 0, 16, 0]}
                          />
                        }
                      />
                    </button>
                  ))}
                </div>
              </FlexBox>
              <Pagination pagination={pagination} />
            </>
          )}
          <Spacing size={40} />
          <div
            css={css`
              float: right;
            `}
          >
            <Button
              onClick={(prev) => setIsOpen(!prev)}
              width={106}
              varient={'tertiary'}
            >
              취소
            </Button>
          </div>
        </Padding>
      </Modal>
    </>
  );
};

export default ModalSearch;
