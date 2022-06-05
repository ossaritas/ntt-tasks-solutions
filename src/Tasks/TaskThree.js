import { useEffect } from 'react';
import axios from 'axios';

import Task from './Task';
import Loader from '../UI/Loader';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { taskActions } from '../store/task-slice';

const TaskThree = () => {
  const dispatch = useDispatch();
  const {
    offers: {
      case3: { data, loaded },
    },
    offersCount: { count },
  } = useSelector((state) => state.task);

  // useEffect(() => {
  //   dispatch(getOfferCount());
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  useEffect(() => {
    // const controller = new AbortController();
    const fetchCaseThreeOffers = async () => {
      try {
        const ofCo = await axios.get(
          'https://snetmyapp.herokuapp.com/get_offer_count'
          // {
          //   signal: controller.signal,
          // }
        );
        const offersCount = ofCo.data.num_offers;
        dispatch(taskActions.onCaseThreeCount(offersCount));
        const numArr = new Array(offersCount).fill(0);
        numArr.forEach((element) => {
          axios
            .get(
              'https://snetmyapp.herokuapp.com/case3'
              // {
              //   signal: controller.signal,
              // }
            )
            .then((result) => {
              dispatch(taskActions.onCaseThreeOffers(result.data));
            });
        });
      } catch (error) {
        console.error(error);
      }
    };
    if (!loaded) {
      fetchCaseThreeOffers();
    }
    return () => {};
  }, [loaded]);

  return (
    <div>
      {data.length !== count ? (
        <Loader offerCount={count - data.length} />
      ) : null}
      {data
        ? data.map((item) => (
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

export default TaskThree;
