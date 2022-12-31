import { Button, globalStyle } from '@dudoong/ui';
import { Global } from '@emotion/react';

function App() {
  return (
    <div className="App">
      <Global styles={globalStyle} />
      <Button>두둥 어드민 보일러플레이트</Button>
    </div>
  );
}

export default App;
