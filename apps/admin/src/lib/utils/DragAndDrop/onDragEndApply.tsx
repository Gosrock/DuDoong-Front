import { useRecoilTransaction_UNSTABLE } from 'recoil';

export const onDragEndApply = (result: any) => {
  console.log(result);
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) return;
};
