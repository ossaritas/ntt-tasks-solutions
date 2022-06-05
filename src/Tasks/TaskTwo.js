import { useEffect } from 'react';
import Task from './Task';
import Loader from '../UI/Loader';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { getOffers } from '../store/task-slice';

const TaskTwo = () => {
  const {
    offers: {
      case2: { data, loaded },
    },
  } = useSelector((state) => state.task);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!loaded) {
      dispatch(getOffers('case2'));
    }

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded]);

  return (
    <div>
      {!loaded ? <Loader /> : null}
      {data.offerList
        ? data.offerList.map((item) => (
            <Task
              key={uuidv4()}
              img={item.ImagePath}
              firmName={item.FirmName}
              type={item.ProductDesc}
              description={
                item.popoverContent ? item.popoverContent[0].Description : false
              }
              explanation={
                item.popoverContent ? item.popoverContent[0].Title : ''
              }
              discount={item.QuotaInfo.HasDiscount}
              dsPrice={item.QuotaInfo.PremiumWithDiscount}
              price={item.Cash}
              saleActive={item.SaleClosed}
            />
          ))
        : null}
    </div>
  );
};

export default TaskTwo;
