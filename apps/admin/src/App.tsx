import { Button } from '@dudoong/ui';
import styled from '@emotion/styled';

function App() {
  return (
    <div className="App">
      <ThemeTest>
        themeprovider 테스트
        <Button>어드민 보일러플레이트 테스트</Button>
      </ThemeTest>
    </div>
  );
}

export default App;

const ThemeTest = styled.div`
  ${({ theme }) => theme.typo.Header.Header_20}
`;
