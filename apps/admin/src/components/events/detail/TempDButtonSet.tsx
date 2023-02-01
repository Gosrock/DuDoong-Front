import ContentGrid from '@components/shared/layout/ContentGrid';
import { Button } from '@dudoong/ui';
import { useNavigate } from 'react-router-dom';
import { css } from '@emotion/react';
import useBottomButton from '@lib/hooks/useBottomButton';
import { useEffect } from 'react';

const TempDButtonSet = () => {
  const navigate = useNavigate();
  const { displayButtons } = useBottomButton();
  useEffect(() => {
    displayButtons({
      type: 'deletePostEvent',
      firstButtonClickHandler: () => {
        console.log('first button clicked');
      },
      firstButtonDisable: false,
      secondButtonClickHandler: () => {
        console.log('second button clicked');
      },
      secondButtonDisable: false,
      isActive: true,
    });
  }, []);
  return (
    <>
      <Button>어드민 이벤트 detail</Button>
      <Button onClick={() => navigate('/')}>어드민 랜딩</Button>
      <Button
        onClick={() =>
          displayButtons({
            type: 'deletePostEvent',
            firstButtonClickHandler: () => {
              console.log('first button clicked');
            },
            firstButtonDisable: true,
            secondButtonClickHandler: () => {
              console.log('second button clicked');
            },
            secondButtonDisable: false,
            isActive: true,
          })
        }
      >
        first button disable
      </Button>
      <ContentGrid
        leftElement={
          <div
            css={css`
              width: 398px;
              height: 100px;
              background-color: cadetblue;
            `}
          />
        }
        rightElement={
          <div
            css={css`
              width: 398px;
              height: 50px;
              background-color: #162b3e;
            `}
          />
        }
        rowGap={30}
      />
    </>
  );
};
export default TempDButtonSet;
