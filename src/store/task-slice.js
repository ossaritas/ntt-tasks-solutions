import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// export const getOfferCount = createAsyncThunk(
//   'get_offer_count/getOfferCount',
//   async () => {
//     try {
//       const response = await axios.get(
//         'https://snetmyapp.herokuapp.com/get_offer_count'
//       );
//       const offersCount = response.data.num_offers;
//       return offersCount;
//     } catch (error) {
//       console.error(error);
//     }
//   }
// );

export const getOffers = createAsyncThunk('cases/getOffers', async (caseId) => {
  try {
    const response = await axios.get(
      `https://snetmyapp.herokuapp.com/${caseId}`
    );

    return response.data;
  } catch (error) {
    console.error(error);
  }
});

const initialTaskState = {
  isLogin: true,
  offersCount: { status: null, error: null, count: 0 },
  offers: {
    case1: { data: [], loaded: false },
    case2: { data: [], loaded: false },
    case3: { data: [], loaded: false },
  },
};

const taskSlice = createSlice({
  name: 'task',
  initialState: initialTaskState,
  reducers: {
    onLogin: (state) => {
      state.isLogin = false;
    },
    onLogout: (state, action) => {
      //
    },
    onCaseThreeCount: (state, action) => {
      state.offersCount.count = action.payload;
    },
    onCaseThreeOffers: (state, action) => {
      state.offers.case3.data.push(action.payload);
      state.offers.case3.data.sort(
        (a, b) =>
          parseFloat(
            a.QuotaInfo.HasDiscount ? a.QuotaInfo.PremiumWithDiscount : a.Cash
          ) -
          parseFloat(
            b.QuotaInfo.HasDiscount ? b.QuotaInfo.PremiumWithDiscount : b.Cash
          )
      );
      state.offers.case3.loaded = true;
    },
  },
  extraReducers: (builder) => {
    builder
      // .addCase(getOfferCount.pending, (state, action) => {
      //   state.offersCount.status = action.meta.requestStatus;
      // })
      // .addCase(getOfferCount.fulfilled, (state, action) => {
      //   state.offersCount.status = action.meta.requestStatus;
      //   state.offersCount.count = action.payload;
      // })
      .addCase(getOffers.pending, (state, action) => {
        if (action.meta.arg === 'case1') {
          state.offers.case1.data = [];
        }
        if (action.meta.arg === 'case2') {
          state.offers.case2.data = [];
        }
      })
      .addCase(getOffers.fulfilled, (state, action) => {
        if (action.meta.arg === 'case1') {
          state.offers.case1.loaded = true;
          state.offers.case1.data = action.payload;
        }
        if (action.meta.arg === 'case2') {
          state.offers.case2.loaded = true;
          state.offers.case2.data = action.payload;
        }
      });
  },
});

export default taskSlice;

export const taskActions = taskSlice.actions;
