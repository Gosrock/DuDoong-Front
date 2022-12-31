import { Button, globalStyle } from '@dudoong/ui';
import { useInputs } from '@dudoong/utils';
import { Global } from '@emotion/react';

function App() {
  const [value, onChange] = useInputs('hook 테스트');
  return (
    <div className="App">
      <Global styles={globalStyle} />
      <div>{value}</div>
      <Button>두둥 어드민 보일러플레이트</Button>
    </div>
  );
}

export default App;
