import ContentGrid from '@components/shared/layout/ContentGrid';
import { Button } from '@dudoong/ui';
import { useNavigate } from 'react-router-dom';
import { css } from '@emotion/react';

const TempDButtonSet = () => {
  const navigate = useNavigate();
  return (
    <>
      <Button>어드민 이벤트 detail</Button>
      <Button onClick={() => navigate('/')}>어드민 랜딩</Button>
      <ContentGrid
        topElement={
          <div
            css={css`
              width: 80%;
              height: 100px;
              background-color: tan;
            `}
          />
        }
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
