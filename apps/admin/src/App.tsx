import { theme } from '@dudoong/ui';
import styled from '@emotion/styled';

function App() {
  return <div className="App"></div>;
}

export default App;

const Btt = styled.div`
  color: ${(props) => props.theme.palette.main_100};
`;
